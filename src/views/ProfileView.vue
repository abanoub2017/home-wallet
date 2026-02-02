<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppLayout from '@/components/layout/AppLayout.vue'
import ImageUpload from '@/components/common/ImageUpload.vue'
import { useAuth } from '@/composables/useAuth'
import { useProfile } from '@/composables/useProfile'
import { useToast } from '@/composables/useToast'
import type { UserRole } from '@/types'

/**
 * Profile View
 * Edit user profile: role, nickname, avatar
 */

const router = useRouter()
const { userInfo, logout } = useAuth()
const { profile, isLoading, error, fetchProfile, updateProfile } = useProfile()
const toast = useToast()

// Form state
const nickname = ref('')
const role = ref<UserRole>('husband')
const avatarBase64 = ref('')

// Load profile on mount
onMounted(async () => {
    await fetchProfile()
    if (profile.value) {
        nickname.value = profile.value.nickname || ''
        role.value = profile.value.role
        avatarBase64.value = profile.value.avatarBase64 || ''
    }
})

// Form validation
const isFormValid = computed(() => {
    return nickname.value.trim().length > 0
})

// Handle form submit
async function handleSubmit() {
    if (!isFormValid.value) return

    const success = await updateProfile({
        nickname: nickname.value.trim(),
        role: role.value,
        avatarBase64: avatarBase64.value,
    })

    if (success) {
        toast.success('تم حفظ التغييرات بنجاح')
    } else if (error.value) {
        toast.error(error.value)
    }
}

// Handle logout
async function handleLogout() {
    await logout()
    router.push('/login')
}

// Go back
function goBack() {
    router.back()
}
</script>

<template>
    <AppLayout>
        <div class="space-y-4">
            <!-- Header with Back Button -->
            <div class="flex items-center gap-3">
                <button @click="goBack"
                    class="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">الملف الشخصي</h2>
            </div>

            <!-- Loading -->
            <div v-if="isLoading && !profile" class="py-12 text-center text-gray-500 dark:text-gray-400">
                <svg class="animate-spin h-8 w-8 mx-auto mb-2 text-primary-600" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                جاري التحميل...
            </div>

            <template v-else>
                <form @submit.prevent="handleSubmit" class="space-y-4">
                    <!-- Avatar Section -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-colors">
                        <div class="text-center">
                            <!-- Current Avatar -->
                            <div class="relative inline-block mb-4">
                                <div v-if="avatarBase64"
                                    class="w-24 h-24 rounded-full overflow-hidden border-4 border-primary-100 dark:border-primary-900">
                                    <img :src="avatarBase64" alt="صورة الملف الشخصي"
                                        class="w-full h-full object-cover" />
                                </div>
                                <div v-else
                                    class="w-24 h-24 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-4xl border-4 border-primary-50 dark:border-primary-900">
                                    {{ role === 'husband' ? '👨' : '👩' }}
                                </div>
                            </div>

                            <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">صورة الملف الشخصي (اختياري)</p>

                            <ImageUpload v-model="avatarBase64" :disabled="isLoading" />
                        </div>
                    </div>

                    <!-- Role Selection -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            أنا <span class="text-red-500">*</span>
                        </label>
                        <div class="grid grid-cols-2 gap-3">
                            <button type="button" @click="role = 'husband'" :class="[
                                'flex flex-col items-center p-4 rounded-xl transition-all border-2',
                                role === 'husband'
                                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                                    : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                            ]">
                                <span class="text-4xl mb-2">👨</span>
                                <span :class="[
                                    'font-medium',
                                    role === 'husband' ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'
                                ]">الزوج</span>
                            </button>

                            <button type="button" @click="role = 'wife'" :class="[
                                'flex flex-col items-center p-4 rounded-xl transition-all border-2',
                                role === 'wife'
                                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30'
                                    : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                            ]">
                                <span class="text-4xl mb-2">👩</span>
                                <span :class="[
                                    'font-medium',
                                    role === 'wife' ? 'text-pink-700 dark:text-pink-300' : 'text-gray-700 dark:text-gray-300'
                                ]">الزوجة</span>
                            </button>
                        </div>
                    </div>

                    <!-- Nickname -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            الاسم المستعار <span class="text-red-500">*</span>
                        </label>
                        <input v-model="nickname" type="text" required placeholder="مثال: أحمد، سارة..."
                            class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                            :disabled="isLoading" />
                        <p class="text-xs text-gray-400 dark:text-gray-500 mt-2">هذا الاسم سيظهر في التطبيق بدلاً من
                            "الزوج" أو "الزوجة"
                        </p>
                    </div>

                    <!-- Email (Read-only) -->
                    <div
                        class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 transition-colors">
                        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            البريد الإلكتروني
                        </label>
                        <input :value="userInfo?.email" type="email" readonly
                            class="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                            dir="ltr" />
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" :disabled="isLoading || !isFormValid"
                        class="w-full py-4 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2">
                        <svg v-if="isLoading" class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                            <path class="opacity-75" fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>{{ isLoading ? 'جاري الحفظ...' : 'حفظ التغييرات' }}</span>
                    </button>
                </form>

                <!-- Logout Button -->
                <button @click="handleLogout"
                    class="w-full py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 font-medium rounded-xl transition-colors mt-4">
                    تسجيل الخروج
                </button>
            </template>
        </div>
    </AppLayout>
</template>
