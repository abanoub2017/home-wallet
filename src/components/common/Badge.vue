<script setup lang="ts">
/**
 * Badge Component
 *
 * Small status indicator or label
 */

defineProps<{
    variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'husband' | 'wife'
    size?: 'sm' | 'md'
}>()

function getVariantClasses(variant: string = 'default'): string {
    const variants: Record<string, string> = {
        default: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
        success: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
        warning: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300',
        danger: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300',
        info: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
        husband: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
        wife: 'bg-pink-100 dark:bg-pink-900/50 text-pink-700 dark:text-pink-300',
    }
    return variants[variant] ?? variants.default!
}
</script>

<template>
    <span :class="[
        'inline-flex items-center font-medium rounded-full',
        getVariantClasses(variant),
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'
    ]">
        <slot />
    </span>
</template>
