import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import VueCookies from 'vue-cookies'


// Import Global SCSS Sheet for bootstrap restyling
import './assets/_global.scss'

//BootstrapVue Imports
import { BootstrapVue } from 'bootstrap-vue'
import { BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);
Vue.use(VueCookies);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
