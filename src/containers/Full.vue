<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view></router-view>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from '../_nav'
import { Header as AppHeader, Sidebar, Aside as AppAside, Footer as AppFooter, Breadcrumb } from '../components/'

export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppAside,
    AppFooter,
    Breadcrumb
  },
  data () {
    return {
      nav: nav.items
    }
  },
  computed: {
    name () {
      return this.$route.name
    },
    list () {
      return this.$route.matched
    }
  },
  user_id: '',
  source_id: '',
  log_id: '',
  methods: {
    get_user_info () {
      this.$store.dispatch('get_user_info', {oauth: this.$session.get('oauth'), email: this.$session.get('email')}).then(response => {
        return response
      },
      error => {
        console.log(error)
      }).then(data => {
        this.user_id = data[0].user_id
        this.get_sources()
      })
    },
    get_sources () {
      this.$store.dispatch('get_sources_for_user', {oauth: this.$session.get('oauth'), user_id: this.user_id}).then(response => {
        return response
      },
      error => {
        console.log(error)
      }).then(data => {
        this.source_id = data[0].source_id
        this.get_logs()
      })
    },
    get_logs () {
      this.$store.dispatch('get_logs_for_source', {oauth: this.$session.get('oauth'), source_id: this.source_id}).then(response => {
        return response
      },
      error => {
        console.log(error)
      }).then(data => {
        this.get_pattern()
        for (let key in data) {
          var string = data[key].log_name
          var obj = {
            name: string.substring(38, 14),
            url: '',
            icon: ''
          }
          nav.items[2].children.push(obj)
        }
      })
    },
    get_pattern () {
      this.$store.dispatch('get_patterns_for_logs', {oauth: this.$session.get('oauth'), log_id: '187'}).then(response => {
        return response
      },
      error => {
        console.log(error)
      }).then(data => {
        for (let key in data) {
          var string = data[key].pattern
          var obj = {
            name: string,
            url: '',
            icon: ''
          }
          nav.items[3].children.push(obj)
        }
        var obj2 = {
          name: 'None',
          url: '',
          icon: 'icon-star'
        }
        nav.items[3].children.push(obj2)
      })
    }
  },
  beforeMount () {
    this.get_user_info()
  }
}
</script>
