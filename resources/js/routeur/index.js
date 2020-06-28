import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Brand',
    name: 'Catalog',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "contact" */ '../views/Catalog.vue')
    }
  },
  {
    path: '/Brand/:id',
    name: 'Brand',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "contact" */ '../views/Brand.vue')
    },
  },
  {
    path: '/Brand/:brandid/Product/:id',
    name: 'Product',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "contact" */ '../views/Product.vue')
    }
  },
  {
    path: '/Result/:search',
    name: 'Result',
    props: true,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "contact" */ '../views/SearchResult.vue')
    }
  },
  {
    path: '/News',
    name: 'News',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "contact" */ '../views/News.vue')
    }
  },
  {
    path: '/News/:id',
    name: 'SpecificNews',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "contact" */ '../views/SpecificNews.vue')
    }
  },
  {
    path:'/Command',
    name: 'Command',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "contact" */ '../views/Command.vue')
    },
    meta:{
        requiresCart : true
    }
  },
  {
    path: '/Contact',
    name: 'Contact',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
    }
  },
  {
    path: '/login',
    name: 'admin.login',
    component: function () {
      return import(/* webpackChunkName: "contact" */ '../views/Admin/Login.vue')
    },
    meta:{
        requiresAuth : false
    }
},
{
    path: '/admin',
    name: 'admin.dashboard',
    component: function () {
      return import(/* webpackChunkName: "contact" */ '../views/Admin/Admin.vue')
    },
    meta:{
        requiresAuth : true
    }
},
{
  path: '/BrandAdmin',
  name: 'BrandAdmin',
  component: function () {
    return import(/* webpackChunkName: "contact" */ '../views/Admin/BrandAdmin.vue')
  },
  meta:{
      requiresAuth : true
  }
},
{
  path: '/ProductAdmin',
  name: 'ProductAdmin',
  component: function () {
    return import(/* webpackChunkName: "contact" */ '../views/Admin/ProductAdmin.vue')
  },
  meta:{
      requiresAuth : true
  }
},
{
  path: '/NewsAdmin',
  name: 'NewsAdmin',
  component: function () {
    return import(/* webpackChunkName: "contact" */ '../views/Admin/NewsAdmin.vue')
  },
  meta:{
      requiresAuth : true
  }
},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(routes => routes.meta.requiresAuth)
  const requiresCart = to.matched.some(routes => routes.meta.requiresCart)
  const currentCart = localStorage.getItem('tempBasket')
  const currentUser = localStorage.getItem('token')
  if (requiresCart && currentCart === null ) {
    next('/home')
}
  if (requiresAuth && currentUser === null ) {
      next('/login')
  }
  else if (requiresAuth && currentUser && (to.path === '/login' || to.path === '/homeAdmin')) {
      next('/admin')
  }
  else {
      next()
  }
});

export default router
