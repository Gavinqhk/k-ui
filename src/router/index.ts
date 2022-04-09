import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import Index from '../pages/index.vue'
import Button from '../pages/button.vue'
import Input from '../pages/input.vue'

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
        component: Button
      },
      {
        path: '/input',
        name: 'Input',
        component: Input
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
