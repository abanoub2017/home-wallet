import { createRouter, createWebHashHistory } from 'vue-router'
import { setupRouterGuards } from './guards'

/**
 * Application Routes
 *
 * Uses hash history for GitHub Pages compatibility
 * Route meta:
 *   - requiresAuth: User must be logged in
 *   - requiresGuest: User must NOT be logged in
 */
const router = createRouter({
  // Hash history for GitHub Pages (no server-side routing needed)
  history: createWebHashHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/expenses',
      name: 'expenses',
      component: () => import('@/views/ExpensesView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/expenses/add',
      name: 'add-expense',
      component: () => import('@/views/AddExpenseView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/expenses/:id/edit',
      name: 'edit-expense',
      component: () => import('@/views/EditExpenseView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/SettingsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/ProfileView.vue'),
      meta: { requiresAuth: true },
    },
    {
      // Catch all - redirect to dashboard
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard',
    },
  ],
})

// Setup navigation guards
setupRouterGuards(router)

export default router
