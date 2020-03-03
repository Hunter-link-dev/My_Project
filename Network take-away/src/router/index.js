import Vue from 'vue'
import VueRouter from 'vue-router'
// import Msite from '../pages/Msite/Msite.vue'
// import Search from '../pages/Search/Search.vue'
// import Order from '../pages/Order/Order.vue'
// import Profile from '../pages/Profile/Profile.vue'


//进行路由懒加载
const Msite = () =>  import('../pages/Msite/Msite.vue')
const Search = () =>  import('../pages/Search/Search.vue')
const Order = () =>  import('../pages/Order/Order.vue')
const Profile = () =>  import('../pages/Profile/Profile.vue')


import Login from '../pages/Login/Login.vue'

import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/msite',
    name: '',
    component: Msite,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/search',
    name: '',
    component: Search,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/order',
    name: '',
    component: Order,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/profile',
    name: '',
    component: Profile,
    meta:{
      showFooter:true
    }
  },
  {
    path: '/',
    redirect: '/msite'
  },
  {
    path: '/login',
    component: Login
  },

  {
    path: '/shop',
    component: Shop,
    children:[
      {
        path: '/shop/goods',
        component: ShopGoods
      },
      {
        path: '/shop/ratings',
        component: ShopRatings
      },
      {
        path: '/shop/info',
        component: ShopInfo
      },
      {
        path: '',
        redirect: '/shop/goods'
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
