import Vue from 'vue'
import http from './util/http'

import App from './App'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  error: require('./assets/imgs/error.jpg'),
  loading: require('./assets/imgs/loading-svg/loading-bubbles.svg')
})
Vue.use(Antd)
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = http
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
