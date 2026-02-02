# 🎨 نظام التصميم - محفظة المنزل

## الألوان

### الألوان الأساسية

```css
/* Primary - أخضر (للنجاح والإجراءات الرئيسية) */
--color-primary-50: #f0fdf4;
--color-primary-100: #dcfce7;
--color-primary-200: #bbf7d0;
--color-primary-300: #86efac;
--color-primary-400: #4ade80;
--color-primary-500: #22c55e; /* الأساسي */
--color-primary-600: #16a34a;
--color-primary-700: #15803d;
--color-primary-800: #166534;
--color-primary-900: #14532d;

/* Secondary - أزرق (للمعلومات والروابط) */
--color-secondary-50: #eff6ff;
--color-secondary-100: #dbeafe;
--color-secondary-200: #bfdbfe;
--color-secondary-300: #93c5fd;
--color-secondary-400: #60a5fa;
--color-secondary-500: #3b82f6; /* الأساسي */
--color-secondary-600: #2563eb;
--color-secondary-700: #1d4ed8;
--color-secondary-800: #1e40af;
--color-secondary-900: #1e3a8a;
```

### ألوان الحالة

```css
/* Success - نجاح */
--color-success: #22c55e;

/* Warning - تحذير */
--color-warning: #f59e0b;

/* Error - خطأ */
--color-error: #ef4444;

/* Info - معلومات */
--color-info: #3b82f6;
```

### ألوان محايدة

```css
/* Gray scale */
--color-gray-50: #f9fafb;
--color-gray-100: #f3f4f6;
--color-gray-200: #e5e7eb;
--color-gray-300: #d1d5db;
--color-gray-400: #9ca3af;
--color-gray-500: #6b7280;
--color-gray-600: #4b5563;
--color-gray-700: #374151;
--color-gray-800: #1f2937;
--color-gray-900: #111827;
```

### Tailwind Classes

```html
<!-- Primary -->
<button class="bg-primary-600 hover:bg-primary-700 text-white">حفظ</button>

<!-- Secondary -->
<button class="bg-secondary-100 text-secondary-700 hover:bg-secondary-200">إلغاء</button>

<!-- Danger -->
<button class="bg-red-600 hover:bg-red-700 text-white">حذف</button>
```

---

## الخطوط

### الخط الأساسي

```css
/* خط عربي */
font-family: 'Cairo', 'Noto Sans Arabic', system-ui, sans-serif;
```

### أحجام الخطوط

| الاسم | الحجم           | استخدام       |
| ----- | --------------- | ------------- |
| xs    | 0.75rem (12px)  | تسميات صغيرة  |
| sm    | 0.875rem (14px) | نص ثانوي      |
| base  | 1rem (16px)     | نص عادي       |
| lg    | 1.125rem (18px) | نص بارز       |
| xl    | 1.25rem (20px)  | عناوين صغيرة  |
| 2xl   | 1.5rem (24px)   | عناوين متوسطة |
| 3xl   | 1.875rem (30px) | عناوين كبيرة  |
| 4xl   | 2.25rem (36px)  | عناوين رئيسية |

### Tailwind Classes

```html
<h1 class="text-3xl font-bold">عنوان الصفحة</h1>
<h2 class="text-2xl font-semibold">عنوان القسم</h2>
<p class="text-base text-gray-600">نص عادي</p>
<span class="text-sm text-gray-500">نص ثانوي</span>
<label class="text-xs text-gray-400">تسمية</label>
```

---

## المسافات

### نظام المسافات (8px base)

| القيمة | الحجم          | استخدام            |
| ------ | -------------- | ------------------ |
| 1      | 0.25rem (4px)  | مسافة صغيرة جداً   |
| 2      | 0.5rem (8px)   | مسافة صغيرة        |
| 3      | 0.75rem (12px) | مسافة متوسطة صغيرة |
| 4      | 1rem (16px)    | مسافة متوسطة       |
| 5      | 1.25rem (20px) | مسافة متوسطة كبيرة |
| 6      | 1.5rem (24px)  | مسافة كبيرة        |
| 8      | 2rem (32px)    | مسافة كبيرة جداً   |
| 10     | 2.5rem (40px)  | مسافة أقسام        |
| 12     | 3rem (48px)    | مسافة صفحات        |

### أمثلة

```html
<!-- Card padding -->
<div class="p-4 md:p-6">
  <!-- Gap بين العناصر -->
  <div class="flex flex-col gap-4">
    <!-- Margin بين الأقسام -->
    <section class="mt-8 mb-8"></section>
  </div>
</div>
```

---

## الحدود والظلال

