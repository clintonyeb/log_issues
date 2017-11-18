<template>
  <div class="animated fadeIn">
<div v-bind:style="stylelogs">
        <table class="table" id="table-1">
          <thead  class="thead-inverse">
            <tr >
             
              <th width="5%" ></th>
              <th>Logs  </th>
               <th ></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="n in logs" >
                <td ><button type="button" class="btn btn-outline-info active" @click="load_issues"><i class="fa fa-angle-double-down"></i></button></td>
              <td width="70%">{{ n }}</td>
            
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
              
              <th width="60%">Issues</th>
              <th width="14%">Status</th>
              <th><button type="button"  class="btn btn-outline-danger"  @click="minimize_issues"><i class="fa fa-sort-desc"></i></button></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in tableItems">
              
              <td><span>{{item.issue_header}}</span><br>
              <div style="white-space: pre;">
              <small>{{item.issue_resolution}}</small>
              </div></td>
              <td><span style="color:green">{{"Resolved "}}</span></td>
              <td ><button type="button" class="btn btn-secondary btn-sm">&nbsp; View Ticket</button></td>
            </tr>
            
          </tbody>
        </table>

      </div>

        </b-card>
      </div><!--/.col-->
    </div><!--/.row-->
  </div>


</template>

<script>
// import { store } from '../helper/ApiClass'
import CardLine1ChartExample from './dashboard/CardLine1ChartExample'
import CardLine2ChartExample from './dashboard/CardLine2ChartExample'
import CardLine3ChartExample from './dashboard/CardLine3ChartExample'
import CardBarChartExample from './dashboard/CardBarChartExample'
import MainChartExample from './dashboard/MainChartExample'
import SocialBoxChartExample from './dashboard/SocialBoxChartExample'
// import { mapActions } from 'vuex'
import { Callout } from '../components/'
// import Vue from 'vue'
// var eventHub = new Vue()
// import eventHub from '../main.js'

export default {
  name: 'dashboard',
  components: {
    Callout,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    SocialBoxChartExample
  },
  data: function () {
    return {
      i: '',
      stylelogs: {
        width: '100%',
        height: '250px',
        overflow: 'auto',
        top: '100px',
        position: 'fixed'
      },
      styleissues: {
        width: '100%',
        height: '240px',
        overflow: 'auto',
        bottom: '50px',
        position: 'fixed'
      },
      logs: [
      ],
      tableItems: [
      ],
      tableFields: {
        user: {
          label: 'Issues'
        },
        payment: {
          label: 'Status',
          class: 'text-center'
        },
        activity: {
          label: '  '
        }
      }
    }
  },
  methods: {
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
          console.log(data[key])
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
  beforeMount () {
    this.$store.dispatch('get_dummy_logs', this.$session.get('oauth')).then(response => {
      return response
    },
    error => {
      console.log(error)
    }).then(data => {
      for (let key in data) {
        this.logs.push(data[key].log_text_long)
      }
    })
    this.minimize_issues()
    this.$store.dispatch('link_logs_to_issue', []).then(response => {
      return response
    },
    error => {
      console.log(error)
    }).then(data => {
      console.log(data)
    })
    this.$store.dispatch('save_log', []).then(response => {
      return response
    },
    error => {
      console.log(error)
    }).then(data => {
      console.log(data)
    })
    this.$store.dispatch('get_related_issues', []).then(response => {
      return response
    },
    error => {
      console.log(error)
    }).then(data => {
      console.log(data)
    })
  }
}
</script>


