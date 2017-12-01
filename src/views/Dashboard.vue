<template>
  <div>
        <div>
        <table  class="table" v-bind:style="headertable">
          <thead class="thead-inverse">
            <tr>               
              <th>Logs  </th>
               <th ></th>
               <th ></th>
               <th ></th>
            </tr>
          </thead>
        </table>
      </div>

        <div style='overflow: auto;' v-bind:style="stylelogs">
        <br>
      
        <table class="table">
          <tbody>
            <tr v-for="(n,index) in logs" >
                <td v-bind:style="showselector">
               
                <label class="form-check-label">
                <input @click="savelogs()" type="checkbox" class="form-check-input" v-bind:value=n v-model="checkedLogs">
                </label>
              
                </td>

                <td ><b-button v-bind:variant=get_class(n.classification_info) @click="load_issues(n.message)"><i class="fa fa-link"></i></b-button></td>
              <td >{{ n.message }}</td>            
              <!-- <td >
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
              </td> -->
            </tr>
          </tbody>
        </table>
       </div>
          
<div v-bind:style="styleissues">
<div>
<table class="table" v-bind:style="headertable">
          <thead  class="thead-inverse" >
            <tr>             
              <th>Issues</th>
              <th>Status</th>
              <th style="text-align: center;"><button type="button"  class="btn btn-outline-danger"  @click="toggle()"><i v-bind:class="minclass"></i></button></th>
            </tr>
          </thead>
</table>
</div>
<div>
<br>
<br>
<br>
  <table class="table">
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
</div>
    </div><!--/.col-->
    </div><!--/.row-->

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
      checkedLogs: [],
      nav: nav.items,
      // showselector: 'display:none;',
      stylelogs: {
        width: '82%',
        height: '70%',
        overflow: 'auto',
        top: '18%',
        position: 'fixed'
      },
      headertable: {
        width: '82%',
        position: 'fixed',
        overflow: 'auto'
      },
      selectbutton () {
        if (this.$store.state.savelog === true) {
          this.selectbutton.display = ''
        } else {

        }
      },
      styleissues: {
        width: '82%',
        height: '8%',
        overflow: 'auto',
        bottom: '8%',
        position: 'fixed'
      },
      minclass: 'fa fa-caret-up fa-lg',
      logs: nav.logs,
      logstosave: nav.logstosave,
      tog: 0,
      socketurl: '',
      tableItems: [
      ]
    }
  },
  methods: {
    toggle () {
      console.log('Ram' + this.tog)
      if (this.tog === 0) {
        this.tog = 1
        this.expand_issues()
      } else {
        this.tog = 0
        this.minimize_issues()
      }
    },
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
    load_issues (messageText) {
      var params = {}
      params.log_id = this.$store.state.currentLog
      params.log_text = messageText
      this.$store.dispatch('get_related_issues', params).then(response => {
        console.log(response)
        return response
      },
      error => {
        console.log(error)
      }).then(data => {
        this.tableItems.splice(0, this.tableItems.length)
        console.log(data.Issues)
        var issues = JSON.parse(data.Issues)
        console.log(issues)
        for (var i = 0; i < issues.length; i++) {
          console.log('Pushing:' + i + issues[i])
          this.tableItems.push(issues[i])
        }
      })
      this.expand_issues()
    },
    minimize_issues () {
      this.styleissues.height = '8%'
      this.stylelogs.height = '70%'
      this.minclass = 'fa fa-caret-up fa-lg'
    },
    expand_issues () {
      this.styleissues.height = '30%'
      this.stylelogs.height = '48%'
      this.minclass = 'fa fa-caret-down fa-lg'
    },
    get_class (classification) {
      classification = JSON.parse(classification)
      if (classification.classification_type === -1) {
        return 'primary'
      } else if (classification.classification_type === 0) {
        return 'secondary'
      } else if (classification.classification_type === 1) {
        return 'warning'
      } else if (classification.classification_type === 2) {
        return 'danger'
      }
    },
    get_logs () {
      this.$store.dispatch('get_dummy_logs', this.$session.get('oauth')).then(response => {
        return response
      },
      error => {
        console.log(error)
      }).then(data => {
        for (let key in data) {
          this.logs.push(data[key])
          console.log(data[key])
        }
      })
    },
    savelogs () {
      this.logstosave.splice(0, this.logstosave.length)
      this.logstosave.push.apply(this.logstosave, this.checkedLogs)
      console.log(this.logstosave)
    }
  },
  computed: {
    showselector: function () {
      if (this.$store.state.enablesavelogs === true) {
        return ''
      } else {
        this.checkedLogs = []
        return 'display:none;'
      }
    }
  },
  created () {
    // this.get_logs() //Using dummy logstosave
  }
}
</script>


