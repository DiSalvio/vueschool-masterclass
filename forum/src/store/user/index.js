import sourceData from '@/data.json'
import { findById, replaceItemInArray } from '@/helpers/index.js'

const userModule = {
  state: {
    users: sourceData.users,
    posts: sourceData.posts,
    threads: sourceData.threads
  },
  getters: {
    authUser (state, getters, rootState) {
      const user = findById(state.users, rootState.authId)
      if (!user) return null
      return {
        ...user,
        get posts () {
          return state.posts.filter(post => post.userId === user.id)
        },
        get postsCount () {
          return this.posts.length
        },
        get threads () {
          return state.threads.filter(thread => thread.userId === user.id)
        },
        get threadsCount () {
          return this.threads.length
        }
      }
    }
  },
  actions: {
    saveUserProfileChanges ({ commit }, user) {
      commit('setUser', { user, userId: user.id })
    }
  },
  mutations: {
    setUser (state, { user, userId }) {
      replaceItemInArray(state.users, user)
    }
  }
}

export default userModule
