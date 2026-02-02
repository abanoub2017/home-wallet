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

## المرحلة 2: المصادقة (Authentication) ✅

### 2.1 Composable

- [x] إنشاء useAuth.ts
- [x] تنفيذ login()
- [x] تنفيذ logout()
- [x] تنفيذ auth state listener
- [x] معالجة الأخطاء

### 2.2 صفحة تسجيل الدخول

- [x] إنشاء LoginView.vue
- [x] تصميم النموذج (form)
- [x] ربط مع useAuth
- [x] إظهار رسائل الخطأ
- [x] إعادة التوجيه بعد النجاح

### 2.3 حماية المسارات

- [x] إنشاء router/guards.ts
- [x] تنفيذ auth guard
- [x] تنفيذ guest guard
- [x] ربط مع router

### 2.4 Layout

- [x] إنشاء AppHeader.vue
- [x] إنشاء AppNav.vue
- [x] إنشاء AppLayout.vue
- [x] عرض معلومات المستخدم
- [x] زر تسجيل الخروج

---

## المرحلة 3: المصروفات (Expenses) ✅

### 3.1 Composable

- [x] إنشاء useExpenses.ts
- [x] تنفيذ fetchExpenses()
- [x] تنفيذ addExpense()
- [x] تنفيذ updateExpense()
- [x] تنفيذ deleteExpense()
- [x] تنفيذ real-time listener
- [x] حساب الإحصائيات

### 3.2 الفئات

- [x] إنشاء config/categories.ts
- [x] تعريف قائمة الفئات بالعربية
- [x] أيقونة لكل فئة
- [x] لون لكل فئة
- [x] إنشاء useCategories.ts
- [x] حفظ الفئات في Firestore
- [x] إضافة/تعديل/حذف الفئات

### 3.3 قائمة المصروفات

- [x] إنشاء ExpensesView.vue
- [x] عرض قائمة المصروفات
- [x] تصفية حسب الشهر
- [x] تصفية حسب الفئة
- [x] البحث في المصروفات

### 3.4 إضافة مصروف

- [x] إنشاء AddExpenseView.vue
- [x] حقل المبلغ
- [x] حقل الفئة (select)
- [x] حقل التاريخ
- [x] حقل الملاحظات
- [x] التحقق من صحة البيانات
- [x] إرسال البيانات

### 3.5 تعديل مصروف

- [x] إنشاء EditExpenseView.vue
- [x] تحميل بيانات المصروف
- [x] حفظ التعديلات

### 3.6 حذف مصروف

- [x] إنشاء ConfirmModal.vue
- [x] نافذة تأكيد الحذف
- [x] تنفيذ الحذف

---

## المرحلة 4: الصور (Images) ✅

### 4.1 ضغط الصور

- [x] إنشاء useImageCompression.ts
- [x] تنفيذ compress()
- [x] تنفيذ resize()
- [x] تحويل إلى Base64
- [x] التحقق من الحجم

### 4.2 رفع الصور

- [x] إنشاء ImageUpload.vue
- [x] اختيار ملف
- [x] معاينة الصورة
- [x] عرض نسبة الضغط
- [x] إلغاء/تغيير الصورة

### 4.3 عرض الصور

- [x] عرض الصورة في قائمة المصروفات
- [x] إنشاء ImagePreviewModal.vue
- [x] عرض الصورة بالحجم الكامل (modal)

---

## المرحلة 5: لوحة التحكم (Dashboard) ✅

### 5.1 الصفحة الرئيسية

- [x] إنشاء DashboardView.vue
- [x] تخطيط الشبكة

### 5.2 ملخص الشهر

- [x] إجمالي المصروفات
- [x] عدد المصروفات
- [x] اختيار الشهر/السنة

### 5.3 مصروفات المستخدمين

- [x] مصروفات الزوج
- [x] مصروفات الزوجة
- [x] شريط المقارنة البصري

### 5.4 تقسيم الفئات

- [x] إنشاء CategoryBreakdown
- [x] قائمة الفئات
- [x] المبلغ لكل فئة
- [x] النسبة المئوية

### 5.5 آخر المصروفات

- [x] عرض آخر 5 مصروفات
- [x] رابط لعرض الكل

---

## المرحلة 6: المكونات المشتركة ✅

### 6.1 المكونات الأساسية

- [x] إنشاء StatCard.vue
- [x] إنشاء Badge.vue
- [x] إنشاء EmptyState.vue
- [x] إنشاء FloatingActionButton.vue

### 6.2 التحميل

- [x] إنشاء SkeletonLoader.vue (card, text, stat, expense)
- [x] إنشاء PullToRefreshIndicator.vue
- [x] إنشاء usePullToRefresh.ts

### 6.3 التنبيهات

- [x] إنشاء ToastContainer.vue
- [x] إنشاء useToast.ts
- [x] success, error, warning, info types
- [x] auto-dismiss
- [x] manual dismiss

