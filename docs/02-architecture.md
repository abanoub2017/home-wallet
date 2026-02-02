# 🏗️ معمارية التطبيق - محفظة المنزل

## نظرة عامة على المعمارية

```
┌─────────────────────────────────────────────────────────────────┐
│                         طبقة العرض (UI)                         │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────────┐   │
│  │  تسجيل   │ │  لوحة   │ │ المصروفات│ │   نموذج المصروف  │   │
│  │  الدخول  │ │  التحكم │ │          │ │                  │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────────┬─────────┘   │
└───────┼────────────┼────────────┼────────────────┼─────────────┘
        │            │            │                │
┌───────┴────────────┴────────────┴────────────────┴─────────────┐
│                    طبقة المنطق (Composables)                    │
│  ┌────────────┐  ┌───────────────┐  ┌────────────────────────┐ │
│  │  useAuth   │  │  useExpenses  │  │  useImageCompression   │ │
│  └─────┬──────┘  └───────┬───────┘  └────────────────────────┘ │
└────────┼─────────────────┼─────────────────────────────────────┘
         │                 │
┌────────┴─────────────────┴─────────────────────────────────────┐
│                     طبقة الخدمات (Services)                     │
│  ┌───────────────────┐  ┌───────────────────────────────────┐  │
│  │  Firebase Config  │  │       Firestore Service           │  │
│  └───────────────────┘  └───────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
         │
┌────────┴───────────────────────────────────────────────────────┐
│                      Firebase Backend                           │
│  ┌───────────────────┐  ┌───────────────────────────────────┐  │
│  │  Authentication   │  │         Firestore Database        │  │
│  └───────────────────┘  └───────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────┘
```

---

## 📁 هيكل المجلدات

```
src/
├── assets/
│   └── styles/
│       └── main.css              # استيراد Tailwind + أنماط مخصصة
│
├── components/
│   ├── common/                   # مكونات مشتركة
│   │   ├── AppButton.vue
│   │   ├── AppInput.vue
│   │   ├── AppLoader.vue
│   │   ├── AppModal.vue
│   │   └── AppToast.vue
│   │
│   ├── layout/                   # مكونات التخطيط
│   │   ├── AppHeader.vue
│   │   ├── AppNav.vue
│   │   └── AppLayout.vue
│   │
│   ├── dashboard/                # مكونات لوحة التحكم
│   │   ├── MonthSummary.vue
│   │   ├── UserExpenses.vue
│   │   └── CategoryBreakdown.vue
│   │
│   └── expenses/                 # مكونات المصروفات
│       ├── ExpenseCard.vue
│       ├── ExpenseForm.vue
│       ├── ExpenseList.vue
│       └── ImageUploader.vue
│
├── composables/                  # منطق قابل لإعادة الاستخدام
│   ├── useAuth.ts
│   ├── useExpenses.ts
│   └── useImageCompression.ts
│
├── config/                       # إعدادات التطبيق
│   ├── firebase.ts
│   └── categories.ts
│
├── router/                       # التوجيه
│   ├── index.ts
│   └── guards.ts
│
├── stores/                       # Pinia stores (اختياري)
│   └── auth.ts
│
├── types/                        # أنواع TypeScript
│   └── index.ts
│
├── utils/                        # دوال مساعدة
│   ├── date.ts
│   └── currency.ts
│
├── views/                        # صفحات التطبيق
│   ├── LoginView.vue
│   ├── DashboardView.vue
│   ├── ExpensesView.vue
│   └── AddExpenseView.vue
│
├── App.vue
└── main.ts

docs/                             # التوثيق
├── 01-project-plan.md
├── 02-architecture.md
├── 03-style-guide.md
├── 04-design-system.md
├── 05-setup-guide.md
└── 06-deployment.md
```

---

## 🔄 تدفق البيانات

### 1. تدفق المصادقة

```
┌─────────────┐    ┌───────────┐    ┌──────────────┐    ┌──────────┐
│  LoginView  │───>│  useAuth  │───>│   Firebase   │───>│  Router  │
│             │<───│           │<───│     Auth     │    │  Guard   │
└─────────────┘    └───────────┘    └──────────────┘    └──────────┘
```

### 2. تدفق المصروفات

```
┌─────────────┐    ┌─────────────┐    ┌──────────────┐
│ ExpenseForm │───>│ useExpenses │───>│  Firestore   │
│             │    │             │    │              │
└─────────────┘    └─────────────┘    └──────────────┘
       │                  │                  │
       │                  ▼                  │
       │          ┌─────────────┐           │
       └─────────>│ ExpenseList │<──────────┘
                  └─────────────┘
```

### 3. تدفق الصور

```
┌───────────────┐    ┌─────────────────────┐    ┌──────────────┐
│ ImageUploader │───>│ useImageCompression │───>│   Base64     │
│   (File)      │    │  (Canvas API)       │    │   String     │
└───────────────┘    └─────────────────────┘    └──────────────┘
                                                       │
                                                       ▼
                                                ┌──────────────┐
                                                │  Firestore   │
                                                │  (< 500KB)   │
                                                └──────────────┘
```

