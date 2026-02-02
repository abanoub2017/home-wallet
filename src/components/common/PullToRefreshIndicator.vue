<script setup lang="ts">
/**
 * Pull to Refresh Indicator Component
 *
 * Shows a visual indicator when pulling to refresh
 */

defineProps<{
    pullDistance: number
    isRefreshing: boolean
    threshold?: number
}>()

const defaultThreshold = 80
</script>

<template>
    <Transition name="pull">
        <div v-if="pullDistance > 0 || isRefreshing"
            class="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pointer-events-none"
            :style="{ height: `${Math.max(pullDistance, isRefreshing ? (threshold || defaultThreshold) : 0)}px` }">
            <div class="bg-white dark:bg-gray-800 rounded-full shadow-lg p-3 transition-transform" :style="{
                transform: `rotate(${(pullDistance / (threshold || defaultThreshold)) * 360}deg)`,
            }">
                <!-- Spinner when refreshing -->
                <svg v-if="isRefreshing" class="animate-spin h-6 w-6 text-primary-600 dark:text-primary-400" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <!-- Arrow when pulling -->
                <svg v-else class="h-6 w-6 text-primary-600 dark:text-primary-400 transition-transform"
                    :class="{ 'rotate-180': pullDistance >= (threshold || defaultThreshold) }" fill="none"
                    stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.pull-enter-active,
.pull-leave-active {
    transition: opacity 0.2s ease;
}

.pull-enter-from,
.pull-leave-to {
    opacity: 0;
}
</style>
