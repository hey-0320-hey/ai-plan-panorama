import { ref, computed } from 'vue'
import type { Plan, Vendor, PlanCategory, Announcement, PlanFilters, SortField, SortOrder } from '@/types/plan'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { mockPlans, mockVendors, mockCategories, mockAnnouncements } from '@/data/mock'

const plans = ref<Plan[]>([])
const vendors = ref<Vendor[]>([])
const categories = ref<PlanCategory[]>([])
const announcements = ref<Announcement[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

export function usePlans() {
  const filters = ref<PlanFilters>({
    search: '',
    categorySlug: '',
    priceRange: 'all',
    vendorSlugs: [],
    compareMode: false,
  })

  const sortField = ref<SortField>('price')
  const sortOrder = ref<SortOrder>('asc')

  async function fetchData() {
    loading.value = true
    error.value = null
    try {
      if (isSupabaseConfigured) {
        const [plansRes, vendorsRes, catsRes, annRes] = await Promise.all([
          supabase.from('plans').select('*, vendor:vendor_id(*), category:category_id(*)').order('sort_order'),
          supabase.from('vendors').select('*').order('sort_order'),
          supabase.from('plan_categories').select('*'),
          supabase.from('announcements').select('*').eq('is_active', true).order('date', { ascending: false }),
        ])
        plans.value = plansRes.data || []
        vendors.value = vendorsRes.data || []
        categories.value = catsRes.data || []
        announcements.value = annRes.data || []
      } else {
        // Use mock data
        plans.value = mockPlans.map(p => ({
          ...p,
          vendor: mockVendors.find(v => v.id === p.vendor_id),
          category: mockCategories.find(c => c.id === p.category_id),
        }))
        vendors.value = mockVendors
        categories.value = mockCategories
        announcements.value = mockAnnouncements
      }
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  const filteredPlans = computed(() => {
    let result = [...plans.value]

    // Search
    if (filters.value.search) {
      const q = filters.value.search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.vendor?.name.toLowerCase().includes(q)
      )
    }

    // Category
    if (filters.value.categorySlug) {
      result = result.filter(p => p.category?.slug === filters.value.categorySlug)
    }

    // Price range
    const pr = filters.value.priceRange
    if (pr !== 'all') {
      result = result.filter(p => {
        const price = p.currency === 'USD' ? p.price_monthly * 7.2 : p.price_monthly
        if (pr === 'under50') return price <= 50
        if (pr === '50to200') return price > 50 && price <= 200
        if (pr === 'over200') return price > 200
        return true
      })
    }

    // Vendors
    if (filters.value.vendorSlugs.length > 0) {
      result = result.filter(p => filters.value.vendorSlugs.includes(p.vendor?.slug || ''))
    }

    // Sort
    result.sort((a, b) => {
      let va: number, vb: number
      switch (sortField.value) {
        case 'price':
          va = a.currency === 'USD' ? a.price_monthly * 7.2 : a.price_monthly
          vb = b.currency === 'USD' ? b.price_monthly * 7.2 : b.price_monthly
          break
        case 'credits_monthly':
          va = a.credits_monthly || 0
          vb = b.credits_monthly || 0
          break
        case 'model_count':
          va = a.model_count || 0
          vb = b.model_count || 0
          break
        default:
          va = 0; vb = 0
      }
      return sortOrder.value === 'asc' ? va - vb : vb - va
    })

    return result
  })

  // Group plans by vendor
  const plansByVendor = computed(() => {
    const map = new Map<string, { vendor: Vendor; plans: Plan[] }>()
    for (const plan of filteredPlans.value) {
      const vid = plan.vendor_id
      if (!map.has(vid)) {
        map.set(vid, { vendor: plan.vendor!, plans: [] })
      }
      map.get(vid)!.plans.push(plan)
    }
    return Array.from(map.values()).sort((a, b) => a.vendor.sort_order - b.vendor.sort_order)
  })

  const activeVendors = computed(() => vendors.value.filter(v => !v.is_stopped))

  function setFilter<K extends keyof PlanFilters>(key: K, value: PlanFilters[K]) {
    filters.value[key] = value
  }

  function toggleSort(field: SortField) {
    if (sortField.value === field) {
      sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
      sortField.value = field
      sortOrder.value = 'asc'
    }
  }

  return {
    plans, vendors, categories, announcements,
    loading, error,
    filters, sortField, sortOrder,
    filteredPlans, plansByVendor, activeVendors,
    fetchData, setFilter, toggleSort,
  }
}