---

## 📦 Composables (منطق الأعمال)

### useAuth

```typescript
interface UseAuth {
  user: Ref<User | null>
  loading: Ref<boolean>
  error: Ref<string | null>

  login(email: string, password: string): Promise<void>
  logout(): Promise<void>
  isAuthenticated: ComputedRef<boolean>
}
```

### useExpenses

```typescript
interface UseExpenses {
  expenses: Ref<Expense[]>
  loading: Ref<boolean>
  error: Ref<string | null>

  fetchExpenses(filters?: ExpenseFilters): Promise<void>
  addExpense(expense: NewExpense): Promise<string>
  updateExpense(id: string, data: Partial<Expense>): Promise<void>
  deleteExpense(id: string): Promise<void>

  monthlyTotal: ComputedRef<number>
  expensesByCategory: ComputedRef<CategorySummary[]>
  expensesByUser: ComputedRef<UserSummary[]>
}
```

### useImageCompression

```typescript
interface UseImageCompression {
  compress(file: File, options?: CompressionOptions): Promise<string>
  getSize(base64: string): number
  isValidSize(base64: string, maxKB?: number): boolean
}
```

---

## 🗃️ نموذج البيانات (Firestore)

### Collection: expenses

```typescript
interface Expense {
  id: string // معرف المستند
  amount: number // المبلغ
  category: ExpenseCategory // الفئة
  date: Timestamp // التاريخ
  notes?: string // ملاحظات
  imageBase64?: string // صورة الفاتورة (Base64)
  createdBy: {
    id: string // معرف المستخدم
    role: 'husband' | 'wife' // الدور
  }
  createdAt: Timestamp // تاريخ الإنشاء
  updatedAt: Timestamp // تاريخ التحديث
}
```

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /expenses/{expenseId} {
      // السماح بالقراءة للمستخدمين المصادق عليهم
      allow read: if request.auth != null;

      // السماح بالإنشاء للمستخدمين المصادق عليهم
      allow create: if request.auth != null
        && request.resource.data.createdBy.id == request.auth.uid;

      // السماح بالتعديل/الحذف للمالك فقط
      allow update, delete: if request.auth != null
        && resource.data.createdBy.id == request.auth.uid;
    }
  }
}
```

---

## 🛣️ المسارات (Routes)

| المسار               | المكون          | الحماية  | الوصف           |
| -------------------- | --------------- | -------- | --------------- |
| `/`                  | DashboardView   | ✅ مطلوب | لوحة التحكم     |
| `/login`             | LoginView       | ❌ ضيف   | تسجيل الدخول    |
| `/expenses`          | ExpensesView    | ✅ مطلوب | قائمة المصروفات |
| `/expenses/add`      | AddExpenseView  | ✅ مطلوب | إضافة مصروف     |
| `/expenses/:id/edit` | EditExpenseView | ✅ مطلوب | تعديل مصروف     |

---

## 🔒 الأمان

### 1. المصادقة

- Firebase Authentication مع email/password
- لا يوجد تسجيل عام
- المستخدمين محددين مسبقاً

### 2. التفويض

- Firestore Rules تضمن:
  - القراءة للمستخدمين المصادق عليهم فقط
  - الكتابة/التعديل/الحذف للمالك فقط

### 3. حماية المسارات

- Vue Router guards للتحقق من المصادقة
- إعادة التوجيه لصفحة الدخول

---

## 📱 التصميم المتجاوب

### نقاط التوقف (Breakpoints)

| الاسم   | الحجم    | الوصف           |
| ------- | -------- | --------------- |
| Default | < 640px  | موبايل (الأساس) |
| sm      | ≥ 640px  | موبايل كبير     |
| md      | ≥ 768px  | تابلت           |
| lg      | ≥ 1024px | لابتوب          |
| xl      | ≥ 1280px | شاشة كبيرة      |

### Mobile-First Approach

```html
<!-- مثال -->
<div
  class="
  flex flex-col        /* موبايل: عمودي */
  md:flex-row          /* تابلت+: أفقي */
  gap-4
  p-4 md:p-6 lg:p-8   /* padding متدرج */
"
></div>
```

---

## 🔧 قرارات معمارية

### 1. Composables vs Pinia Stores

**القرار:** استخدام Composables بشكل أساسي
**السبب:**

- أبسط للمشاريع الصغيرة
- تغليف أفضل للمنطق
- أسهل في الاختبار

### 2. Base64 vs Firebase Storage

**القرار:** Base64 في Firestore
**السبب:**

- تكلفة أقل (بدون Storage)
- أبسط في التنفيذ
- كافي للصور المضغوطة

### 3. Hash Routing vs History Mode

**القرار:** Hash-based routing
**السبب:**

- GitHub Pages لا يدعم server-side routing
- يعمل بدون إعدادات إضافية

### 4. Tailwind CSS vs Custom CSS

**القرار:** Tailwind CSS
**السبب:**

- تطوير أسرع
- RTL مدمج
- Mobile-first بالفعل
- حجم صغير (tree-shaking)
