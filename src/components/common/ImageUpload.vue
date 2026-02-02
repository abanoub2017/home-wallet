<script setup lang="ts">
import { ref, computed } from 'vue'
import { useImageCompression, type CompressionError } from '@/composables/useImageCompression'

/**
 * Image Upload Component
 * Handles image selection, compression, and preview
 */

const props = defineProps<{
    modelValue?: string
    disabled?: boolean
}>()

const emit = defineEmits<{
    'update:modelValue': [value: string]
}>()

const { compressFile, formatFileSize, isValidBase64Image } = useImageCompression()

const isProcessing = ref(false)
const error = ref<string | null>(null)
const compressionInfo = ref<{ original: number; compressed: number } | null>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)

const hasImage = computed(() => {
    return props.modelValue && isValidBase64Image(props.modelValue)
})

function triggerFileInput() {
    if (props.disabled || isProcessing.value) return
    fileInputRef.value?.click()
}

async function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (!file) return

    isProcessing.value = true
    error.value = null
    compressionInfo.value = null

    try {
        const result = await compressFile(file)

        compressionInfo.value = {
            original: result.originalSize,
            compressed: result.compressedSize,
        }

        emit('update:modelValue', result.base64)
    } catch (e) {
        const compError = e as CompressionError
        error.value = compError.message || 'فشل في معالجة الصورة'
    } finally {
        isProcessing.value = false
        // Reset input to allow selecting same file again
        input.value = ''
    }
}

function removeImage() {
    emit('update:modelValue', '')
    compressionInfo.value = null
    error.value = null
}
</script>

<template>
    <div class="space-y-2">
        <!-- Hidden File Input -->
        <input ref="fileInputRef" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
            class="hidden" @change="handleFileChange" />

        <!-- Upload Area / Preview -->
        <div v-if="!hasImage" @click="triggerFileInput" :class="[
            'border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors',
            disabled || isProcessing
                ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 cursor-not-allowed'
                : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
        ]">
            <!-- Processing State -->
            <div v-if="isProcessing" class="flex flex-col items-center gap-2">
                <svg class="animate-spin h-8 w-8 text-primary-600 dark:text-primary-400" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span class="text-sm text-gray-500 dark:text-gray-400">جاري ضغط الصورة...</span>
            </div>

            <!-- Upload Prompt -->
            <div v-else class="flex flex-col items-center gap-2">
                <div class="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-700 dark:text-gray-300">إضافة صورة</p>
                    <p class="text-xs text-gray-400 dark:text-gray-500">اضغط لاختيار صورة</p>
                </div>
            </div>
        </div>

        <!-- Image Preview -->
        <div v-else class="relative">
            <img :src="modelValue" alt="صورة الفاتورة" class="w-full h-48 object-cover rounded-xl" />

            <!-- Remove Button -->
            <button v-if="!disabled" type="button" @click="removeImage"
                class="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                aria-label="حذف الصورة">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <!-- Change Button -->
            <button v-if="!disabled" type="button" @click="triggerFileInput"
                class="absolute bottom-2 left-2 px-3 py-1 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 text-sm rounded-lg shadow hover:bg-white dark:hover:bg-gray-800 transition-colors">
                تغيير الصورة
            </button>
        </div>

        <!-- Compression Info -->
        <div v-if="compressionInfo" class="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <span>{{ formatFileSize(compressionInfo.original) }}</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            <span class="text-green-600 dark:text-green-400 font-medium">{{ formatFileSize(compressionInfo.compressed)
                }}</span>
            <span class="text-green-600 dark:text-green-400">
                ({{ Math.round((1 - compressionInfo.compressed / compressionInfo.original) * 100) }}% أقل)
            </span>
        </div>

        <!-- Error -->
        <div v-if="error" class="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
            <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{{ error }}</span>
        </div>
    </div>
</template>
