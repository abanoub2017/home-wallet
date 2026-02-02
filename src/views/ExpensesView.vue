<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import ImagePreviewModal from '@/components/common/ImagePreviewModal.vue'
import SkeletonLoader from '@/components/common/SkeletonLoader.vue'
import EmptyState from '@/components/common/EmptyState.vue'
import { useExpenses } from '@/composables/useExpenses'
import { useCategories } from '@/composables/useCategories'
import { useToast } from '@/composables/useToast'
import { formatCurrency } from '@/utils/currency'
import { formatDate, formatRelative } from '@/utils/date'
import type { Expense } from '@/types'

/**
 * Expenses View
 * Lists all expenses with filtering options
 */

const router = useRouter()
const { expenses, isLoading, error, fetchExpenses, deleteExpense, totalAmount } = useExpenses()
const { sortedCategories, initCategories, getCategoryById } = useCategories()
const toast = useToast()

// Filters
const selectedMonth = ref(new Date().getMonth())
const selectedYear = ref(new Date().getFullYear())
const selectedCategory = ref<string>('')
const searchQuery = ref('')

// Delete modal state
const showDeleteModal = ref(false)
const expenseToDelete = ref<Expense | null>(null)
const isDeleting = ref(false)

// Image preview modal state
const showImageModal = ref(false)
const previewImageUrl = ref('')
const previewImageTitle = ref('')

// Months in Arabic
const months = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
]

// Years (current and 2 previous)
const currentYear = new Date().getFullYear()
const years = [currentYear, currentYear - 1, currentYear - 2]

onMounted(async () => {
    await initCategories()
    await loadExpenses()
})

watch([selectedMonth, selectedYear, selectedCategory], () => {
    loadExpenses()
})

async function loadExpenses() {
    await fetchExpenses({
        month: selectedMonth.value,
        year: selectedYear.value,
        category: selectedCategory.value || undefined,
    })
}

