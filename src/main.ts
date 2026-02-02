import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// Import global styles with Tailwind
import './assets/styles/main.css'

// Initialize theme
import { useTheme } from './composables/useTheme'
const { initTheme } = useTheme()
initTheme()

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
