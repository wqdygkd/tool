import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/ImageUpload.vue')
    },
    {
      path: '/en-decode',
      name: 'en-decode',
      meta: {
        title: '字符串编解码工具'
      },
      component: () => import('../views/En-Decode.vue')
    }
  ]
})

export default router