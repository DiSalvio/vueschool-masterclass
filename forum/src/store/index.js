import { createStore } from 'vuex'
import sourceData from '@/data.json'
import threadsModule from './threads'

export default createStore({
  modules: {
    threadsMod: threadsModule
  },
  state: sourceData
})
