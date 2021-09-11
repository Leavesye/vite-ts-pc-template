export default [
  {
    path: 'customer',
    redirect: '/customer/member'
  },
  {
    path: '/customer/member',
    name: 'member',
    meta: {
      title: '会员管理'
    },
    component: () => import('@/views/customer/member/index.vue')
  }
]
