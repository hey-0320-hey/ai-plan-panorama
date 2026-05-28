<script setup lang="ts">
const scenarios = [
  {
    title: '轻度体验用户',
    icon: '🌱',
    description: '偶尔使用 AI 辅助，月请求量 < 1,000 次',
    recommendations: [
      { vendor: '讯飞星火', plan: '无忧版', price: '¥3.9/月', reason: '价格极低，请求次数不限，适合轻度尝鲜' },
      { vendor: '阶跃星辰', plan: 'Flash Mini', price: '¥9.9/月', reason: '入门级价格，4,200次/月额度够用' },
      { vendor: 'MiniMax', plan: 'Starter', price: '¥29/月', reason: '600次/5小时，灵活按需使用' },
    ],
  },
  {
    title: '日常开发者',
    icon: '💻',
    description: '每天使用 AI 编程辅助，月请求量 1,000 - 10,000 次',
    recommendations: [
      { vendor: '讯飞星火', plan: '专业版', price: '¥39/月', reason: '18,000次/月额度，性价比高' },
      { vendor: '百度千帆', plan: 'Lite', price: '¥40/月', reason: '7个模型可选，18,000次/月' },
      { vendor: '智谱', plan: 'Lite', price: '¥49/月 (年付¥39)', reason: '400 prompts/周，包年更划算' },
    ],
  },
  {
    title: '重度用户 / 小团队',
    icon: '🚀',
    description: '高频使用，月请求量 10,000 - 50,000 次',
    recommendations: [
      { vendor: '火山方舟', plan: 'Pro', price: '¥200/月', reason: '90,000次/月，12个模型可用' },
      { vendor: '讯飞星火', plan: '高效版', price: '¥199/月', reason: '90,000次/月，13个模型' },
      { vendor: '优云智算', plan: 'Pro 增强版', price: '¥499/月', reason: '19,000次/月但单价低，5个模型' },
    ],
  },
  {
    title: '企业 / 大规模调用',
    icon: '🏢',
    description: '团队协作或大批量 API 调用，月请求量 > 50,000 次',
    recommendations: [
      { vendor: '阿里云百炼', plan: '尊享坐席', price: '¥1,398/月', reason: '250,000 Credits/月，15个模型，企业级支持' },
      { vendor: '火山方舟', plan: 'Agent Max', price: '¥1,000/月', reason: '500,000 AFP/月，含视觉额度' },
      { vendor: '腾讯云', plan: 'Max', price: '¥659/月', reason: '820亿Tokens/月，6个模型' },
    ],
  },
]
</script>

<template>
  <div class="space-y-8">
    <div>
      <h1 class="text-xl font-semibold tracking-tight" style="color: var(--color-text); letter-spacing: -0.02em">选购建议</h1>
      <p class="mt-1 text-sm" style="color: var(--color-text-tertiary)">根据你的使用场景和预算，选择最合适的套餐方案</p>
    </div>

    <div
      v-for="scenario in scenarios"
      :key="scenario.title"
      class="rounded-lg p-6"
      style="background-color: var(--color-surface); box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px"
    >
      <div class="mb-4 flex items-center gap-3">
        <span class="text-2xl">{{ scenario.icon }}</span>
        <div>
          <h2 class="text-sm font-semibold" style="color: var(--color-text)">{{ scenario.title }}</h2>
          <p class="text-xs" style="color: var(--color-text-tertiary)">{{ scenario.description }}</p>
        </div>
      </div>

      <div class="space-y-2">
        <div
          v-for="(rec, i) in scenario.recommendations"
          :key="i"
          class="flex items-start gap-3 rounded-md p-3"
          style="background-color: var(--color-bg-subtle)"
        >
          <span class="shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
            :style="i === 0 ? 'background-color: #171717; color: #ffffff' : 'background-color: var(--color-border); color: var(--color-text-tertiary)'"
          >{{ i + 1 }}</span>
          <div class="min-w-0 flex-1">
            <div class="flex items-baseline gap-2 text-sm">
              <span class="font-semibold" style="color: var(--color-text)">{{ rec.vendor }}</span>
              <span style="color: var(--color-text-tertiary)">·</span>
              <span style="color: var(--color-accent-develop)">{{ rec.plan }}</span>
              <span class="ml-auto shrink-0 font-medium" style="color: var(--color-text)">{{ rec.price }}</span>
            </div>
            <p class="mt-0.5 text-xs" style="color: var(--color-text-tertiary)">{{ rec.reason }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tips -->
    <div class="rounded-lg p-6" style="background-color: #fff8e1; box-shadow: rgba(0,0,0,0.05) 0px 0px 0px 1px">
      <h3 class="mb-2 text-sm font-semibold" style="color: #9a6700">💡 选购小贴士</h3>
      <ul class="space-y-1.5 text-xs" style="color: #7c5800">
        <li>• 注意额度单位差异：不同厂商使用「次」「Credits」「AFP」「亿Tokens」等不同计量方式</li>
        <li>• 关注5小时/周限额：部分套餐虽然月总额度高，但短时窗口有限制</li>
        <li>• 年付通常有折扣：如果确定长期使用，年付可节省 15%-20%</li>
        <li>• 首月优惠要留意：部分厂商提供首月特价，续费恢复原价</li>
        <li>• 使用性价比计算器精确对比：输入你的实际用量，获得个性化推荐</li>
      </ul>
    </div>
  </div>
</template>
