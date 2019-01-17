<template>
  <div>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h2 class="title">Home</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <feed></feed>
      </div>
    </section>
  </div>
</template>

<script>
import Feed from '@/components/Feed'
import { mapState } from 'vuex'

export default {
  components: {Feed},
  computed: mapState({
    user: state => state.auth.user
  })
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
