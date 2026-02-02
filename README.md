# 💰 محفظة المنزل - Home Wallet

تطبيق ويب لإدارة مصروفات الأسرة، مصمم خصيصاً للأزواج لتتبع وإدارة النفقات المنزلية.

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwind-css)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase)

## 🌐 الرابط المباشر

**[https://abanoub2017.github.io/home-wallet/](https://abanoub2017.github.io/home-wallet/)**

---

## ✨ المميزات

### الأساسية
- 🔐 **تسجيل الدخول** - مصادقة آمنة عبر البريد الإلكتروني
- 💸 **إدارة المصروفات** - إضافة، تعديل، حذف المصروفات
- 📊 **لوحة تحكم** - إحصائيات شاملة ورسوم بيانية
- 🏷️ **الفئات** - تصنيف المصروفات (قابلة للتخصيص)
- 📸 **صور الفواتير** - رفع وضغط الصور تلقائياً

### تجربة المستخدم
- 🌙 **الوضع الداكن** - دعم كامل للوضع الليلي
- 📱 **PWA** - تثبيت كتطبيق على الجهاز
- 🔍 **البحث** - البحث في المصروفات
- 🌍 **RTL** - واجهة عربية بالكامل
- 📲 **Mobile-First** - تصميم متجاوب

### الإحصائيات
- 📈 إجمالي المصروفات الشهرية
- 👫 مقارنة مصروفات الزوج والزوجة
- 📋 تقسيم حسب الفئات
- 📅 تصفية حسب الشهر والسنة

---

## 🛠️ التقنيات المستخدمة

| التقنية | الإصدار | الغرض |
|---------|---------|-------|
| Vue.js 3 | 3.5.27 | إطار العمل الأساسي |
| TypeScript | 5.9.3 | Type Safety |
| Vite | 7.3.1 | أداة البناء |
| Tailwind CSS | 4.x | التصميم |
| Firebase Auth | 12.x | المصادقة |
| Firestore | 12.x | قاعدة البيانات |
| vite-plugin-pwa | 1.2.0 | دعم PWA |

---

## 🚀 البدء السريع

### المتطلبات
- Node.js v20.19+ أو v22.12+
- npm
- حساب Firebase

### التثبيت

```bash
# استنساخ المشروع
git clone https://github.com/abanoub2017/home-wallet.git
cd home-wallet

# تثبيت التبعيات
npm install

# إنشاء ملف البيئة
cp .env.example .env

# تعديل .env بإعدادات Firebase الخاصة بك
```

### التطوير

```bash
npm run dev
```

### البناء للإنتاج

```bash
npm run build
```

---

## 📁 هيكل المشروع

```
src/
├── assets/styles/      # ملفات CSS
├── components/
│   ├── common/         # مكونات مشتركة
│   └── layout/         # مكونات التخطيط
├── composables/        # Vue Composables
├── config/             # إعدادات Firebase والفئات
├── router/             # Vue Router
├── types/              # TypeScript Types
├── utils/              # دوال مساعدة
└── views/              # صفحات التطبيق
```

---

## 📄 الصفحات

| الصفحة | الوصف |
|--------|-------|
| `/` | لوحة التحكم الرئيسية |
| `/expenses` | قائمة المصروفات |
| `/add` | إضافة مصروف جديد |
| `/edit/:id` | تعديل مصروف |
| `/profile` | الملف الشخصي |
| `/settings` | إعدادات الفئات |
| `/login` | تسجيل الدخول |

---

## 🔧 إعداد Firebase

1. أنشئ مشروع جديد في [Firebase Console](https://console.firebase.google.com/)
2. فعّل Authentication (Email/Password)
3. أنشئ قاعدة بيانات Firestore
4. انسخ إعدادات المشروع إلى ملف `.env`

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

---

## 📱 لقطات الشاشة

### الوضع الفاتح
- لوحة التحكم مع إحصائيات الشهر
- قائمة المصروفات مع البحث
- نموذج إضافة مصروف

### الوضع الداكن
- دعم كامل لجميع الصفحات
- تبديل تلقائي حسب تفضيل النظام

---

## 📚 التوثيق

راجع مجلد [docs/](./docs/) للتوثيق التفصيلي:

- [خطة المشروع](./docs/01-project-plan.md)
- [المعمارية](./docs/02-architecture.md)
- [دليل الأنماط](./docs/03-style-guide.md)
- [نظام التصميم](./docs/04-design-system.md)
- [دليل الإعداد](./docs/05-setup-guide.md)
- [دليل النشر](./docs/06-deployment.md)
- [قائمة المهام](./docs/07-tasks-checklist.md)

---

## 🤝 المساهمة

المساهمات مرحب بها! يرجى:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

---

## 📝 الترخيص

هذا المشروع للاستخدام الشخصي.

---

## 👨‍💻 المطور

**Abanoub George**

---

**آخر تحديث:** فبراير 2026
