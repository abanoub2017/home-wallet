# ✅ قائمة المهام - محفظة المنزل

## كيفية استخدام هذا الملف

- [ ] مهمة لم تبدأ
- [x] مهمة مكتملة
- 🚧 مهمة قيد العمل

---

## المرحلة 1: الإعداد الأساسي ✅

### 1.1 تثبيت التبعيات

- [x] تثبيت Firebase SDK
- [x] تثبيت Tailwind CSS
- [x] تثبيت @tailwindcss/vite

### 1.2 إعداد Tailwind CSS

- [x] إنشاء ملف CSS الرئيسي مع @import tailwindcss
- [x] تحديث vite.config.ts بـ plugin
- [x] إعداد RTL في index.html
- [x] إضافة خط عربي (Cairo)

### 1.3 إعداد Firebase

- [x] إنشاء src/config/firebase.ts
- [x] إنشاء ملف .env.example
- [x] إضافة .env إلى .gitignore

### 1.4 هيكل المجلدات

- [x] إنشاء src/components/common/
- [x] إنشاء src/components/layout/
- [x] إنشاء src/components/dashboard/
- [x] إنشاء src/components/expenses/
- [x] إنشاء src/composables/
- [x] إنشاء src/config/
- [x] إنشاء src/types/
- [x] إنشاء src/utils/
- [x] إنشاء src/views/

### 1.5 الأنواع (Types)

- [x] تعريف Expense interface
- [x] تعريف User interface
- [x] تعريف ExpenseCategory type
- [x] تعريف UserRole type

---

## المرحلة 2: المصادقة (Authentication)

### 2.1 Composable

- [ ] إنشاء useAuth.ts
- [ ] تنفيذ login()
- [ ] تنفيذ logout()
- [ ] تنفيذ auth state listener
- [ ] معالجة الأخطاء

### 2.2 صفحة تسجيل الدخول

- [ ] إنشاء LoginView.vue
- [ ] تصميم النموذج (form)
- [ ] ربط مع useAuth
- [ ] إظهار رسائل الخطأ
- [ ] إعادة التوجيه بعد النجاح

### 2.3 حماية المسارات

- [ ] إنشاء router/guards.ts
- [ ] تنفيذ auth guard
- [ ] تنفيذ guest guard
- [ ] ربط مع router

### 2.4 Layout

- [ ] إنشاء AppHeader.vue
- [ ] إنشاء AppNav.vue
- [ ] إنشاء AppLayout.vue
- [ ] عرض معلومات المستخدم
- [ ] زر تسجيل الخروج

---

## المرحلة 3: المصروفات (Expenses)

### 3.1 Composable

- [ ] إنشاء useExpenses.ts
- [ ] تنفيذ fetchExpenses()
- [ ] تنفيذ addExpense()
- [ ] تنفيذ updateExpense()
- [ ] تنفيذ deleteExpense()
- [ ] تنفيذ real-time listener
- [ ] حساب الإحصائيات

### 3.2 الفئات

- [ ] إنشاء config/categories.ts
- [ ] تعريف قائمة الفئات بالعربية
- [ ] أيقونة لكل فئة
- [ ] لون لكل فئة

### 3.3 قائمة المصروفات

- [ ] إنشاء ExpensesView.vue
- [ ] إنشاء ExpenseList.vue
- [ ] إنشاء ExpenseCard.vue
- [ ] تصفية حسب الشهر
- [ ] تصفية حسب الفئة
- [ ] تصفية حسب المستخدم

### 3.4 إضافة مصروف

- [ ] إنشاء AddExpenseView.vue
- [ ] إنشاء ExpenseForm.vue
- [ ] حقل المبلغ
- [ ] حقل الفئة (select)
- [ ] حقل التاريخ
- [ ] حقل الملاحظات
- [ ] التحقق من صحة البيانات
- [ ] إرسال البيانات

### 3.5 تعديل مصروف

- [ ] إنشاء EditExpenseView.vue
- [ ] تحميل بيانات المصروف
- [ ] إعادة استخدام ExpenseForm
- [ ] حفظ التعديلات

### 3.6 حذف مصروف

- [ ] إنشاء AppModal.vue
- [ ] نافذة تأكيد الحذف
- [ ] تنفيذ الحذف

---

## المرحلة 4: الصور (Images)

### 4.1 ضغط الصور

