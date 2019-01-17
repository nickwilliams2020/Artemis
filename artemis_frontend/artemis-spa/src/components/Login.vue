<template>
    <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h2 class="title">{{state}}</h2>
          <p class="subtitle error-msg">{{ errorMsg }}</p>
        </div>
      </div>
    </section>
    <section class="section">

      <div class="container">
        <div class="tabs is-centered is-fullwidth is-large">
          <ul>
            <li :class="{'is-active': state === 'Login'}" @click="state = 'Login'"> <a> Login </a> </li>
            <li :class="{'is-active': state === 'Register'}" @click="state = 'Register'"> <a>Register</a> </li>
          </ul>
        </div>
        <div class="columns">
          <div class="column">
            
            <div v-if="state === 'Login'" class="login">
          
              <div class="field">
                <label class="label is-large" for="password">User Name:</label>
                <div class="control">
                  <input type="text" class="input is-large" id="username" v-model="username">
                </div>
              </div>

              <div class="field">
                <label class="label is-large" for="password">Password:</label>
                <div class="control">
                  <input type="password" class="input is-large" id="password" v-model="password">
                </div>
              </div>

              <div class="control">
                <a class="button is-large is-primary" @click="authenticate">Login</a>
              </div> 

            </div>

            <div v-if="state === 'Register'" class="register">
                  
              <div class="field">
                <label class="label is-large" for="password">Name:</label>
                <div class="control">
                    <input type="name" class="input is-large" id="name" v-model="name">
                </div>
              </div>
              <div class="field">
                <label class="label is-large" for="password">User Name:</label>
                <div class="control">
                    <input type="username" class="input is-large" id="username" v-model="username">
                </div>
              </div>
              <div class="field">
                <label class="label is-large" for="email">Email:</label>
                <div class="control">
                    <input type="email" class="input is-large" id="email" v-model="email">
                </div>
              </div>
              <div class="field">
                <label class="label is-large" for="password">Password:</label>
                <div class="control">
                    <input type="password" class="input is-large" id="password" v-model="password">
                </div>
              </div>

              <div class="control">
              <a class="button is-large is-success" @click="register">Register</a>
              </div>

            </div>

          </div>
        </div>
      </div>

      
      
    </section>

  </div>
</template>

<script> 
import { EventBus } from '@/utils'
export default {  
  data () {
    return {
      name: '',
      email: '',
      password: '',
      username: '',
      errorMsg: '',
      state: 'Login'
    }
  },
  methods: {
    authenticate () {
      this.$store.dispatch('auth/login', { password: this.password, username: this.username })
      .then(() => this.$router.push('/'))
    },
    register () {
      this.$store.dispatch('auth/register', { email: this.email, password: this.password, name: this.name, username: this.username })
      .then(() => this.$router.push('/'))
    }
  },
  mounted () {
    EventBus.$on('failedRegistering', (msg) => {
      this.errorMsg = msg
    })
    EventBus.$on('failedAuthentication', (msg) => {
      this.errorMsg = msg
    })
  },
  beforeDestroy () {
    EventBus.$off('failedRegistering')
    EventBus.$off('failedAuthentication')
  }
}
</script>  