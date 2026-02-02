# 📅 مراحل التنفيذ - محفظة المنزل

## نظرة عامة

هذا المستند يحتوي على خطة التنفيذ التفصيلية لمشروع محفظة المنزل، مقسمة إلى مراحل واضحة مع المهام والمخرجات المتوقعة لكل مرحلة.

---

## 🗺️ خريطة المراحل

```
المرحلة 1          المرحلة 2          المرحلة 3          المرحلة 4
┌──────────┐      ┌──────────┐      ┌──────────┐      ┌──────────┐
│ الإعداد  │ ───> │ المصادقة │ ───> │المصروفات│ ───> │  الصور   │
│ الأساسي  │      │   Auth   │      │ Expenses │      │  Images  │
└──────────┘      └──────────┘      └──────────┘      └──────────┘
                                                            │
     ┌──────────────────────────────────────────────────────┘
     │
     ▼
المرحلة 5          المرحلة 6          المرحلة 7
┌──────────┐      ┌──────────┐      ┌──────────┐
│  لوحة   │ ───> │ المكونات │ ───> │  النشر  │
│  التحكم  │      │ المشتركة │      │ Deploy  │
└──────────┘      └──────────┘      └──────────┘
```

---

## 📊 ملخص المراحل

| المرحلة | الاسم             | المدة التقديرية | الأولوية  |
| ------- | ----------------- | --------------- | --------- |
| 1       | الإعداد الأساسي   | 2-3 ساعات       | 🔴 عالية  |
| 2       | المصادقة          | 3-4 ساعات       | 🔴 عالية  |
| 3       | المصروفات         | 6-8 ساعات       | 🔴 عالية  |
| 4       | الصور             | 2-3 ساعات       | 🟡 متوسطة |
| 5       | لوحة التحكم       | 3-4 ساعات       | 🟡 متوسطة |
| 6       | المكونات المشتركة | 2-3 ساعات       | 🟢 منخفضة |
| 7       | النشر             | 1-2 ساعة        | 🔴 عالية  |

**الإجمالي التقديري:** 19-27 ساعة عمل

---

## المرحلة 1: الإعداد الأساسي ⚙️

### الهدف

تجهيز بيئة التطوير وتثبيت جميع التبعيات المطلوبة.

### المهام

#### 1.1 تثبيت التبعيات

```bash
# تبعيات الإنتاج
npm install firebase

# تبعيات التطوير
npm install -D tailwindcss @tailwindcss/vite
```

#### 1.2 إعداد Tailwind CSS

**الملفات المطلوبة:**

- [ ] `src/assets/styles/main.css` - ملف CSS الرئيسي
- [ ] تحديث `vite.config.ts` - إضافة plugin
- [ ] تحديث `src/main.ts` - استيراد CSS

**محتوى main.css:**

```css
@import 'tailwindcss';

/* Custom styles for RTL and Arabic */
```

**تحديث vite.config.ts:**

```typescript
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/home-wallet/',
  plugins: [vue(), tailwindcss(), vueDevTools()],
  // ...
})
```

#### 1.3 إعداد RTL والعربية

**تحديث index.html:**

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>محفظة المنزل</title>
    <!-- Google Fonts - Cairo -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body class="font-cairo bg-gray-50 text-gray-900 antialiased">
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

#### 1.4 إعداد Firebase

**إنشاء src/config/firebase.ts:**

```typescript
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app
```

**إنشاء .env.example:**

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

#### 1.5 إنشاء هيكل المجلدات

```
src/
├── assets/
│   └── styles/
│       └── main.css
├── components/
│   ├── common/
│   ├── layout/
│   ├── dashboard/
│   └── expenses/
├── composables/
├── config/
├── router/
├── stores/
├── types/
├── utils/
└── views/
```

#### 1.6 إنشاء الأنواع (Types)

**إنشاء src/types/index.ts:**

