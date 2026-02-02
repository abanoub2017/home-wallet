# 🎨 دليل الأنماط - محفظة المنزل

## مبادئ الكود

### 1. تسمية الملفات

| النوع       | الصيغة             | مثال                       |
| ----------- | ------------------ | -------------------------- |
| المكونات    | PascalCase         | `ExpenseCard.vue`          |
| Composables | camelCase مع use   | `useExpenses.ts`           |
| Utils       | camelCase          | `formatDate.ts`            |
| Types       | PascalCase         | `Expense.ts` أو `index.ts` |
| Views       | PascalCase مع View | `DashboardView.vue`        |

### 2. تسمية المتغيرات

```typescript
// ✅ صحيح
const expenses = ref<Expense[]>([])
const isLoading = ref(false)
const hasError = computed(() => !!error.value)
const handleSubmit = async () => {}

// ❌ خطأ
const exp = ref([])
const loading = ref(false) // استخدم isLoading
const submit = async () => {} // استخدم handleSubmit
```

### 3. هيكل المكون

```vue
<script setup lang="ts">
// 1. الاستيرادات
import { ref, computed, onMounted } from 'vue'
import { useExpenses } from '@/composables/useExpenses'

// 2. تعريف Props و Emits
interface Props {
  expenseId: string
}
const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update', value: Expense): void
  (e: 'delete'): void
}>()

// 3. Composables
const { expenses, loading } = useExpenses()

// 4. الحالة المحلية (State)
const isEditing = ref(false)
const formData = ref({
  /* ... */
})

// 5. Computed
const currentExpense = computed(() => expenses.value.find((e) => e.id === props.expenseId))

// 6. Methods
const handleSave = async () => {
  // ...
}

// 7. Lifecycle Hooks
onMounted(() => {
  // ...
})
</script>

<template>
  <!-- Template هنا -->
</template>

<style scoped>
/* أنماط مخصصة إن وجدت */
</style>
```

---

## 📝 TypeScript

### تعريف الأنواع

```typescript
// types/index.ts

// استخدم interface للكائنات
export interface Expense {
  id: string
  amount: number
  category: ExpenseCategory
  date: Date
  notes?: string
  imageBase64?: string
  createdBy: CreatedBy
  createdAt: Date
  updatedAt: Date
}

// استخدم type للـ unions والـ aliases
export type ExpenseCategory =
  | 'food'
  | 'transport'
  | 'bills'
  | 'shopping'
  | 'health'
  | 'entertainment'
  | 'other'

export type UserRole = 'husband' | 'wife'

// استخدم interface للـ composables
export interface UseExpensesReturn {
  expenses: Ref<Expense[]>
  loading: Ref<boolean>
  error: Ref<string | null>
  addExpense: (data: NewExpense) => Promise<string>
  // ...
}
```

### Composable Pattern

```typescript
// composables/useExpenses.ts
import type { UseExpensesReturn, Expense, NewExpense } from '@/types'

export function useExpenses(): UseExpensesReturn {
  // الحالة الداخلية
  const expenses = ref<Expense[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // الدوال
  async function addExpense(data: NewExpense): Promise<string> {
    loading.value = true
    error.value = null

    try {
      // منطق الإضافة
      return docId
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'خطأ غير معروف'
      throw e
    } finally {
      loading.value = false
    }
  }

  // القيم المحسوبة
  const monthlyTotal = computed(() => expenses.value.reduce((sum, exp) => sum + exp.amount, 0))

  // إرجاع الواجهة العامة
  return {
    expenses: readonly(expenses),
    loading: readonly(loading),
    error: readonly(error),
    addExpense,
    monthlyTotal,
    // ...
  }
}
```

---

## 🎨 Tailwind CSS

### Mobile-First

```html
<!-- ابدأ بالموبايل، ثم أضف للشاشات الأكبر -->
<div
  class="
  p-4              /* موبايل */
  sm:p-6           /* ≥640px */
  md:p-8           /* ≥768px */
  lg:p-10          /* ≥1024px */
"
>
  <!-- Grid متجاوب -->
  <div
    class="
  grid
  grid-cols-1      /* موبايل: عمود واحد */
  sm:grid-cols-2   /* ≥640px: عمودين */
  lg:grid-cols-3   /* ≥1024px: 3 أعمدة */
  gap-4
"
  ></div>
</div>
```

