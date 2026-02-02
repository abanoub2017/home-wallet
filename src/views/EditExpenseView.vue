<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import ImageUpload from '@/components/common/ImageUpload.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { useExpenses } from '@/composables/useExpenses'
import { useCategories } from '@/composables/useCategories'
import { useToast } from '@/composables/useToast'
import type { UpdateExpense, Expense } from '@/types'

/**
 * Edit Expense View
 * Form to edit an existing expense
 */

const router = useRouter()
const route = useRoute()
const { getExpenseById, updateExpense, deleteExpense, isLoading, error } = useExpenses()
const { sortedCategories, initCategories } = useCategories()
const toast = useToast()

// Original expense
const expense = ref<Expense | null>(null)
const notFound = ref(false)

// Form state
const amount = ref<number | null>(null)
const category = ref('')
const date = ref('')
const notes = ref('')
const imageBase64 = ref('')

// Delete modal state
const showDeleteModal = ref(false)
const isDeleting = ref(false)

onMounted(async () => {
    await initCategories()
    await loadExpense()
})

async function loadExpense() {
    const id = route.params.id as string
    if (!id) {
        notFound.value = true
        return
    }

    const result = await getExpenseById(id)
    if (result) {
        expense.value = result
        amount.value = result.amount
        category.value = result.category
        date.value = result.date.toDate().toISOString().split('T')[0] || ''
        notes.value = result.notes || ''
        imageBase64.value = result.imageBase64 || ''
    } else {
        notFound.value = true
    }
}

async function handleSubmit() {
    if (!expense.value || !amount.value || !category.value || !date.value) return

    const data: UpdateExpense = {
        amount: amount.value,
        category: category.value,
        date: new Date(date.value),
        notes: notes.value || undefined,
        imageBase64: imageBase64.value || undefined,
    }

    const success = await updateExpense(expense.value.id, data)
    if (success) {
        toast.success('تم تحديث المصروف بنجاح')
        router.push('/expenses')
    } else if (error.value) {
        toast.error(error.value)
    }
}

async function handleDelete() {
    if (!expense.value) return
    showDeleteModal.value = true
}

async function confirmDelete() {
    if (!expense.value) return
    isDeleting.value = true

    const success = await deleteExpense(expense.value.id)
    if (success) {
        toast.success('تم حذف المصروف بنجاح')
        showDeleteModal.value = false
        router.push('/expenses')
    }
    isDeleting.value = false
}

function cancelDelete() {
    showDeleteModal.value = false
}

function goBack() {
    router.back()
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
            <!-- Header with Back Button -->
            <div class="flex items-center gap-3">
                <button @click="goBack"
                    class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">تعديل مصروف</h2>
            </div>

            <!-- Not Found -->
            <div v-if="notFound"
                class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center transition-colors">
                <div
                    class="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span class="text-3xl">❌</span>
                </div>
                <p class="text-gray-500 dark:text-gray-400 mb-4">لم يتم العثور على المصروف</p>
                <router-link to="/expenses"
                    class="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors">
                    العودة للمصروفات
                </router-link>
            </div>

            <!-- Loading -->
            <div v-else-if="isLoading && !expense" class="py-12 text-center text-gray-500 dark:text-gray-400">
                <svg class="animate-spin h-8 w-8 mx-auto mb-2 text-primary-600" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                جاري التحميل...
            </div>

            <!-- Edit Form -->
            <template v-else-if="expense">
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
                            <button v-for="cat in sortedCategories" :key="cat.id" type="button"
                                @click="category = cat.id" :class="[
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
                            class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
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

                    <!-- Buttons -->
                    <div class="space-y-3">
                        <!-- Submit Button -->
                        <button type="submit" :disabled="isLoading || !amount || !category"
                            class="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                            <svg v-if="isLoading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                    stroke-width="4" />
                                <path class="opacity-75" fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>{{ isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات' }}</span>
                        </button>

                        <!-- Delete Button -->
                        <button type="button" @click="handleDelete" :disabled="isLoading"
                            class="w-full py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 font-medium rounded-xl transition-colors">
                            حذف المصروف
                        </button>
                    </div>
                </form>
            </template>
        </div>

        <!-- Delete Confirmation Modal -->
        <ConfirmModal :show="showDeleteModal" title="حذف المصروف"
            :message="`هل أنت متأكد من حذف هذا المصروف بمبلغ ${amount?.toLocaleString('ar-EG')} ج.م؟ لا يمكن التراجع عن هذا الإجراء.`"
            type="danger" :is-loading="isDeleting" @confirm="confirmDelete" @cancel="cancelDelete" />
    </AppLayout>
</template>
