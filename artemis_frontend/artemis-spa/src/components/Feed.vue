``<template id="feed">
    <div class="container has-text-centered">
        <div v-for="post in posts" v-bind:key="post.id" class="post">

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
            <br>
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