
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/store/modules/user.js'
const router = createRouter(
  {
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/login', component: () => import('@/views/login/PageContainer.vue'),
      },
      {
        path: '/',
        component: () => import("@/views/layout/LayoutContainer.vue"),
        children: [
          {
            path: 'dashboard',
            meta: { id: '1', name: '控制台', icon: 'Platform', path: '/dashboard', describe: '用于展示当前系统中的统计数据、统计报表及重要实时数据' },
            component: () => import('@/views/dashboard/DashboardContainer.vue')
          },
          {
            path: 'auth',
            meta: { id: '2', name: '权限管理', icon: 'Grid' },
            children: [
              {
                path: '',
                alias: ['admin'],
                meta: { id: '1', name: '账号管理', icon: 'Avatar', path: '/auth/admin', describe: '管理员可以进行编辑，权限修改后需要登出才会生效' },
                component: () => import('@/views/auth/admin/AdminContainer.vue')
              },
              {
                path: 'group',
                meta: { id: '2', name: '菜单管理', icon: 'Menu', path: '/auth/group', describe: '菜单规则通常对应一个控制器的方法,同时菜单栏数据也从规则中获取' },
                component: () => import('@/views/auth/group/GroupContainer.vue')

              }
            ]
          },
          {
            path: 'vppz',
            meta: { id: '3', name: 'DIDI陪诊', icon: 'BellFilled' },
            children: [
              {
                path: '',
                alias: ['staff'],
                meta: { id: '1', name: '陪护管理', icon: 'Checked', path: '/vppz/staff', describe: '陪护师可以进行创建和修改，设置对应生效状态控制C端选择' },
                component: () => import("@/views/vppz/staff/StaffContainer.vue")
              },
              {
                path: 'order',
                meta: { id: '2', name: '订单管理', icon: 'List', path: '/vppz/order', describe: 'C端下单后可以查看所有订单状态，已支付的订单可以完成陪护状态修改' },
                component: () => import('@/views/vppz/order/OrderContainer.vue')
              }
            ]
          }
        ]

      },

    ]

  }
)

router.beforeEach((to, from) => {
  const token = useUserStore().token
  console.log(token, 'token')
  // 非登陆页面token不存在
  if (to.path !== '/login' && !token) {
    return '/login'
  } else if (token && to.path === '/login') {
    // 已登录状态访问login跳转首页
    return '/dashboard'
  } else {
    return true
  }
})
export default router