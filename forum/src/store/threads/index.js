import sourceData from '@/data.json'
import { findById, replaceItemInArray, makeAddChildToParent } from '@/helpers/index.js'

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
      commit('setThread', { newThread })
      commit('addThreadToForum', { childId: newThread.id, parentId: forumId })
      dispatch('createPost', { text, threadId: newThread.id })
      return findById(state.threads, newThread.id)
    },
    createPost ({ state, commit, rootState }, post) {
      post.id = 'gggg' + Math.random()
      post.publishedAt = Math.floor(Date.now() / 1000)
      post.userId = rootState.authId
      commit('setPost', { post })
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
      commit('updateThread', { newThread })
      commit('updatePost', { newPost })
      return newThread
    }
  },
  mutations: {
    setThread (state, { newThread }) {
      state.threads.push(newThread)
    },
    addThreadToForum: makeAddChildToParent({ parent: 'forums', child: 'threads' }),
    updateThread (state, { newThread }) {
      replaceItemInArray(state.threads, newThread)
    },
    setPost (state, { post }) {
      state.posts.push(post)
    },
    addPostToThread: makeAddChildToParent({ parent: 'threads', child: 'posts' }),
    updatePost (state, { newPost }) {
      replaceItemInArray(state.posts, newPost)
    }
  }
}

export default threadsModule
