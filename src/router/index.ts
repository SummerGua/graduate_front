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
    path: '/article/:id',
    name: 'article',
    component: () => import('../components/article/Article.vue')
  },
  {
    path: '/article/editor/:id',
    name: 'editor',
    component: () => import('../components/editor/MarkdownContainer.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
