import Vue from 'vue'
import App from './App.vue'
import router from './routeur/index'
import store from './store'
import Vuelidate from 'vuelidate'
require('./bootstrap');

Vue.use(Vuelidate)

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(routes => routes.meta.requiresAuth)
  const currentUser = localStorage.getItem('token')
  if (requiresAuth && currentUser === null ) {
    //store.dispatch('attempt',localStorage.getItem('token'))
      next('/login')
  }
  else if (!requiresAuth && currentUser && (to.path === '/login' || to.path === '/homeAdmin')) {
      next('/admin')
  }
  else {
      next()
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');


