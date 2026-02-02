<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import SkeletonLoader from '@/components/common/SkeletonLoader.vue'
import { useExpenses } from '@/composables/useExpenses'
import { useCategories } from '@/composables/useCategories'

/**
 * Dashboard View
 * Shows expense statistics and summaries
 */

const router = useRouter()
const {
    expenses,
    isLoading,
    totalAmount,
    expensesByCategory,
    husbandTotal,
    wifeTotal,
    fetchExpenses,
} = useExpenses()
const { sortedCategories, initCategories, getCategoryById } = useCategories()

// Current month/year selection
const currentDate = new Date()
const selectedMonth = ref(currentDate.getMonth())
const selectedYear = ref(currentDate.getFullYear())

// Month names in Arabic
const monthNames = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
]

// Generate year options (current year and 2 previous)
const yearOptions = computed(() => {
    const current = currentDate.getFullYear()
    return [current, current - 1, current - 2]
})

// Format currency
function formatCurrency(amount: number): string {
    return amount.toLocaleString('ar-EG', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
}

// Category stats with percentages
const categoryStats = computed(() => {
    const total = totalAmount.value
    const stats: Array<{
        id: string
        name: string
        icon: string
        color: string
        amount: number
        percentage: number
        count: number
    }> = []

    for (const [categoryId, categoryExpenses] of Object.entries(expensesByCategory.value)) {
        const category = getCategoryById(categoryId)
        const amount = categoryExpenses.reduce((sum, e) => sum + e.amount, 0)

        stats.push({
            id: categoryId,
            name: category?.name || categoryId,
            icon: category?.icon || '📦',
            color: category?.color || 'gray',
            amount,
            percentage: total > 0 ? (amount / total) * 100 : 0,
            count: categoryExpenses.length,
        })
    }

    // Sort by amount descending
    return stats.sort((a, b) => b.amount - a.amount)
})

// Recent expenses (last 5)
const recentExpenses = computed(() => {
    return expenses.value.slice(0, 5)
})

// Husband percentage
const husbandPercentage = computed(() => {
    const total = totalAmount.value
    return total > 0 ? (husbandTotal.value / total) * 100 : 0
})

// Wife percentage
const wifePercentage = computed(() => {
    const total = totalAmount.value
    return total > 0 ? (wifeTotal.value / total) * 100 : 0
})

// Get color classes
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

function getBarColorClass(color: string): string {
    const colorMap: Record<string, string> = {
        red: 'bg-red-500',
        orange: 'bg-orange-500',
        yellow: 'bg-yellow-500',
        green: 'bg-green-500',
        blue: 'bg-blue-500',
        indigo: 'bg-indigo-500',
        purple: 'bg-purple-500',
        pink: 'bg-pink-500',
        gray: 'bg-gray-500',
    }
    return colorMap[color] || 'bg-gray-500'
}

// Navigate to previous month
function previousMonth() {
    if (selectedMonth.value === 0) {
        selectedMonth.value = 11
        selectedYear.value--
    } else {
        selectedMonth.value--
    }
}

// Navigate to next month
function nextMonth() {
    const now = new Date()
    const isCurrentMonth = selectedMonth.value === now.getMonth() && selectedYear.value === now.getFullYear()
    if (isCurrentMonth) return

    if (selectedMonth.value === 11) {
        selectedMonth.value = 0
        selectedYear.value++
    } else {
        selectedMonth.value++
    }
}

// Check if can go next
const canGoNext = computed(() => {
    const now = new Date()
    return !(selectedMonth.value === now.getMonth() && selectedYear.value === now.getFullYear())
})

// Format date for recent expenses
function formatDate(timestamp: any): string {
    const date = timestamp.toDate()
    return date.toLocaleDateString('ar-EG', { day: 'numeric', month: 'short' })
}

// Load data
async function loadData() {
    await initCategories()
    await fetchExpenses({
        month: selectedMonth.value,
        year: selectedYear.value,
    })
}

// Watch for month/year changes
watch([selectedMonth, selectedYear], () => {
    loadData()
})

onMounted(() => {
    loadData()
})
</script>

<template>
    <AppLayout>
        <div class="space-y-4">
            <!-- Month Selector -->
            <div class="flex items-center justify-between">
                <button @click="previousMonth"
                    class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                <div class="text-center">
                    <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                        {{ monthNames[selectedMonth] }} {{ selectedYear }}
                    </h2>
                </div>

                <button @click="nextMonth" :disabled="!canGoNext" :class="[
                    'p-2 rounded-lg transition-colors',
                    canGoNext ? 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800' : 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                ]">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            <!-- Loading Skeleton -->
            <template v-if="isLoading">
                <SkeletonLoader variant="stat" />
                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 space-y-3">
                    <SkeletonLoader width="120px" height="14px" />
                    <SkeletonLoader height="16px" />
                    <div class="grid grid-cols-2 gap-3">
                        <SkeletonLoader height="80px" />
                        <SkeletonLoader height="80px" />
                    </div>
                </div>
                <SkeletonLoader variant="card" :count="3" />
            </template>

            <template v-else>
                <!-- Month Summary Card -->
                <div class="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl shadow-lg p-6 text-white">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-primary-100 text-sm">إجمالي المصروفات</span>
                        <span class="bg-white/20 px-2 py-1 rounded-lg text-xs">
                            {{ expenses.length }} مصروف
                        </span>
                    </div>
                    <p class="text-4xl font-bold">{{ formatCurrency(totalAmount) }}</p>
                    <p class="text-primary-100 text-sm mt-1">جنيه مصري</p>
                </div>

                <!-- User Expenses with Visual Bar -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">التوزيع حسب المستخدم</h3>

                    <!-- Visual Bar -->
                    <div v-if="totalAmount > 0" class="h-4 rounded-full overflow-hidden flex mb-4">
                        <div class="bg-blue-500 transition-all duration-500"
                            :style="{ width: `${husbandPercentage}%` }" />
                        <div class="bg-pink-500 transition-all duration-500" :style="{ width: `${wifePercentage}%` }" />
                    </div>
                    <div v-else class="h-4 bg-gray-100 dark:bg-gray-700 rounded-full mb-4" />

                    <!-- User Cards -->
                    <div class="grid grid-cols-2 gap-3">
                        <div class="bg-blue-50 dark:bg-blue-900/30 rounded-xl p-3 text-center">
                            <div class="flex items-center justify-center gap-2 mb-1">
                                <div class="w-3 h-3 bg-blue-500 rounded-full" />
                                <span class="text-sm text-gray-600 dark:text-gray-300">الزوج</span>
                            </div>
                            <p class="text-lg font-bold text-gray-900 dark:text-white">{{ formatCurrency(husbandTotal)
                                }}</p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ husbandPercentage.toFixed(0) }}%</p>
                        </div>
                        <div class="bg-pink-50 dark:bg-pink-900/30 rounded-xl p-3 text-center">
                            <div class="flex items-center justify-center gap-2 mb-1">
                                <div class="w-3 h-3 bg-pink-500 rounded-full" />
                                <span class="text-sm text-gray-600 dark:text-gray-300">الزوجة</span>
                            </div>
                            <p class="text-lg font-bold text-gray-900 dark:text-white">{{ formatCurrency(wifeTotal) }}
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">{{ wifePercentage.toFixed(0) }}%</p>
                        </div>
                    </div>
                </div>

                <!-- Categories Breakdown -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors">
                    <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">المصروفات حسب الفئة</h3>

                    <div v-if="categoryStats.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-8">
                        <span class="text-4xl mb-2 block">📊</span>
                        <p>لا توجد مصروفات في هذا الشهر</p>
                    </div>

                    <div v-else class="space-y-3">
                        <div v-for="stat in categoryStats" :key="stat.id" class="space-y-1">
                            <div class="flex items-center justify-between text-sm">
                                <div class="flex items-center gap-2">
                                    <span :class="getColorClass(stat.color)"
                                        class="w-8 h-8 rounded-lg flex items-center justify-center text-sm">
                                        {{ stat.icon }}
                                    </span>
                                    <span class="text-gray-700 dark:text-gray-300">{{ stat.name }}</span>
                                    <span class="text-gray-400 dark:text-gray-500 text-xs">({{ stat.count }})</span>
                                </div>
                                <span class="font-medium text-gray-900 dark:text-white">{{ formatCurrency(stat.amount)
                                    }}</span>
                            </div>
                            <div class="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div :class="getBarColorClass(stat.color)"
                                    class="h-full rounded-full transition-all duration-500"
                                    :style="{ width: `${stat.percentage}%` }" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Recent Expenses -->
                <div
                    class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors">
                    <div
                        class="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                        <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">آخر المصروفات</h3>
                        <router-link to="/expenses"
                            class="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                            عرض الكل
                        </router-link>
                    </div>

                    <div v-if="recentExpenses.length === 0" class="text-center text-gray-400 dark:text-gray-500 py-8">
                        <span class="text-4xl mb-2 block">💸</span>
                        <p>لا توجد مصروفات مسجلة</p>
                        <router-link to="/expenses/add"
                            class="inline-block mt-3 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
                            + إضافة مصروف
                        </router-link>
                    </div>

                    <div v-else class="divide-y divide-gray-100 dark:divide-gray-700">
                        <div v-for="expense in recentExpenses" :key="expense.id"
                            @click="router.push(`/expenses/${expense.id}/edit`)"
                            class="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer">
                            <div class="flex items-center gap-3">
                                <span :class="getColorClass(getCategoryById(expense.category)?.color || 'gray')"
                                    class="w-10 h-10 rounded-xl flex items-center justify-center text-lg">
                                    {{ getCategoryById(expense.category)?.icon || '📦' }}
                                </span>
                                <div>
                                    <p class="font-medium text-gray-900 dark:text-white">
                                        {{ getCategoryById(expense.category)?.name || expense.category }}
                                    </p>
                                    <p class="text-xs text-gray-400 dark:text-gray-500">
                                        {{ formatDate(expense.date) }} • {{ expense.createdBy.role === 'husband' ?
                                            'الزوج' : 'الزوجة' }}
                                    </p>
                                </div>
                            </div>
                            <span class="font-semibold text-gray-900 dark:text-white">{{ formatCurrency(expense.amount)
                                }}</span>
                        </div>
                    </div>
                </div>

                <!-- Quick Add Button -->
                <router-link to="/expenses/add"
                    class="fixed bottom-20 left-4 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg flex items-center justify-center transition-colors">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                </router-link>
            </template>
        </div>
    </AppLayout>
</template>
