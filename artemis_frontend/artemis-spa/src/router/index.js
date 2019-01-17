import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Post from '@/components/Post'
import NewPost from '@/components/NewPost'
import Login from '@/components/Login'
import store from '@/store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      beforeEnter (to, from, next) {
        if (!store.getters['auth/isAuthenticated']) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/posts/:id',
      name: 'Post',
      component: Post
    },
    {
      path: '/posts',
      name: 'NewPost',
      component: NewPost,
      beforeEnter (to, from, next) {
        if (!store.getters['auth/isAuthenticated']) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter (to, from, next) {
        if (store.getters['auth/isAuthenticated']) {
          next('/')
        } else {
          next()
        }
      }
    }
  ]
})
