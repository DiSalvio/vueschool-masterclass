import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router/'
import { initializeApp } from 'firebase/app'
import firebaseConfig from '@/config/firebase.js'

// Initialize Firebase
initializeApp(firebaseConfig)

const requireComponent = require.context('@/components', true, /App[A-Z]\w+\.(vue|js)$/)

const forumApp = createApp(App)
forumApp.use(router)
requireComponent.keys().forEach((fileName) => {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
  forumApp.component(baseComponentName, baseComponentConfig)
})
forumApp.use(store)
forumApp.mount('#app')
