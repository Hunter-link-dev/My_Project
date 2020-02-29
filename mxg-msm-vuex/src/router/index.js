import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/index.vue'
import Layout from '@/components/Layout.vue'
import Home from '@/views/home'
import Member from '../views/member'
import Supplier from '../views/supplier'
import Goods from '../views/goods'
import Staff from '../views/staff'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'layout',
    component: Layout,
    redirect:'/home',
      children:[
        {
          path:'/home',
          name:'home',
          component:Home,
          meta:{title:'首页'}
        }
      ]
  },
  {
    path:'/member',
    component:Layout,
      children:[
        {
          // 这里也可以写成是 / 都是拼接额度方式的相当于/member/
          path:'/member/',
          component:Member,
          meta:{title:'会员管理'}
        }
      ]
  },
  {
    path:'/supplier',
    component:Layout,
      children:[
        {
          path:'/',
          component:Supplier,
          meta:{title:'供应商'}
        }
      ]
  },
  {
    path:'/goods',
    component:Layout,
      children:[
        {
          path:'/goods/',
          component:Goods,
          meta:{title:'商品'}
        }
      ]
  },
  {
    path:'/staff',
    component:Layout,
      children:[
        {
          path:'/staff/',
          component:Staff,
          meta:{title:'职员'}
        }
      ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
