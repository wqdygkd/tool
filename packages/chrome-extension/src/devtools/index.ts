import { createApp } from 'vue'
import App from './index.vue'

chrome.devtools.panels.create('Winex', '', 'src/devtools/index.html', function () {
  console.log('devtools panel create')
})

createApp(App).mount('#app')
