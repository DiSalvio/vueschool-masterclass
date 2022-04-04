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
    createPost (context, post) {
      post.id = 'gggg' + Math.random()
      context.commit('setPost', { post })
      context.commit('addPostToThread', { postId: post.id, threadId: post.threadId })
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
