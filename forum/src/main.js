import { createApp } from 'vue'
import App from './App.vue'
import PageHome from './components/PageHome.vue'
import PageThreadShow from './components/PageThreadShow.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'PageHome',
    component: PageHome
  },
  {
    path: '/thread/:id',
    name: 'PageThreadShow',
    component: PageThreadShow,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const forumApp = createApp(App)
forumApp
  .use(router)
  .mount('#app')
