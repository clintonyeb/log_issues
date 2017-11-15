<template>
  <div class="animated fadeIn">
          <ul class="icons-list">
                <li v-for="n in logs">
                  <i class="icon-screen-desktop bg-primary"></i>
                  <div class="desc">
                    <button type="button"  class="btn btn-link px-0" @click="details">{{ n }}</button>
                  </div>
               
                  <div class="actions">
                    <button type="button" class="btn btn-link text-muted"><i class="icon-settings"></i></button>
                  </div>
                </li>
                
              </ul>


  
 <b-table style="position:absolute;left:220px;bottom:50px;width:83%;"  class="table-outline mb-0" hover responsive outline
            :items="tableItems"
            :fields="tableFields"
            head-variant="default"
            >
            <template slot="avatar" scope="item">
              <div class="avatar">
                <img :src="item.value.url" class="img-avatar" alt="">
                <span class="avatar-status" v-bind:class="{ 'bg-success': item.value.status == 'success',  'bg-warning': item.value.status == 'warning', 'bg-danger': item.value.status == 'danger', 'bg-secondary': item.value.status == '' }"></span>
              </div>
            </template>
            <template slot="user" scope="item">
              <div>{{ item.item.issue_header }}</div>
              <div class="small text-muted">
                <span>
                  
                </span>{{ item.item.issue_resolution }}
              </div>
            </template>
            <template slot="country" scope="item">
              <img :src="item.value.flag" :alt="item.value.name" style="height:24px;">
            </template>
            <template slot="usage" scope="item">
              <div class="clearfix">
                <div class="float-left">
                  <strong>{{item.value.value}}%</strong>
                </div>
                <div class="float-right">
                  <small class="text-muted">{{item.value.period}}</small>
                </div>
              </div>
              <b-progress class="progress-xs" v-model="item.value.value" :variant="variant(item.value.value)"></b-progress>
            </template>
             <template slot="payment" scope="item">
              <span style="color:green">{{ "Resolved" }}</span>
            </template>
            <template slot="activity" scope="item">
              <p > <button  type="button" class="btn btn-outline-primary" >View Full Ticket</button></p>
              <strong>{{item.value}}</strong>
            </template>
          </b-table>
        </b-card>
      </div><!--/.col-->
    </div><!--/.row-->
  </div>


</template>

<script>
import { Callout } from '../components/'

export default {
  name: 'dashboard',
  components: {
    Callout
  },
  data: function () {
    return {
      i: '',
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
    connect_data  () {
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
    get_data1 () {
      this.$http.post('http://Tailsensesvc-env.izvbyfxjqn.us-east-2.elasticbeanstalk.com/v1/get_dummy_logs', [], {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': this.$session.get('oauth')
        }
      })
        .then(response => {
          return response.json()
        },
        error => {
          console.log(error + '' + 'ram')
        }).then(data => {
          // const logsArray = []
          for (let key in data) {
            this.logs.push(data[key].log_text_long)
          }
        })
      this.$options.sockets.onmessage = (data) => console.log(data)
    },
    details () {
      this.$http.post('http://Tailsensesvc-env.izvbyfxjqn.us-east-2.elasticbeanstalk.com/v1/show_random_issues', [], {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'Authorization': this.$session.get('oauth')
        }
      })
        .then(response => {
          return response.json()
        },
        error => {
          console.log(error + '' + 'ram')
        }).then(data => {
          this.tableItems = []
          for (let key in data) {
            this.tableItems.push(data[key])
            console.log(data[key])
          }
        })
    }
  },
  beforeMount () {
    this.connect_data()
    this.get_data1()
  }
}
</script>
