# 🚀 دليل النشر - محفظة المنزل

## نظرة عامة

يتم نشر التطبيق تلقائياً على GitHub Pages عند كل push إلى الفرع `main`.

---

## الإعداد الأولي

### 1. تكوين Vite للنشر

تأكد من وجود الإعدادات التالية في `vite.config.ts`:

```typescript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // مهم: base path لـ GitHub Pages
  base: '/home-wallet/',

  plugins: [vue(), tailwindcss()],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
```

### 2. تكوين Router للنشر

تأكد من استخدام `createWebHashHistory`:

```typescript
// src/router/index.ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  // مهم: Hash history للتوافق مع GitHub Pages
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    // ...
  ],
})

export default router
```

---

## GitHub Actions Workflow

### الملف: `.github/workflows/deploy.yml`

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

      - name: Type check
        run: npm run type-check

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

## إعداد GitHub Secrets

### الخطوات:

1. اذهب إلى Repository على GitHub
2. **Settings** > **Secrets and variables** > **Actions**
3. أضف الـ secrets التالية:

| Secret Name                         | Description                  |
| ----------------------------------- | ---------------------------- |
| `VITE_FIREBASE_API_KEY`             | Firebase API Key             |
| `VITE_FIREBASE_AUTH_DOMAIN`         | Firebase Auth Domain         |
| `VITE_FIREBASE_PROJECT_ID`          | Firebase Project ID          |
| `VITE_FIREBASE_STORAGE_BUCKET`      | Firebase Storage Bucket      |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID |
| `VITE_FIREBASE_APP_ID`              | Firebase App ID              |

---

## النشر اليدوي

### 1. بناء المشروع محلياً

```bash
npm run build
```

### 2. معاينة البناء

```bash
npm run preview
```

### 3. النشر عبر git

```bash
git add .
git commit -m "feat: update feature"
git push origin main
```

سيبدأ GitHub Actions تلقائياً.

---

## النشر باستخدام Trigger اليدوي

1. اذهب إلى **Actions** في GitHub
2. اختر workflow **Deploy to GitHub Pages**
3. اضغط **Run workflow**
4. اختر الفرع `main`
5. اضغط **Run workflow**

---

## متابعة حالة النشر

### من GitHub

1. اذهب إلى تبويب **Actions**
2. اضغط على آخر workflow run
3. تابع الخطوات

### الحالات الممكنة

| الحالة         | المعنى         |
| -------------- | -------------- |
| 🟡 In progress | جاري النشر     |
| ✅ Success     | تم النشر بنجاح |
| ❌ Failed      | فشل النشر      |
| ⏹️ Cancelled   | تم إلغاء النشر |

---

## استكشاف أخطاء النشر

### الخطأ: Build failed

**الأسباب المحتملة:**

1. أخطاء TypeScript
2. تبعيات ناقصة
3. متغيرات بيئة ناقصة

**الحل:**

```bash
# محلياً
npm run type-check
npm run build
```

### الخطأ: Permission denied

**السبب:** صلاحيات GitHub Actions
**الحل:**

1. اذهب إلى **Settings** > **Actions** > **General**
2. تحت "Workflow permissions"
3. اختر "Read and write permissions"

### الخطأ: 404 بعد النشر

**الأسباب المحتملة:**

1. `base` غير صحيح في `vite.config.ts`
2. Router history mode غير متوافق

**الحل:**

1. تأكد من `base: '/home-wallet/'`
2. تأكد من `createWebHashHistory`

### الخطأ: Firebase errors في الإنتاج

**السبب:** متغيرات البيئة غير موجودة
**الحل:**

1. تأكد من إضافة جميع Secrets
2. تأكد من أسماء Secrets صحيحة
3. أعد تشغيل Workflow

---

## قائمة التحقق قبل النشر

- [ ] الكود يعمل محلياً
- [ ] `npm run build` ينجح
- [ ] `npm run type-check` بدون أخطاء
- [ ] اختبار الـ preview محلياً
- [ ] جميع GitHub Secrets مضافة
- [ ] `base` في vite.config.ts صحيح
- [ ] Router يستخدم Hash history

---

## الروابط المفيدة

- **التطبيق المنشور:** `https://<username>.github.io/home-wallet/`
- **GitHub Actions:** `https://github.com/<username>/home-wallet/actions`
- **Firebase Console:** `https://console.firebase.google.com/`
