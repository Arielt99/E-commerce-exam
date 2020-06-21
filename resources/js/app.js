import Vue from 'vue'
import App from './App.vue'
import router from './routeur/index'
import store from './store'
import Vuelidate from 'vuelidate'
require('./bootstrap');
import moment from 'moment'
Vue.prototype.$moment = moment

Vue.use(Vuelidate)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


