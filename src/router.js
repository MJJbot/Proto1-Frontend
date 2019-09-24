import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/dashboard.vue')
    },
    {
      path: '/customQA',
      name: 'customQA',
      component: () => import('./views/customQA.vue')
    },
    {
      path: '/autoFAQ',
      name: 'autoFAQ',
      component: () => import('./views/automaticFAQ.vue')
    },
    {
      path: '/predefinedQA',
      name: 'predefinedQA',
      component: () => import('./views/predefinedQA.vue')
    },
    {
      path: '/command',
      name: 'command',
      component: () => import('./views/twitchCommand.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('./views/test.vue')
    },
    {
      path: '/donator',
      name: 'donator',
      component: () => import('./views/DonatorPage.vue')
    },
    // {
    //   path:'*',
    //   component: NotFoundComponent
    // }
  ]
})
