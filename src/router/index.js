import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/limits/polynomials',
    name: 'PolynomialLimitPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/limits/PolynomialLimitPage.vue'),
  },
  {
    path: '/limits/rational',
    name: 'RationalLimitPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/limits/RationalLimitPage.vue'),
  },
  {
    path: '/limits/exponentials',
    name: 'ExponentialLimitPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/limits/ExponentialLimitPage.vue'),
  },
  {
    path: '/limits/radicals',
    name: 'RadicalLimitPage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/limits/RadicalLimitPage.vue'),
  },
  {
    path: '/derivatives/logarithms',
    name: 'LogarithmicDerivativePage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/derivatives/LogarithmicDerivativePage.vue'),
  },
  {
    path: '/derivatives/polynomials',
    name: 'PolynomialDerivativePage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/derivatives/PolynomialDerivativePage.vue'),
  },
  {
    path: '/derivatives/exponentials',
    name: 'ExponentialDerivativePage',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/derivatives/ExponentialDerivativePage.vue'),
  },
  {
    path: '/quiz',
    name: 'Quiz',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Quiz.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