### نصف قطر الحدود

| الاسم   | القيمة   | استخدام          |
| ------- | -------- | ---------------- |
| none    | 0        | بدون انحناء      |
| sm      | 0.125rem | انحناء خفيف      |
| DEFAULT | 0.25rem  | انحناء عادي      |
| md      | 0.375rem | انحناء متوسط     |
| lg      | 0.5rem   | انحناء كبير      |
| xl      | 0.75rem  | انحناء أكبر      |
| 2xl     | 1rem     | انحناء كبير جداً |
| full    | 9999px   | دائري            |

### الظلال

```html
<!-- ظل خفيف - للكروت -->
<div class="shadow-sm">
  <!-- ظل عادي - للكروت المرفوعة -->
  <div class="shadow">
    <!-- ظل متوسط - للـ dropdowns -->
    <div class="shadow-md">
      <!-- ظل كبير - للـ modals -->
      <div class="shadow-lg"></div>
    </div>
  </div>
</div>
```

---

## المكونات

### 1. الأزرار

```html
<!-- Primary Button -->
<button
  class="
  inline-flex items-center justify-center
  px-4 py-2.5
  text-sm font-medium
  text-white bg-primary-600
  rounded-lg
  hover:bg-primary-700
  focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
  disabled:opacity-50 disabled:cursor-not-allowed
  transition-colors duration-200
"
>
  <span>إضافة مصروف</span>
</button>

<!-- Secondary Button -->
<button
  class="
  inline-flex items-center justify-center
  px-4 py-2.5
  text-sm font-medium
  text-gray-700 bg-white
  border border-gray-300
  rounded-lg
  hover:bg-gray-50
  focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2
  transition-colors duration-200
"
>
  إلغاء
</button>

<!-- Danger Button -->
<button
  class="
  inline-flex items-center justify-center
  px-4 py-2.5
  text-sm font-medium
  text-white bg-red-600
  rounded-lg
  hover:bg-red-700
  focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
  transition-colors duration-200
"
>
  حذف
</button>

<!-- Icon Button -->
<button
  class="
  p-2
  text-gray-500
  rounded-lg
  hover:bg-gray-100 hover:text-gray-700
  focus:outline-none focus:ring-2 focus:ring-gray-500
  transition-colors duration-200
"
>
  <svg class="w-5 h-5"><!-- icon --></svg>
</button>
```

### 2. حقول الإدخال

```html
<!-- Text Input -->
<div class="space-y-1.5">
  <label class="block text-sm font-medium text-gray-700"> المبلغ </label>
  <input
    type="number"
    class="
      block w-full
      px-4 py-2.5
      text-gray-900
      bg-white
      border border-gray-300
      rounded-lg
      placeholder:text-gray-400
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
      disabled:bg-gray-50 disabled:text-gray-500
      transition-colors duration-200
    "
    placeholder="0.00"
  />
</div>

<!-- Select -->
<div class="space-y-1.5">
  <label class="block text-sm font-medium text-gray-700"> الفئة </label>
  <select
    class="
    block w-full
    px-4 py-2.5
    text-gray-900
    bg-white
    border border-gray-300
    rounded-lg
    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
    transition-colors duration-200
  "
  >
    <option value="">اختر الفئة</option>
    <option value="food">طعام</option>
  </select>
</div>

<!-- Textarea -->
<div class="space-y-1.5">
  <label class="block text-sm font-medium text-gray-700"> ملاحظات </label>
  <textarea
    class="
      block w-full
      px-4 py-2.5
      text-gray-900
      bg-white
      border border-gray-300
      rounded-lg
      placeholder:text-gray-400
      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
      resize-none
      transition-colors duration-200
    "
    rows="3"
    placeholder="أضف ملاحظة..."
  ></textarea>
</div>

<!-- Error State -->
<input
  class="
  border-red-500
  focus:ring-red-500
  text-red-900
  placeholder:text-red-400
"
/>
<p class="mt-1 text-sm text-red-600">هذا الحقل مطلوب</p>
```

### 3. البطاقات (Cards)

