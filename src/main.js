import Vue from 'vue'
import App from './App.vue'

import router from './router'
import './stytles/commom.css'
import animated from 'animate.css'
Vue.use(animated)
import axios from 'axios'
import baseURL from './utils/config'
Vue.prototype.$img_url = baseURL.img_url;
axios.defaults.baseURL = baseURL.base_url;
Vue.prototype.$H = axios

import './plugins/vant'
import './registerServiceWorker'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
