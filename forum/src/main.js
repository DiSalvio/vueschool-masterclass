import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router/'

const requireComponent = require.context('@/components', true, /App[A-Z]\w+\.(vue|js)$/)

const forumApp = createApp(App)
forumApp.use(router)
requireComponent.keys().forEach((fileName) => {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || fileName.replace(/^.+\//, '').replace(/\.\w+$/, '')
  forumApp.component(baseComponentName, baseComponentConfig)
})
forumApp.mount('#app')
