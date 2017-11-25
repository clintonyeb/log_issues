<template>
  <div class="sidebar">
    <nav class="sidebar-nav">
      <div slot="header"></div>
      <ul class="nav">
        <li @click="geterror_anolmaies(item.flag)" class="nav-item" v-for="(item, index) in navItems">
          <template v-if="item.title">
            <SidebarNavTitle :name="item.name"/>
          </template>
          <template v-else-if="item.divider">
            <li class="divider"></li>
          </template>
          <template v-else>
            <template v-if="item.children">
              <SidebarNavDropdown :name="item.name" :url="item.url" :icon="item.icon">
                <template v-for="(child, index) in item.children">
                  <template v-if="child.children">
                    <SidebarNavDropdown :name="child.name" :url="child.url" :icon="child.icon">
                      <li  class="nav-item" v-for="(child, index) in item.children">
                        <SidebarNavLink :name="child.name" :url="child.url" :icon="child.icon" :badge="child.badge"/>
                      </li>
                    </SidebarNavDropdown>
                  </template>
                  <template v-else>
                    <li @click="connect_socket(child), getfilter(child.logid, child.patternid)" class="nav-item">
                      <SidebarNavLink :name="child.name" :url="child.url" :icon="child.icon" :badge="child.badge"/>
                    </li>
                  </template>
                </template>
              </SidebarNavDropdown>
            </template>
            <template v-else>
              <SidebarNavLink :name="item.name" :url="item.url" :icon="item.icon" :badge="item.badge"/>
            </template>
          </template>
        </li>
      </ul>
      <slot></slot>
      <div slot="footer"></div>
    </nav>
  </div>
</template>
<script>
import SidebarNavDropdown from './SidebarNavDropdown'
import SidebarNavLink from './SidebarNavLink'
import SidebarNavTitle from './SidebarNavTitle'
import nav from '../_nav'
export default {
  name: 'sidebar',
  data: function () {
    return {
      logs: nav.logs
    }
  },
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    SidebarNavDropdown,
    SidebarNavLink,
    SidebarNavTitle
  },
  user_id: '',
  source_key: '',
  source_id: '',
  log_id: '',
  finalurl: '',
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
        this.source_key = data[0].source_key
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
        this.$store.state.currentLog = data[0].log_id
        this.$store.state.logpath = data[0].log_path
        this.get_pattern(data[0].log_id)
        this.socketurl = this.$store.state.baseSocket + 'log:' + this.source_key + ':' + data[0].log_id
        this.connect_data(this.socketurl)
        for (let key in data) {
          var string = data[key].log_name
          var obj = {
            name: string.substring(38, 14),
            icon: '',
            log_path: data[key].log_path,
            logid: data[key].log_id,
            patternid: '',
            flag: 'logs'
          }
          nav.items[3].children.push(obj)
        }
        nav.items[3].children[0].icon = 'fa fa-check-circle fa-lg mt-4'
      })
    },
    get_pattern (logid) {
      this.$store.dispatch('get_patterns_for_logs', {oauth: this.$session.get('oauth'), log_id: logid}).then(response => {
        return response
      },
      error => {
        console.log(error)
      }).then(data => {
        for (let key in data) {
          var string = data[key].pattern
          var obj = {
            name: string,
            icon: '',
            flag: 'filters',
            patternid: data[key].id,
            logid: data[key].log_id
          }
          nav.items[4].children.push(obj)
        }
        var obj2 = {
          name: 'None',
          flag: '',
          icon: 'icon-star'
        }
        nav.items[4].children.push(obj2)
      })
    },
    refreshdrop (arr) {
      for (let key in arr) {
        arr[key].icon = ''
      }
    },
    connect_data (socketurl) {
      this.$store.state.currentSocket = socketurl
      this.$store.dispatch('addSocket', socketurl)
      this.$store.dispatch('attachListToSocket', {socketurl: socketurl, dataArray: this.logs, length: 20})
    },
    handleClick (e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    },
    delete_socket () {
      this.$store.dispatch('deleteSocket')
    },
    connect_socket (obj) {
      if (obj.flag === 'logs') {
        this.refreshdrop(nav.items[3].children)
        this.$store.state.currentLog = obj.logid
        this.$store.state.logpath = obj.log_path
        obj.icon = 'fa fa-check-circle fa-lg mt-4'
        this.refreshdrop(nav.items[4].children)
        this.refreshdrop(nav.items)
        this.delete_socket()
        this.logs.splice(0, this.logs.length)
        this.finalurl = this.$store.state.baseSocket + 'log:' + this.source_key + ':' + obj.logid
        this.connect_data(this.finalurl)
      } else if (obj.flag === 'filters') {
        this.logs.splice(0, this.logs.length)
        this.refreshdrop(nav.items[4].children)
        obj.icon = 'fa fa-check-square fa-lg mt-4'
        this.delete_socket()
        this.finalurl = this.$store.state.baseSocket + 'patterns:' + this.source_key + ':' + obj.logid + ':' + obj.patternid
        this.connect_data(this.finalurl)
      }
    },
    getfilter (logid, patternid) {
      if (patternid === '') {
        nav.items[4].children.splice(0, nav.items[4].children.length)
        this.get_pattern(logid)
      } else {
        console.log('Filter clicked')
      }
    },
    geterror_anolmaies (flag) {
      if (flag === 'ANOMALIES') {
        this.refreshdrop(nav.items[4].children)
        this.refreshdrop(nav.items)
        nav.items[5].icon = 'fa fa-check-square fa-lg mt-4'
        this.delete_socket()
        this.logs.splice(0, this.logs.length)
        this.finalurl = this.$store.state.baseSocket + 'anomalies:' + this.source_key + ':' + this.$store.state.currentLog
        this.connect_data(this.finalurl)
      } else if (flag === 'ERRORS') {
        this.refreshdrop(nav.items[4].children)
        this.refreshdrop(nav.items)
        nav.items[6].icon = 'fa fa-check-square fa-lg mt-4'
        this.delete_socket()
        this.logs.splice(0, this.logs.length)
        this.finalurl = this.$store.state.baseSocket + 'errors:' + this.source_key + ':' + this.$store.state.currentLog
        this.connect_data(this.finalurl)
      } else if (flag === 'ALL_ANOMALIES') {
        this.logs.splice(0, this.logs.length)
        this.delete_socket()
        this.finalurl = this.$store.state.baseSocket + 'all_anomalies:' + this.source_key
        this.connect_data(this.finalurl)
      }
    }
  },
  beforeMount () {
    // this.get_user_info()
  }
}
</script>

<style lang="css">
  .nav-link {
    cursor:pointer;
  }
</style>