### RTL Support

```html
<!-- استخدم rtl: و ltr: للاتجاه -->
<div
  class="
  flex
  rtl:flex-row-reverse  /* عكس الاتجاه في RTL */
"
>
  <span
    class="
    mr-2            /* margin-right للجميع */
    rtl:mr-0        /* إلغاء في RTL */
    rtl:ml-2        /* margin-left في RTL */
  "
  >
    نص
  </span>
</div>

<!-- أو استخدم logical properties -->
<div
  class="
  ms-4             /* margin-start: يتكيف تلقائياً */
  me-4             /* margin-end: يتكيف تلقائياً */
  ps-4             /* padding-start */
  pe-4             /* padding-end */
"
></div>
```

### Class Organization

```html
<!-- ترتيب الـ classes -->
<button
  class="
  /* 1. Layout */
  flex items-center justify-center
  
  /* 2. Sizing */
  w-full h-12
  
  /* 3. Spacing */
  px-4 py-2 gap-2
  
  /* 4. Typography */
  text-base font-medium
  
  /* 5. Colors/Background */
  bg-primary-600 text-white
  
  /* 6. Borders */
  rounded-lg border-0
  
  /* 7. Effects */
  shadow-md
  
  /* 8. Transitions */
  transition-colors duration-200
  
  /* 9. States */
  hover:bg-primary-700
  focus:ring-2 focus:ring-primary-500
  disabled:opacity-50 disabled:cursor-not-allowed
  
  /* 10. Responsive */
  md:w-auto
"
></button>
```

---

## 📂 استيراد الملفات

```typescript
// ✅ استخدم @ alias
import { useAuth } from '@/composables/useAuth'
import AppButton from '@/components/common/AppButton.vue'
import type { Expense } from '@/types'

// ❌ تجنب المسارات النسبية الطويلة
import { useAuth } from '../../../composables/useAuth'
```

---

## 🔄 Git Commits

### صيغة الـ Commit Message

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### أنواع الـ Commits

| النوع    | الوصف                         |
| -------- | ----------------------------- |
| feat     | ميزة جديدة                    |
| fix      | إصلاح خطأ                     |
| docs     | توثيق فقط                     |
| style    | تنسيق (لا يؤثر على الكود)     |
| refactor | إعادة هيكلة بدون تغيير السلوك |
| test     | إضافة أو تعديل اختبارات       |
| chore    | مهام الصيانة                  |

### أمثلة

```bash
feat(expenses): add expense form component
fix(auth): resolve login redirect issue
docs(readme): update installation steps
style(components): format with prettier
refactor(useExpenses): extract validation logic
chore(deps): update firebase to v12
```

---

## 🧪 الاختبارات

### تسمية ملفات الاختبار

```
ComponentName.spec.ts
useComposable.spec.ts
utilFunction.spec.ts
```

### هيكل الاختبار

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ExpenseCard from '@/components/expenses/ExpenseCard.vue'

describe('ExpenseCard', () => {
  // Setup
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(ExpenseCard, {
      props: {
        expense: mockExpense,
      },
    })
  })

  // Tests
  it('renders expense amount', () => {
    expect(wrapper.text()).toContain('100')
  })

  it('emits delete event when delete button clicked', async () => {
    await wrapper.find('[data-testid="delete-btn"]').trigger('click')
    expect(wrapper.emitted('delete')).toBeTruthy()
  })
})
```

---

## 📋 قائمة مراجعة الكود

قبل إنشاء PR، تأكد من:

- [ ] الكود يتبع دليل الأنماط
- [ ] لا توجد أخطاء TypeScript
- [ ] الكود منسق بـ Prettier
- [ ] الاختبارات تمر بنجاح
- [ ] لا توجد console.log متبقية
- [ ] المكون متجاوب (mobile-first)
- [ ] النصوص بالعربية صحيحة
- [ ] التوثيق محدث إن لزم
