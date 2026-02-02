<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useTheme } from '@/composables/useTheme'

/**
 * App Header Component
 * Shows user info and link to profile
 */

const { userInfo } = useAuth()
const { isDark, toggleTheme } = useTheme()

// Get display name (nickname or default role name)
function getDisplayName(): string {
    if (userInfo.value?.nickname) {
        return userInfo.value.nickname
    }
    return userInfo.value?.displayName || ''
}
</script>

<template>
    <header
        class="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors">
        <div class="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
            <!-- Logo & Title -->
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                    <span class="text-lg">💰</span>
                </div>
                <h1 class="font-bold text-gray-900 dark:text-white">محفظة المنزل</h1>
            </div>

            <!-- Actions -->
            <div class="flex items-center gap-3">
                <!-- Dark Mode Toggle -->
                <button @click="toggleTheme"
                    class="w-9 h-9 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    :aria-label="isDark ? 'التبديل للوضع الفاتح' : 'التبديل للوضع الداكن'">
                    <!-- Sun icon (shown in dark mode) -->
                    <svg v-if="isDark" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <!-- Moon icon (shown in light mode) -->
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                </button>

                <!-- User Avatar & Profile Link -->
                <router-link to="/profile" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <span class="text-sm text-gray-600 dark:text-gray-300">{{ getDisplayName() }}</span>
                    <div v-if="userInfo?.avatarBase64"
                        class="w-8 h-8 rounded-full overflow-hidden border-2 border-primary-100 dark:border-primary-900">
                        <img :src="userInfo.avatarBase64" alt="صورة الملف الشخصي" class="w-full h-full object-cover" />
                    </div>
                    <div v-else :class="[
                        'w-8 h-8 rounded-full flex items-center justify-center text-sm',
                        userInfo?.role === 'husband' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-pink-100 dark:bg-pink-900'
                    ]">
                        {{ userInfo?.role === 'husband' ? '👨' : '👩' }}
                    </div>
                </router-link>
            </div>
        </div>
    </header>
</template>
