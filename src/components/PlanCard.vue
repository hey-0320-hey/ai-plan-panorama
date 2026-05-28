<script setup lang="ts">
import type { Plan } from '@/types/plan'
import { computed, inject } from 'vue'

const props = defineProps<{
  plan: Plan
  isInCompare: boolean
  canCompare: boolean
}>()

const emit = defineEmits<{
  'toggle-compare': [plan: Plan]
}>()

const isDark = inject('isDark', { value: false })

const statusMap: Record<string, { label: string; bg: string; text: string; darkBg: string; darkText: string }> = {
  on_sale:   { label: '在售', bg: '#ebf5ff', text: '#0068d6', darkBg: 'rgba(0,114,245,0.15)', darkText: '#60a5fa' },
  limited:   { label: '限售', bg: '#fff8e1', text: '#9a6700', darkBg: 'rgba(234,179,8,0.12)', darkText: '#fbbf24' },
  sold_out:  { label: '售罄', bg: '#ffebe9', text: '#cf222e', darkBg: 'rgba(239,68,68,0.12)', darkText: '#f87171' },
  stopped:   { label: '停售', bg: '#f6f6f6', text: '#666666', darkBg: 'rgba(255,255,255,0.06)', darkText: '#737373' },
}

function formatPrice(price: number, currency: string) {
  if (currency === 'USD') return '\$' + price
  return '¥' + price
}

function formatCredits(val: number | null) {
  if (val == null) return '—'
  if (val >= 10000) return (val / 10000).toFixed(val % 10000 === 0 ? 0 : 1) + '万'
  return val.toLocaleString()
}

const cardShadow = computed(() => {
  if (props.isInCompare) {
    return 'rgba(0,114,245,0.25) 0px 0px 0px 2px, rgba(0,114,245,0.08) 0px 2px 4px'
  }
  return isDark.value
    ? 'rgba(255,255,255,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.3) 0px 2px 4px'
    : 'rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.04) 0px 2px 4px'
})

const btnPrimaryStyle = computed(() => ({
  backgroundColor: isDark.value ? '#ededed' : '#171717',
  color: isDark.value ? '#0a0a0a' : '#ffffff',
}))

const categoryBadgeStyle = computed(() => ({
  backgroundColor: isDark.value ? 'rgba(0,114,245,0.15)' : '#ebf5ff',
  color: isDark.value ? '#60a5fa' : '#0068d6',
}))
</script>

<template>
  <article
    class="group relative flex flex-col rounded-lg p-4 transition-all"
    :style="{ boxShadow: cardShadow, backgroundColor: 'var(--color-surface)' }"
  >
    <!-- Header -->
    <div class="mb-3 flex items-start justify-between gap-2">
      <div class="min-w-0 flex-1">
        <h3 class="truncate text-sm font-semibold" style="color: var(--color-text)">{{ plan.name }}</h3>
        <p class="text-xs mt-0.5" style="color: var(--color-text-tertiary)">{{ plan.vendor?.name }}</p>
      </div>
      <span
        class="pill shrink-0"
        :style="{ backgroundColor: isDark ? statusMap[plan.status]?.darkBg : statusMap[plan.status]?.bg, color: isDark ? statusMap[plan.status]?.darkText : statusMap[plan.status]?.text }"
      >{{ statusMap[plan.status]?.label || plan.status }}</span>
    </div>

    <!-- Category badge -->
    <div class="mb-2">
      <span class="pill" :style="categoryBadgeStyle">{{ plan.category?.name || '' }}</span>
    </div>

    <!-- Price -->
    <div class="mb-3">
      <div class="flex items-baseline gap-1">
        <span class="text-xl font-semibold" style="color: var(--color-text)">{{ formatPrice(plan.price_monthly, plan.currency) }}</span>
        <span class="text-xs" style="color: var(--color-text-tertiary)">/月</span>
      </div>
      <div v-if="plan.price_yearly" class="text-xs mt-0.5" style="color: var(--color-accent-develop)">
        年付 ¥{{ plan.price_yearly }}/月
      </div>
    </div>

    <!-- Promo -->
    <div v-if="plan.promo_text" class="mb-2">
      <span class="pill" :style="{ backgroundColor: isDark ? 'rgba(234,179,8,0.12)' : '#fff8e1', color: isDark ? '#fbbf24' : '#9a6700' }">
        {{ plan.promo_text }}
      </span>
    </div>

    <!-- Credits -->
    <div class="mb-3 space-y-1.5 text-xs">
      <div v-if="plan.credits_5h != null" class="flex justify-between">
        <span style="color: var(--color-text-tertiary)">5小时额度</span>
        <span style="color: var(--color-text-secondary)">{{ formatCredits(plan.credits_5h) }} {{ plan.credits_unit }}</span>
      </div>
      <div v-if="plan.credits_weekly != null" class="flex justify-between">
        <span style="color: var(--color-text-tertiary)">周额度</span>
        <span style="color: var(--color-text-secondary)">{{ formatCredits(plan.credits_weekly) }} {{ plan.credits_unit }}</span>
      </div>
      <div v-if="plan.credits_monthly != null" class="flex justify-between">
        <span style="color: var(--color-text-tertiary)">月额度</span>
        <span class="font-medium" style="color: var(--color-text)">{{ formatCredits(plan.credits_monthly) }} {{ plan.credits_unit }}</span>
      </div>
    </div>

    <!-- Model count -->
    <div v-if="plan.model_count" class="mb-3 text-xs" style="color: var(--color-text-tertiary)">
      {{ plan.model_count }} 个模型可用
    </div>

    <!-- Features note -->
    <div v-if="plan.features_json?.note" class="mb-3 text-xs italic" style="color: var(--color-text-tertiary)">
      {{ plan.features_json.note }}
    </div>

    <!-- Actions -->
    <div class="mt-auto flex items-center gap-2 pt-2">
      <a
        v-if="plan.affiliate_url || plan.vendor?.website_url"
        :href="plan.affiliate_url ?? plan.vendor?.website_url ?? undefined"
        target="_blank"
        rel="noopener noreferrer"
        class="flex-1 rounded-md px-3 py-1.5 text-center text-xs font-medium transition-colors"
        :style="btnPrimaryStyle"
      >查看详情</a>
      <button
        @click="emit('toggle-compare', plan)"
        :disabled="!canCompare && !isInCompare"
        class="flex-1 rounded-md px-3 py-1.5 text-center text-xs font-medium transition-colors disabled:opacity-30"
        :style="isInCompare
          ? 'background-color: #0072f5; color: #ffffff'
          : 'background-color: var(--color-bg-subtle); color: var(--color-text-secondary)'"
      >
        {{ isInCompare ? '✓ 已加入' : '+ 对比' }}
      </button>
    </div>
  </article>
</template>
