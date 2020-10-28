import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/documents/:section?',
    name: 'Documents',
    component: () => import(/* webpackChunkName: "documents" */ '../views/Documents.vue')
  },
  {
    path: '/video/:section?',
    name: 'Video',
    component: () => import(/* webpackChunkName: "video" */ '../views/Video.vue')
  },
  {
    path: '/scenario/:section?',
    name: 'Scenario',
    component: () => import(/* webpackChunkName: "scenario" */ '../views/Scenario.vue'),
    children: [
      {
        path: 'content/:nameScenario',
        component: () => import(/* webpackChunkName: "scenarioFull" */ '../views/ScenarioFull.vue'),
        name: 'ScenarioFull'
      }
    ]
  },
  {
    path: '*',
    name: 'Error404',
    component: () => import(/* webpackChunkName: "video" */ '../views/Error404.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
