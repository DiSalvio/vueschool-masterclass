import sourceData from '@/data.json'

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
      commit('addThreadToForum', { threadId: newThread.id, forumId: forumId })
      dispatch('createPost', { text, threadId: newThread.id })
      return state.threads.find(thread => thread.id === newThread.id)
    },
    createPost ({ state, commit, rootState }, post) {
      post.id = 'gggg' + Math.random()
      post.publishedAt = Math.floor(Date.now() / 1000)
      post.userId = rootState.authId
      commit('setPost', { post })
      commit('addPostToThread', { postId: post.id, threadId: post.threadId })
    }
  },
  mutations: {
    setThread (state, { newThread }) {
      state.threads.push(newThread)
    },
    addThreadToForum (state, { threadId, forumId }) {
      state.forums.find(forum => forum.id === forumId).threads.push(threadId)
    },
    setPost (state, { post }) {
      state.posts.push(post)
    },
    addPostToThread (state, { postId, threadId }) {
      state.threads.find(thread => thread.id === threadId).posts.push(postId)
    }
  }
}

export default threadsModule
