import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import VueSession from 'vue-session'
import BootstrapVue from 'bootstrap-vue'
// import App from '../App'
// import router from '../router'

Vue.use(Vuex)
Vue.use(VueSession)
Vue.use(BootstrapVue)
Vue.use(VueResource)

export const store = new Vuex.Store({
  state: {
    url: 'http://tailsensesvc-env.izvbyfxjqn.us-east-2.elasticbeanstalk.com',
    version: 'v1',
    dummy_logs: ''
  },
  actions: {
    authenticate ({context, state}, params) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          var returndata = ''
          var http = new XMLHttpRequest()
          var link = 'authenticate'
          var url = state.url + '/' + state.version + '/' + link
          http.open('POST', url, true)
          http.setRequestHeader('content-type', 'application/json')
          http.setRequestHeader('accept', 'application/json; version=1')
          http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
              returndata = http.responseText
              resolve(JSON.parse(returndata))
            }
          }
          http.send(JSON.stringify({'email': params.email, 'password': params.password}))
        }, 1)
      })
    },
    get_dummy_logs: ({context, state}, oauthkey) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          var returndata = ''
          var http = new XMLHttpRequest()
          var link = 'get_dummy_logs'
          var url = state.url + '/' + state.version + '/' + link
          // var params = 'lorem=ipsum&name=binny'
          http.open('POST', url, true)
          http.setRequestHeader('content-type', 'application/json')
          http.setRequestHeader('accept', 'application/json')
          http.setRequestHeader('Authorization', oauthkey)
          http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
              returndata = http.responseText
              resolve(JSON.parse(returndata))
            }
          }
          http.send()
        }, 10)
      })
    },
    get_random_issues ({context, state}, oauthkey) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          var returndata = ''
          var http = new XMLHttpRequest()
          var link = 'show_random_issues'
          var url = state.url + '/' + state.version + '/' + link
          http.open('POST', url, true)
          http.setRequestHeader('content-type', 'application/json')
          http.setRequestHeader('accept', 'application/json')
          http.setRequestHeader('Authorization', oauthkey)
          http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
              returndata = http.responseText
              resolve(JSON.parse(returndata))
            }
          }
          http.send()
        }, 10)
      })
    },
    get_user_info ({context, state}, oauthkey) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          var returndata = ''
          var http = new XMLHttpRequest()
          var link = 'get_user_info'
          var url = state.url + '/' + state.version + '/' + link
          http.open('POST', url, true)
          http.setRequestHeader('content-type', 'application/json')
          http.setRequestHeader('accept', 'application/json')
          http.setRequestHeader('Authorization', oauthkey)
          http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
              returndata = http.responseText
              resolve(JSON.parse(returndata))
            }
          }
          http.send(JSON.stringify(this.$session.get('email')))
        }, 10)
      })
    },
    get_sources_for_user ({context, state}, oauthkey) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          var returndata = ''
          var http = new XMLHttpRequest()
          var link = 'get_sources_for_user'
          var url = state.url + '/' + state.version + '/' + link
          http.open('POST', url, true)
          http.setRequestHeader('content-type', 'application/json')
          http.setRequestHeader('accept', 'application/json')
          http.setRequestHeader('Authorization', oauthkey)
          http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
              returndata = http.responseText
              resolve(JSON.parse(returndata))
            }
          }
          http.send()
        }, 10)
      })
    },
    get_logs_for_source ({context, state}, oauthkey) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          var returndata = ''
          var http = new XMLHttpRequest()
          var link = 'get_logs_for_source'
          var url = state.url + '/' + state.version + '/' + link
          http.open('POST', url, true)
          http.setRequestHeader('content-type', 'application/json')
          http.setRequestHeader('accept', 'application/json')
          http.setRequestHeader('Authorization', oauthkey)
          http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
              returndata = http.responseText
              resolve(JSON.parse(returndata))
            }
          }
          http.send()
        }, 10)
      })
    },
    get_patterns_for_logs ({context, state}, oauthkey) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          var returndata = ''
          var http = new XMLHttpRequest()
          var link = 'get_patterns_for_logs'
          var url = state.url + '/' + state.version + '/' + link
          http.open('POST', url, true)
          http.setRequestHeader('content-type', 'application/json')
          http.setRequestHeader('accept', 'application/json')
          http.setRequestHeader('Authorization', oauthkey)
          http.onreadystatechange = function () {
            if (http.readyState === 4 && http.status === 200) {
              returndata = http.responseText
              resolve(JSON.parse(returndata))
            }
          }
          http.send()
        }, 10)
      })
    }
  }
})
