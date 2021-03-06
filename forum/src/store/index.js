import { createStore } from 'vuex'
import sourceData from '@/data.json'
import threadsModule from './threads'
import userModule from './user'

export default createStore({
  modules: {
    threadsMod: threadsModule,
    userMod: userModule
  },
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3'
  }
})
