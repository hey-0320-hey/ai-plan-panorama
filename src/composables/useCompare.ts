import { ref, computed } from 'vue'
import type { Plan, CompareItem } from '@/types/plan'

const MAX_COMPARE = 4
const compareItems = ref<CompareItem[]>([])

export function useCompare() {
  const compareCount = computed(() => compareItems.value.length)
  const comparePlans = computed(() => compareItems.value.map(i => i.plan))
  const isCompareFull = computed(() => compareItems.value.length >= MAX_COMPARE)

  function isInCompare(planId: string) {
    return compareItems.value.some(i => i.plan.id === planId)
  }

  function toggleCompare(plan: Plan) {
    const idx = compareItems.value.findIndex(i => i.plan.id === plan.id)
    if (idx >= 0) {
      compareItems.value.splice(idx, 1)
    } else if (compareItems.value.length < MAX_COMPARE) {
      compareItems.value.push({ plan, addedAt: Date.now() })
    }
  }

  function removeFromCompare(planId: string) {
    const idx = compareItems.value.findIndex(i => i.plan.id === planId)
    if (idx >= 0) compareItems.value.splice(idx, 1)
  }

  function clearCompare() {
    compareItems.value = []
  }

  return {
    compareItems, compareCount, comparePlans, isCompareFull,
    isInCompare, toggleCompare, removeFromCompare, clearCompare,
  }
}
