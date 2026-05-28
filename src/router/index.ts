import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomePage.vue'),
    },
    {
      path: '/compare',
      name: 'compare',
      component: () => import('@/views/ComparePage.vue'),
    },
    {
      path: '/calculator',
      name: 'calculator',
      component: () => import('@/views/CalculatorPage.vue'),
    },
    {
      path: '/advice',
      name: 'advice',
      component: () => import('@/views/AdvicePage.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutPage.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
