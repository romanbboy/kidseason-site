import Vue from 'vue'
import VueYandexMetrika from 'vue-yandex-metrika'
import App from './App.vue'
import router from './router'
import store from './store'

import '@fortawesome/fontawesome-free/css/all.css'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false

Vue.use(VueYandexMetrika, {
  id: 75328105,
  router: router,
  env: process.env.NODE_ENV,
  options: {
    clickmap:true,
    trackLinks:true,
    accurateTrackBounce:true
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
