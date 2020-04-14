import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ProductBrowser from '../views/ProductBrowser.vue'
import FilteredProductBrowser from '../views/FilteredProductBrowser.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/c/:category',
    name: 'ProductBrowser',
    component: ProductBrowser
  },
  {
    path: '/c/:category/all',
    name: 'FilteredProductBrowser',
    component: FilteredProductBrowser
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
