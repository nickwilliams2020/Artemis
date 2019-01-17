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

.header-sidebar{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  h4 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    button{
      margin-left: 10px;
    }
  }
}
.footer-sidebar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  button {
      border: 0px solid rgba(0,0,0,0) !important;
      border-left: 1px solid rgba(0,0,0,.07) !important;
      border-radius: 0px !important;
  }
}
</style>
