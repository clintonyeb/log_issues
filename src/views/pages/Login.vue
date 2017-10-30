<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group mb-0">
            <div class="card p-4">
              <div class="card-body">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="icon-user"></i></span>
                  <input type="text" class="form-control" placeholder="Username" v-model="user.email">
                </div>
                <div class="input-group mb-4">
                  <span class="input-group-addon"><i class="icon-lock"></i></span>
                  <input type="password" class="form-control" placeholder="Password" v-model="user.password">
                </div>
                <div class="row">
                  <div class="col-6">
                  <span>{{ this.status }}</span>
                  </div>
                  <br><br>
                </div>  
                <div class="row">
                  <div class="col-6">
                    <button type="button" class="btn btn-primary px-4" @click="submit" >Login</button>
                  </div>
                  <div class="col-6 text-right">
                    <button type="button" class="btn btn-link px-0">Forgot password?</button>
                  </div>
                </div>
              </div>
            </div>
          
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: '',
        oauth: '',
        loggedin: false
      },
      status: ''
    }
  },
  methods: {
    checklogin () {
      if (this.user.loggedin) {
        this.$session.set('oauth', this.user.oauth)
        this.$router.push('dashboard')
      }
    },
    submit () {
      this.$http.post('http://tailsensesvc-env.izvbyfxjqn.us-east-2.elasticbeanstalk.com/v1/authenticate', this.user, {
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
    }
  }
}
</script>
