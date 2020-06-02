import Vue from 'vue';
import App from './App.vue';
import router from './routeur/index';


new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

