# حراج الفرص والمشاريع Deployment Checklist

1. ارفع المشروع إلى GitHub.
2. اربطه مع Vercel.
3. أضف متغيرات البيئة:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

4. شغّل `supabase/schema.sql` في Supabase.
5. أنشئ Bucket باسم `project-assets`.
6. اضبط Auth Redirect URLs:
   - `http://localhost:3000/**`
   - `https://your-vercel-domain.vercel.app/**`
7. أنشئ حسابك واجعله Admin:

```sql
update public.profiles set user_type='admin' where email='your-email@example.com';
```

8. اختبر: تسجيل، إضافة مشروع، مراجعة إدارية، طلب اهتمام، بلاغ، رسالة تواصل.


## ملاحظة Build

إذا ظهر خطأ Tailwind/PostCSS على Vercel، تأكد أن package.json يستخدم الإصدارات المثبتة الموجودة في هذه النسخة، ولا تستخدم `latest`.
