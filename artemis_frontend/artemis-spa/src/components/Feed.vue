<template id="feed">
    <div class="container has-text-centered" >
        <vs-alert title="No Posts To Display" :active="posts.length === 0" color="dark">
            You can add a new post by clicking the "Create Post" button on the sidebar!    
        </vs-alert>

        <div v-for="post in posts" v-bind:key="post.id" class="post">
            <vs-row vs-justify="center">
              <vs-col type="flex" vs-justify="center" vs-align="center" vs-w="6">
                <vs-card actionable class="cardx">
                  <div slot="header">

                        <vs-avatar size="large" :src="post.user.avatar" class="avatar" />
                        <div class="postHead">
                            <span class="author">
                                {{ post.user.name }}
                            </span>
                            {{ getTimeDiff(post.timestamp) }}
                        </div>

                  </div>
                  <div class="postContent">
                    <span >{{post.body}}</span>
                  </div>
                  <div slot="footer">
                    <vs-row vs-justify="flex-end">
                      <vs-button color="success" @click="like(post.user.name)" icon="thumb_up_alt"/>
                      <vs-button color="danger" @click="deletePost" icon="delete"/>
                    </vs-row>
                  </div>
                </vs-card>
              </vs-col>
            </vs-row>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        computed: mapState({
            posts: state => state.auth.posts.data
        }),
        beforeMount() {
            this.$store.dispatch('auth/loadPosts')
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
            },

            deletePost(e) {
                // TODO: add functionality to handle deleting post from server
                this.$vs.notify({
                    color:'danger',
                    title:'Post temporarily removed. Refresh page to get it back!',
                    text:''
                })
                this.posts.shift()
            },

            like(name) {
                // TODO: add functionality to handle post metadata here and in backend database
                let message = name + " says thank you!"
                this.$vs.notify({
                    color:'success',
                    title:'Liked!',
                    text: message
                })
            }
        }
    }
    
</script>

<style>
    .avatarContainer {
        margin-right: 20px;
    }

    .avatar {
        margin-top: 3px;
        border-radius: 50%;
        float: left;
    }

    .postBody {
        margin-top: 5px;
    }

    .postHead {
        font-size: 13px;
    }

    .author {
        font-size: 14px;
        font-weight: bold;
    }

    .postContent {
        font-size: 14px;
        line-height: 20px;
        margin-top: 8px;
    }
    /* .post {
        background-color: lightgrey;
    } */
</style>
``