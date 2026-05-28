<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCompare } from '@/composables/useCompare'
import CompareTable from '@/components/CompareTable.vue'

const router = useRouter()
const { comparePlans, compareCount, clearCompare, removeFromCompare } = useCompare()
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold tracking-tight" style="color: var(--color-text); letter-spacing: -0.02em">套餐对比</h1>
        <p class="mt-1 text-sm" style="color: var(--color-text-tertiary)">并排查看多个套餐的详细参数，绿色高亮为该维度最优值</p>
      </div>
      <button
        @click="router.push('/')"
        class="rounded-md px-4 py-2 text-xs font-medium transition-colors"
        style="background-color: var(--color-bg-subtle); color: var(--color-text-secondary)"
      >← 返回首页</button>
    </div>

    <!-- Not enough plans -->
    <div v-if="compareCount < 2" class="rounded-lg p-16 text-center" style="background-color: var(--color-surface); box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px">
      <svg class="mx-auto mb-4 h-12 w-12" style="color: var(--color-text-tertiary)" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
      <p class="mb-3 text-sm" style="color: var(--color-text-secondary)">请至少选择 2 个套餐进行对比</p>
      <button
        @click="router.push('/')"
        class="rounded-md px-4 py-2 text-xs font-medium text-white"
        style="background-color: #171717"
      >去首页选择套餐</button>
    </div>

    <!-- Compare table -->
    <div v-else>
      <div class="mb-4 flex flex-wrap gap-1.5">
        <span
          v-for="plan in comparePlans"
          :key="plan.id"
          class="pill inline-flex items-center gap-1"
          style="background-color: #ebf5ff; color: #0068d6"
        >
          {{ plan.vendor?.name }} · {{ plan.name }}
          <button @click="removeFromCompare(plan.id)" class="ml-0.5 rounded-full p-0.5 hover:bg-blue-200">
            <svg class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </span>
        <button
          @click="clearCompare(); router.push('/')"
          class="pill transition-colors"
          style="background-color: var(--color-bg-subtle); color: var(--color-text-tertiary)"
        >清空全部</button>
      </div>

      <CompareTable :plans="comparePlans" />
    </div>
  </div>
</template>
