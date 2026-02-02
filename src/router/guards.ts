import type { Router } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

/**
 * Router Navigation Guards
 * 
 * Protects routes based on authentication state:
 * - requiresAuth: Redirects to login if not authenticated
 * - requiresGuest: Redirects to dashboard if already authenticated
 */
export function setupRouterGuards(router: Router) {
    const { isAuthenticated, isLoading, initAuth } = useAuth()

    // Wait for auth to initialize before first navigation
    let isAuthInitialized = false

    router.beforeEach(async (to, from, next) => {
        // Initialize auth on first navigation
        if (!isAuthInitialized) {
            await initAuth()
            isAuthInitialized = true
        }

        // Wait if auth is still loading
        if (isLoading.value) {
            // Could add a loading state here
        }

        const requiresAuth = to.meta.requiresAuth === true
        const requiresGuest = to.meta.requiresGuest === true

        // Route requires authentication but user is not logged in
        if (requiresAuth && !isAuthenticated.value) {
            next({ name: 'login', query: { redirect: to.fullPath } })
            return
        }

        // Route requires guest (login page) but user is already logged in
        if (requiresGuest && isAuthenticated.value) {
            next({ name: 'dashboard' })
            return
        }

        // Allow navigation
        next()
    })
}