```typescript
import type { Timestamp } from 'firebase/firestore'

// User Types
export type UserRole = 'husband' | 'wife'

export interface UserInfo {
  id: string
  email: string
  role: UserRole
  displayName: string
}

// Expense Types
export type ExpenseCategory =
  | 'food'
  | 'transport'
  | 'bills'
  | 'shopping'
  | 'health'
  | 'entertainment'
  | 'education'
  | 'other'

export interface CreatedBy {
  id: string
  role: UserRole
}

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

export interface NewExpense {
  amount: number
  category: ExpenseCategory
  date: Date
  notes?: string
  imageBase64?: string
}

export interface ExpenseFilters {
  month?: number
  year?: number
  category?: ExpenseCategory
  userId?: string
}

// Category Info
export interface CategoryInfo {
  id: ExpenseCategory
  name: string
  icon: string
  color: string
}
```

### المخرجات المتوقعة

- ✅ المشروع يعمل بـ `npm run dev`
- ✅ Tailwind CSS يعمل
- ✅ الواجهة بالعربية مع RTL
- ✅ Firebase مُعد (بدون اتصال فعلي بعد)
- ✅ هيكل المجلدات جاهز
- ✅ الأنواع معرفة

### التحقق من الإكمال

```bash
npm run dev
npm run type-check
npm run build
```

---

## المرحلة 2: المصادقة (Authentication) 🔐

### الهدف

تنفيذ نظام تسجيل الدخول/الخروج وحماية المسارات.

### المهام

#### 2.1 إنشاء useAuth Composable

**ملف: src/composables/useAuth.ts**

```typescript
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth'
import { auth } from '@/config/firebase'
import type { UserRole, UserInfo } from '@/types'

// تحديد أدوار المستخدمين بناءً على البريد الإلكتروني
const USER_ROLES: Record<string, UserRole> = {
  'husband@example.com': 'husband',
  'wife@example.com': 'wife',
}

const ROLE_NAMES: Record<UserRole, string> = {
  husband: 'الزوج',
  wife: 'الزوجة',
}

export function useAuth() {
  const user = ref<User | null>(null)
  const userInfo = ref<UserInfo | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  // Auth state listener
  let unsubscribe: (() => void) | null = null

  const isAuthenticated = computed(() => !!user.value)

  function getUserRole(email: string): UserRole {
    return USER_ROLES[email] || 'husband'
  }

  function setupUserInfo(firebaseUser: User) {
    const role = getUserRole(firebaseUser.email || '')
    userInfo.value = {
      id: firebaseUser.uid,
      email: firebaseUser.email || '',
      role,
      displayName: ROLE_NAMES[role],
    }
  }

  async function login(email: string, password: string): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const credential = await signInWithEmailAndPassword(auth, email, password)
      user.value = credential.user
      setupUserInfo(credential.user)
    } catch (e: any) {
      // ترجمة رسائل الخطأ
      const errorMessages: Record<string, string> = {
        'auth/user-not-found': 'البريد الإلكتروني غير مسجل',
        'auth/wrong-password': 'كلمة المرور غير صحيحة',
        'auth/invalid-email': 'البريد الإلكتروني غير صالح',
        'auth/too-many-requests': 'محاولات كثيرة، حاول لاحقاً',
      }
      error.value = errorMessages[e.code] || 'حدث خطأ أثناء تسجيل الدخول'
      throw e
    } finally {
      loading.value = false
    }
  }

  async function logout(): Promise<void> {
    try {
      await signOut(auth)
      user.value = null
      userInfo.value = null
    } catch (e: any) {
      error.value = 'حدث خطأ أثناء تسجيل الخروج'
      throw e
    }
  }

  onMounted(() => {
    unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
      if (firebaseUser) {
        setupUserInfo(firebaseUser)
      } else {
        userInfo.value = null
      }
      loading.value = false
    })
  })

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe()
    }
  })

  return {
    user,
    userInfo,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
  }
}
```

#### 2.2 إنشاء صفحة تسجيل الدخول

**ملف: src/views/LoginView.vue**

المكونات الرئيسية:

- حقل البريد الإلكتروني
- حقل كلمة المرور
- زر تسجيل الدخول
- رسائل الخطأ
- حالة التحميل

#### 2.3 إعداد Router مع الحراسات

**ملف: src/router/index.ts**

```typescript
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/',
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
  ],
})

export default router
```

**ملف: src/router/guards.ts**

