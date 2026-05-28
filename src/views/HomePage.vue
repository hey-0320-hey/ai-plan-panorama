<script setup lang="ts">
import { onMounted, inject , type Ref } from 'vue'
import { usePlans } from '@/composables/usePlans'
import { useCompare } from '@/composables/useCompare'
import FilterBar from '@/components/FilterBar.vue'
import PlanCard from '@/components/PlanCard.vue'
import CompareTray from '@/components/CompareTray.vue'

const {
  categories, announcements,
  loading, filters, sortField, sortOrder,
  filteredPlans, plansByVendor, activeVendors,
  fetchData, setFilter, toggleSort,
} = usePlans()

const { isInCompare, isCompareFull, toggleCompare } = useCompare()
const isDark = inject('isDark') as Ref<boolean>

function handleToggleVendor(slug: string) {
  const current = filters.value.vendorSlugs
  const next = current.includes(slug)
    ? current.filter((s: string) => s !== slug)
    : [...current, slug]
  setFilter('vendorSlugs', next)
}

onMounted(fetchData)
</script>

<template>
  <div class="space-y-6">
    <!-- Hero -->
    <div class="rounded-lg p-8 sm:p-10" :style="{ backgroundColor: isDark ? '#ededed' : '#171717', color: isDark ? '#0a0a0a' : '#ffffff' }">
      <h1 class="text-3xl font-semibold tracking-tight sm:text-4xl" style="letter-spacing: -0.03em">AI Plan 全景</h1>
      <p class="mt-3 text-sm leading-relaxed sm:text-base" :style="{ color: isDark ? '#525252' : '#a1a1a1' }">全网最全的 AI 套餐信息，一站式对比 Token Plan、Coding Plan、Agent Plan 定价与额度</p>
      <div class="mt-4 flex gap-2">
        <span class="pill" :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)', color: isDark ? '#525252' : '#ededed' }">{{ filteredPlans.length }} 个套餐</span>
        <span class="pill" :style="{ backgroundColor: isDark ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.1)', color: isDark ? '#525252' : '#ededed' }">{{ activeVendors.length }} 家厂商</span>
      </div>
    </div>

    <!-- Announcements -->
    <div v-if="announcements.length > 0" class="space-y-2">
      <div
        v-for="ann in announcements"
        :key="ann.id"
        class="flex items-center gap-2 rounded-md px-4 py-2.5 text-sm"
        :style="{ backgroundColor: isDark ? 'rgba(234,179,8,0.1)' : '#fff8e1', color: isDark ? '#fbbf24' : '#9a6700', boxShadow: isDark ? 'rgba(255,255,255,0.04) 0px 0px 0px 1px' : 'rgba(0,0,0,0.05) 0px 0px 0px 1px' }"
      >
        <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <span>{{ ann.content }}</span>
      </div>
    </div>

    <!-- Filters -->
    <FilterBar
      :filters="filters"
      :vendors="activeVendors"
      :categories="categories"
      :sort-field="sortField"
      :sort-order="sortOrder"
      :total-plans="filteredPlans.length"
      @update:filters="(f: any) => Object.assign(filters, f)"
      @toggle-sort="toggleSort"
      @toggle-vendor="handleToggleVendor"
    />

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <div class="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800"></div>
    </div>

    <!-- Plans by vendor -->
    <div v-else class="space-y-8">
      <div v-for="group in plansByVendor" :key="group.vendor.id">
        <div class="mb-3 flex items-center gap-3">
          <h2 class="text-sm font-semibold" style="color: var(--color-text)">{{ group.vendor.name }}</h2>
          <span class="text-xs" style="color: var(--color-text-tertiary)">{{ group.plans.length }} 个套餐</span>
          <a
            v-if="group.vendor.website_url"
            :href="group.vendor.website_url"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs transition-colors hover:underline"
            style="color: var(--color-accent-develop)"
          >官网 ↗</a>
        </div>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <PlanCard
            v-for="plan in group.plans"
            :key="plan.id"
            :plan="plan"
            :is-in-compare="isInCompare(plan.id)"
            :can-compare="!isCompareFull || isInCompare(plan.id)"
            @toggle-compare="toggleCompare"
          />
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="plansByVendor.length === 0" class="py-16 text-center" style="color: var(--color-text-tertiary)">
        <svg class="mx-auto mb-3 h-10 w-10" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <p class="text-sm">没有找到匹配的套餐，试试调整筛选条件</p>
      </div>
    </div>

    <!-- Compare tray -->
    <CompareTray />
  </div>
</template>
