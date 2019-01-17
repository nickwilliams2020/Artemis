<template>
    <div>
        <section class="hero is-primary">
            <div class="hero-body">
                <div class="container has-text-centered">
                <h2 class="title">Register</h2>
                <p class="subtitle error-msg">{{ errorMsg }}</p>
                </div>
            </div>
        </section>
        <section class="section">
            <div class="container">
                
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
        </section>
    </div>
</template>

<script> 
import { EventBus } from '@/utils'
export default {  
  data () {
    return {
      email: '',
      password: '',
      name: '',
      username: '',
      errorMsg: ''
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', { email: this.email, password: this.password, name: this.name, username: this.username })
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
  }
}
</script>  