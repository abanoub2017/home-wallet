<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import ImageUpload from '@/components/common/ImageUpload.vue'
import { useExpenses } from '@/composables/useExpenses'
import { useCategories } from '@/composables/useCategories'
import { useToast } from '@/composables/useToast'
import type { NewExpense } from '@/types'

/**
 * Add Expense View
 * Form to add a new expense
 */

const router = useRouter()
const { addExpense, isLoading, error } = useExpenses()
const { sortedCategories, initCategories } = useCategories()
const toast = useToast()

// Form state
const amount = ref<number | null>(null)
const category = ref('')
const date = ref(new Date().toISOString().split('T')[0])
const notes = ref('')
const imageBase64 = ref('')

onMounted(() => {
    initCategories()
})

async function handleSubmit() {
    if (!amount.value || !category.value || !date.value) return

    const data: NewExpense = {
        amount: amount.value,
        category: category.value,
        date: new Date(date.value),
        notes: notes.value || undefined,
        imageBase64: imageBase64.value || undefined,
    }

    const id = await addExpense(data)
    if (id) {
        toast.success('تم إضافة المصروف بنجاح')
        router.push('/expenses')
    } else if (error.value) {
        toast.error(error.value)
    }
}

function getColorClass(color: string): string {
    const colorMap: Record<string, string> = {
        red: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300',
        orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300',
        yellow: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300',
        green: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300',
        blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300',
        indigo: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300',
        purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300',
        pink: 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300',
        gray: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
    }
    return colorMap[color] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
}
</script>

<template>
    <AppLayout>
        <div class="space-y-4">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">إضافة مصروف</h2>

            <!-- Error Alert -->
            <div v-if="error"
                class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm">
                {{ error }}
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
                <!-- Amount -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        المبلغ (ج.م) <span class="text-red-500">*</span>
                    </label>
                    <input v-model.number="amount" type="number" step="0.01" min="0" required placeholder="0.00"
                        class="w-full px-4 py-3 text-2xl font-bold text-center rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                        :disabled="isLoading" />
                </div>

                <!-- Category -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        الفئة <span class="text-red-500">*</span>
                    </label>
                    <div class="grid grid-cols-4 gap-2">
                        <button v-for="cat in sortedCategories" :key="cat.id" type="button" @click="category = cat.id"
                            :class="[
                                'flex flex-col items-center p-3 rounded-xl transition-all',
                                category === cat.id
                                    ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/30'
                                    : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                            ]">
                            <span :class="getColorClass(cat.color)"
                                class="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-1">
                                {{ cat.icon }}
                            </span>
                            <span class="text-xs text-gray-700 dark:text-gray-300 text-center line-clamp-1">
                                {{ cat.name }}
                            </span>
                        </button>
                    </div>
                </div>

                <!-- Date -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        التاريخ <span class="text-red-500">*</span>
                    </label>
                    <input v-model="date" type="date" required
                        class="w-full max-w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors [color-scheme:light] dark:[color-scheme:dark] text-base"
                        :disabled="isLoading" />
                </div>

                <!-- Image -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        صورة الفاتورة (اختياري)
                    </label>
                    <ImageUpload v-model="imageBase64" :disabled="isLoading" />
                </div>

                <!-- Notes -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors">
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        ملاحظات (اختياري)
                    </label>
                    <textarea v-model="notes" rows="3" placeholder="أضف ملاحظات..."
                        class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none transition-colors"
                        :disabled="isLoading" />
                </div>

                <!-- Submit Button -->
                <button type="submit" :disabled="isLoading || !amount || !category"
                    class="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                    <svg v-if="isLoading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>{{ isLoading ? 'جاري الحفظ...' : 'حفظ المصروف' }}</span>
                </button>
            </form>
        </div>
    </AppLayout>
</template>
