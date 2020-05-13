import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import {http} from '../util/axiosHttp.js';

import ProductBrowser from '../views/ProductBrowser.vue'
import FilteredProductBrowser from '../views/FilteredProductBrowser.vue'
import NoListings from '../views/NoListings.vue'
import SingleListing from '../views/SingleListing.vue'
import Sell from '../views/Sell.vue'
import Login from '../views/Login.vue'
import User from '../views/User.vue'





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
    component: ProductBrowser,
    beforeEnter: async (to, from, next) => {
      try {
        var listings = await http().get(`${process.env.VUE_APP_API_URL}/api/listings/c/${to.params.category}`);
        console.log(listings);
        if(listings.data.length == 0){
          next(`/c/${to.params.category}/no-listings`);
        } else{
          next();
        }
      }catch(err){
        console.log(err)
      }
    }
  },
  {
    path: '/c/:category/all',
    name: 'FilteredProductBrowser',
    component: FilteredProductBrowser
  },
  {
    path: '/c/:category/no-listings',
    name: 'NoListings',
    component: NoListings
  },
  {
    path: '/item/:listingId',
    name: 'SingleListing',
    component: SingleListing
  },
  {
    path: '/sell',
    name: 'Sell',
    component: Sell
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user',
    name: 'User',
    component: User,
    beforeEnter(to, from, next){ 
      if(store.getters.isLoggedIn){
        next();
      }else {
        next('/login')
      }
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