```html
<!-- Basic Card -->
<div
  class="
  bg-white
  rounded-xl
  border border-gray-200
  shadow-sm
  overflow-hidden
"
>
  <div class="p-4 md:p-6">
    <!-- Content -->
  </div>
</div>

<!-- Expense Card -->
<div
  class="
  bg-white
  rounded-xl
  border border-gray-200
  shadow-sm
  p-4
  flex items-start gap-4
  hover:border-gray-300
  transition-colors duration-200
"
>
  <!-- Category Icon -->
  <div
    class="
    w-12 h-12
    flex items-center justify-center
    bg-primary-100
    text-primary-600
    rounded-xl
  "
  >
    <svg class="w-6 h-6"><!-- icon --></svg>
  </div>

  <!-- Content -->
  <div class="flex-1 min-w-0">
    <h3 class="font-medium text-gray-900">طعام ومشروبات</h3>
    <p class="text-sm text-gray-500 mt-0.5">اليوم، 10:30 ص</p>
  </div>

  <!-- Amount -->
  <div class="text-left">
    <span class="font-semibold text-gray-900">150 ج.م</span>
  </div>
</div>
```

### 4. النوافذ المنبثقة (Modal)

```html
<!-- Modal Backdrop -->
<div
  class="
  fixed inset-0
  bg-black/50
  backdrop-blur-sm
  flex items-center justify-center
  p-4
  z-50
"
>
  <!-- Modal Content -->
  <div
    class="
    bg-white
    rounded-2xl
    shadow-xl
    w-full max-w-md
    max-h-[90vh]
    overflow-hidden
    flex flex-col
  "
  >
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200">
      <h2 class="text-lg font-semibold text-gray-900">عنوان النافذة</h2>
    </div>

    <!-- Body -->
    <div class="px-6 py-4 overflow-y-auto">
      <!-- Content -->
    </div>

    <!-- Footer -->
    <div class="px-6 py-4 border-t border-gray-200 flex gap-3 justify-end">
      <button class="...">إلغاء</button>
      <button class="...">تأكيد</button>
    </div>
  </div>
</div>
```

### 5. التنبيهات (Alerts)

```html
<!-- Success -->
<div
  class="
  flex items-center gap-3
  p-4
  bg-green-50
  border border-green-200
  rounded-lg
"
>
  <svg class="w-5 h-5 text-green-600"><!-- check icon --></svg>
  <p class="text-sm text-green-800">تم الحفظ بنجاح</p>
</div>

<!-- Error -->
<div
  class="
  flex items-center gap-3
  p-4
  bg-red-50
  border border-red-200
  rounded-lg
"
>
  <svg class="w-5 h-5 text-red-600"><!-- x icon --></svg>
  <p class="text-sm text-red-800">حدث خطأ أثناء الحفظ</p>
</div>

<!-- Warning -->
<div
  class="
  flex items-center gap-3
  p-4
  bg-yellow-50
  border border-yellow-200
  rounded-lg
"
>
  <svg class="w-5 h-5 text-yellow-600"><!-- warning icon --></svg>
  <p class="text-sm text-yellow-800">يرجى التحقق من البيانات</p>
</div>
```

---

## الأيقونات

نستخدم **Heroicons** (مجانية ومتوافقة مع Tailwind):
https://heroicons.com/

### أحجام الأيقونات

| الحجم     | استخدام              |
| --------- | -------------------- |
| w-4 h-4   | داخل الأزرار الصغيرة |
| w-5 h-5   | داخل الأزرار العادية |
| w-6 h-6   | أيقونات منفردة       |
| w-8 h-8   | أيقونات بارزة        |
| w-12 h-12 | أيقونات الفئات       |

### مثال الاستخدام

```html
<!-- Inline SVG (موصى به) -->
<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="w-5 h-5"
>
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
```

---

## الحركة والانتقالات

### مدة الانتقال

| القيمة       | استخدام               |
| ------------ | --------------------- |
| duration-150 | تفاعلات سريعة (hover) |
| duration-200 | انتقالات عادية        |
| duration-300 | انتقالات بطيئة        |
| duration-500 | animations            |

### أمثلة

```html
<!-- Hover transition -->
<button class="transition-colors duration-200 hover:bg-primary-700">
  <!-- Transform -->
  <div class="transition-transform duration-300 hover:scale-105">
    <!-- All properties -->
    <div class="transition-all duration-200 hover:shadow-lg hover:-translate-y-1"></div>
  </div>
</button>
```

---

## Responsive Design

### Mobile-First Grid

```html
<!-- 1 column → 2 columns → 3 columns -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
  <!-- items -->
</div>
```

### Stack to Row

```html
<!-- Column on mobile, row on tablet+ -->
<div class="flex flex-col md:flex-row gap-4">
  <!-- items -->
</div>
```

### Responsive Padding

```html
<div class="p-4 sm:p-6 lg:p-8">
  <!-- content -->
</div>
```

### Hide/Show

```html
<!-- Hide on mobile, show on desktop -->
<div class="hidden lg:block">Desktop only</div>

<!-- Show on mobile, hide on desktop -->
<div class="lg:hidden">Mobile only</div>
```
