import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/a'
  },
  // {
  //   path: '/a',
  //   name: 'pageA',
  //   component: () => import(/* webpackChunkName: "pageA" */ './views/pageA.vue')
  // },
  {
    path: '/a',
    name: 'pageA',
    components: {
      default: () =>
        import(/* webpackChunkName: "pageA" */ './views/pageA.vue'),
      david: () => import(/* webpackChunkName: "pageB" */ './views/pageB.vue')
    }
  }
  // {
  //   path: '/b/:id',
  //   name: 'pageB',
  //   component: () =>
  //     import(/* webpackChunkName: "pageB" */ './views/pageB.vue'),
  //   children: [
  //     {
  //       path: 'test',
  //       component: () =>
  //         import(/* webpackChunkName: "Test" */ './components/Test.vue')
  //     }
  //   ]
  // }
]

export default new Router({
  mode: 'history',
  routes
})
