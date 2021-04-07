import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {title: 'Главная страничка'}
  },
  {
    path: '/documents/:section?',
    name: 'Documents',
    component: () => import(/* webpackChunkName: "documents" */ '../views/Documents.vue'),
    meta: {title: 'Портфолио'}
  },
  {
    path: '/video/:section?',
    name: 'Video',
    component: () => import(/* webpackChunkName: "video" */ '../views/Video.vue'),
    meta: {title: 'Видео'}
  },
  {
    path: '/scenario/:section?',
    name: 'Scenario',
    component: () => import(/* webpackChunkName: "scenario" */ '../views/Scenario.vue'),
    meta: {title: 'Методическая копилка'},
    children: [
      {
        path: 'content/:nameScenario',
        component: () => import(/* webpackChunkName: "scenarioFull" */ '../views/ScenarioFull.vue'),
        name: 'ScenarioFull',
        meta: {title: 'Сценарий'}
      }
    ]
  },
  {
    path: '/photo/:section?',
    name: 'Photo',
    component: () => import(/* webpackChunkName: "video" */ '../views/Photo.vue'),
    meta: {title: 'Фото'}
  },
  {
    path: '/panel/:section?',
    name: 'Panel',
    component: () => import(/* webpackChunkName: "panel" */ '../views/Panel.vue'),
    meta: {title: 'Панель управления'}
  },
  {
    path: '*',
    name: 'Error404',
    component: () => import(/* webpackChunkName: "video" */ '../views/Error404.vue'),
    meta: {title: 'Страничка не найдена'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'kidseason.ru';
  next();
})

export default router
