export type PlanStatus = 'on_sale' | 'limited' | 'sold_out' | 'stopped'
export type Currency = 'CNY' | 'USD'
export type CreditsUnit = '次' | 'Credits' | 'AFP' | 'Flows' | '亿Tokens' | 'prompts'

export interface Vendor {
  id: string
  name: string
  slug: string
  logo_url: string | null
  website_url: string | null
  description: string | null
  is_stopped: boolean
  sort_order: number
  created_at: string
}

export interface PlanCategory {
  id: string
  name: string
  slug: string
}

export interface Plan {
  id: string
  vendor_id: string
  category_id: string
  name: string
  slug: string
  status: PlanStatus
  price_monthly: number
  price_yearly: number | null
  currency: Currency
  credits_5h: number | null
  credits_weekly: number | null
  credits_monthly: number | null
  credits_unit: CreditsUnit
  model_count: number | null
  features_json: Record<string, string> | null
  promo_text: string | null
  affiliate_url: string | null
  sort_order: number
  created_at: string
  updated_at: string
  // joined
  vendor?: Vendor
  category?: PlanCategory
}

export interface Announcement {
  id: string
  content: string
  date: string
  is_active: boolean
}

// Filter types
export interface PlanFilters {
  search: string
  categorySlug: string
  priceRange: 'all' | 'under50' | '50to200' | 'over200'
  vendorSlugs: string[]
  compareMode: boolean
}

export type SortField = 'price' | 'credits_monthly' | 'model_count'
export type SortOrder = 'asc' | 'desc'

export interface CompareItem {
  plan: Plan
  addedAt: number
}