```typescript
import type { Router } from 'vue-router'
import { auth } from '@/config/firebase'
import { onAuthStateChanged } from 'firebase/auth'

export function setupRouterGuards(router: Router) {
  // انتظار تحميل حالة المصادقة
  let authReady = false
  const authReadyPromise = new Promise<void>((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, () => {
      authReady = true
      unsubscribe()
      resolve()
    })
  })

  router.beforeEach(async (to, from, next) => {
    // انتظار تحميل حالة المصادقة
    if (!authReady) {
      await authReadyPromise
    }

    const isAuthenticated = !!auth.currentUser

    if (to.meta.requiresAuth && !isAuthenticated) {
      next({ name: 'login' })
    } else if (to.meta.requiresGuest && isAuthenticated) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  })
}
```

#### 2.4 إنشاء Layout

**ملف: src/components/layout/AppLayout.vue**
**ملف: src/components/layout/AppHeader.vue**
**ملف: src/components/layout/AppNav.vue**

### المخرجات المتوقعة

- ✅ صفحة تسجيل دخول تعمل
- ✅ تسجيل الدخول/الخروج يعمل
- ✅ حماية المسارات تعمل
- ✅ عرض اسم المستخدم في Header
- ✅ التنقل بين الصفحات

### التحقق من الإكمال

1. تسجيل الدخول ببيانات صحيحة → الانتقال للوحة التحكم
2. تسجيل الدخول ببيانات خاطئة → رسالة خطأ
3. الوصول لصفحة محمية بدون تسجيل → إعادة توجيه لتسجيل الدخول
4. تسجيل الخروج → إعادة توجيه لتسجيل الدخول

---

## المرحلة 3: المصروفات (Expenses) 💰

### الهدف

تنفيذ CRUD كامل للمصروفات.

### المهام

#### 3.1 إنشاء useExpenses Composable

**ملف: src/composables/useExpenses.ts**

الوظائف المطلوبة:

- `fetchExpenses(filters?)` - جلب المصروفات
- `addExpense(data)` - إضافة مصروف
- `updateExpense(id, data)` - تعديل مصروف
- `deleteExpense(id)` - حذف مصروف
- `subscribeToExpenses()` - الاستماع للتغييرات

Computed Properties:

- `monthlyTotal` - إجمالي الشهر
- `expensesByCategory` - مصروفات حسب الفئة
- `expensesByUser` - مصروفات حسب المستخدم

#### 3.2 إنشاء الفئات

**ملف: src/config/categories.ts**

```typescript
import type { CategoryInfo, ExpenseCategory } from '@/types'

export const CATEGORIES: CategoryInfo[] = [
  { id: 'food', name: 'طعام ومشروبات', icon: '🍽️', color: 'orange' },
  { id: 'transport', name: 'مواصلات', icon: '🚗', color: 'blue' },
  { id: 'bills', name: 'فواتير', icon: '📄', color: 'red' },
  { id: 'shopping', name: 'تسوق', icon: '🛒', color: 'pink' },
  { id: 'health', name: 'صحة', icon: '💊', color: 'green' },
  { id: 'entertainment', name: 'ترفيه', icon: '🎬', color: 'purple' },
  { id: 'education', name: 'تعليم', icon: '📚', color: 'indigo' },
  { id: 'other', name: 'أخرى', icon: '📦', color: 'gray' },
]

export function getCategoryInfo(id: ExpenseCategory): CategoryInfo {
  return CATEGORIES.find((c) => c.id === id) || CATEGORIES[CATEGORIES.length - 1]
}
```

#### 3.3 إنشاء مكونات المصروفات

| المكون            | الوصف                    |
| ----------------- | ------------------------ |
| `ExpenseList.vue` | قائمة المصروفات مع تصفية |
| `ExpenseCard.vue` | بطاقة مصروف واحد         |
| `ExpenseForm.vue` | نموذج إضافة/تعديل        |

#### 3.4 إنشاء الصفحات

| الصفحة                | الوصف               |
| --------------------- | ------------------- |
| `ExpensesView.vue`    | عرض قائمة المصروفات |
| `AddExpenseView.vue`  | إضافة مصروف جديد    |
| `EditExpenseView.vue` | تعديل مصروف         |

### المخرجات المتوقعة

