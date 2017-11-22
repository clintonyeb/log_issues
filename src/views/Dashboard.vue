<template>
  <div class="animated fadeIn">
<div style='overflow: auto;' v-bind:style="stylelogs">
        <table  class="table" id="table-1" >
          <thead  class="thead-inverse">
            <tr >
             
              <th ></th>
              <th>Logs  </th>
               <th ></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="n in logs" >
                <td ><button type="button" class="btn btn-outline-info active" @click="load_issues"><i class="fa fa-angle-double-down"></i></button></td>
              <td >{{ n }}</td>
            
              <td >
              <div class="btn-group">
              <button type="button" class="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <i class="fa fa-link fa-lg"></i>
              </button>
              <div class="dropdown-menu">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <a class="dropdown-item" href="#">Something else here</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Separated link</a>
              </div>
              </div>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
          
<div v-bind:style="styleissues">
<table class="table" id="table-1">
          <thead  class="thead-inverse" >
            <tr>
              
              <th>Issues</th>
              <th>Status</th>
              <th style="text-align: center;"><button type="button"  class="btn btn-outline-danger"  @click="minimize_issues"><i class="fa fa-sort-desc"></i></button></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableItems">
              
              <td><span>{{item.issue_header}}</span><br>
              <div style="white-space: pre;">
              <small>{{item.issue_resolution}}</small>
              </div></td>
              <td><span style="color:green">{{"Resolved "}}</span></td>
              <td ><button  type="button" class="btn btn-secondary sm">&nbsp; View Ticket</button></td>
            </tr>
            
          </tbody>
        </table>

      </div><!--/.col-->
    </div><!--/.row-->
  </div>


</template>

<script>
import { Callout } from '../components/'
import { WebSocketCollection } from '../helper/WebSocketCollection'
import nav from '../_nav'

export default {
  name: 'dashboard',
  mixins: [WebSocketCollection],
  components: {
    Callout
  },
  data: function () {
    return {
      i: '',
      nav: nav.items,
      stylelogs: {
        width: '82%',
        height: '250px',
        overflow: 'auto',
        top: '100px',
        position: 'fixed'
      },
      styleissues: {
        width: '82%',
        height: '240px',
        overflow: 'auto',
        bottom: '50px',
        position: 'fixed'
      },
      logs: nav.logs,
      socketurl: '',
      tableItems: [
      ]
    }
  },
  methods: {
    connect_data (socketurl) {
      this.$store.state.currentSocket = socketurl
      this.$store.dispatch('addSocket', socketurl)
      this.$store.dispatch('attachListToSocket', {socketurl: socketurl, dataArray: this.logs, length: 20})
    },
    variant (value) {
      let $variant
      if (value <= 25) {
        $variant = 'info'
      } else if (value > 25 && value <= 50) {
        $variant = 'success'
      } else if (value > 50 && value <= 75) {
        $variant = 'warning'
      } else if (value > 75 && value <= 100) {
        $variant = 'danger'
      }
      return $variant
    },
    load_issues () {
      this.expand_issues()
      this.$store.dispatch('get_random_issues', this.$session.get('oauth')).then(response => {
        return response
      },
      error => {
        console.log(error)
      }).then(data => {
        this.tableItems = []
        for (let key in data) {
          this.tableItems.push(data[key])
        }
      })
    },
    minimize_issues () {
      this.styleissues.height = '50px'
      this.stylelogs.height = '480px'
    },
    expand_issues () {
      this.styleissues.height = '240px'
      this.stylelogs.height = '250px'
    }
  },
  created () {
    this.minimize_issues()
  }
}
</script>


