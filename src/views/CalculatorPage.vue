<script setup lang="ts">
import { onMounted, computed, inject , type Ref } from 'vue'
import { usePlans } from '@/composables/usePlans'
import { useCalculator } from '@/composables/useCalculator'

const { plans, loading, fetchData } = usePlans()
const { monthlyRequests, calculate } = useCalculator()
const isDark = inject('isDark') as Ref<boolean>

onMounted(fetchData)

const results = computed(() => calculate(plans.value))

function formatPrice(price: number) {
  return '¥' + price.toFixed(4)
}

function getRankStyle(index: number) {
  if (index === 0) return isDark.value
    ? 'background-color: rgba(4,120,87,0.12); box-shadow: rgba(4,120,87,0.2) 0px 0px 0px 1px'
    : 'background-color: #ecfdf5; box-shadow: rgba(4,120,87,0.15) 0px 0px 0px 1px'
  if (index === 1) return isDark.value
    ? 'background-color: rgba(37,99,235,0.1); box-shadow: rgba(37,99,235,0.15) 0px 0px 0px 1px'
    : 'background-color: #eff6ff; box-shadow: rgba(37,99,235,0.12) 0px 0px 0px 1px'
  if (index === 2) return isDark.value
    ? 'background-color: rgba(14,165,233,0.08); box-shadow: rgba(14,165,233,0.12) 0px 0px 0px 1px'
    : 'background-color: #f0f9ff; box-shadow: rgba(14,165,233,0.12) 0px 0px 0px 1px'
  return isDark.value
    ? 'background-color: var(--color-surface); box-shadow: rgba(255,255,255,0.06) 0px 0px 0px 1px'
    : 'background-color: var(--color-surface); box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px'
}
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-xl font-semibold tracking-tight" style="color: var(--color-text); letter-spacing: -0.02em">性价比计算器</h1>
      <p class="mt-1 text-sm" style="color: var(--color-text-tertiary)">输入你的月均使用量，自动计算每个套餐的单次请求成本，按性价比排序</p>
    </div>

    <!-- Input -->
    <div class="rounded-lg p-6" :style="{ backgroundColor: 'var(--color-surface)', boxShadow: isDark ? 'rgba(255,255,255,0.06) 0px 0px 0px 1px' : 'rgba(0,0,0,0.08) 0px 0px 0px 1px' }">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div class="flex-1">
          <label class="mb-1.5 block text-sm font-medium" style="color: var(--color-text-secondary)">预计每月请求次数</label>
          <input v-model.number="monthlyRequests" type="number" min="1" class="w-full rounded-md px-4 py-2.5 text-sm outline-none focus:ring-2" style="background-color: var(--color-bg-subtle); border: 1px solid var(--color-border); --tw-ring-color: rgba(0,114,245,0.3); color: var(--color-text)" />
        </div>
        <div class="text-sm" style="color: var(--color-text-tertiary)">
          当前设定：<span class="font-medium" style="color: var(--color-text)">{{ monthlyRequests.toLocaleString() }}</span> 次/月
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <div class="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-gray-800"></div>
    </div>

    <!-- Results -->
    <div v-else class="space-y-3">
      <div class="text-xs" style="color: var(--color-text-tertiary)">
        共 {{ results.length }} 个套餐，按单次请求成本从低到高排列
      </div>

      <div v-for="(result, index) in results" :key="result.plan.id" class="rounded-lg p-4 transition-all" :style="getRankStyle(index)">
        <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div class="flex items-center gap-3">
            <span class="shrink-0 text-xs font-bold" :style="index < 3 ? 'color: #047857' : 'color: var(--color-text-tertiary)'">
              {{ index === 0 ? '🏆' : index === 1 ? '🥈' : index === 2 ? '🥉' : '#' + (index + 1) }}
            </span>
            <div>
              <div class="text-sm font-semibold" style="color: var(--color-text)">{{ result.plan.vendor?.name }} · {{ result.plan.name }}</div>
              <div class="mt-0.5 flex items-center gap-2 text-xs" style="color: var(--color-text-tertiary)">
                <span>{{ result.plan.category?.name }}</span>
                <span v-if="result.plan.model_count">{{ result.plan.model_count }} 模型</span>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-6 text-sm">
            <div class="text-center">
              <div class="text-xs" style="color: var(--color-text-tertiary)">月费</div>
              <div class="font-semibold" style="color: var(--color-text)">{{ result.plan.currency === 'USD' ? '\$' : '¥' }}{{ result.plan.price_monthly }}</div>
            </div>
            <div class="text-center">
              <div class="text-xs" style="color: var(--color-text-tertiary)">单次成本</div>
              <div class="font-semibold" :style="index === 0 ? 'color: #047857' : 'color: var(--color-text)'">{{ formatPrice(result.effectivePrice) }}</div>
            </div>
            <div class="text-center">
              <div class="text-xs" style="color: var(--color-text-tertiary)">剩余额度</div>
              <div class="font-semibold" :style="result.isOverQuota ? 'color: #cf222e' : 'color: var(--color-text)'">
                <template v-if="result.remainingCredits !== null">{{ result.isOverQuota ? '超出 ' + (monthlyRequests - (result.plan.credits_monthly || 0)) + ' 次' : result.remainingCredits.toLocaleString() + ' 次' }}</template>
                <template v-else>不限</template>
              </div>
            </div>
          </div>
        </div>

        <div v-if="result.isOverQuota" class="mt-2 rounded-md px-3 py-1.5 text-xs" :style="{ backgroundColor: isDark ? 'rgba(239,68,68,0.12)' : '#ffebe9', color: isDark ? '#f87171' : '#cf222e' }">
          ⚠️ 月请求量超出套餐额度，超出部分可能按量计费，实际花费可能更高
        </div>
      </div>
    </div>
  </div>
</template>