- ✅ عرض قائمة المصروفات
- ✅ إضافة مصروف جديد
- ✅ تعديل مصروف (للمالك فقط)
- ✅ حذف مصروف (للمالك فقط)
- ✅ تصفية المصروفات

### التحقق من الإكمال

1. إضافة مصروف → يظهر في القائمة
2. تعديل مصروف → التغييرات تحفظ
3. حذف مصروف → يختفي من القائمة
4. مستخدم آخر لا يستطيع تعديل/حذف مصروفات الآخرين

---

## المرحلة 4: الصور (Images) 📷

### الهدف

تنفيذ رفع وضغط وعرض صور الفواتير.

### المهام

#### 4.1 إنشاء useImageCompression Composable

**ملف: src/composables/useImageCompression.ts**

```typescript
interface CompressionOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

export function useImageCompression() {
  async function compress(file: File, options: CompressionOptions = {}): Promise<string> {
    const { maxWidth = 800, maxHeight = 1200, quality = 0.7 } = options

    return new Promise((resolve, reject) => {
      const img = new Image()
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!

      img.onload = () => {
        let { width, height } = img

        // حساب الأبعاد الجديدة
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }

        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0, width, height)

        resolve(canvas.toDataURL('image/jpeg', quality))
      }

      img.onerror = reject
      img.src = URL.createObjectURL(file)
    })
  }

  function getSize(base64: string): number {
    const base64Data = base64.split(',')[1] || base64
    return Math.ceil((base64Data.length * 3) / 4)
  }

  function isValidSize(base64: string, maxKB = 500): boolean {
    return getSize(base64) / 1024 <= maxKB
  }

  return { compress, getSize, isValidSize }
}
```

#### 4.2 إنشاء ImageUploader Component

**ملف: src/components/expenses/ImageUploader.vue**

الميزات:

- اختيار ملف من الجهاز
- التقاط صورة من الكاميرا (موبايل)
- معاينة الصورة
- ضغط تلقائي
- عرض حجم الصورة
- إمكانية الحذف

### المخرجات المتوقعة

- ✅ رفع صورة تعمل
- ✅ الصورة تُضغط تلقائياً
- ✅ معاينة الصورة قبل الحفظ
- ✅ عرض الصورة في بطاقة المصروف

---

## المرحلة 5: لوحة التحكم (Dashboard) 📊

### الهدف

عرض إحصائيات ومعلومات مفيدة عن المصروفات.

### المهام

#### 5.1 إنشاء مكونات لوحة التحكم

| المكون                  | الوصف                |
| ----------------------- | -------------------- |
| `MonthSummary.vue`      | إجمالي مصروفات الشهر |
| `UserExpenses.vue`      | مصروفات كل مستخدم    |
| `CategoryBreakdown.vue` | تقسيم حسب الفئات     |
| `RecentExpenses.vue`    | آخر المصروفات        |

#### 5.2 إنشاء DashboardView

**ملف: src/views/DashboardView.vue**

Layout:

```
┌─────────────────────────────────────┐
│         إجمالي الشهر               │
│         ج.م 5,000                  │
└─────────────────────────────────────┘
┌────────────────┐ ┌─────────────────┐
│   مصروفات     │ │   مصروفات      │
│    الزوج      │ │    الزوجة      │
│   ج.م 3,000   │ │   ج.م 2,000    │
└────────────────┘ └─────────────────┘
┌─────────────────────────────────────┐
│         تقسيم الفئات               │
│ 🍽️ طعام        40%   ج.م 2,000    │
│ 🚗 مواصلات     20%   ج.م 1,000    │
│ 📄 فواتير      25%   ج.م 1,250    │
│ ...                                 │
└─────────────────────────────────────┘
┌─────────────────────────────────────┐
│         آخر المصروفات              │
│ ...                                 │
└─────────────────────────────────────┘
```

### المخرجات المتوقعة

- ✅ عرض إجمالي الشهر
- ✅ عرض مصروفات كل مستخدم
- ✅ عرض تقسيم الفئات
- ✅ عرض آخر المصروفات

---

## المرحلة 6: المكونات المشتركة 🧩

### الهدف

