/**
 * TypeScript Type Definitions
 * Central location for all application types
 */

import type { Timestamp } from 'firebase/firestore'

// ===================================
// User Types
// ===================================

/**
 * User roles - limited to two predefined users
 */
export type UserRole = 'husband' | 'wife'

/**
 * User profile stored in Firestore
 */
export interface UserProfile {
    id: string
    email: string
    role: UserRole
    nickname: string
    avatarBase64?: string
    createdAt?: Timestamp
    updatedAt?: Timestamp
}

/**
 * User profile update data
 */
export interface UpdateUserProfile {
    role?: UserRole
    nickname?: string
    avatarBase64?: string
}

/**
 * User information with role
 */
export interface UserInfo {
    id: string
    email: string
    role: UserRole
    displayName: string
    nickname?: string
    avatarBase64?: string
}

/**
 * Role display names in Arabic
 */
export const ROLE_DISPLAY_NAMES: Record<UserRole, string> = {
    husband: 'الزوج',
    wife: 'الزوجة',
}

// ===================================
// Expense Types
// ===================================

/**
 * Expense categories - now supports dynamic categories
 */
export type ExpenseCategory = string

/**
 * Created by information stored with each expense
 */
export interface CreatedBy {
    id: string
    role: UserRole
}

/**
 * Full expense document from Firestore
 */
export interface Expense {
    id: string
    amount: number
    category: ExpenseCategory
    date: Timestamp
    notes?: string
    imageBase64?: string
    createdBy: CreatedBy
    createdAt: Timestamp
    updatedAt: Timestamp
}

/**
 * New expense data (before saving to Firestore)
 */
export interface NewExpense {
    amount: number
    category: ExpenseCategory
    date: Date
    notes?: string
    imageBase64?: string
}

/**
 * Expense update data
 */
export interface UpdateExpense {
    amount?: number
    category?: ExpenseCategory
    date?: Date
    notes?: string
    imageBase64?: string
}

/**
 * Filters for querying expenses
 */
export interface ExpenseFilters {
    month?: number
    year?: number
    category?: ExpenseCategory
    userId?: string
}

// ===================================
// Category Types
// ===================================

/**
 * Category information for display
 * Stored in Firestore for dynamic management
 */
export interface CategoryInfo {
    id: string
    name: string
    icon: string
    color: string
    isDefault?: boolean // true for built-in categories
    order?: number // for sorting
}

/**
 * New category data (before saving)
 */
export interface NewCategory {
    name: string
    icon: string
    color: string
}

/**
 * Category summary for statistics
 */
export interface CategorySummary {
    category: ExpenseCategory
    name: string
    icon: string
    color: string
    total: number
    count: number
    percentage: number
}

// ===================================
// Statistics Types
// ===================================

/**
 * User expense summary
 */
export interface UserExpenseSummary {
    userId: string
    role: UserRole
    displayName: string
    total: number
    count: number
    percentage: number
}

/**
 * Monthly statistics
 */
export interface MonthlyStats {
    month: number
    year: number
    total: number
    count: number
    byCategory: CategorySummary[]
    byUser: UserExpenseSummary[]
}

// ===================================
// UI State Types
// ===================================

/**
 * Loading state for async operations
 */
export interface LoadingState {
    isLoading: boolean
    error: string | null
}

/**
 * Toast notification types
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info'

/**
 * Toast notification
 */
export interface Toast {
    id: string
    type: ToastType
    message: string
    duration?: number
}

// ===================================
// Form Types
// ===================================

/**
 * Expense form data
 */
export interface ExpenseFormData {
    amount: string
    category: ExpenseCategory | ''
    date: string
    notes: string
    imageBase64: string | null
}

/**
 * Form validation errors
 */
export interface FormErrors {
    amount?: string
    category?: string
    date?: string
    notes?: string
    image?: string
}
