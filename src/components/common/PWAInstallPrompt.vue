<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null)
const showInstallPrompt = ref(false)
const isInstalled = ref(false)

const handleBeforeInstallPrompt = (e: Event) => {
    e.preventDefault()
    deferredPrompt.value = e as BeforeInstallPromptEvent

    // Check if user dismissed before
    const dismissed = localStorage.getItem('pwa-install-dismissed')
    if (!dismissed) {
        showInstallPrompt.value = true
    }
}

const handleAppInstalled = () => {
    isInstalled.value = true
    showInstallPrompt.value = false
    deferredPrompt.value = null
}

const installApp = async () => {
    if (!deferredPrompt.value) return

    await deferredPrompt.value.prompt()
    const { outcome } = await deferredPrompt.value.userChoice

    if (outcome === 'accepted') {
        showInstallPrompt.value = false
    }

    deferredPrompt.value = null
}

const dismissPrompt = () => {
    showInstallPrompt.value = false
    localStorage.setItem('pwa-install-dismissed', 'true')
}

onMounted(() => {
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
        isInstalled.value = true
    }
})

onUnmounted(() => {
    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.removeEventListener('appinstalled', handleAppInstalled)
})
</script>

<template>
    <Transition enter-active-class="transition-all duration-300 ease-out" enter-from-class="opacity-0 translate-y-full"
        enter-to-class="opacity-100 translate-y-0" leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-full">
        <div v-if="showInstallPrompt && !isInstalled" class="fixed bottom-0 left-0 right-0 z-50 p-4 safe-area-bottom">
            <div
                class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-4 max-w-lg mx-auto">
                <div class="flex items-start gap-4">
                    <!-- App Icon -->
                    <div
                        class="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span class="text-2xl">💰</span>
                    </div>

                    <!-- Content -->
                    <div class="flex-1 min-w-0">
                        <h3 class="font-bold text-gray-900 dark:text-white text-lg">تثبيت التطبيق</h3>
                        <p class="text-gray-600 dark:text-gray-300 text-sm mt-1">
                            أضف محفظة المنزل إلى شاشتك الرئيسية للوصول السريع
                        </p>
                    </div>
                </div>

                <!-- Actions -->
                <div class="flex gap-3 mt-4">
                    <button @click="installApp"
                        class="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-indigo-700 active:scale-98 transition-all">
                        <span class="flex items-center justify-center gap-2">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            تثبيت
                        </span>
                    </button>
                    <button @click="dismissPrompt"
                        class="px-4 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl font-medium transition-colors">
                        لاحقاً
                    </button>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.safe-area-bottom {
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
</style>
