<script setup lang="ts">
/**
 * Skeleton Loader Component
 *
 * Animated placeholder for loading content
 * Supports different variants: text, circle, card, expense
 */

defineProps<{
    variant?: 'text' | 'circle' | 'card' | 'expense' | 'stat'
    width?: string
    height?: string
    count?: number
}>()
</script>

<template>
    <!-- Text Skeleton -->
    <template v-if="variant === 'text' || !variant">
        <div v-for="n in (count || 1)" :key="n" class="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg"
            :style="{ width: width || '100%', height: height || '1rem' }" :class="{ 'mt-2': n > 1 }" />
    </template>

    <!-- Circle Skeleton (Avatar) -->
    <template v-else-if="variant === 'circle'">
        <div class="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full"
            :style="{ width: width || '3rem', height: height || '3rem' }" />
    </template>

    <!-- Card Skeleton -->
    <template v-else-if="variant === 'card'">
        <div v-for="n in (count || 1)" :key="n"
            class="animate-pulse bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4"
            :class="{ 'mt-3': n > 1 }">
            <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                <div class="flex-1 space-y-2">
                    <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
                <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-16" />
            </div>
        </div>
    </template>

    <!-- Expense List Skeleton -->
    <template v-else-if="variant === 'expense'">
        <div
            class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div v-for="n in (count || 3)" :key="n" class="p-4 animate-pulse"
                :class="{ 'border-t border-gray-100 dark:border-gray-700': n > 1 }">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl shrink-0" />
                    <div class="flex-1 min-w-0 space-y-2">
                        <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
                        <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32" />
                    </div>
                    <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20 shrink-0" />
                </div>
            </div>
        </div>
    </template>

    <!-- Stat Card Skeleton -->
    <template v-else-if="variant === 'stat'">
        <div
            class="animate-pulse bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-4" />
            <div class="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2" />
            <div class="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16" />
        </div>
    </template>
</template>
