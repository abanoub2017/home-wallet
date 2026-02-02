<script setup lang="ts">
import AppHeader from './AppHeader.vue'
import AppNav from './AppNav.vue'

/**
 * App Layout Component
 * Wraps authenticated pages with header and navigation
 */
</script>

<template>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <AppHeader />

        <main class="flex-1 max-w-lg mx-auto w-full px-4 py-4 pb-20">
            <slot />
        </main>

        <AppNav />
    </div>
</template>
