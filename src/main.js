import Vue from 'vue'
import VueBus from './vue-bus'
import App from './App.vue'
import router from './router'

import './plugins/element.js'

Vue.config.productionTip = false

Vue.use(VueBus)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
