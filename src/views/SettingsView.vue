<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import ConfirmModal from '@/components/common/ConfirmModal.vue'
import { useCategories } from '@/composables/useCategories'
import { useToast } from '@/composables/useToast'
import type { CategoryInfo, NewCategory } from '@/types'

/**
 * Settings View
 * Manage expense categories
 */

const {
    sortedCategories,
    isLoading,
    error,
    initCategories,
    addCategory,
    updateCategory,
    deleteCategory,
    resetToDefaults,
} = useCategories()
const toast = useToast()

// Modal state
const showModal = ref(false)
const modalMode = ref<'add' | 'edit'>('add')
const editingCategory = ref<CategoryInfo | null>(null)

// Form state
const formName = ref('')
const formIcon = ref('')
const formColor = ref('blue')

// Delete confirmation modal state
const showDeleteModal = ref(false)
const categoryToDelete = ref<CategoryInfo | null>(null)
const isDeleting = ref(false)

// Reset confirmation modal state
const showResetModal = ref(false)
const isResetting = ref(false)

// Available colors
const availableColors = [
    { id: 'red', name: 'أحمر', class: 'bg-red-500' },
    { id: 'orange', name: 'برتقالي', class: 'bg-orange-500' },
    { id: 'yellow', name: 'أصفر', class: 'bg-yellow-500' },
    { id: 'green', name: 'أخضر', class: 'bg-green-500' },
    { id: 'blue', name: 'أزرق', class: 'bg-blue-500' },
    { id: 'indigo', name: 'نيلي', class: 'bg-indigo-500' },
    { id: 'purple', name: 'بنفسجي', class: 'bg-purple-500' },
    { id: 'pink', name: 'وردي', class: 'bg-pink-500' },
    { id: 'gray', name: 'رمادي', class: 'bg-gray-500' },
]

// Common emojis for categories
const commonEmojis = ['🍽️', '🚗', '📄', '🛒', '💊', '🎬', '📚', '📦', '🏠', '💡', '📱', '👕', '✈️', '🎁', '💰', '🔧']

onMounted(() => {
    initCategories()
})

function openAddModal() {
    modalMode.value = 'add'
    editingCategory.value = null
    formName.value = ''
    formIcon.value = '📦'
    formColor.value = 'blue'
    showModal.value = true
}

function openEditModal(category: CategoryInfo) {
    modalMode.value = 'edit'
    editingCategory.value = category
    formName.value = category.name
    formIcon.value = category.icon
    formColor.value = category.color
    showModal.value = true
}

function closeModal() {
    showModal.value = false
    editingCategory.value = null
}

async function handleSubmit() {
    if (!formName.value.trim() || !formIcon.value) return

    const data: NewCategory = {
        name: formName.value.trim(),
        icon: formIcon.value,
        color: formColor.value,
    }

    if (modalMode.value === 'add') {
        const success = await addCategory(data)
        if (success) toast.success('تم إضافة الفئة بنجاح')
    } else if (editingCategory.value) {
        const success = await updateCategory(editingCategory.value.id, data)
        if (success) toast.success('تم تحديث الفئة بنجاح')
    }

    closeModal()
}

async function handleDelete(category: CategoryInfo) {
    categoryToDelete.value = category
    showDeleteModal.value = true
}

async function confirmDelete() {
    if (!categoryToDelete.value) return
    isDeleting.value = true
    const success = await deleteCategory(categoryToDelete.value.id)
    if (success) toast.success('تم حذف الفئة بنجاح')
    isDeleting.value = false
    showDeleteModal.value = false
    categoryToDelete.value = null
}

function cancelDelete() {
    showDeleteModal.value = false
    categoryToDelete.value = null
}

async function handleReset() {
    showResetModal.value = true
}

async function confirmReset() {
    isResetting.value = true
    const success = await resetToDefaults()
    if (success) toast.success('تم إعادة التعيين بنجاح')
    isResetting.value = false
    showResetModal.value = false
}

