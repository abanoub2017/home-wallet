<script setup lang="ts">
/**
 * Stat Card Component
 *
 * Displays a statistic with icon, value, and label
 */

defineProps<{
    icon?: string
    label: string
    value: string | number
    subValue?: string
    color?: 'primary' | 'blue' | 'pink' | 'green' | 'red' | 'yellow'
    size?: 'sm' | 'md' | 'lg'
}>()

function getColorClasses(color: string = 'primary'): { bg: string; text: string; icon: string } {
    const colors: Record<string, { bg: string; text: string; icon: string }> = {
        primary: { bg: 'bg-primary-50 dark:bg-primary-900/30', text: 'text-primary-600 dark:text-primary-400', icon: 'bg-primary-100 dark:bg-primary-900/50' },
        blue: { bg: 'bg-blue-50 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400', icon: 'bg-blue-100 dark:bg-blue-900/50' },
        pink: { bg: 'bg-pink-50 dark:bg-pink-900/30', text: 'text-pink-600 dark:text-pink-400', icon: 'bg-pink-100 dark:bg-pink-900/50' },
        green: { bg: 'bg-green-50 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400', icon: 'bg-green-100 dark:bg-green-900/50' },
        red: { bg: 'bg-red-50 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400', icon: 'bg-red-100 dark:bg-red-900/50' },
        yellow: { bg: 'bg-yellow-50 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400', icon: 'bg-yellow-100 dark:bg-yellow-900/50' },
    }
    return colors[color] ?? colors.primary!
}
</script>

<template>
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div class="flex items-start gap-3">
            <!-- Icon -->
            <div v-if="icon"
                :class="[getColorClasses(color).icon, 'w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0']">
                {{ icon }}
            </div>

            <div class="flex-1 min-w-0">
                <!-- Label -->
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ label }}</p>

                <!-- Value -->
                <p :class="[
                    'font-bold text-gray-900 dark:text-white',
                    size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-lg' : 'text-xl'
                ]">
                    {{ value }}
                </p>

                <!-- Sub Value -->
                <p v-if="subValue" class="text-xs text-gray-400 dark:text-gray-500 mt-1">{{ subValue }}</p>
            </div>
        </div>
    </div>
</template>
