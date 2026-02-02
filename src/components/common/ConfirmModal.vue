<script setup lang="ts">
/**
 * Confirm Modal Component
 * Reusable confirmation dialog for delete actions
 */

defineProps<{
    show: boolean
    title?: string
    message: string
    confirmText?: string
    cancelText?: string
    type?: 'danger' | 'warning' | 'info'
    isLoading?: boolean
}>()

const emit = defineEmits<{
    confirm: []
    cancel: []
}>()

function handleConfirm() {
    emit('confirm')
}

function handleCancel() {
    emit('cancel')
}
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/50" @click="handleCancel" />

                <!-- Modal -->
                <div
                    class="relative bg-white dark:bg-gray-800 w-full max-w-sm rounded-2xl p-6 shadow-xl transition-colors">
                    <!-- Icon -->
                    <div class="flex justify-center mb-4">
                        <div :class="[
                            'w-14 h-14 rounded-full flex items-center justify-center',
                            type === 'danger' ? 'bg-red-100 dark:bg-red-900/30' : type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900/30' : 'bg-blue-100 dark:bg-blue-900/30'
                        ]">
                            <!-- Danger Icon -->
                            <svg v-if="type === 'danger'" class="w-7 h-7 text-red-600 dark:text-red-400" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>

                            <!-- Warning Icon -->
                            <svg v-else-if="type === 'warning'" class="w-7 h-7 text-yellow-600 dark:text-yellow-400"
                                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>

                            <!-- Info Icon -->
                            <svg v-else class="w-7 h-7 text-blue-600 dark:text-blue-400" fill="none"
                                stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    <!-- Title -->
                    <h3 v-if="title" class="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
                        {{ title }}
                    </h3>

                    <!-- Message -->
                    <p class="text-gray-600 dark:text-gray-300 text-center mb-6">
                        {{ message }}
                    </p>

                    <!-- Buttons -->
                    <div class="flex gap-3">
                        <!-- Cancel Button -->
                        <button type="button" @click="handleCancel" :disabled="isLoading"
                            class="flex-1 py-3 px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 disabled:bg-gray-100 dark:disabled:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium rounded-xl transition-colors">
                            {{ cancelText || 'إلغاء' }}
                        </button>

                        <!-- Confirm Button -->
                        <button type="button" @click="handleConfirm" :disabled="isLoading" :class="[
                            'flex-1 py-3 px-4 font-medium rounded-xl transition-colors flex items-center justify-center gap-2',
                            type === 'danger'
                                ? 'bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white'
                                : type === 'warning'
                                    ? 'bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white'
                                    : 'bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white'
                        ]">
                            <svg v-if="isLoading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4" />
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>{{ confirmText || 'تأكيد' }}</span>
                        </button>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
    transition: transform 0.2s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
    transform: scale(0.95);
}
</style>
