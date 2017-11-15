// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueSession from 'vue-session'
import VueNativeSock from 'vue-native-websocket'

Vue.use(VueSession)
Vue.use(BootstrapVue)
Vue.use(VueResource)
Vue.use(VueNativeSock, 'ws://ec2-18-220-63-112.us-east-2.compute.amazonaws.com:8080/Javemonitor/datachannel/log:74af15fa-a797-438a-a4ef-54a8de6ca4ef:213', {
  format: 'json',
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000 // (Number) how long to initially wait before attempting a new (1000)
})

Vue.http.options.xhr = {withCredentials: true}
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true
Vue.http.options.crossOrigin = true

Vue.http.headers.common['Access-Control-Allow-Origin'] = '*'
Vue.http.headers.common['Content-Type'] = 'application/x-www-form-urlencoded'
Vue.http.headers.common['Accept'] = 'application/json, text/plain, */*'
Vue.http.headers.common['Access-Control-Allow-Headers'] = 'Origin, Accept, Content-Type, Authorization, Access-Control-Allow-Origin'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {
    App
  }
})