- [ ] إنشاء useImageCompression.ts
- [ ] تنفيذ compress()
- [ ] تنفيذ resize()
- [ ] تحويل إلى Base64
- [ ] التحقق من الحجم

### 4.2 رفع الصور

- [ ] إنشاء ImageUploader.vue
- [ ] اختيار ملف
- [ ] معاينة الصورة
- [ ] شريط التقدم
- [ ] إلغاء الرفع

### 4.3 عرض الصور

- [ ] عرض الصورة في ExpenseCard
- [ ] عرض الصورة بالحجم الكامل (modal)
- [ ] تكبير/تصغير

---

## المرحلة 5: لوحة التحكم (Dashboard)

### 5.1 الصفحة الرئيسية

- [ ] إنشاء DashboardView.vue
- [ ] تخطيط الشبكة

### 5.2 ملخص الشهر

- [ ] إنشاء MonthSummary.vue
- [ ] إجمالي المصروفات
- [ ] مقارنة بالشهر السابق
- [ ] اختيار الشهر

### 5.3 مصروفات المستخدمين

- [ ] إنشاء UserExpenses.vue
- [ ] مصروفات الزوج
- [ ] مصروفات الزوجة
- [ ] النسبة المئوية

### 5.4 تقسيم الفئات

- [ ] إنشاء CategoryBreakdown.vue
- [ ] قائمة الفئات
- [ ] المبلغ لكل فئة
- [ ] النسبة المئوية

---

## المرحلة 6: المكونات المشتركة

### 6.1 الأزرار

- [ ] إنشاء AppButton.vue
- [ ] variants: primary, secondary, danger
- [ ] sizes: sm, md, lg
- [ ] loading state
- [ ] disabled state

### 6.2 حقول الإدخال

- [ ] إنشاء AppInput.vue
- [ ] أنواع: text, number, email, password
- [ ] error state
- [ ] helper text

### 6.3 التحميل

- [ ] إنشاء AppLoader.vue
- [ ] spinner
- [ ] skeleton

### 6.4 التنبيهات

- [ ] إنشاء AppToast.vue
- [ ] success, error, warning, info
- [ ] auto-dismiss
- [ ] manual dismiss

---

## المرحلة 7: الأدوات المساعدة

### 7.1 التاريخ

- [ ] إنشاء utils/date.ts
- [ ] formatDate() - بالعربية
- [ ] formatRelative() - "منذ ساعة"
- [ ] getMonthName() - بالعربية

### 7.2 العملة

- [ ] إنشاء utils/currency.ts
- [ ] formatCurrency() - "150 ج.م"
- [ ] parseAmount()

---

## المرحلة 8: الاختبارات

### 8.1 اختبارات الوحدات

- [ ] اختبار useAuth
- [ ] اختبار useExpenses
- [ ] اختبار useImageCompression
- [ ] اختبار utils

### 8.2 اختبارات المكونات

- [ ] اختبار LoginView
- [ ] اختبار ExpenseForm
- [ ] اختبار ExpenseCard

---

## المرحلة 9: النشر

### 9.1 إعداد GitHub

- [ ] إنشاء repository
- [ ] إضافة secrets
- [ ] إنشاء workflow

### 9.2 Firebase Production

- [ ] التحقق من Firestore rules
- [ ] إضافة Firebase domains
- [ ] اختبار الإنتاج

### 9.3 الاختبار النهائي

- [ ] اختبار على الموبايل
- [ ] اختبار على التابلت
- [ ] اختبار على الديسكتوب
- [ ] اختبار تسجيل الدخول
- [ ] اختبار CRUD كامل
- [ ] اختبار رفع الصور

---

## المرحلة 10: التحسينات (اختياري)

### 10.1 الأداء

- [ ] lazy loading للمسارات
- [ ] lazy loading للصور
- [ ] caching

### 10.2 تجربة المستخدم

- [ ] animations
- [ ] skeleton loaders
- [ ] pull-to-refresh

### 10.3 PWA (اختياري)

- [ ] service worker
- [ ] manifest.json
- [ ] offline support

---

## ملاحظات

### المهمة الحالية

> اكتب هنا المهمة التي تعمل عليها حالياً

### المشاكل المعلقة

> اكتب هنا أي مشاكل تحتاج حل

### أفكار للتحسين

> اكتب هنا أفكار للمستقبل
