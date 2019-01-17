<template>  
<nav class="navbar is-light" role="navigation" aria-label="main navigation">  
  <div class="navbar-menu">
    <div class="navbar-end">
      <router-link to="/" class="navbar-item">
        Home
      </router-link>
      <router-link v-if="isAuthenticated" to='/posts' class="navbar-item">
        Create Post
      </router-link>
      <router-link v-if="!isAuthenticated" to="/login" class="navbar-item">
        Login
      </router-link>
      <a v-if="isAuthenticated" class="navbar-item" @click="logout">Logout</a>
    </div>
  </div>
</nav>  
</template>

<script>  
export default {  
  computed: {
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout')
      .then(() => this.$router.push('/login'))
    }
  }
}
</script>

<style>

</style> 