### 6.4 النوافذ المنبثقة

- [x] إنشاء ConfirmModal.vue
- [x] إنشاء ImagePreviewModal.vue

---

## المرحلة 7: الملف الشخصي والإعدادات ✅

### 7.1 الملف الشخصي

- [x] إنشاء ProfileView.vue
- [x] إنشاء useProfile.ts
- [x] اختيار الدور (زوج/زوجة)
- [x] الاسم المستعار
- [x] صورة الملف الشخصي (Avatar)
- [x] حفظ في Firestore

### 7.2 الإعدادات

- [x] إنشاء SettingsView.vue
- [x] إدارة الفئات (إضافة/تعديل/حذف)
- [x] واجهة إضافة فئة جديدة
- [x] اختيار الأيقونة واللون

---

## المرحلة 8: الأدوات المساعدة ✅

### 8.1 التاريخ

- [x] إنشاء utils/date.ts
- [x] formatDate() - بالعربية
- [x] formatRelative() - "منذ ساعة"
- [x] getMonthName() - بالعربية

### 8.2 العملة

- [x] إنشاء utils/currency.ts
- [x] formatCurrency() - "150 ج.م"

---

## المرحلة 9: الميزات الإضافية ✅

### 9.1 الوضع الداكن (Dark Mode)

- [x] إنشاء useTheme.ts
- [x] زر التبديل في Header
- [x] حفظ التفضيل في localStorage
- [x] دعم تفضيل النظام
- [x] تطبيق Dark Mode على جميع الصفحات
- [x] تطبيق Dark Mode على جميع المكونات

### 9.2 PWA Support

- [x] إعداد vite-plugin-pwa
- [x] إنشاء manifest.json
- [x] إنشاء أيقونات PWA
- [x] إنشاء PWAInstallPrompt.vue
- [x] دعم التثبيت على الجهاز

### 9.3 البحث

- [x] البحث في المصروفات
- [x] البحث بالفئة أو الملاحظات أو المبلغ
- [x] زر مسح البحث

---

## المرحلة 10: النشر (Deployment) ✅

### 10.1 إعداد GitHub

- [x] إنشاء repository
- [x] إنشاء GitHub Actions workflow
- [x] دفع الكود إلى GitHub

### 10.2 GitHub Pages

- [x] إعداد base path في vite.config.ts
- [x] إعداد hash history في router
- [x] إنشاء workflow للنشر التلقائي

### 10.3 Firebase

- [x] إعداد Firebase project
- [x] إعداد Authentication
- [x] إعداد Firestore

---

## ملخص الإنجازات 🎉

### الصفحات المنشأة (7 صفحات)

1. ✅ LoginView - صفحة تسجيل الدخول
2. ✅ DashboardView - لوحة التحكم الرئيسية
3. ✅ ExpensesView - قائمة المصروفات
4. ✅ AddExpenseView - إضافة مصروف جديد
5. ✅ EditExpenseView - تعديل مصروف
6. ✅ ProfileView - الملف الشخصي
7. ✅ SettingsView - الإعدادات

### المكونات المنشأة (15 مكون)

**Layout:**
- AppHeader.vue
- AppNav.vue
- AppLayout.vue

**Common:**
- StatCard.vue
- Badge.vue
- EmptyState.vue
- FloatingActionButton.vue
- SkeletonLoader.vue
- ConfirmModal.vue
- ImageUpload.vue
- ImagePreviewModal.vue
- PullToRefreshIndicator.vue
- ToastContainer.vue
- PWAInstallPrompt.vue

### Composables (8 ملفات)

- useAuth.ts
- useExpenses.ts
- useCategories.ts
- useProfile.ts
- useImageCompression.ts
- useTheme.ts
- useToast.ts
- usePullToRefresh.ts

### الميزات الرئيسية

- ✅ تسجيل الدخول بالبريد الإلكتروني
- ✅ إدارة المصروفات (CRUD كامل)
- ✅ الفئات القابلة للتخصيص
- ✅ رفع صور الفواتير مع الضغط
- ✅ لوحة تحكم بالإحصائيات
- ✅ الوضع الداكن
- ✅ دعم PWA
- ✅ البحث في المصروفات
- ✅ واجهة عربية RTL
- ✅ تصميم متجاوب (Mobile-first)
- ✅ نشر على GitHub Pages

---

## ملاحظات

### الرابط المباشر

> https://abanoub2017.github.io/home-wallet/

### التقنيات المستخدمة

- Vue 3.5 + Composition API
- TypeScript 5.9
- Vite 7.3
- Tailwind CSS 4
- Firebase 12 (Auth + Firestore)
- vite-plugin-pwa

### أفكار للتحسين المستقبلي

- [ ] تصدير البيانات (CSV/PDF)
- [ ] الإشعارات
- [ ] الميزانية الشهرية
- [ ] تقارير متقدمة
- [ ] دعم لغات إضافية
