<template>
  <div id="app">
    <section class="main-section">
      <router-view/>
    </section>
    
    <section class="sidebar-section" id="sidebar-section" v-if="isAuthenticated">
      <sidebar parent="sidebar-section" :show="isAuthenticated" :user="user"></sidebar>
    </section>
    
  </div>
</template>

<script>
import Sidebar from '@/components/utils/Sidebar'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {Sidebar},
  computed: mapState({
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated']
    },
    user: state => state.auth.user
  })
}
</script>

<style lang="scss">
@import '~bulma/bulma';

#main-section {
  float:right
}

.sidebar-section {
  overflow: hidden;
}
</style>