إنشاء مكونات قابلة لإعادة الاستخدام.

### المهام

#### 6.1 المكونات الأساسية

| المكون              | الوصف                                |
| ------------------- | ------------------------------------ |
| `AppButton.vue`     | زر مخصص (primary, secondary, danger) |
| `AppInput.vue`      | حقل إدخال مخصص                       |
| `AppSelect.vue`     | قائمة منسدلة مخصصة                   |
| `AppModal.vue`      | نافذة منبثقة                         |
| `AppLoader.vue`     | مؤشر تحميل                           |
| `AppToast.vue`      | رسائل التنبيه                        |
| `AppEmptyState.vue` | حالة فارغة                           |

#### 6.2 الأدوات المساعدة

**ملف: src/utils/date.ts**

```typescript
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatRelative(date: Date): string {
  const rtf = new Intl.RelativeTimeFormat('ar-EG', { numeric: 'auto' })
  const diff = date.getTime() - Date.now()
  const days = Math.round(diff / (1000 * 60 * 60 * 24))

  if (Math.abs(days) < 1) {
    const hours = Math.round(diff / (1000 * 60 * 60))
    return rtf.format(hours, 'hour')
  }
  return rtf.format(days, 'day')
}
```

**ملف: src/utils/currency.ts**

```typescript
export function formatCurrency(amount: number): string {
  return (
    new Intl.NumberFormat('ar-EG', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount) + ' ج.م'
  )
}
```

### المخرجات المتوقعة

- ✅ مكونات موحدة الشكل
- ✅ سهولة الاستخدام
- ✅ قابلة للتخصيص

---

## المرحلة 7: النشر (Deployment) 🚀

### الهدف

نشر التطبيق على GitHub Pages.

### المهام

#### 7.1 إعداد GitHub Actions

**ملف: .github/workflows/deploy.yml**

#### 7.2 إضافة Secrets

| Secret                    | الوصف              |
| ------------------------- | ------------------ |
| VITE_FIREBASE_API_KEY     | مفتاح Firebase API |
| VITE_FIREBASE_AUTH_DOMAIN | نطاق المصادقة      |
| VITE_FIREBASE_PROJECT_ID  | معرف المشروع       |
| ...                       | باقي الإعدادات     |

#### 7.3 تكوين Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /expenses/{expenseId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null
        && request.resource.data.createdBy.id == request.auth.uid;
      allow update, delete: if request.auth != null
        && resource.data.createdBy.id == request.auth.uid;
    }
  }
}
```

#### 7.4 اختبار الإنتاج

- [ ] اختبار تسجيل الدخول
- [ ] اختبار CRUD المصروفات
- [ ] اختبار رفع الصور
- [ ] اختبار على أجهزة مختلفة

### المخرجات المتوقعة

- ✅ التطبيق منشور على GitHub Pages
- ✅ يعمل بدون أخطاء
- ✅ Firebase Rules مُفعّلة
- ✅ البيانات آمنة

---

## 📋 قبل بدء كل مرحلة

### قائمة التحقق

1. ✅ مراجعة المهام المطلوبة
2. ✅ التأكد من إكمال المرحلة السابقة
3. ✅ تحديث قائمة المهام في `07-tasks-checklist.md`
4. ✅ commit التغييرات السابقة

### أثناء العمل

1. ✅ اختبار كل وظيفة بعد تنفيذها
2. ✅ التأكد من عدم وجود أخطاء TypeScript
3. ✅ مراجعة التصميم على الموبايل

### بعد إكمال المرحلة

1. ✅ اختبار شامل
2. ✅ تحديث التوثيق إن لزم
3. ✅ commit مع رسالة واضحة
4. ✅ تحديث `07-tasks-checklist.md`

---

## 🎯 الأوامر المرجعية

```bash
# تشغيل التطوير
npm run dev

# فحص TypeScript
npm run type-check

# بناء الإنتاج
npm run build

# معاينة البناء
npm run preview

# تشغيل الاختبارات
npm run test:unit

# تنسيق الكود
npm run format
```

---

## 📞 الخطوة التالية

بعد مراجعة هذه الخطة، قم بتأكيد البدء في **المرحلة 1: الإعداد الأساسي**.
