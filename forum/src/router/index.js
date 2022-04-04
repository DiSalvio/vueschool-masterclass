import PageHome from '@/pages/PageHome.vue'
import PageThreadShow from '@/pages/PageThreadShow.vue'
import PageNotFound from '@/pages/PageNotFound.vue'
import PageUserProfile from '@/pages/PageUserProfile.vue'
import CategoryShow from '@/pages/CategoryShow.vue'
import ForumShow from '@/pages/ForumShow.vue'
import { createRouter, createWebHistory } from 'vue-router'
import sourceData from '@/data.json'

const routes = [
  {
    path: '/',
    name: 'PageHome',
    component: PageHome
  },
  {
    path: '/profile',
    name: 'PageUserProfile',
    component: PageUserProfile
  },
  {
    path: '/forum/:id',
    name: 'ForumShow',
    component: ForumShow,
    props: true
  },
  {
    path: '/category/:id',
    name: 'CategoryShow',
    component: CategoryShow,
    props: true
  },
  {
    path: '/thread/:id',
    name: 'PageThreadShow',
    component: PageThreadShow,
    props: true,
    beforeEnter (to, from, next) {
      const threadExists = sourceData.threads.find(thread => thread.id === to.params.id)
      if (threadExists) {
        return next()
      } else {
        return next({
          name: 'PageNotFound',
          params: { pathMatch: to.path.substring(1).split('/') },
          query: to.query,
          hash: to.hash
        })
      }
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'PageNotFound',
    component: PageNotFound
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
