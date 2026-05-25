# ربط Supabase — حراج انڤست

## 1. أنشئ مشروع Supabase

ثم افتح:

```text
Project Settings → API
```

وانسخ:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 2. شغّل قاعدة البيانات

افتح:

```text
Supabase → SQL Editor
```

ثم انسخ محتوى:

```text
supabase/schema.sql
```

وشغّله.

## 3. أضف Environment Variables في Vercel

داخل Vercel:

```text
Project → Settings → Environment Variables
```

أضف:

```env
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

ثم أعد النشر.

## 4. إعداد Auth Redirect URLs

في Supabase:

```text
Authentication → URL Configuration
```

أضف:

```text
http://localhost:3000/**
https://your-vercel-domain.vercel.app/**
https://haraj-invest.com/**
```

## 5. إنشاء حساب مدير

بعد تسجيل حسابك في الموقع، شغّل:

```sql
update public.profiles
set user_type = 'admin'
where email = 'your-email@example.com';
```

## 6. تجربة التدفق

1. أنشئ حسابًا.
2. سجّل الدخول.
3. أضف مشروعًا من `/dashboard/projects/new`.
4. المشروع سيُحفظ بحالة `pending`.
5. ادخل `/admin/projects`.
6. اضغط قبول ونشر.
7. سيظهر المشروع في `/projects`.
