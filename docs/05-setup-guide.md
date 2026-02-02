# 🚀 دليل الإعداد - محفظة المنزل

## المتطلبات الأساسية

- Node.js v20.19+ أو v22.12+
- npm أو yarn أو pnpm
- حساب Firebase
- حساب GitHub (للنشر)

---

## الخطوة 1: استنساخ المشروع

```bash
git clone <repository-url>
cd home-wallet
```

---

## الخطوة 2: تثبيت التبعيات

```bash
npm install
```

---

## الخطوة 3: إعداد Firebase

### 3.1 إنشاء مشروع Firebase

1. اذهب إلى [Firebase Console](https://console.firebase.google.com/)
2. اضغط "Add project"
3. اختر اسم المشروع (مثال: home-wallet)
4. اختر إذا كنت تريد Google Analytics (اختياري)
5. انتظر إنشاء المشروع

### 3.2 إعداد Authentication

1. في Firebase Console، اذهب إلى **Build > Authentication**
2. اضغط **Get started**
3. اختر **Email/Password** من قائمة Sign-in providers
4. فعّل **Email/Password** واضغط **Save**

### 3.3 إنشاء المستخدمين

1. في Authentication، اذهب إلى تبويب **Users**
2. اضغط **Add user**
3. أضف المستخدم الأول (الزوج):
   - Email: `husband@example.com`
   - Password: `[كلمة مرور قوية]`
4. أضف المستخدم الثاني (الزوجة):
   - Email: `wife@example.com`
   - Password: `[كلمة مرور قوية]`

### 3.4 إعداد Firestore

1. في Firebase Console، اذهب إلى **Build > Firestore Database**
2. اضغط **Create database**
3. اختر **Start in production mode**
4. اختر موقع قريب منك
5. انتظر إنشاء قاعدة البيانات

### 3.5 إعداد Firestore Rules

1. في Firestore، اذهب إلى تبويب **Rules**
2. استبدل القواعد بالتالي:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write to authenticated users only
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

3. اضغط **Publish**

### 3.6 الحصول على Firebase Config

1. في Firebase Console، اذهب إلى **Project settings** (رمز الترس)
2. انزل إلى قسم **Your apps**
3. اضغط رمز **</>** (Web)
4. اختر اسم التطبيق (مثال: home-wallet-web)
5. **لا تفعّل** Firebase Hosting (سنستخدم GitHub Pages)
6. انسخ قيم الـ firebaseConfig

---

## الخطوة 4: إعداد Environment Variables

### 4.1 إنشاء ملف .env

أنشئ ملف `.env` في جذر المشروع:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

### 4.2 إضافة .env إلى .gitignore

تأكد أن `.env` موجود في `.gitignore`:

```
# .gitignore
.env
.env.local
.env.*.local
```

### 4.3 إنشاء ملف .env.example

أنشئ `.env.example` للتوثيق (بدون قيم حقيقية):

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

## الخطوة 5: تشغيل المشروع محلياً

```bash
npm run dev
```

افتح المتصفح على: http://localhost:5173

---

## الخطوة 6: إعداد GitHub Pages

### 6.1 إنشاء Repository

1. اذهب إلى [GitHub](https://github.com)
2. أنشئ repository جديد باسم `home-wallet`
3. اربط المشروع المحلي:

```bash
git remote add origin https://github.com/<username>/home-wallet.git
git branch -M main
git push -u origin main
```

### 6.2 تفعيل GitHub Pages

1. اذهب إلى **Settings > Pages**
2. تحت **Build and deployment**:
   - Source: **GitHub Actions**

### 6.3 إضافة Secrets للـ Workflow

1. اذهب إلى **Settings > Secrets and variables > Actions**
2. أضف الـ secrets التالية:

| Name                              | Value |
| --------------------------------- | ----- |
| VITE_FIREBASE_API_KEY             | قيمتك |
| VITE_FIREBASE_AUTH_DOMAIN         | قيمتك |
| VITE_FIREBASE_PROJECT_ID          | قيمتك |
| VITE_FIREBASE_STORAGE_BUCKET      | قيمتك |
| VITE_FIREBASE_MESSAGING_SENDER_ID | قيمتك |
| VITE_FIREBASE_APP_ID              | قيمتك |

### 6.4 إنشاء GitHub Actions Workflow

أنشئ ملف `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ['main']
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Create .env file
        run: |
          echo "VITE_FIREBASE_API_KEY=${{ secrets.VITE_FIREBASE_API_KEY }}" >> .env
          echo "VITE_FIREBASE_AUTH_DOMAIN=${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}" >> .env
          echo "VITE_FIREBASE_PROJECT_ID=${{ secrets.VITE_FIREBASE_PROJECT_ID }}" >> .env
          echo "VITE_FIREBASE_STORAGE_BUCKET=${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}" >> .env
          echo "VITE_FIREBASE_MESSAGING_SENDER_ID=${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}" >> .env
          echo "VITE_FIREBASE_APP_ID=${{ secrets.VITE_FIREBASE_APP_ID }}" >> .env

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## الخطوة 7: التحقق من النشر

1. اذهب إلى تبويب **Actions** في GitHub
2. انتظر اكتمال الـ workflow
3. افتح الرابط: `https://<username>.github.io/home-wallet/`

---

## الأوامر المفيدة

| الأمر                | الوصف                |
| -------------------- | -------------------- |
| `npm run dev`        | تشغيل خادم التطوير   |
| `npm run build`      | بناء للإنتاج         |
| `npm run preview`    | معاينة البناء محلياً |
| `npm run test:unit`  | تشغيل الاختبارات     |
| `npm run type-check` | فحص TypeScript       |
| `npm run format`     | تنسيق الكود          |

---

## استكشاف الأخطاء

### الخطأ: Firebase not configured

**المشكلة:** متغيرات البيئة غير موجودة
**الحل:**

1. تأكد من وجود ملف `.env`
2. تأكد من بدء أسماء المتغيرات بـ `VITE_`
3. أعد تشغيل خادم التطوير

### الخطأ: Auth/user-not-found

**المشكلة:** المستخدم غير موجود في Firebase
**الحل:**

1. اذهب إلى Firebase Console > Authentication
2. تأكد من إضافة المستخدم بالبريد الصحيح

### الخطأ: Permission denied (Firestore)

**المشكلة:** قواعد Firestore لا تسمح بالوصول
**الحل:**

1. تأكد من تسجيل الدخول بنجاح
2. راجع قواعد Firestore
3. تأكد أن `createdBy.id` يطابق `auth.uid`

### الخطأ: 404 على GitHub Pages

**المشكلة:** مسار التطبيق غير صحيح
**الحل:**

1. تأكد من `base: '/home-wallet/'` في `vite.config.ts`
2. تأكد من استخدام Hash routing
3. أعد النشر

---

## الخطوات التالية

بعد إكمال الإعداد:

1. راجع [دليل الأنماط](./03-style-guide.md)
2. راجع [نظام التصميم](./04-design-system.md)
3. ابدأ التطوير!