function cancelReset() {
    showResetModal.value = false
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
            <!-- Header -->
            <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">الإعدادات</h2>
            </div>

            <!-- Error Alert -->
            <div v-if="error"
                class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl text-sm">
                {{ error }}
            </div>

            <!-- Categories Section -->
            <div
                class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
                <div class="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                    <h3 class="font-medium text-gray-900 dark:text-white">فئات المصروفات</h3>
                    <button @click="openAddModal"
                        class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                        + إضافة فئة
                    </button>
                </div>

                <!-- Loading -->
                <div v-if="isLoading" class="p-8 text-center text-gray-500 dark:text-gray-400">
                    جاري التحميل...
                </div>

                <!-- Categories List -->
                <div v-else class="divide-y divide-gray-100 dark:divide-gray-700">
                    <div v-for="category in sortedCategories" :key="category.id"
                        class="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <div class="flex items-center gap-3">
                            <span :class="getColorClass(category.color)"
                                class="w-10 h-10 rounded-xl flex items-center justify-center text-xl">
                                {{ category.icon }}
                            </span>
                            <div>
                                <p class="font-medium text-gray-900 dark:text-white">{{ category.name }}</p>
                                <p v-if="category.isDefault" class="text-xs text-gray-400 dark:text-gray-500">افتراضية
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center gap-1">
                            <!-- Edit Button -->
                            <button @click="openEditModal(category)"
                                class="p-2 text-gray-400 dark:text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 rounded-lg transition-colors"
                                aria-label="تعديل">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>

                            <!-- Delete Button -->
                            <button @click="handleDelete(category)"
                                class="p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                aria-label="حذف">
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Reset Button -->
            <button @click="handleReset"
                class="w-full py-3 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 text-sm font-medium">
                إعادة تعيين إلى الفئات الافتراضية
            </button>
        </div>

        <!-- Add/Edit Modal -->
        <Teleport to="body">
            <div v-if="showModal" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
                <!-- Backdrop -->
                <div class="absolute inset-0 bg-black/50" @click="closeModal" />

                <!-- Modal Content -->
                <div
                    class="relative bg-white dark:bg-gray-800 w-full max-w-md rounded-t-2xl sm:rounded-2xl p-6 space-y-5 max-h-[90vh] overflow-y-auto transition-colors">
                    <div class="flex items-center justify-between">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                            {{ modalMode === 'add' ? 'إضافة فئة جديدة' : 'تعديل الفئة' }}
                        </h3>
                        <button @click="closeModal"
                            class="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form @submit.prevent="handleSubmit" class="space-y-5">
                        <!-- Name -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                اسم الفئة
                            </label>
                            <input v-model="formName" type="text" required placeholder="مثال: إيجار"
                                class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors" />
                        </div>

                        <!-- Icon -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                الأيقونة
                            </label>
                            <div class="flex flex-wrap gap-2">
                                <button v-for="emoji in commonEmojis" :key="emoji" type="button"
                                    @click="formIcon = emoji" :class="[
                                        'w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all',
                                        formIcon === emoji
                                            ? 'bg-primary-100 dark:bg-primary-900/30 ring-2 ring-primary-500'
                                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    ]">
                                    {{ emoji }}
                                </button>
                            </div>
                        </div>

                        <!-- Color -->
                        <div>
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                اللون
                            </label>
                            <div class="flex flex-wrap gap-2">
                                <button v-for="color in availableColors" :key="color.id" type="button"
                                    @click="formColor = color.id" :class="[
                                        'w-10 h-10 rounded-lg transition-all',
                                        color.class,
                                        formColor === color.id
                                            ? 'ring-2 ring-offset-2 ring-gray-400 dark:ring-offset-gray-800'
                                            : ''
                                    ]" :aria-label="color.name" />
                            </div>
                        </div>

                        <!-- Preview -->
                        <div class="pt-2">
                            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                معاينة
                            </label>
                            <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                <span :class="getColorClass(formColor)"
                                    class="w-10 h-10 rounded-xl flex items-center justify-center text-xl">
                                    {{ formIcon || '📦' }}
                                </span>
                                <span class="font-medium text-gray-900 dark:text-white">
                                    {{ formName || 'اسم الفئة' }}
                                </span>
                            </div>
                        </div>

                        <!-- Submit -->
                        <button type="submit" :disabled="!formName.trim() || !formIcon || isLoading"
                            class="w-full py-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white font-medium rounded-xl transition-colors">
                            {{ modalMode === 'add' ? 'إضافة' : 'حفظ التغييرات' }}
                        </button>
                    </form>
                </div>
            </div>
        </Teleport>

        <!-- Delete Category Confirmation Modal -->
        <ConfirmModal :show="showDeleteModal" title="حذف الفئة"
            :message="`هل أنت متأكد من حذف فئة '${categoryToDelete?.name}'؟ لا يمكن التراجع عن هذا الإجراء.`"
            type="danger" :is-loading="isDeleting" @confirm="confirmDelete" @cancel="cancelDelete" />

        <!-- Reset Confirmation Modal -->
        <ConfirmModal :show="showResetModal" title="إعادة تعيين الفئات"
            message="هل أنت متأكد من إعادة تعيين جميع الفئات إلى الافتراضية؟ سيتم حذف جميع الفئات المخصصة."
            type="warning" :is-loading="isResetting" confirm-text="إعادة تعيين" @confirm="confirmReset"
            @cancel="cancelReset" />
    </AppLayout>
</template>
