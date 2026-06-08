# تنظيف الواجهة المستقر — v10.6

## الأساس

تم بناء هذه النسخة على `v102-full-review-fixes` لأنها أكثر استقرارًا من v105.

## الهدف

تطبيق قاعدة الزائر أولًا بدون كسر البناء أو الصفحة الرئيسية أو صفحة تفاصيل الفرصة.

## ما تمت إزالته من الواجهة

- AnalyticsReadiness.
- FeedbackLoop.
- GrowthExperiments.
- OutreachKit.
- CommercialPackaging.
- SalesEnablement.
- OperationsPlaybook.
- GovernanceRiskControls.
- LaunchFreezeNotice.
- StableMaintenance.
- IssueTriage.
- SupportHelpdesk.
- GoLiveKit.
- MaintenanceChecklist.

## ما بقي

- السوق.
- تفاصيل الفرصة.
- إضافة مشروع.
- إرسال اهتمام.
- طلب NDA.
- الحساب.
- السياسات الضرورية.
- تجربة الجوال.
- الملفات الداخلية كتوثيق فقط.

## إصلاحات أمان البناء

- تثبيت `'use client'` في `MyRequestsBox.jsx` في أعلى الملف.
- التأكد من وجود `getOpportunityBySlug` عند الحاجة.
- إزالة بقايا الأقسام الداخلية من الصفحة الرئيسية بطريقة آمنة.
- عدم إضافة SQL.
- عدم تغيير Supabase أو Admin.
