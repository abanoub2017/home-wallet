<script setup lang="ts">
/**
 * Floating Action Button Component
 *
 * A floating button for primary actions
 */

defineProps<{
    to?: string
    icon?: 'plus' | 'edit' | 'check'
    position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
    offset?: 'default' | 'nav' // nav adds extra offset for bottom nav
}>()

defineEmits<{
    click: []
}>()
</script>

<template>
    <component :is="to ? 'router-link' : 'button'" :to="to" @click="!to && $emit('click')" :class="[
        'fixed z-40 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg',
        'flex items-center justify-center transition-all hover:scale-105 active:scale-95',
        position === 'bottom-left' ? 'left-4' : position === 'bottom-center' ? 'left-1/2 -translate-x-1/2' : 'right-4',
        offset === 'nav' ? 'bottom-20' : 'bottom-6'
    ]">
        <!-- Plus Icon -->
        <svg v-if="icon === 'plus' || !icon" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>

        <!-- Edit Icon -->
        <svg v-else-if="icon === 'edit'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>

        <!-- Check Icon -->
        <svg v-else-if="icon === 'check'" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
    </component>
</template>
