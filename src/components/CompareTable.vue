<script setup lang="ts">
import type { Plan } from '@/types/plan'

const props = defineProps<{
  plans: Plan[]
}>()

function formatPrice(price: number, currency: string) {
  if (currency === 'USD') return '\$' + price
  return '¥' + price
}

function formatCredits(val: number | null) {
  if (val == null) return '—'
  if (val >= 10000) return (val / 10000).toFixed(val % 10000 === 0 ? 0 : 1) + '万'
  return val.toLocaleString()
}

function getHighlightStyle(values: (number | null | undefined)[], index: number, lowerIsBetter = true) {
  const nums = values.map(v => v ?? Infinity)
  const validNums = nums.filter(n => n !== Infinity && n > 0)
  if (validNums.length < 2) return ''
  const best = lowerIsBetter ? Math.min(...validNums) : Math.max(...validNums)
  if (nums[index] === best) return 'background-color: #ecfdf5; color: #047857; font-weight: 600'
  return ''
}
</script>

<template>
  <div class="overflow-x-auto rounded-lg" style="background-color: var(--color-surface); box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px">
    <table class="w-full min-w-[600px] text-sm">
      <thead>
        <tr style="border-bottom: 1px solid var(--color-border)">
          <th class="sticky left-0 px-4 py-3 text-left text-xs font-medium" style="background-color: var(--color-bg-subtle); color: var(--color-text-tertiary)">维度</th>
          <th
            v-for="plan in plans"
            :key="plan.id"
            class="px-4 py-3 text-center text-xs font-medium"
          >
            <div style="color: var(--color-accent-develop)">{{ plan.vendor?.name }}</div>
            <div class="mt-0.5" style="color: var(--color-text)">{{ plan.name }}</div>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Status -->
        <tr style="border-bottom: 1px solid var(--color-border)">
          <td class="sticky left-0 px-4 py-2.5 text-xs" style="background-color: var(--color-surface); color: var(--color-text-tertiary)">状态</td>
          <td v-for="plan in plans" :key="plan.id" class="px-4 py-2.5 text-center text-xs">
            <span class="pill" :style="{
              backgroundColor: plan.status === 'on_sale' ? '#ebf5ff' : plan.status === 'limited' ? '#fff8e1' : plan.status === 'sold_out' ? '#ffebe9' : '#f6f6f6',
              color: plan.status === 'on_sale' ? '#0068d6' : plan.status === 'limited' ? '#9a6700' : plan.status === 'sold_out' ? '#cf222e' : '#666666'
            }">{{ plan.status === 'on_sale' ? '在售' : plan.status === 'limited' ? '限售' : plan.status === 'sold_out' ? '售罄' : '停售' }}</span>
          </td>
        </tr>
        <!-- Price monthly -->
        <tr style="border-bottom: 1px solid var(--color-border)">
          <td class="sticky left-0 px-4 py-2.5 text-xs" style="background-color: var(--color-surface); color: var(--color-text-tertiary)">月价</td>
          <td v-for="(plan, i) in plans" :key="plan.id" class="px-4 py-2.5 text-center text-xs" :style="getHighlightStyle(plans.map(p => p.currency === 'USD' ? p.price_monthly * 7.2 : p.price_monthly), i)">{{ formatPrice(plan.price_monthly, plan.currency) }}/月</td>
        </tr>
        <!-- Price yearly -->
        <tr style="border-bottom: 1px solid var(--color-border)">
          <td class="sticky left-0 px-4 py-2.5 text-xs" style="background-color: var(--color-surface); color: var(--color-text-tertiary)">年付折合月价</td>
          <td v-for="(plan, i) in plans" :key="plan.id" class="px-4 py-2.5 text-center text-xs" :style="plan.price_yearly ? getHighlightStyle(plans.map(p => p.price_yearly ?? undefined), i) : ''">{{ plan.price_yearly ? formatPrice(plan.price_yearly, plan.currency) + '/月' : '—' }}</td>
        </tr>
        <!-- Credits 5h -->
        <tr style="border-bottom: 1px solid var(--color-border)">
          <td class="sticky left-0 px-4 py-2.5 text-xs" style="background-color: var(--color-surface); color: var(--color-text-tertiary)">5小时额度</td>
          <td v-for="(plan, i) in plans" :key="plan.id" class="px-4 py-2.5 text-center text-xs" :style="getHighlightStyle(plans.map(p => p.credits_5h), i, false)">{{ formatCredits(plan.credits_5h) }} {{ plan.credits_unit }}</td>
        </tr>
        <!-- Credits weekly -->
        <tr style="border-bottom: 1px solid var(--color-border)">
          <td class="sticky left-0 px-4 py-2.5 text-xs" style="background-color: var(--color-surface); color: var(--color-text-tertiary)">周额度</td>
          <td v-for="(plan, i) in plans" :key="plan.id" class="px-4 py-2.5 text-center text-xs" :style="getHighlightStyle(plans.map(p => p.credits_weekly), i, false)">{{ formatCredits(plan.credits_weekly) }} {{ plan.credits_unit }}</td>
        </tr>
        <!-- Credits monthly -->
        <tr style="border-bottom: 1px solid var(--color-border)">
          <td class="sticky left-0 px-4 py-2.5 text-xs" style="background-color: var(--color-surface); color: var(--color-text-tertiary)">月额度</td>
          <td v-for="(plan, i) in plans" :key="plan.id" class="px-4 py-2.5 text-center text-xs" :style="getHighlightStyle(plans.map(p => p.credits_monthly), i, false)">{{ formatCredits(plan.credits_monthly) }} {{ plan.credits_unit }}</td>
        </tr>
        <!-- Model count -->
        <tr style="border-bottom: 1px solid var(--color-border)">
          <td class="sticky left-0 px-4 py-2.5 text-xs" style="background-color: var(--color-surface); color: var(--color-text-tertiary)">可用模型数</td>
          <td v-for="(plan, i) in plans" :key="plan.id" class="px-4 py-2.5 text-center text-xs" :style="getHighlightStyle(plans.map(p => p.model_count), i, false)">{{ plan.model_count || '—' }}</td>
        </tr>
        <!-- Category -->
        <tr style="border-bottom: 1px solid var(--color-border)">
          <td class="sticky left-0 px-4 py-2.5 text-xs" style="background-color: var(--color-surface); color: var(--color-text-tertiary)">类型</td>
          <td v-for="plan in plans" :key="plan.id" class="px-4 py-2.5 text-center text-xs" style="color: var(--color-text-secondary)">{{ plan.category?.name || '—' }}</td>
        </tr>
        <!-- Features note -->
        <tr v-if="plans.some(p => p.features_json?.note)">
          <td class="sticky left-0 px-4 py-2.5 text-xs" style="background-color: var(--color-surface); color: var(--color-text-tertiary)">备注</td>
          <td v-for="plan in plans" :key="plan.id" class="px-4 py-2.5 text-center text-xs" style="color: var(--color-text-tertiary)">{{ plan.features_json?.note || '—' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
