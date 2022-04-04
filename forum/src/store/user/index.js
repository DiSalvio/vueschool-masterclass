import sourceData from '@/data.json'

const userModule = {
  state: {
    users: sourceData.users,
    posts: sourceData.posts,
    threads: sourceData.threads,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser: state => state.users.find(user => user.id === state.authId),
    userPosts (state) {
      return state.posts.filter(post => post.userId === state.authId)
    },
    userPostsCount (state, getters) {
      return getters.userPosts.length
    },
    userThreadsCount (state) {
      return state.threads.filter(thread => thread.userId === state.authId).length
    }
  }
}

export default userModule
