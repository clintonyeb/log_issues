<template>
  
</template>
<script>
// import Vue from 'vue'
// var eventHub = new Vue()
// import eventHub from '../main.js'
export default {
  // props: ['get_dummy_logs()'],
  name: 'Apilist',
  data () {
    return {
      url: 'tailsensesvc-env.izvbyfxjqn.us-east-2.elasticbeanstalk.com',
      version: 'v1'
    }
  },
  // created: function () {
  //   // We listen for the event on the eventHub
  //   eventHub.$on('clicked', this.get_dummy_logs)
  // },
  methods: {
    authenticate () {
      var link = this.url + '/' + this.version + '/' + 'authenticate'
      this.$http.post(link, this.user, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json'
        }
      })
        .then(response => {
          return response.json()
        },
        error => {
          this.status = 'Invalid Username and Password'
          console.log(error + '' + 'ram')
        }).then(data => {
          this.user.oauth = data['auth_token']
          this.user.loggedin = true
          console.log(this.user.oauth)
          this.checklogin()
        })
    },
    get_dummy_logs: function () {
      console.log('Ram')
      var link = this.url + '/' + this.version + '/' + 'get_dummy_logs'
      this.$http.post(link, [], {
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
    },
    get_random_issues () {
      var link = this.url + '/' + this.version + '/' + 'show_random_issues'
      this.$http.post(link, [], {
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
  }
}
</script>
