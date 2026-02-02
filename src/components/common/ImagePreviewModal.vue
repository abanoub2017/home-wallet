<script setup lang="ts">
/**
 * Image Preview Modal Component
 *
 * Full-screen modal for viewing expense receipt images
 * Supports pinch-to-zoom on mobile
 */

defineProps<{
    show: boolean
    imageUrl: string
    title?: string
}>()

defineEmits<{
    close: []
}>()
</script>

<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/90" @click="$emit('close')" />

                <!-- Content -->
                <div class="relative w-full max-w-2xl max-h-[90vh] flex flex-col">
                    <!-- Header -->
                    <div class="flex items-center justify-between mb-4 relative z-10">
                        <h3 v-if="title" class="text-white font-medium text-lg">{{ title }}</h3>
                        <span v-else />

                        <button @click="$emit('close')"
                            class="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <!-- Image Container -->
                    <div class="flex-1 overflow-auto rounded-xl bg-black/50">
                        <img :src="imageUrl" :alt="title || 'صورة الفاتورة'"
                            class="w-full h-auto object-contain max-h-[80vh]" />
                    </div>

                    <!-- Footer hint -->
                    <p class="text-center text-white/50 text-sm mt-3">
                        انقر خارج الصورة للإغلاق
                    </p>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
/* Modal animations */
.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
    transform: scale(0.95);
}
</style>
