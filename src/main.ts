import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createVfm } from 'vue-final-modal'

import '@/assets/scss/tailwind.css'
import 'vue-final-modal/style.css'
import '@/assets/scss/main.scss'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createVfm())

app.mount('#app')
