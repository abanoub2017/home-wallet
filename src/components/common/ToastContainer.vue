<script setup lang="ts">
import { useToast } from '@/composables/useToast'

/**
 * Toast Container Component
 *
 * Displays toast notifications at fixed position
 * Should be added once in App.vue
 */

const { toasts, remove } = useToast()

// Get icon based on toast type
function getIcon(type: string): string {
    switch (type) {
        case 'success':
            return '✓'
        case 'error':
            return '✕'
        case 'warning':
            return '⚠'
        case 'info':
        default:
            return 'ℹ'
    }
}

// Get styles based on toast type
function getTypeClasses(type: string): string {
    switch (type) {
        case 'success':
            return 'bg-green-500 text-white'
        case 'error':
            return 'bg-red-500 text-white'
        case 'warning':
            return 'bg-yellow-500 text-white'
        case 'info':
        default:
            return 'bg-blue-500 text-white'
    }
}

function getIconBgClasses(type: string): string {
    switch (type) {
        case 'success':
            return 'bg-green-600'
        case 'error':
            return 'bg-red-600'
        case 'warning':
            return 'bg-yellow-600'
        case 'info':
        default:
            return 'bg-blue-600'
    }
}
</script>

<template>
    <Teleport to="body">
        <div class="fixed top-4 left-4 right-4 z-[100] flex flex-col items-center gap-2 pointer-events-none">
            <TransitionGroup name="toast">
                <div v-for="toast in toasts" :key="toast.id" :class="[
                    'w-full max-w-sm rounded-xl shadow-lg pointer-events-auto',
                    'flex items-center gap-3 px-4 py-3',
                    'transform transition-all duration-300',
                    getTypeClasses(toast.type)
                ]">
                    <!-- Icon -->
                    <div :class="[
                        'w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0',
                        getIconBgClasses(toast.type)
                    ]">
                        {{ getIcon(toast.type) }}
                    </div>

                    <!-- Message -->
                    <p class="flex-1 text-sm font-medium">{{ toast.message }}</p>

                    <!-- Close Button -->
                    <button @click="remove(toast.id)"
                        class="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors flex-shrink-0">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<style scoped>
/* Toast enter/leave animations */
.toast-enter-active {
    animation: toast-in 0.3s ease-out;
}

.toast-leave-active {
    animation: toast-out 0.3s ease-in;
}

@keyframes toast-in {
    from {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

@keyframes toast-out {
    from {
        opacity: 1;
        transform: translateY(0) scale(1);
    }

    to {
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
    }
}
</style>
