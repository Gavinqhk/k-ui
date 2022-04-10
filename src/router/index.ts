import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Index from '../pages/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: '/button',
    children: [
      {
        path: '/button',
        name: 'Button',
        component: () => import('../../docs/Button/index.md')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
