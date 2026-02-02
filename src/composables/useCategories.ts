import { ref, computed } from 'vue'
import {
    collection,
    doc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    writeBatch,
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { CategoryInfo, NewCategory } from '@/types'
import { CATEGORIES as DEFAULT_CATEGORIES } from '@/config/categories'

/**
 * Categories Composable
 *
 * Manages expense categories with Firestore
 * Supports default categories + custom user categories
 */

// Shared state
const categories = ref<CategoryInfo[]>([])
const isLoading = ref(false)
const error = ref<string | null>(null)
const isInitialized = ref(false)

// Firestore collection reference
const COLLECTION_NAME = 'categories'

/**
 * Generate a unique ID for new categories
 */
function generateCategoryId(name: string): string {
    const slug = name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\u0621-\u064Aa-z0-9-]/g, '')
    const timestamp = Date.now().toString(36)
    return `${slug}-${timestamp}`
}

export function useCategories() {
    /**
     * Initialize categories from Firestore
     * If no categories exist, seed with defaults
     */
    async function initCategories(): Promise<void> {
        if (isInitialized.value) return

        isLoading.value = true
        error.value = null

        try {
            const q = query(collection(db, COLLECTION_NAME), orderBy('order', 'asc'))
            const snapshot = await getDocs(q)

            if (snapshot.empty) {
                // No categories in Firestore - seed with defaults
                await seedDefaultCategories()
            } else {
                // Load categories from Firestore
                categories.value = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as CategoryInfo[]
            }

            isInitialized.value = true
        } catch (e: any) {
            console.error('Error loading categories:', e)
            error.value = 'فشل في تحميل الفئات'
            // Fallback to default categories
            categories.value = DEFAULT_CATEGORIES.map((c, i) => ({
                ...c,
                isDefault: true,
                order: i,
            }))
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Seed default categories to Firestore
     */
    async function seedDefaultCategories(): Promise<void> {
        const batch = writeBatch(db)

        DEFAULT_CATEGORIES.forEach((category, index) => {
            const docRef = doc(db, COLLECTION_NAME, category.id)
            batch.set(docRef, {
                ...category,
                isDefault: true,
                order: index,
            })
        })

        await batch.commit()

        categories.value = DEFAULT_CATEGORIES.map((c, i) => ({
            ...c,
            isDefault: true,
            order: i,
        }))
    }

    /**
     * Add a new category
     */
    async function addCategory(data: NewCategory): Promise<CategoryInfo | null> {
        isLoading.value = true
        error.value = null

        try {
            const id = generateCategoryId(data.name)
            const newCategory: CategoryInfo = {
                id,
                name: data.name,
                icon: data.icon,
                color: data.color,
                isDefault: false,
                order: categories.value.length,
            }

            await setDoc(doc(db, COLLECTION_NAME, id), newCategory)
            categories.value.push(newCategory)

            return newCategory
        } catch (e: any) {
            console.error('Error adding category:', e)
            error.value = 'فشل في إضافة الفئة'
            return null
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Update an existing category
     */
    async function updateCategory(
        id: string,
        data: Partial<NewCategory>
    ): Promise<boolean> {
        isLoading.value = true
        error.value = null

        try {
            await updateDoc(doc(db, COLLECTION_NAME, id), data)

            const index = categories.value.findIndex((c) => c.id === id)
            if (index !== -1) {
                const existing = categories.value[index]!
                categories.value[index] = {
                    id: existing.id,
                    name: data.name ?? existing.name,
                    icon: data.icon ?? existing.icon,
                    color: data.color ?? existing.color,
                    isDefault: existing.isDefault,
                    order: existing.order,
                }
            }

            return true
        } catch (e: any) {
            console.error('Error updating category:', e)
            error.value = 'فشل في تحديث الفئة'
            return false
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Delete a category
     */
    async function deleteCategory(id: string): Promise<boolean> {
        isLoading.value = true
        error.value = null

        try {
            await deleteDoc(doc(db, COLLECTION_NAME, id))
            categories.value = categories.value.filter((c) => c.id !== id)
            return true
        } catch (e: any) {
            console.error('Error deleting category:', e)
            error.value = 'فشل في حذف الفئة'
            return false
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Get category by ID
     */
    function getCategoryById(id: string): CategoryInfo | undefined {
        return categories.value.find((c) => c.id === id)
    }

    /**
     * Reset to default categories
     */
    async function resetToDefaults(): Promise<boolean> {
        isLoading.value = true
        error.value = null

        try {
            // Delete all existing categories
            const batch = writeBatch(db)
            categories.value.forEach((category) => {
                batch.delete(doc(db, COLLECTION_NAME, category.id))
            })
            await batch.commit()

            // Seed defaults again
            await seedDefaultCategories()
            return true
        } catch (e: any) {
            console.error('Error resetting categories:', e)
            error.value = 'فشل في إعادة تعيين الفئات'
            return false
        } finally {
            isLoading.value = false
        }
    }

    // Computed
    const sortedCategories = computed(() =>
        [...categories.value].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    )

    const defaultCategories = computed(() =>
        categories.value.filter((c) => c.isDefault)
    )

    const customCategories = computed(() =>
        categories.value.filter((c) => !c.isDefault)
    )

    return {
        // State
        categories,
        isLoading,
        error,
        isInitialized,

        // Computed
        sortedCategories,
        defaultCategories,
        customCategories,

        // Methods
        initCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryById,
        resetToDefaults,
    }
}
