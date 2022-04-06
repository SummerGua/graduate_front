import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/article/ArticleItemsContainer.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../components/About.vue')
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('../components/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
