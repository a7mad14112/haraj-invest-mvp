# حراج إنفست — Stable Launch Candidate v9.0

## الحالة

هذه النسخة مرشح إطلاق مستقر بعد سلسلة تحسينات شملت:

- الهوية والشعار.
- الصفحة الرئيسية.
- سوق الفرص.
- صفحة تفاصيل الفرصة.
- إضافة مشروع.
- إرسال اهتمام.
- طلب NDA.
- الحساب ومتابعة الطلبات.
- الجوال وPWA.
- SEO وsitemap وrobots.
- الفوتر والسياسات.
- رسائل التحويل والطمأنة.

## رقم النسخة

```text
9.0.0
```

## لا تحتاج SQL

هذه النسخة لا تحتاج أي SQL جديد.

## لا تغيّر

- Supabase schema.
- Admin logic.
- Auth logic.

## صفحات الاختبار الأساسية

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
- `/robots.txt`
- `/sitemap.xml`

## مسارات مرفوضة

يجب ألا تكون هذه الصفحات موجودة:

- `/discover`
- `/compare`

## قرار الإطلاق

إذا نجحت اختبارات الصفحات الأساسية في Vercel، يمكن اعتماد هذه النسخة كإصدار إطلاق أولي مستقر.
