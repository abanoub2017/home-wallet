import { ref, computed, onMounted } from 'vue'
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User,
} from 'firebase/auth'
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore'
import { auth, db } from '@/config/firebase'
import type { UserInfo, UserRole, UserProfile } from '@/types'

/**
 * Authentication Composable
 *
 * Handles user authentication state, login, and logout
 * Maps Firebase user to application UserInfo with role
 */

// Shared state across components
const user = ref<User | null>(null)
const userInfo = ref<UserInfo | null>(null)
const isLoading = ref(true)
const error = ref<string | null>(null)

// Firestore collection
const USERS_COLLECTION = 'users'

/**
 * Get or create user profile from Firestore
 */
async function getOrCreateUserProfile(firebaseUser: User): Promise<UserProfile> {
    const docRef = doc(db, USERS_COLLECTION, firebaseUser.uid)

    try {
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            } as UserProfile
        }

        // Create default profile for new user
        const now = Timestamp.now()
        const defaultProfile: Omit<UserProfile, 'id'> = {
            email: firebaseUser.email || '',
            role: 'husband', // Default, user should update in profile
            nickname: '',
            avatarBase64: '',
            createdAt: now,
            updatedAt: now,
        }

        await setDoc(docRef, defaultProfile)

        return {
            id: firebaseUser.uid,
            ...defaultProfile,
        }
    } catch (e) {
        console.warn('Could not fetch/create user profile:', e)
        // Return minimal profile if Firestore fails
        return {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            role: 'husband',
            nickname: '',
        }
    }
}

/**
 * Build UserInfo from Firebase user and profile
 */
async function buildUserInfo(firebaseUser: User): Promise<UserInfo> {
    const profile = await getOrCreateUserProfile(firebaseUser)

    return {
        id: firebaseUser.uid,
        email: firebaseUser.email || '',
        role: profile.role,
        displayName: profile.role === 'husband' ? 'الزوج' : 'الزوجة',
        nickname: profile.nickname,
        avatarBase64: profile.avatarBase64,
    }
}

export function useAuth() {
    /**
     * Initialize auth state listener
     * Should be called once in App.vue
     */
    function initAuth() {
        return new Promise<void>((resolve) => {
            const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                if (firebaseUser) {
                    user.value = firebaseUser
                    userInfo.value = await buildUserInfo(firebaseUser)
                } else {
                    user.value = null
                    userInfo.value = null
                }
                isLoading.value = false
                resolve()
            })

            // Return unsubscribe for cleanup if needed
            return unsubscribe
        })
    }

    /**
     * Login with email and password
     */
    async function login(email: string, password: string): Promise<boolean> {
        error.value = null
        isLoading.value = true

        try {
            const result = await signInWithEmailAndPassword(auth, email, password)
            user.value = result.user
            userInfo.value = await buildUserInfo(result.user)
            return true
        } catch (e: any) {
            console.error('Login error:', e)

            // Map Firebase errors to Arabic messages
            switch (e.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    error.value = 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
                    break
                case 'auth/too-many-requests':
                    error.value = 'تم تجاوز عدد المحاولات المسموحة. حاول لاحقاً'
                    break
                case 'auth/network-request-failed':
                    error.value = 'خطأ في الاتصال بالإنترنت'
                    break
                default:
                    error.value = 'حدث خطأ أثناء تسجيل الدخول'
            }
            return false
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Logout current user
     */
    async function logout(): Promise<void> {
        try {
            await signOut(auth)
            user.value = null
            userInfo.value = null
        } catch (e) {
            console.error('Logout error:', e)
            error.value = 'حدث خطأ أثناء تسجيل الخروج'
        }
    }

    /**
     * Clear error message
     */
    function clearError() {
        error.value = null
    }

    // Computed properties
    const isAuthenticated = computed(() => !!user.value)
    const isHusband = computed(() => userInfo.value?.role === 'husband')
    const isWife = computed(() => userInfo.value?.role === 'wife')

    return {
        // State
        user,
        userInfo,
        isLoading,
        error,

        // Computed
        isAuthenticated,
        isHusband,
        isWife,

        // Methods
        initAuth,
        login,
        logout,
        clearError,
    }
}
