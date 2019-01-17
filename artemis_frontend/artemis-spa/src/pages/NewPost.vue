<template>  
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h2 class="title"> Create Post</h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="tabs is-centered is-fullwidth is-large">
            <ul>
                <li class="is-active: true">
                    <a>Post</a>
                </li>
            </ul>
        </div>
        <div class="columns">
          <div class="column is-half is-offset-one-quarter">

            <div class="post">
                <div class="field">
                    <div class="control">
                        <input type="text" class="input is-large" v-model="body">
                    </div>
                </div>

                <div class="control">
                    <a class="button is-large is-primary" @click="submitPost">
                        <span class="icon is-small">
                            <i class="fa fa-check"></i>
                        </span>
                        <span>Submit</span>
                    </a>
                </div>
                
            </div>

            

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>  
export default {  
  data() {
    return {
      body: ''
    }
  },
  methods: {
      submitPost() {
        this.$store.dispatch('auth/submitNewPost', {
            body: this.body
        })
        .then(() => this.$router.push('/'))
        .catch((error) => {
          console.log('Error creating survey', error)
          this.$router.push('/')
        })
      }
  },
}
</script>

<style></style>  