<script setup lang="ts">
/**
 * Empty State Component
 *
 * Displays a friendly message when there's no data
 * Supports custom icons, titles, descriptions, and action buttons
 */

defineProps<{
    icon?: string
    title: string
    description?: string
    actionLabel?: string
    actionTo?: string
}>()

defineEmits<{
    action: []
}>()
</script>

<template>
    <div
        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center transition-colors">
        <!-- Icon -->
        <div class="w-20 h-20 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
            <span class="text-4xl">{{ icon || '📭' }}</span>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">{{ title }}</h3>

        <!-- Description -->
        <p v-if="description" class="text-gray-500 dark:text-gray-400 text-sm mb-4 max-w-xs mx-auto">
            {{ description }}
        </p>

        <!-- Action Button -->
        <router-link v-if="actionLabel && actionTo" :to="actionTo"
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors">
            {{ actionLabel }}
        </router-link>

        <button v-else-if="actionLabel" @click="$emit('action')"
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors">
            {{ actionLabel }}
        </button>
    </div>
</template>
