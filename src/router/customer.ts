export default [
  {
    path: 'customer',
    redirect: '/customer/member'
  },
  {
    path: '/customer/member',
    name: 'member11',
    meta: {
      title: '会员管理'
    },
    component: () => import('@/views/customer/member/index.vue')
  }
]
