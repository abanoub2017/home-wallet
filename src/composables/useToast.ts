import { ref } from 'vue'
import type { Toast, ToastType } from '@/types'

/**
 * Toast Notifications Composable
 *
 * Shows toast messages at fixed position on screen
 * Visible regardless of scroll position
 */

// Shared state
const toasts = ref<Toast[]>([])

// Default duration in milliseconds
const DEFAULT_DURATION = 3000

/**
 * Generate unique ID
 */
function generateId(): string {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function useToast() {
    /**
     * Show a toast notification
     */
    function show(message: string, type: ToastType = 'info', duration: number = DEFAULT_DURATION): string {
        const id = generateId()

        const toast: Toast = {
            id,
            type,
            message,
            duration,
        }

        toasts.value.push(toast)

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => {
                remove(id)
            }, duration)
        }

        return id
    }

    /**
     * Show success toast
     */
    function success(message: string, duration?: number): string {
        return show(message, 'success', duration)
    }

    /**
     * Show error toast
     */
    function error(message: string, duration?: number): string {
        return show(message, 'error', duration)
    }

    /**
     * Show warning toast
     */
    function warning(message: string, duration?: number): string {
        return show(message, 'warning', duration)
    }

    /**
     * Show info toast
     */
    function info(message: string, duration?: number): string {
        return show(message, 'info', duration)
    }

    /**
     * Remove a toast by ID
     */
    function remove(id: string): void {
        const index = toasts.value.findIndex((t) => t.id === id)
        if (index !== -1) {
            toasts.value.splice(index, 1)
        }
    }

    /**
     * Clear all toasts
     */
    function clear(): void {
        toasts.value = []
    }

    return {
        // State
        toasts,

        // Methods
        show,
        success,
        error,
        warning,
        info,
        remove,
        clear,
    }
}
