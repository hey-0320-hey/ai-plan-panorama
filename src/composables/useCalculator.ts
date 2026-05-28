import { ref, computed } from 'vue'
import type { Plan } from '@/types/plan'

export interface CalcResult {
  plan: Plan
  monthlyCost: number
  effectivePrice: number   // price per request
  remainingCredits: number | null
  isOverQuota: boolean
}

export function useCalculator() {
  const monthlyRequests = ref(1000)
  const selectedCategorySlug = ref('')

  function calculate(plans: Plan[]): CalcResult[] {
    return plans
      .filter(p => p.status !== 'stopped')
      .map(plan => {
        const creditsMonthly = plan.credits_monthly
        const priceCNY = plan.currency === 'USD' ? plan.price_monthly * 7.2 : plan.price_monthly

        if (creditsMonthly != null && creditsMonthly > 0) {
          const isOverQuota = monthlyRequests.value > creditsMonthly
          const effectivePrice = priceCNY / Math.min(monthlyRequests.value, creditsMonthly)
          const remaining = creditsMonthly - monthlyRequests.value
          return {
            plan,
            monthlyCost: priceCNY,
            effectivePrice,
            remainingCredits: remaining < 0 ? 0 : remaining,
            isOverQuota,
          }
        }

        // Unlimited or unknown quota
        return {
          plan,
          monthlyCost: priceCNY,
          effectivePrice: priceCNY / monthlyRequests.value,
          remainingCredits: null,
          isOverQuota: false,
        }
      })
      .sort((a, b) => a.effectivePrice - b.effectivePrice)
  }

  return {
    monthlyRequests, selectedCategorySlug,
    calculate,
  }
}
