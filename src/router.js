import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/dashboard.vue'
import product_detail from './views/ProductDetail.vue'
import manufacturing from './views/manufacturing.vue'
import manufacturing_detail from './views/manufacturing_detail.vue'
import product_serialno from './views/product_serialno.vue'
import product_serialno_detail from './views/product_serialno_detail.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      //product Dashboard
      component: Home
    },
    {
      path: '/product_detail/:product_id',
      name: 'product_detail',
      // Product Detail
      component: product_detail
    },
    {
      path: '/manufacturing',
      name: 'manufacturing',
      // Manufacturing Detail
      component: manufacturing
    },
    {
      path: '/manufacturing_detail/:bom_id',
      name: 'manufacturing_detail',
      // Manufacturing Detail
      component: manufacturing_detail
    },
    {
      path: '/product_serialno',
      name: 'product_serialno',
      // Product Serial number Dashboard
      component: product_serialno
    },
    {
      path: '/product_serialno_detail/:product_ids',
      name: 'product_serialno_detail',
      // Product Serial Number Detail
      component: product_serialno_detail
    },
  ]
})
