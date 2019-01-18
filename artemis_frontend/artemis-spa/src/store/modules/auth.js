import router from '@/router'

// imports of AJAX functions go here
import { fetchPosts, fetchPost, postNewPost, authenticate, register  } from '@/api'
import { isValidJwt, EventBus } from '@/utils'

export default {

    namespaced: true,

    state: {
        // single source of data
        posts: [],
        currentPost: {},
        user: {},
        access_token: null,
        tasks: [],
        completed_tasks: 0
    },

    getters: {
        // reusable data accessors
        getAccessToken: state => state.access_token,
        getUserName: state => state.user.name,
        getUser: state => state.user,
        getTasks: state => state.tasks,
        numTasks: state => state.tasks.length,
        numTasksCompleted: state => state.completed_tasks,
        isAuthenticated: state => isValidJwt(state.access_token)
    },

    mutations: { // this.$store.commit(',function name>, {...payload})
        // isolated data mutations
        setPosts(state, payload) {
            state.posts = payload
        },
        setPost (state, post) {
            state.currentPost = post
        },
        setUser (state, user) {
            state.user = user
        },
        setAccessToken (state, token) {
            state.access_token = token
        },
        clearAuth (state) {
            state.user = null
            state.access_token = null
        },
        addTask(state, taskDescription) {
            if(taskDescription) {
                var newTask = {
                    id: (state.tasks.length + 1),
                    description: taskDescription,
                    completed: false
                }
                state.tasks.unshift(newTask)
            }
        },
        
    },

    actions: { // this.$store.dispatch('<function name>')
    // asynchronous operations
        register (context, user) {
            return register(user)
            .then(context.dispatch('login', (({username, password}) => ({username, password}))(user) ))
            .catch((error) => {
                EventBus.$emit('failedRegistering', error)
            })
        },
        login (context, user) {
            return authenticate(user)
            .then((response) => {
                context.commit('setAccessToken', response.data.token)
                //console.log(response)
                context.commit('setUser', response.data.user)
            })
            .catch((error) => {
                EventBus.$emit('failedAuthentication', error)
            })
        },
        logout (context) {
            context.commit('clearAuth')
            router.push('/login')
        },
        addTask(context, taskDescription) {
            context.commit('addTask', taskDescription)
        },
        completeTask({commit, state}, id) {
            let num_completed = state.completed_tasks;
            let total_tasks = state.tasks.length;

            if (num_completed < total_tasks){
                var task = state.tasks.find((t) => {
                    return t.id == id
                })
                if (task) {
                    task['completed'] = true;

                    state.completed_tasks++
                }
            }
        },
        submitNewPost (context, post) {
            return postNewPost(post, context.state.access_token)
        },
        loadPost(context, { id }) {
            return fetchPost(id)
            .then((response) => context.commit('setPost', response))
        },
        loadPosts(context) {
            return fetchPosts()
            .then((response) => context.commit('setPosts', response))
        }
    }


}