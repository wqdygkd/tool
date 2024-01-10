import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
// app.use(createPinia())
app.use(router)
const log = console.log
console.log = (...arg) => {
  log(...arg)
}

app.mount('#app')
