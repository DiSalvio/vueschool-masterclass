import PageHome from '@/pages/PageHome.vue'
import PageThreadShow from '@/pages/PageThreadShow.vue'
import PageThreadAdd from '@/pages/PageThreadAdd.vue'
import PageThreadEdit from '@/pages/PageThreadEdit.vue'
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
    component: PageUserProfile,
    meta: { scrollToTop: true, smoothScroll: true }
  },
  {
    path: '/profile/edit',
    name: 'PageUserProfileEdit',
    component: PageUserProfile,
    props: { editing: true }
  },
  {
    path: '/forum/:forumId/thread/add',
    name: 'PageThreadAdd',
    component: PageThreadAdd,
    props: true
  },
  {
    path: '/thread/:threadId/edit',
    name: 'PageThreadEdit',
    component: PageThreadEdit,
    props: true
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
  routes,
  scrollBehavior (to) {
    const scroll = {}
    if (to.meta.scrollToTop) scroll.top = 0
    if (to.meta.smoothScroll) scroll.behavior = 'smooth'
    return scroll
  }
})
