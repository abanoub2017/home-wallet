import { ref, computed } from 'vue'
import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    Timestamp,
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useAuth } from './useAuth'
import type { Expense, NewExpense, UpdateExpense, ExpenseFilters } from '@/types'

/**
 * Expenses Composable
 *
 * Handles all expense CRUD operations with Firestore
 */

// Shared state
const expenses = ref<Expense[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)

// Firestore collection reference
const COLLECTION_NAME = 'expenses'

export function useExpenses() {
    const { userInfo } = useAuth()

    /**
     * Fetch expenses with optional filters
     */
    async function fetchExpenses(filters?: ExpenseFilters): Promise<void> {
        isLoading.value = true
        error.value = null

        try {
            let q = query(
                collection(db, COLLECTION_NAME),
                orderBy('date', 'desc')
            )

            // Apply filters
            if (filters?.category) {
                q = query(q, where('category', '==', filters.category))
            }

            if (filters?.userId) {
                q = query(q, where('createdBy.id', '==', filters.userId))
            }

            // Date range filter for month/year
            if (filters?.month !== undefined && filters?.year !== undefined) {
                const startDate = new Date(filters.year, filters.month, 1)
                const endDate = new Date(filters.year, filters.month + 1, 0, 23, 59, 59)

                q = query(
                    collection(db, COLLECTION_NAME),
                    where('date', '>=', Timestamp.fromDate(startDate)),
                    where('date', '<=', Timestamp.fromDate(endDate)),
                    orderBy('date', 'desc')
                )
            }

            const snapshot = await getDocs(q)
            expenses.value = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Expense[]
        } catch (e: any) {
            console.error('Error fetching expenses:', e)
            error.value = 'فشل في تحميل المصروفات'
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Fetch expenses for current month
     */
    async function fetchCurrentMonthExpenses(): Promise<void> {
        const now = new Date()
        await fetchExpenses({
            month: now.getMonth(),
            year: now.getFullYear(),
        })
    }

    /**
     * Get a single expense by ID
     */
    async function getExpenseById(id: string): Promise<Expense | null> {
        isLoading.value = true
        error.value = null

        try {
            const docRef = doc(db, COLLECTION_NAME, id)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                return {
                    id: docSnap.id,
                    ...docSnap.data(),
                } as Expense
            }

            return null
        } catch (e: any) {
            console.error('Error fetching expense:', e)
            error.value = 'فشل في تحميل المصروف'
            return null
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Add a new expense
     */
    async function addExpense(data: NewExpense): Promise<string | null> {
        if (!userInfo.value) {
            error.value = 'يجب تسجيل الدخول أولاً'
            return null
        }

        isLoading.value = true
        error.value = null

        try {
            const now = Timestamp.now()
            const expenseData = {
                amount: data.amount,
                category: data.category,
                date: Timestamp.fromDate(data.date),
                notes: data.notes || '',
                imageBase64: data.imageBase64 || '',
                createdBy: {
                    id: userInfo.value.id,
                    role: userInfo.value.role,
                },
                createdAt: now,
                updatedAt: now,
            }

            const docRef = await addDoc(collection(db, COLLECTION_NAME), expenseData)

            // Add to local state
            expenses.value.unshift({
                id: docRef.id,
                ...expenseData,
            } as Expense)

            return docRef.id
        } catch (e: any) {
            console.error('Error adding expense:', e)
            error.value = 'فشل في إضافة المصروف'
            return null
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Update an existing expense
     */
    async function updateExpense(id: string, data: UpdateExpense): Promise<boolean> {
        isLoading.value = true
        error.value = null

        try {
            const updateData: Record<string, any> = {
                updatedAt: Timestamp.now(),
            }

            if (data.amount !== undefined) updateData.amount = data.amount
            if (data.category !== undefined) updateData.category = data.category
            if (data.date !== undefined) updateData.date = Timestamp.fromDate(data.date)
            if (data.notes !== undefined) updateData.notes = data.notes
            if (data.imageBase64 !== undefined) updateData.imageBase64 = data.imageBase64

            await updateDoc(doc(db, COLLECTION_NAME, id), updateData)

            // Update local state
            const index = expenses.value.findIndex((e) => e.id === id)
            if (index !== -1) {
                const existing = expenses.value[index]!
                expenses.value[index] = {
                    ...existing,
                    ...updateData,
                    date: updateData.date || existing.date,
                }
            }

            return true
        } catch (e: any) {
            console.error('Error updating expense:', e)
            error.value = 'فشل في تحديث المصروف'
            return false
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Delete an expense
     */
    async function deleteExpense(id: string): Promise<boolean> {
        isLoading.value = true
        error.value = null

        try {
            await deleteDoc(doc(db, COLLECTION_NAME, id))

            // Remove from local state
            expenses.value = expenses.value.filter((e) => e.id !== id)

            return true
        } catch (e: any) {
            console.error('Error deleting expense:', e)
            error.value = 'فشل في حذف المصروف'
            return false
        } finally {
            isLoading.value = false
        }
    }

    // Computed properties
    const totalAmount = computed(() =>
        expenses.value.reduce((sum, e) => sum + e.amount, 0)
    )

    const expensesByCategory = computed(() => {
        const grouped: Record<string, Expense[]> = {}
        expenses.value.forEach((expense) => {
            if (!grouped[expense.category]) {
                grouped[expense.category] = []
            }
            grouped[expense.category]!.push(expense)
        })
        return grouped
    })

    const expensesByUser = computed(() => {
        const husband: Expense[] = []
        const wife: Expense[] = []

        expenses.value.forEach((expense) => {
            if (expense.createdBy.role === 'husband') {
                husband.push(expense)
            } else {
                wife.push(expense)
            }
        })

        return { husband, wife }
    })

    const husbandTotal = computed(() =>
        expensesByUser.value.husband.reduce((sum, e) => sum + e.amount, 0)
    )

    const wifeTotal = computed(() =>
        expensesByUser.value.wife.reduce((sum, e) => sum + e.amount, 0)
    )

    return {
        // State
        expenses,
        isLoading,
        error,

        // Computed
        totalAmount,
        expensesByCategory,
        expensesByUser,
        husbandTotal,
        wifeTotal,

        // Methods
        fetchExpenses,
        fetchCurrentMonthExpenses,
        getExpenseById,
        addExpense,
        updateExpense,
        deleteExpense,
    }
}
