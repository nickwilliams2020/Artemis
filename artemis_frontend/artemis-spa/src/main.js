// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuesax from 'vuesax'
import VueMoment from 'vue-moment'
import App from './App'
import router from './router'
import store from './store'

import './services/DirectiveService'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css'

window.Vue = Vue;

Vue.use(Vuesax);
Vue.use(VueMoment);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
