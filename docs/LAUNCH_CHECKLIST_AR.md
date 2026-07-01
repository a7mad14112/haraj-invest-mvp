# قائمة فحص الإطلاق — حراج انڤست

## 1. قبل الرفع

- تأكد أن الملف المضغوط الأخير هو النسخة المطلوبة.
- تأكد أن المشروع يحتوي على `package.json`.
- تأكد من عدم وجود مسارات غير مرغوبة مثل:
  - `/discover`
  - `/compare`

## 2. GitHub

- ادفع النسخة إلى المستودع:
  - `a7mad14112/haraj-invest-mvp`
- تأكد أن الفرع المستخدم في Vercel هو:
  - `main`

## 3. Vercel

بعد الرفع:

- افتح Vercel.
- اختر المشروع.
- افتح Deployments.
- اختر Redeploy.
- فعّل Clear Build Cache.
- نفّذ Redeploy.

## 4. Environment Variables

تأكد من وجود القيم التالية في Vercel:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 5. صفحات يجب اختبارها

- `/`
- `/marketplace`
- `/opportunity/cafe-riyadh`
- `/submit-project`
- `/contact`
- `/nda-request`
- `/login`
- `/signup`
- `/account`
- `/admin`
- `/faq`
- `/saved`
- `/privacy`
- `/terms`
- `/disclaimer`
- `/anything-not-found`

## 6. اختبار الجوال

- افتح الموقع من الجوال.
- راجع الهيدر.
- راجع قائمة الجوال.
- راجع الشريط السفلي.
- جرّب الحقول والأزرار.
- تأكد من عدم وجود تمرير أفقي مزعج.

## 7. اختبار Supabase

- أرسل طلب اهتمام.
- أرسل طلب NDA.
- أرسل مشروع.
- افتح `/account` وتأكد من ظهور الطلبات.
- افتح `/admin` وتأكد من ظهور الطلبات للإداري.

## 8. ملاحظات

هذه النسخة لا تحتاج SQL جديد إذا كانت الجداول والسياسات السابقة مفعّلة.
