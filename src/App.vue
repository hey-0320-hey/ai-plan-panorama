<script setup lang="ts">
import { ref, onMounted, computed, provide } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'

const isDark = ref(false)

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('ai-plan-theme', isDark.value ? 'dark' : 'light')
}

onMounted(() => {
  const pref = localStorage.getItem('ai-plan-theme') || 'system'
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  isDark.value = pref === 'dark' || (pref !== 'light' && prefersDark)
  document.documentElement.classList.toggle('dark', isDark.value)
})

const route = useRoute()

provide('isDark', isDark)

const navItems = [
  { path: '/', label: '首页' },
  { path: '/compare', label: '套餐对比' },
  { path: '/calculator', label: '性价比计算' },
  { path: '/advice', label: '选购建议' },
  { path: '/about', label: '关于' },
]

const headerBg = computed(() => isDark.value ? 'rgba(10,10,10,0.85)' : 'rgba(255,255,255,0.85)')
const heroBg = computed(() => isDark.value ? '#ededed' : '#171717')
const heroText = computed(() => isDark.value ? '#0a0a0a' : '#ffffff')
const heroSubtext = computed(() => isDark.value ? '#525252' : '#a1a1a1')
const btnPrimary = computed(() => isDark.value ? '#ededed' : '#171717')
const btnPrimaryText = computed(() => isDark.value ? '#0a0a0a' : '#ffffff')
</script>

<template>
  <div class="min-h-screen transition-colors" style="background-color: var(--color-surface); color: var(--color-text)">
    <!-- Header -->
    <header class="sticky top-0 z-40 backdrop-blur-md transition-all" :style="{ boxShadow: isDark ? 'rgba(255,255,255,0.06) 0px 0px 0px 1px' : 'rgba(0,0,0,0.08) 0px 0px 0px 1px', backgroundColor: headerBg }">
      <div class="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3">
        <RouterLink to="/" class="flex items-center gap-2 text-base font-semibold" style="color: var(--color-accent-develop)">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
          </svg>
          <span>AI Plan 全景</span>
        </RouterLink>

        <nav class="hidden items-center gap-0.5 sm:flex">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
            :style="route.path === item.path
              ? 'background-color: #ebf5ff; color: #0072f5'
              : 'color: var(--color-text-secondary)'"
          >
            {{ item.label }}
          </RouterLink>
        </nav>

        <div class="flex items-center gap-2">
          <button
            @click="toggleTheme"
            class="rounded-md p-2 transition-colors"
            style="color: var(--color-text-tertiary)"
            :title="isDark ? '切换浅色模式' : '切换深色模式'"
          >
            <svg v-if="isDark" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
            </svg>
            <svg v-else class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
            </svg>
          </button>

          <!-- Mobile menu -->
          <div class="sm:hidden relative group">
            <button class="rounded-md p-2" style="color: var(--color-text-tertiary)">
              <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <div class="absolute right-0 top-full mt-1 hidden w-36 rounded-lg py-1 group-hover:block" :style="{ backgroundColor: 'var(--color-surface)', boxShadow: 'rgba(0,0,0,0.08) 0px 0px 0px 1px, rgba(0,0,0,0.12) 0px 4px 12px' }">
              <RouterLink
                v-for="item in navItems"
                :key="item.path"
                :to="item.path"
                class="block px-3 py-2 text-sm transition-colors"
                style="color: var(--color-text-secondary)"
              >{{ item.label }}</RouterLink>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main content -->
    <main class="mx-auto max-w-[1400px] px-5 py-8">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="mt-16 py-8 transition-colors" style="border-top: 1px solid var(--color-border)">
      <div class="mx-auto max-w-[1400px] px-5 text-center text-xs" style="color: var(--color-text-tertiary)">
        数据来源于公开渠道，仅供参考。价格及套餐信息可能随时变动，请以官方为准。
      </div>
    </footer>
  </div>
</template>
