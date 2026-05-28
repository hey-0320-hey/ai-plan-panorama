<script setup lang="ts">
import type { PlanFilters, SortField, SortOrder } from '@/types/plan'
import type { Vendor, PlanCategory } from '@/types/plan'
import { inject , type Ref } from 'vue'

const props = defineProps<{
  filters: PlanFilters
  vendors: Vendor[]
  categories: PlanCategory[]
  sortField: SortField
  sortOrder: SortOrder
  totalPlans: number
}>()

const emit = defineEmits<{
  'update:filters': [value: PlanFilters]
  'toggle-sort': [field: SortField]
  'toggle-vendor': [slug: string]
}>()

const isDark = inject('isDark') as Ref<boolean>

function updateFilter<K extends keyof PlanFilters>(key: K, value: PlanFilters[K]) {
  emit('update:filters', { ...props.filters, [key]: value })
}

const priceRanges = [
  { value: 'all' as const, label: '全部' },
  { value: 'under50' as const, label: '¥50 内' },
  { value: '50to200' as const, label: '¥50-200' },
  { value: 'over200' as const, label: '¥200+' },
]

const sortOptions: { field: SortField; label: string }[] = [
  { field: 'price', label: '价格' },
  { field: 'credits_monthly', label: '月额度' },
  { field: 'model_count', label: '模型数' },
]
</script>

<template>
  <div class="space-y-3 rounded-lg p-4" :style="{ backgroundColor: 'var(--color-surface)', boxShadow: isDark ? 'rgba(255,255,255,0.06) 0px 0px 0px 1px' : 'rgba(0,0,0,0.08) 0px 0px 0px 1px' }">
    <!-- Search -->
    <div class="relative">
      <svg class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" style="color: var(--color-text-tertiary)" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
      <input
        :value="filters.search"
        @input="(e: Event) => updateFilter('search', (e.target as HTMLInputElement).value)"
        type="text"
        placeholder="搜索套餐或厂商..."
        class="w-full rounded-md py-2 pl-10 pr-4 text-sm outline-none transition-colors focus:ring-2"
        style="background-color: var(--color-bg-subtle); border: 1px solid var(--color-border); --tw-ring-color: rgba(0,114,245,0.3); color: var(--color-text)"
      />
    </div>

    <div class="flex flex-wrap items-center gap-3">
      <!-- Category filter -->
      <div class="flex items-center gap-1.5">
        <span class="text-xs font-medium" style="color: var(--color-text-tertiary)">类型</span>
        <div class="flex gap-1">
          <button
            v-for="cat in [{ slug: '', name: '全部' }, ...categories]"
            :key="cat.slug"
            @click="updateFilter('categorySlug', cat.slug)"
            class="rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
            :style="filters.categorySlug === cat.slug
              ? 'background-color: #171717; color: #ffffff'
              : 'background-color: var(--color-bg-subtle); color: var(--color-text-secondary)'"
          >{{ cat.name }}</button>
        </div>
      </div>

      <!-- Price range -->
      <div class="flex items-center gap-1.5">
        <span class="text-xs font-medium" style="color: var(--color-text-tertiary)">价格</span>
        <div class="flex gap-1">
          <button
            v-for="pr in priceRanges"
            :key="pr.value"
            @click="updateFilter('priceRange', pr.value)"
            class="rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
            :style="filters.priceRange === pr.value
              ? 'background-color: #171717; color: #ffffff'
              : 'background-color: var(--color-bg-subtle); color: var(--color-text-secondary)'"
          >{{ pr.label }}</button>
        </div>
      </div>

      <!-- Sort -->
      <div class="flex items-center gap-1.5">
        <span class="text-xs font-medium" style="color: var(--color-text-tertiary)">排序</span>
        <div class="flex gap-1">
          <button
            v-for="opt in sortOptions"
            :key="opt.field"
            @click="emit('toggle-sort', opt.field)"
            class="flex items-center gap-0.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors"
            :style="sortField === opt.field
              ? 'background-color: #171717; color: #ffffff'
              : 'background-color: var(--color-bg-subtle); color: var(--color-text-secondary)'"
          >
            {{ opt.label }}
            <svg v-if="sortField === opt.field" class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path v-if="sortOrder === 'asc'" stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Vendor chips -->
    <div class="flex flex-wrap items-center gap-1.5">
      <span class="text-xs font-medium" style="color: var(--color-text-tertiary)">厂商</span>
      <button
        v-for="vendor in vendors"
        :key="vendor.id"
        @click="emit('toggle-vendor', vendor.slug)"
        class="pill transition-colors"
        :style="filters.vendorSlugs.includes(vendor.slug)
          ? 'background-color: #171717; color: #ffffff'
          : 'background-color: var(--color-bg-subtle); color: var(--color-text-secondary)'"
      >{{ vendor.name }}</button>
    </div>

    <!-- Result count -->
    <div class="text-xs" style="color: var(--color-text-tertiary)">
      共 {{ totalPlans }} 个套餐
    </div>
  </div>
</template>
