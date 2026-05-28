<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCompare } from '@/composables/useCompare'
import { inject , type Ref } from 'vue'

const router = useRouter()
const { compareItems, compareCount, clearCompare, removeFromCompare } = useCompare()
const isDark = inject('isDark') as Ref<boolean>

function goToCompare() {
  router.push('/compare')
}
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="compareCount > 0"
      class="fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md"
      :style="{ backgroundColor: isDark ? 'rgba(10,10,10,0.95)' : 'rgba(255,255,255,0.95)', boxShadow: isDark ? 'rgba(255,255,255,0.06) 0px 0px 0px 1px' : 'rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px -2px 8px' }"
    >
      <div class="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3">
        <div class="flex items-center gap-2 overflow-x-auto">
          <span class="shrink-0 text-sm font-medium" style="color: var(--color-text-secondary)">
            已选 {{ compareCount }}/4
          </span>
          <div class="flex gap-1.5">
            <span
              v-for="item in compareItems"
              :key="item.plan.id"
              class="pill inline-flex shrink-0 items-center gap-1"
              :style="{ backgroundColor: isDark ? 'rgba(0,114,245,0.15)' : '#ebf5ff', color: isDark ? '#60a5fa' : '#0068d6' }"
            >
              {{ item.plan.vendor?.name }} · {{ item.plan.name }}
              <button @click="removeFromCompare(item.plan.id)" class="ml-0.5 rounded-full p-0.5 transition-colors" >
                <svg class="h-3 w-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          </div>
        </div>
        <div class="flex shrink-0 items-center gap-2">
          <button @click="clearCompare" class="rounded-md px-3 py-1.5 text-xs font-medium" style="color: var(--color-text-tertiary)">清空</button>
          <button @click="goToCompare" :disabled="compareCount < 2" class="rounded-md px-4 py-1.5 text-xs font-medium text-white transition-colors disabled:opacity-30" :style="{ backgroundColor: isDark ? '#ededed' : '#171717', color: isDark ? '#0a0a0a' : '#ffffff' }">开始对比 ({{ compareCount }})</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.25s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
