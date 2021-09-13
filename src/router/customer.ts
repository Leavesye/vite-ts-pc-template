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
    component: () => import('@/views/customer/member/list.vue')
  },
  {
    path: '/customer/member-edit',
    name: 'member-edit',
    meta: {
      title: '会员编辑'
    },
    component: () => import('@/views/customer/member/edit.vue')
  },
  {
    path: '/customer/member-log',
    name: 'member-log',
    meta: {
      title: '会员日志'
    },
    component: () => import('@/views/customer/log.vue')
  }
]
