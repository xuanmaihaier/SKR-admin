/*
 * @Descripttion: 
 * @version: 
 * @Author: stride
 * @Date: 2021-04-26 10:03:33
 * @LastEditors: stride
 * @LastEditTime: 2021-05-04 13:32:47
 */
import TabsView from '@/layouts/tabs/TabsView'
import BlankView from '@/layouts/BlankView'

// 路由配置
const options = {
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: () => import('@/pages/login')
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/pages/exception/404'),
    },
    {
      path: '/403',
      name: '403',
      component: () => import('@/pages/exception/403'),
    },
    {
      path: '/',
      name: '首页',
      component: TabsView,
      redirect: '/login',
      // redirect:"dashboard/workplace",
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          redirect: "dashboard/workplace",
          meta: {
            icon: 'dashboard',
          },
          component: BlankView,
          children: [
            {
              path: 'workplace',
              name: '工作台',
              meta: {
                page: {
                  closable: false
                }
              },
              component: () => import('@/pages/dashboard/Workplace')
            },
            {
              path: 'analysis',
              name: '分析页',
              component: () => import('@/pages/dashboard/Analysis')
            },
          ]
        },
        {
          path: 'workorder',
          name: '我的事务',
          meta: {
            icon: 'tool',
          },
          component: BlankView,
          children: [
            {
              path: 'commodity',
              name: '商品处理',
              component:()=>import("@/pages/workorder/Commodity"),
            },
            {
              path: 'Order',
              name: '订单信息',
              component:()=>import("@/pages/workorder/Order"),
            },
            {
              path: 'Voucher',
              name:"优惠管理",
              component:()=>import("@/pages/workorder/Voucher")
            },
            {
              path: 'Brand',
              name: '我的品牌',
              component:()=>import("@/pages/workorder/Brand"),
            },
            {
              path: 'Merchant',
              name: '商家信息',
              component:()=>import("@/pages/workorder/Merchant"),
            },
          ]
        },

        {
          path: 'serve',
          name: '客服OA',
          meta: {
            icon: 'team',
          },
          component: () => import('@/pages/serve/Serve')
        }
        // {
        //   path: 'exception',
        //   name: '异常页',
        //   meta: {
        //     icon: 'warning',
        //   },
        //   component: BlankView,
        //   children: [
        //     {
        //       path: '404',
        //       name: 'Exp404',
        //       component: () => import('@/pages/exception/404')
        //     },
        //     {
        //       path: '403',
        //       name: 'Exp403',
        //       component: () => import('@/pages/exception/403')
        //     },
        //     {
        //       path: '500',
        //       name: 'Exp500',
        //       component: () => import('@/pages/exception/500')
        //     }
        //   ]
        // },
      ]
    }
  ]
}

export default options
