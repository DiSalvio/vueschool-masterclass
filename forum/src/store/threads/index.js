import sourceData from '@/data.json'
import {
  findById,
  makeReplaceItemInArray,
  makeAddChildToParent,
  makeSetItem
} from '@/helpers/index.js'

const threadsModule = {
  state () {
    return {
      forums: sourceData.forums,
      threads: sourceData.threads,
      posts: sourceData.posts,
      users: sourceData.users
    }
  },
  getters: {
    thread (state) {
      return (threadId) => findById(state.threads, threadId)
    },
    threadFirstPost (state, getters) {
      return (threadId) => findById(state.posts, getters.thread(threadId).posts[0])
    }
  },
  actions: {
    async createThread ({ state, commit, rootState, dispatch }, { text, title, forumId }) {
      const newThread = {
        id: 'ttvv' + Math.random(),
        forumId: forumId,
        publishedAt: Math.floor(Date.now() / 1000),
        title: title,
        userId: rootState.authId,
        posts: []
      }
      commit('setThread', { item: newThread })
      commit('addThreadToForum', { childId: newThread.id, parentId: forumId })
      dispatch('createPost', { text, threadId: newThread.id })
      return findById(state.threads, newThread.id)
    },
    createPost ({ state, commit, rootState }, post) {
      post.id = 'gggg' + Math.random()
      post.publishedAt = Math.floor(Date.now() / 1000)
      post.userId = rootState.authId
      commit('setPost', { item: post })
      commit('addPostToThread', { childId: post.id, parentId: post.threadId })
    },
    async updateThread ({ state, commit, getters }, { title, text, threadId }) {
      const thread = getters.thread(threadId)
      const post = getters.threadFirstPost(threadId)
      const newThread = {
        ...thread,
        title
      }
      const newPost = {
        ...post,
        text
      }
      commit('updateThread', { item: newThread })
      commit('updatePost', { item: newPost })
      return newThread
    }
  },
  mutations: {
    setThread: makeSetItem({ resource: 'threads' }),
    addThreadToForum: makeAddChildToParent({ parent: 'forums', child: 'threads' }),
    updateThread: makeReplaceItemInArray({ resource: 'threads' }),
    setPost: makeSetItem({ resource: 'posts' }),
    addPostToThread: makeAddChildToParent({ parent: 'threads', child: 'posts' }),
    updatePost: makeReplaceItemInArray({ resource: 'posts' })
  }
}

export default threadsModule
