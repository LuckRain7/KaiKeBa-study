import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {
      auth: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 需要登录
    const token = localStorage.getItem('test-token')
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.path }
      })
    }
  } else {
    next()
  }
})

export default router
