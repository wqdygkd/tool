import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'

const app = createApp(App)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)
// const log = console.log
// console.log = (...arg) => {
//   log(...arg)
// }


app.mount('#app')


