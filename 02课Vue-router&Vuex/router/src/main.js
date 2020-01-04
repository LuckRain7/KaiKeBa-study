import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 路由守卫

router.beforeEach((to, from, next) => {
  console.log('before Each',to,from);
  next();
})

// 时间触发的比前置钩子晚
router.beforeResolve((to, from, next) => {
  console.log('before Resolve',to,from);
  next();
})

router.afterEach((to, from) => {
  console.log('after Each',to,from);
})



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
