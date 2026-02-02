<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

/**
 * Bottom Navigation Component
 * Mobile-first navigation bar
 */

const route = useRoute()

const navItems = [
    { name: 'dashboard', path: '/dashboard', label: 'الرئيسية', icon: 'home' },
    { name: 'expenses', path: '/expenses', label: 'المصروفات', icon: 'list' },
    { name: 'add-expense', path: '/expenses/add', label: 'إضافة', icon: 'plus' },
    { name: 'settings', path: '/settings', label: 'الإعدادات', icon: 'settings' },
]

function isActive(name: string): boolean {
    return route.name === name
}
</script>

<template>
    <nav
        class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-40 safe-area-bottom transition-colors">
        <div class="max-w-lg mx-auto px-4">
            <div class="flex items-center justify-around h-16">
                <router-link v-for="item in navItems" :key="item.name" :to="item.path" :class="[
                    'flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-colors min-w-[64px]',
                    isActive(item.name)
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                ]">
                    <!-- Home Icon -->
                    <svg v-if="item.icon === 'home'" class="w-6 h-6" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>

                    <!-- List Icon -->
                    <svg v-else-if="item.icon === 'list'" class="w-6 h-6" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>

                    <!-- Plus Icon (Add) -->
                    <div v-else-if="item.icon === 'plus'" :class="[
                        'w-10 h-10 rounded-full flex items-center justify-center -mt-4 shadow-lg',
                        isActive(item.name) ? 'bg-primary-600' : 'bg-primary-500'
                    ]">
                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>

                    <!-- Settings Icon -->
                    <svg v-else-if="item.icon === 'settings'" class="w-6 h-6" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>

                    <span v-if="item.icon !== 'plus'" class="text-xs font-medium">
                        {{ item.label }}
                    </span>
                </router-link>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.safe-area-bottom {
    padding-bottom: env(safe-area-inset-bottom, 0);
}
</style>
