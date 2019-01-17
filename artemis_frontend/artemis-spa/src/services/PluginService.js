import Vue from 'vue'
import PortalVue from 'portal-vue'
import VueProgressBar from 'vue-progressbar'

// portal
Vue.use(PortalVue)

// progress bar
const options = {
  color: '#04BEFF',
  failedColor: '#874b4b',
  thickness: '2px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}

Vue.use(VueProgressBar, options)
