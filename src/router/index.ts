import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import { store } from '../store'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'signin'
  },
  {
    path: '/home',
    name: 'home',
    meta: {
      auth: true
    },
    component: () => import('../components/article/ArticleItemsContainer.vue')
  },
  {
    path: '/signin',
    name: 'signin',
    component: () => import('../components/auth/SignIn.vue')
  },
  {
    path: '/article/:id',
    name: 'article',
    meta: {
      auth: true
    },
    component: () => import('../components/article/Article.vue')
  },
  {
    path: '/article/editor/:id',
    name: 'editor',
    meta: {
      auth: true
    },
    component: () => import('../components/editor/MarkdownContainer.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  if (to.meta.auth === true && !store.state.isSignin) {
    // 需要登陆但没有登陆
    next({
      name: 'signin'
    })
  } else {
    next()
  }
})

export default router
