import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import pinia from '@/store/index.js'
createApp(App).use(pinia).mount('#app')
