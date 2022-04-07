import sourceData from '@/data.json'
import { findById, makeReplaceItemInArray } from '@/helpers/index.js'

const userModule = {
  state: {
    users: sourceData.users,
    posts: sourceData.posts,
    threads: sourceData.threads
  },
  getters: {
    authUser (state, getters, rootState) {
      return getters.user(rootState.authId)
    },
    user: state => {
      return (id) => {
        const user = findById(state.users, id)
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
    }
  },
  actions: {
    saveUserProfileChanges ({ commit }, user) {
      commit('setUser', { item: user })
    }
  },
  mutations: {
    setUser: makeReplaceItemInArray({ resource: 'users' })
  }
}

export default userModule
