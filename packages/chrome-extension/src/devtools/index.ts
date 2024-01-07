import { createApp } from 'vue'
import Index from './index.vue'

chrome.devtools.panels.create('Winex', '', 'src/devtools/index.html', function () {
  console.log('devtools panel create')
})

createApp(Index).mount('#app')
