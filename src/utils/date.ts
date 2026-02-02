/**
 * Date Utility Functions
 * All formatting uses Arabic locale (ar-EG)
 */

/**
 * Format date in Arabic (e.g., "١ فبراير ٢٠٢٦")
 */
export function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('ar-EG', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(date)
}

/**
 * Format date short (e.g., "١/٢/٢٠٢٦")
 */
export function formatDateShort(date: Date): string {
    return new Intl.DateTimeFormat('ar-EG', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    }).format(date)
}

/**
 * Format relative time (e.g., "منذ ساعتين")
 */
export function formatRelative(date: Date): string {
    const rtf = new Intl.RelativeTimeFormat('ar-EG', { numeric: 'auto' })
    const now = Date.now()
    const diff = date.getTime() - now

    const seconds = Math.round(diff / 1000)
    const minutes = Math.round(diff / (1000 * 60))
    const hours = Math.round(diff / (1000 * 60 * 60))
    const days = Math.round(diff / (1000 * 60 * 60 * 24))

    if (Math.abs(seconds) < 60) {
        return rtf.format(seconds, 'second')
    } else if (Math.abs(minutes) < 60) {
        return rtf.format(minutes, 'minute')
    } else if (Math.abs(hours) < 24) {
        return rtf.format(hours, 'hour')
    } else {
        return rtf.format(days, 'day')
    }
}

/**
 * Get month name in Arabic (e.g., "فبراير")
 */
export function getMonthName(month: number): string {
    const date = new Date(2024, month, 1)
    return new Intl.DateTimeFormat('ar-EG', { month: 'long' }).format(date)
}

/**
 * Get current month and year
 */
export function getCurrentMonthYear(): { month: number; year: number } {
    const now = new Date()
    return {
        month: now.getMonth(),
        year: now.getFullYear(),
    }
}

/**
 * Check if date is in given month/year
 */
export function isInMonth(date: Date, month: number, year: number): boolean {
    return date.getMonth() === month && date.getFullYear() === year
}

/**
 * Get start and end of month
 */
export function getMonthRange(month: number, year: number): { start: Date; end: Date } {
    const start = new Date(year, month, 1, 0, 0, 0, 0)
    const end = new Date(year, month + 1, 0, 23, 59, 59, 999)
    return { start, end }
}
