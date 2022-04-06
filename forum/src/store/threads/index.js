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
    thread (state) {
      return (threadId) => state.threads.find(thread => thread.id === threadId)
    },
    threadFirstPost (state, getters) {
      return (threadId) => state.posts.find(post => post.id === getters.thread(threadId).posts[0])
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
    addThreadToForum (state, { threadId, forumId }) {
      state.forums.find(forum => forum.id === forumId).threads.push(threadId)
    },
    updateThread (state, { newThread }) {
      state.threads[state.threads.findIndex(thread => thread.id === newThread.id)] = newThread
    },
    setPost (state, { post }) {
      state.posts.push(post)
    },
    addPostToThread (state, { postId, threadId }) {
      state.threads.find(thread => thread.id === threadId).posts.push(postId)
    },
    updatePost (state, { newPost }) {
      state.posts[state.posts.findIndex(post => post.id === newPost.id)] = newPost
    }
  }
}

export default threadsModule