function getCategoryInfo(categoryId: string) {
    return getCategoryById(categoryId) || { icon: '📦', name: categoryId, color: 'gray' }
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

function editExpense(expense: Expense) {
    router.push(`/expenses/${expense.id}/edit`)
}

function openDeleteModal(expense: Expense) {
    expenseToDelete.value = expense
    showDeleteModal.value = true
}

async function confirmDelete() {
    if (!expenseToDelete.value) return

    isDeleting.value = true
    const success = await deleteExpense(expenseToDelete.value.id)
    if (success) {
        toast.success('تم حذف المصروف بنجاح')
    }
    isDeleting.value = false
    showDeleteModal.value = false
    expenseToDelete.value = null
}

function cancelDelete() {
    showDeleteModal.value = false
    expenseToDelete.value = null
}

function getDeleteMessage(): string {
    if (!expenseToDelete.value) return ''
    const catInfo = getCategoryInfo(expenseToDelete.value.category)
    return `هل أنت متأكد من حذف "${catInfo.name}" بمبلغ ${formatCurrency(expenseToDelete.value.amount)}؟`
}

function getRoleBadgeClass(role: string): string {
    return role === 'husband'
        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
        : 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300'
}

function getRoleLabel(role: string): string {
    return role === 'husband' ? 'الزوج' : 'الزوجة'
}

function openImagePreview(expense: Expense) {
    if (!expense.imageBase64) return
    const catInfo = getCategoryInfo(expense.category)
    previewImageUrl.value = expense.imageBase64
    previewImageTitle.value = `${catInfo.name} - ${formatCurrency(expense.amount)}`
    showImageModal.value = true
}

function closeImagePreview() {
    showImageModal.value = false
    previewImageUrl.value = ''
    previewImageTitle.value = ''
}

// Filtered expenses based on search query
const filteredExpenses = computed(() => {
    if (!searchQuery.value.trim()) return expenses.value

    const query = searchQuery.value.toLowerCase().trim()
    return expenses.value.filter((expense) => {
        const catInfo = getCategoryInfo(expense.category)
        const categoryName = catInfo.name.toLowerCase()
        const notes = (expense.notes || '').toLowerCase()
        const amount = expense.amount.toString()

        return (
            categoryName.includes(query) ||
            notes.includes(query) ||
            amount.includes(query)
        )
    })
})

// Filtered total amount
const filteredTotalAmount = computed(() => {
    return filteredExpenses.value.reduce((sum, e) => sum + e.amount, 0)
})
</script>

<template>
    <AppLayout>
        <div class="space-y-4">
            <!-- Header with Total -->
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">المصروفات</h2>
                <div class="text-left">
                    <p class="text-xs text-gray-500 dark:text-gray-400">الإجمالي</p>
                    <p class="font-bold text-primary-600 dark:text-primary-400">{{ formatCurrency(searchQuery ?
                        filteredTotalAmount : totalAmount) }}</p>
                </div>
            </div>

            <!-- Search Box -->
            <div class="relative">
                <input v-model="searchQuery" type="text" placeholder="بحث بالفئة أو الملاحظات أو المبلغ..."
                    class="w-full pr-10 pl-10 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" />
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <button v-if="searchQuery" @click="searchQuery = ''"
                    class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <!-- Filters -->
            <div
                class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 transition-colors">
                <div class="flex gap-2">
                    <!-- Month Filter -->
                    <select v-model="selectedMonth"
                        class="flex-1 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500">
                        <option v-for="(month, index) in months" :key="index" :value="index">
                            {{ month }}
                        </option>
                    </select>

                    <!-- Year Filter -->
                    <select v-model="selectedYear"
                        class="w-24 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500">
                        <option v-for="year in years" :key="year" :value="year">
                            {{ year }}
                        </option>
                    </select>

                    <!-- Category Filter -->
                    <select v-model="selectedCategory"
                        class="flex-1 px-3 py-2 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-primary-500">
                        <option value="">كل الفئات</option>
                        <option v-for="cat in sortedCategories" :key="cat.id" :value="cat.id">
                            {{ cat.icon }} {{ cat.name }}
                        </option>
                    </select>
                </div>
            </div>

            <!-- Error Alert -->
            <div v-if="error"
                class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm">
                {{ error }}
            </div>

            <!-- Loading -->
            <div v-if="isLoading" class="space-y-3">
                <SkeletonLoader variant="expense" :count="4" />
            </div>

            <!-- Empty State -->
            <EmptyState v-else-if="filteredExpenses.length === 0 && searchQuery" icon="🔍" title="لا توجد نتائج"
                :description="`لم يتم العثور على مصروفات تطابق '${searchQuery}'`" action-label="مسح البحث"
                @action="searchQuery = ''" />

            <EmptyState v-else-if="expenses.length === 0" icon="💭" title="لا توجد مصروفات"
                description="لم يتم تسجيل أي مصروفات في هذا الشهر" action-label="+ إضافة مصروف"
                action-to="/expenses/add" />

            <!-- Expenses List -->
            <div v-else class="space-y-2">
                <!-- Search results count -->
                <p v-if="searchQuery" class="text-sm text-gray-500 dark:text-gray-400">
                    عدد النتائج: {{ filteredExpenses.length }}
                </p>

                <div v-for="expense in filteredExpenses" :key="expense.id"
                    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors">
                    <div class="flex items-start gap-3">
                        <!-- Category Icon / Image Thumbnail -->
                        <div class="relative shrink-0">
                            <span :class="getColorClass(getCategoryInfo(expense.category).color)"
                                class="w-12 h-12 rounded-xl flex items-center justify-center text-xl">
                                {{ getCategoryInfo(expense.category).icon }}
                            </span>
                            <!-- Image indicator badge -->
                            <button v-if="expense.imageBase64" @click="openImagePreview(expense)"
                                class="absolute -bottom-1 -left-1 w-5 h-5 bg-green-500 text-white rounded-full flex items-center justify-center shadow-sm hover:bg-green-600 transition-colors"
                                title="عرض صورة الفاتورة">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </button>
                        </div>

                        <!-- Content -->
                        <div class="flex-1 min-w-0">
                            <div class="flex items-start justify-between gap-2">
                                <div>
                                    <p class="font-medium text-gray-900 dark:text-white">
                                        {{ getCategoryInfo(expense.category).name }}
                                    </p>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">
                                        {{ formatDate(expense.date.toDate()) }}
                                    </p>
                                </div>
                                <p class="font-bold text-gray-900 dark:text-white flex-shrink-0">
                                    {{ formatCurrency(expense.amount) }}
                                </p>
                            </div>

                            <!-- Notes -->
                            <p v-if="expense.notes" class="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-1">
                                {{ expense.notes }}
                            </p>

                            <!-- Footer -->
                            <div
                                class="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                                <span :class="getRoleBadgeClass(expense.createdBy.role)"
                                    class="text-xs px-2 py-1 rounded-full">
                                    {{ getRoleLabel(expense.createdBy.role) }}
                                </span>

                                <div class="flex items-center gap-1">
                                    <!-- Image Button -->
                                    <button v-if="expense.imageBase64" @click="openImagePreview(expense)"
                                        class="p-2 text-gray-400 dark:text-gray-500 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-lg transition-colors"
                                        aria-label="عرض الصورة">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </button>

                                    <!-- Edit Button -->
                                    <button @click="editExpense(expense)"
                                        class="p-2 text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
                                        aria-label="تعديل">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>

                                    <!-- Delete Button -->
                                    <button @click="openDeleteModal(expense)"
                                        class="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                        aria-label="حذف">
                                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Confirmation Modal -->
        <ConfirmModal :show="showDeleteModal" title="حذف المصروف" :message="getDeleteMessage()" confirm-text="حذف"
            cancel-text="إلغاء" type="danger" :is-loading="isDeleting" @confirm="confirmDelete"
            @cancel="cancelDelete" />

        <!-- Image Preview Modal -->
        <ImagePreviewModal :show="showImageModal" :image-url="previewImageUrl" :title="previewImageTitle"
            @close="closeImagePreview" />
    </AppLayout>
</template>
