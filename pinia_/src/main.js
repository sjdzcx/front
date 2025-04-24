import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from '@/pinia/index.js'
createApp(App).use(createPinia()).mount('#app')
