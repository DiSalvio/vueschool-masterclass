import { createStore } from 'vuex'
import sourceData from '@/data.json'
import threadsModule from './threads'

export default createStore({
  modules: {
    threadsMod: threadsModule
  },
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  },
  getters: {
    authUser: state => state.users.find(user => user.id === state.authId)
  }
})
