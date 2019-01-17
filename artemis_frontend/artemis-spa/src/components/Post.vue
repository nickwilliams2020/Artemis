<template>  
<div>  
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h2 class="title">Post {{ post.id }}</h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">

         <div class="postBody">
                <div class="avatarContainer">
                    <img :src="post.user.avatar" class="avatar" width="70" height="70">
                    <div class="postHead">
                    <span class="author">
                        {{ post.user.name }}
                    </span>
                    {{ getTimeDiff(post.timestamp) }}
                    </div>
                </div>
                
                <div class="postContent">
                    {{ post.body }}
                </div>
            </div>
      </div>
    </section>
  </div>

</template>

<script>  
import { fetchPost } from '@/api'  
export default {  
  data() {
    return {
      post: {}
    }
  },
  beforeMount() {
    fetchPost(parseInt(this.$route.params.id)).then((response) => {
      console.log(response)
        this.post = response.data.post
      })
  },
  methods: {
            getTimeDiff(timestamp) {
                let currTime = new Date();
                let postTime = new Date(timestamp);

                let diffMs = (currTime.getTime() - postTime.getTime())
               
                var diffDays = Math.floor(diffMs / 86400000); // days
                var diffHrs = Math.floor(diffMs / 3600000); // hours
                var diffMins = Math.round(diffMs / 60000); // minutes

                let elapsedTime = '';
                
                if (diffDays !== 0) {
                    elapsedTime = '' + diffDays + ' days ago.'
                } else if (diffHrs !== 0) {
                    elapsedTime = '' + diffHrs+ ' h'
                    
                    
                } else {
                    elapsedTime = '' + diffMins + ' m'
                }
                 
                return elapsedTime
            }
        }
}
</script>

<style>  
</style>  