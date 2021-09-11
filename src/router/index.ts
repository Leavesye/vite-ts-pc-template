import { createRouter, createWebHashHistory } from 'vue-router'
import MainLayout from '@/views/layout/MainLayout.vue'
import customer from './customer'

const routes = [
  {
    path: '/',
    redirect: '/customer/member'
  },
  {
    path: '/',
    name: 'layout',
    component: MainLayout,
    children: [...customer]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录'
    },
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | vue-manage-system`
  next()
})

export default router
