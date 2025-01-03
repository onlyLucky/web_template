import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: '_index',
    redirect: '/index',
    component: () => import('@/layout/Index.vue'),
    meta: {
      hideInMenu: true,
      keepAlive: true
    },
    children: []
  },

  {
    path: '/index',
    name: 'indexPage',
    component: () => import("@/views/index/index.vue")
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('_v/setting/index.vue')
  },

]

export default routes