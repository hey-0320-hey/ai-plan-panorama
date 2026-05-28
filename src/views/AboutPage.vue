<script setup lang="ts">
</script>

<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <div>
      <h1 class="text-xl font-semibold tracking-tight" style="color: var(--color-text); letter-spacing: -0.02em">关于 AI Plan 全景</h1>
      <p class="mt-2 text-sm leading-relaxed" style="color: var(--color-text-secondary)">
        AI Plan 全景是一个开源的 AI 套餐价格对比平台，致力于帮助开发者和企业快速找到最具性价比的大模型订阅方案。
      </p>
    </div>

    <div class="space-y-4">
      <div class="rounded-lg p-5" style="background-color: var(--color-surface); box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px">
        <h2 class="mb-2 text-sm font-semibold" style="color: var(--color-text)">🎯 项目目标</h2>
        <ul class="space-y-1.5 text-sm" style="color: var(--color-text-secondary)">
          <li>• 聚合全网主流大模型厂商的套餐定价信息</li>
          <li>• 提供直观的对比工具，降低选型决策成本</li>
          <li>• 实时跟踪价格变动，确保数据时效性</li>
          <li>• 开放透明，社区驱动维护</li>
        </ul>
      </div>

      <div class="rounded-lg p-5" style="background-color: var(--color-surface); box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px">
        <h2 class="mb-2 text-sm font-semibold" style="color: var(--color-text)">📊 数据来源</h2>
        <ul class="space-y-1.5 text-sm" style="color: var(--color-text-secondary)">
          <li>• 各厂商官网公开的定价页面</li>
          <li>• 用户反馈和社区贡献</li>
          <li>• 定期人工审核校验</li>
        </ul>
        <p class="mt-3 text-xs" style="color: var(--color-text-tertiary)">
          数据来源于公开渠道，仅供参考。价格及套餐信息可能随时变动，请以官方为准。
        </p>
      </div>

      <div class="rounded-lg p-5" style="background-color: var(--color-surface); box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px">
        <h2 class="mb-2 text-sm font-semibold" style="color: var(--color-text)">🛠 技术栈</h2>
        <div class="grid grid-cols-2 gap-2 text-sm" style="color: var(--color-text-secondary)">
          <div>前端框架：<span class="font-medium">Vue 3 + TypeScript</span></div>
          <div>构建工具：<span class="font-medium">Vite</span></div>
          <div>样式方案：<span class="font-medium">Tailwind CSS</span></div>
          <div>数据后端：<span class="font-medium">Supabase</span></div>
          <div>部署平台：<span class="font-medium">Vercel</span></div>
          <div>设计系统：<span class="font-medium">Vercel Design</span></div>
        </div>
      </div>

      <div class="rounded-lg p-5" style="background-color: var(--color-surface); box-shadow: rgba(0,0,0,0.08) 0px 0px 0px 1px">
        <h2 class="mb-3 text-sm font-semibold" style="color: var(--color-text)">🗺 发展路线</h2>
        <div class="space-y-2.5">
          <div class="flex items-center gap-3">
            <span class="pill" style="background-color: #ecfdf5; color: #047857">已完成</span>
            <span class="text-sm" style="color: var(--color-text-secondary)">Token Plan / Coding Plan 套餐展示与对比</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="pill" style="background-color: #ecfdf5; color: #047857">已完成</span>
            <span class="text-sm" style="color: var(--color-text-secondary)">性价比计算器</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="pill" style="background-color: #eff6ff; color: #2563eb">进行中</span>
            <span class="text-sm" style="color: var(--color-text-secondary)">Supabase CMS 后台数据管理</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="pill" style="background-color: var(--color-bg-subtle); color: var(--color-text-tertiary)">规划中</span>
            <span class="text-sm" style="color: var(--color-text-secondary)">Chat 会员（ChatGPT Plus / Claude Pro 等）对比</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="pill" style="background-color: var(--color-bg-subtle); color: var(--color-text-tertiary)">规划中</span>
            <span class="text-sm" style="color: var(--color-text-secondary)">爬虫自动采集 + 价格变动提醒</span>
          </div>
          <div class="flex items-center gap-3">
            <span class="pill" style="background-color: var(--color-bg-subtle); color: var(--color-text-tertiary)">规划中</span>
            <span class="text-sm" style="color: var(--color-text-secondary)">用户评价系统</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
