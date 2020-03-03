import Vue from 'vue'
import {Button} from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/css/reset.css'

import  './mock/mockServer'
import loading from'../src/common/imgs/loading.gif'

import './filters/index'


Vue.config.productionTip = false

Vue.component(Button.name, Button)

Vue.use(VueLazyload,{
  loading
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
