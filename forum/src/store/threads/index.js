import sourceData from '@/data.json'

const threadsModule = {
  state () {
    return {
      threads: sourceData.threads,
      posts: sourceData.posts
    }
  },
  getters: {
  },
  actions: {
    createPost ({ state, commit, rootState }, post) {
      post.id = 'gggg' + Math.random()
      post.publishedAt = Math.floor(Date.now() / 1000)
      post.userId = rootState.authId
      commit('setPost', { post })
      commit('addPostToThread', { postId: post.id, threadId: post.threadId })
    }
  },
  mutations: {
    setPost (state, { post }) {
      state.posts.push(post)
    },
    addPostToThread (state, { postId, threadId }) {
      state.threads.find(thread => thread.id === threadId).posts.push(postId)
    }
  }
}

export default threadsModule
