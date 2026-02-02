/**
 * Currency Utility Functions
 * Formats currency in Egyptian Pounds (EGP)
 */

/**
 * Format number as currency (e.g., "١٥٠ ج.م")
 */
export function formatCurrency(amount: number): string {
    const formatted = new Intl.NumberFormat('ar-EG', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount)

    return `${formatted} ج.م`
}

/**
 * Format number as currency without suffix (e.g., "١٥٠")
 */
export function formatNumber(amount: number): string {
    return new Intl.NumberFormat('ar-EG', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(amount)
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
    // Remove currency symbol and non-numeric characters except decimal
    const cleaned = value
        .replace(/[^\d.,٠-٩]/g, '')
        .replace(/[٠-٩]/g, (d) => String('٠١٢٣٤٥٦٧٨٩'.indexOf(d)))
        .replace(',', '.')

    return parseFloat(cleaned) || 0
}

/**
 * Format percentage (e.g., "٢٥٪")
 */
export function formatPercentage(value: number): string {
    return new Intl.NumberFormat('ar-EG', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 1,
    }).format(value / 100)
}
