import '@wqdy/tool-core/src/utils/GM'
import './inject.ts'

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

const appRoot = document.createElement('div')
appRoot.id = 'us-appRoot'
document.body?.appendChild(appRoot)
app.mount('#us-appRoot')

window.addEventListener('load', () => {
  if (!document.querySelector('#us-appRoot')) {
    document.body.appendChild(appRoot)
    app.mount('#us-appRoot')
  }
})