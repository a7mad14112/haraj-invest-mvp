# فحص الإنتاج النهائي — v7.9

## صفحات أساسية

اختبر هذه الصفحات بعد النشر:

- `/`
- `/marketplace`
- `/opportunity/cafe-riyadh`
- `/submit-project`
- `/contact`
- `/nda-request`
- `/how-it-works`
- `/faq`
- `/saved`
- `/account`
- `/admin`
- `/privacy`
- `/terms`
- `/disclaimer`

## مسارات يجب ألا تكون موجودة

- `/discover`
- `/compare`

## اختبارات وظيفية

- إرسال اهتمام من `/contact`.
- طلب NDA من `/nda-request`.
- إضافة مشروع من `/submit-project`.
- حفظ فرصة من `/marketplace`.
- مشاركة فرصة من صفحة التفاصيل.
- فتح صفحة الحساب `/account`.
- فتح لوحة الإدارة `/admin`.

## اختبارات الجوال

- الهيدر والشعار.
- قائمة الجوال.
- أزرار CTA.
- النماذج.
- الفوتر.
- عدم وجود تمرير أفقي.

## Vercel

بعد الرفع:

- Redeploy.
- Clear Build Cache.
- اختبر الصفحة الرئيسية.
- اختبر صفحة فرصة.
- اختبر صفحة السوق.

## Supabase

هذه النسخة لا تحتاج SQL جديد.
