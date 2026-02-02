import { ref } from 'vue'
import { doc, getDoc, setDoc, updateDoc, Timestamp } from 'firebase/firestore'
import { db } from '@/config/firebase'
import { useAuth } from './useAuth'
import type { UserProfile, UpdateUserProfile, UserRole } from '@/types'

/**
 * Profile Composable
 *
 * Manages user profile data in Firestore
 * - Role (husband/wife)
 * - Nickname
 * - Avatar image (base64)
 */

// Shared state
const profile = ref<UserProfile | null>(null)
const isLoading = ref(false)
const error = ref<string | null>(null)
const isInitialized = ref(false)

// Firestore collection
const COLLECTION_NAME = 'users'

export function useProfile() {
    const { user, userInfo } = useAuth()

    /**
     * Fetch user profile from Firestore
     */
    async function fetchProfile(): Promise<UserProfile | null> {
        if (!user.value) return null

        isLoading.value = true
        error.value = null

        try {
            const docRef = doc(db, COLLECTION_NAME, user.value.uid)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                profile.value = {
                    id: docSnap.id,
                    ...docSnap.data(),
                } as UserProfile
            } else {
                // Create default profile if doesn't exist
                profile.value = await createDefaultProfile()
            }

            isInitialized.value = true
            return profile.value
        } catch (e: any) {
            console.error('Error fetching profile:', e)
            error.value = 'فشل في تحميل الملف الشخصي'
            return null
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Create default profile for new user
     */
    async function createDefaultProfile(): Promise<UserProfile | null> {
        if (!user.value) return null

        const now = Timestamp.now()
        const defaultProfile: Omit<UserProfile, 'id'> = {
            email: user.value.email || '',
            role: 'husband', // Default role, user should update
            nickname: '',
            avatarBase64: '',
            createdAt: now,
            updatedAt: now,
        }

        try {
            await setDoc(doc(db, COLLECTION_NAME, user.value.uid), defaultProfile)
            return {
                id: user.value.uid,
                ...defaultProfile,
            }
        } catch (e: any) {
            console.error('Error creating profile:', e)
            error.value = 'فشل في إنشاء الملف الشخصي'
            return null
        }
    }

    /**
     * Update user profile
     */
    async function updateProfile(data: UpdateUserProfile): Promise<boolean> {
        if (!user.value) {
            error.value = 'يجب تسجيل الدخول أولاً'
            return false
        }

        isLoading.value = true
        error.value = null

        try {
            const updateData: Record<string, any> = {
                updatedAt: Timestamp.now(),
            }

            if (data.role !== undefined) updateData.role = data.role
            if (data.nickname !== undefined) updateData.nickname = data.nickname
            if (data.avatarBase64 !== undefined) updateData.avatarBase64 = data.avatarBase64

            await updateDoc(doc(db, COLLECTION_NAME, user.value.uid), updateData)

            // Update local state
            if (profile.value) {
                profile.value = {
                    ...profile.value,
                    ...updateData,
                }
            }

            // Update userInfo in auth composable
            if (userInfo.value) {
                if (data.role) userInfo.value.role = data.role
                if (data.nickname) userInfo.value.nickname = data.nickname
                if (data.avatarBase64 !== undefined) userInfo.value.avatarBase64 = data.avatarBase64
                // Update displayName based on role
                if (data.role) {
                    userInfo.value.displayName = data.role === 'husband' ? 'الزوج' : 'الزوجة'
                }
            }

            return true
        } catch (e: any) {
            console.error('Error updating profile:', e)
            error.value = 'فشل في تحديث الملف الشخصي'
            return false
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Check if profile needs setup (first time user)
     */
    function needsProfileSetup(): boolean {
        if (!profile.value) return true
        // Profile needs setup if nickname is empty
        return !profile.value.nickname
    }

    /**
     * Get role display name
     */
    function getRoleDisplayName(role: UserRole): string {
        return role === 'husband' ? 'الزوج' : 'الزوجة'
    }

    return {
        // State
        profile,
        isLoading,
        error,
        isInitialized,

        // Methods
        fetchProfile,
        updateProfile,
        needsProfileSetup,
        getRoleDisplayName,
    }
}
