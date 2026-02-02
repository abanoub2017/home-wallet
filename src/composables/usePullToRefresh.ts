import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Pull to Refresh Composable
 *
 * Enables pull-to-refresh gesture on mobile devices
 */

export interface PullToRefreshOptions {
    threshold?: number // Distance to pull before triggering refresh (default: 80)
    maxPull?: number // Maximum pull distance (default: 120)
    onRefresh: () => Promise<void>
}

export function usePullToRefresh(options: PullToRefreshOptions) {
    const threshold = options.threshold || 80
    const maxPull = options.maxPull || 120

    const isPulling = ref(false)
    const isRefreshing = ref(false)
    const pullDistance = ref(0)

    let startY = 0
    let currentY = 0

    function onTouchStart(e: TouchEvent) {
        // Only enable pull-to-refresh when at top of page
        if (window.scrollY > 0) return

        startY = e.touches[0]?.clientY || 0
        isPulling.value = true
    }

    function onTouchMove(e: TouchEvent) {
        if (!isPulling.value || isRefreshing.value) return

        currentY = e.touches[0]?.clientY || 0
        const diff = currentY - startY

        // Only allow pulling down
        if (diff < 0) {
            pullDistance.value = 0
            return
        }

        // Apply resistance (pull distance = actual distance * 0.5)
        pullDistance.value = Math.min(diff * 0.5, maxPull)

        // Prevent default scroll when pulling
        if (pullDistance.value > 0) {
            e.preventDefault()
        }
    }

    async function onTouchEnd() {
        if (!isPulling.value) return

        isPulling.value = false

        if (pullDistance.value >= threshold && !isRefreshing.value) {
            isRefreshing.value = true
            pullDistance.value = threshold // Keep at threshold during refresh

            try {
                await options.onRefresh()
            } finally {
                isRefreshing.value = false
                pullDistance.value = 0
            }
        } else {
            pullDistance.value = 0
        }
    }

    // Progress percentage (0-100)
    const progress = ref(0)

    function updateProgress() {
        progress.value = Math.min((pullDistance.value / threshold) * 100, 100)
    }

    // Watch pullDistance and update progress
    onMounted(() => {
        const element = document.body

        element.addEventListener('touchstart', onTouchStart, { passive: true })
        element.addEventListener('touchmove', onTouchMove, { passive: false })
        element.addEventListener('touchend', onTouchEnd, { passive: true })
    })

    onUnmounted(() => {
        const element = document.body

        element.removeEventListener('touchstart', onTouchStart)
        element.removeEventListener('touchmove', onTouchMove)
        element.removeEventListener('touchend', onTouchEnd)
    })

    return {
        isPulling,
        isRefreshing,
        pullDistance,
        progress,
    }
}
