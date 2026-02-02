import type { CategoryInfo, ExpenseCategory } from '@/types'

/**
 * Expense Categories Configuration
 * All category names are in Arabic
 */
export const CATEGORIES: CategoryInfo[] = [
    {
        id: 'food',
        name: 'طعام ومشروبات',
        icon: '🍽️',
        color: 'orange',
    },
    {
        id: 'transport',
        name: 'مواصلات',
        icon: '🚗',
        color: 'blue',
    },
    {
        id: 'bills',
        name: 'فواتير',
        icon: '📄',
        color: 'red',
    },
    {
        id: 'shopping',
        name: 'تسوق',
        icon: '🛒',
        color: 'pink',
    },
    {
        id: 'health',
        name: 'صحة',
        icon: '💊',
        color: 'green',
    },
    {
        id: 'entertainment',
        name: 'ترفيه',
        icon: '🎬',
        color: 'purple',
    },
    {
        id: 'education',
        name: 'تعليم',
        icon: '📚',
        color: 'indigo',
    },
    {
        id: 'other',
        name: 'أخرى',
        icon: '📦',
        color: 'gray',
    },
]

/**
 * Get category info by ID
 * Returns 'other' category if not found
 */
export function getCategoryInfo(id: ExpenseCategory): CategoryInfo {
    const found = CATEGORIES.find((c) => c.id === id)
    if (found) return found
    // Fallback to 'other' category (last in the array)
    return CATEGORIES[CATEGORIES.length - 1]!
}

/**
 * Get category name by ID
 */
export function getCategoryName(id: ExpenseCategory): string {
    return getCategoryInfo(id).name
}

/**
 * Get all category IDs
 */
export function getCategoryIds(): ExpenseCategory[] {
    return CATEGORIES.map((c) => c.id)
}
