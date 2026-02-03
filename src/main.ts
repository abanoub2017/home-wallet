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

// Register Service Worker with auto-update
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
    onNeedRefresh() {
        // Auto reload when new version is available
        updateSW(true)
    },
    onOfflineReady() {
        console.log('App ready to work offline')
    },
    immediate: true,
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
