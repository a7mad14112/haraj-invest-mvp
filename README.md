# حراج انڤست — Next.js v1

نسخة Next.js App Router مستقرة من مشروع حراج انڤست.

## لماذا هذه النسخة؟
- مكونات مشتركة بدل تكرار HTML.
- ملف CSS واحد `app/globals.css`.
- Supabase مدمج عبر `@supabase/supabase-js`.
- صفحات Auth مستقلة.
- مناسبة للنشر على Vercel كـ Next.js.

## التشغيل محليًا
```bash
npm install
npm run dev
```

## النشر في Vercel
- Framework Preset: Next.js
- Build Command: npm run build
- Output Directory: اتركه فارغًا
- Install Command: npm install

## متغيرات البيئة
اختياريًا ضع في Vercel:
```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_WHATSAPP_NUMBER
```

القيم موجودة أيضًا كـ fallback داخل `lib/supabaseClient.js` حتى تعمل النسخة مباشرة.


## v1.1 Alias Fix

- تمت إضافة `jsconfig.json`.
- هذا الملف يعرّف الاختصار `@/` ليشير إلى جذر المشروع.
- الإصلاح يعالج أخطاء مثل:
  - `Can't resolve '@/components/Layout'`
  - `Can't resolve '@/components/Forms'`
  - `Can't resolve '@/components/AuthForms'`


## v1.2 No Alias Fix

- تم حذف الاعتماد العملي على imports بصيغة `@/`.
- تم تحويل الاستيرادات إلى مسارات نسبية مثل:
  - `../components/Layout`
  - `../../components/Forms`
  - `../lib/supabaseClient`
- هذا يعالج أخطاء Vercel/Turbopack:
  - `Can't resolve '@/components/Layout'`
  - `Can't resolve '@/components/Forms'`
  - `Can't resolve '@/components/AuthForms'`


## v1.3 Homepage Professional Upgrade

- تحسين الصفحة الرئيسية فقط.
- إضافة مؤشرات ثقة مختصرة.
- إضافة مسارات واضحة.
- إضافة قسم الثقة قبل القرار.
- إضافة قسم كيف تعمل المنصة.
- إضافة CTA نهائي.
- لم يتم لمس Auth أو Supabase أو الصفحات الأخرى.


## v1.4 Marketplace Upgrade

- تحسين صفحة السوق فقط.
- إضافة بحث فعلي في الفرص.
- إضافة فلاتر: المدينة، القطاع، النوع، المخاطر.
- إضافة عداد نتائج.
- تحسين بطاقات الفرص.
- لم يتم لمس الصفحة الرئيسية أو Auth أو Supabase.


## v1.8 Simple Copy

- تبسيط المحتوى.
- تقليل العبارات الطويلة.
- الحفاظ على البنية وSupabase وAuth.


## v2.0 Dynamic Opportunity Details

- إضافة صفحات تفاصيل ديناميكية: `/opportunity/[slug]`.
- بطاقات السوق تفتح تفاصيل الفرصة المختارة.
- التفاصيل تجلب البيانات من Supabase عند توفرها وتستخدم fallback عند الحاجة.
- لم يتم تغيير Auth أو النماذج.


## v2.1 Interest Form Context

- عند الضغط على اهتمام من فرصة، ينتقل المستخدم إلى:
  - `/contact?opportunity=<slug>`
- نموذج التواصل يعرض اسم الفرصة محل الاهتمام.
- الرسالة المرسلة إلى Supabase/WhatsApp تتضمن اسم الفرصة.
- لم يتم تغيير Auth أو الصفحة الرئيسية.


## v2.2 NDA Context

- عند الضغط على طلب NDA من صفحة فرصة، ينتقل المستخدم إلى:
  - `/nda-request?opportunity=<slug>`
- نموذج NDA يعرض اسم الفرصة محل طلب السرية.
- الرسالة المرسلة إلى Supabase/WhatsApp تتضمن اسم الفرصة.
- لم يتم تغيير Auth أو الصفحة الرئيسية.


## v2.3 Account Dashboard

- تحسين صفحة الحساب بصريًا.
- إضافة حالة الحساب.
- إضافة روابط سريعة:
  - أضف مشروعك
  - تصفح الفرص
  - أرسل اهتمامك
  - طلب السرية
- إضافة مساحة جاهزة لاحقًا لعرض الطلبات.
- لم يتم ربط الطلبات بقاعدة البيانات بعد.


## v2.4 My Requests Preview

- إضافة معاينة "طلباتي" داخل صفحة الحساب.
- يتم حفظ آخر الطلبات محليًا في المتصفح عند إرسال:
  - طلب اهتمام
  - طلب سرية
  - إضافة مشروع
- لا يتم تغيير جداول Supabase.
- الربط الكامل مع قاعدة البيانات سيكون في مرحلة لاحقة.


## v2.5 Supabase Account Requests

- ربط الطلبات الجديدة بالحساب عبر `user_id` عند تسجيل الدخول.
- صفحة الحساب تحاول جلب طلبات المستخدم من Supabase:
  - `project_submissions`
  - `interest_requests`
  - `nda_requests`
- إذا لم تكن أعمدة Supabase مفعلة، تبقى النماذج تعمل وتستخدم الحفظ المحلي كاحتياط.
- ملف SQL المطلوب:
  - `supabase/account-requests.sql`

## التفعيل في Supabase
افتح Supabase → SQL Editor، وشغّل محتوى:

```text
supabase/account-requests.sql
```


## v2.5.1 Requests Visible Fix

- إضافة مكوّن مستقل `MyRequestsBox`.
- يظهر قسم "طلباتي" دائمًا داخل `/account`.
- يحاول قراءة الطلبات من Supabase عبر `user_id`.
- يستخدم localStorage كاحتياط.
- إذا لا توجد طلبات، يظهر صندوق واضح مع روابط إرسال طلب.


## v2.5.2 Ambiguous Route Fix

- إصلاح خطأ Vercel:
  - `Ambiguous app routes detected`
- حذف المسار المتعارض:
  - `app/opportunity/[id]`
- الإبقاء على المسار الصحيح:
  - `app/opportunity/[slug]`


## v2.5.3 Suspense Fix

- إصلاح خطأ Vercel prerender في `/contact`.
- تغليف `ContactClient` داخل `Suspense`.
- تغليف `NdaRequestClient` داخل `Suspense`.
- السبب: استخدام `useSearchParams` يحتاج Suspense في App Router.


## v2.5.4 Marketplace Slug Fix

- إصلاح خطأ Vercel:
  - `ReferenceError: slug is not defined`
- تعديل روابط السوق لاستخدام:
  - `item.slug || item.id`
- إضافة:
  - `export const dynamic = 'force-dynamic';`
  إلى صفحة السوق.


## v2.6 Admin Review Panel

- إضافة صفحة إدارة:
  - `/admin`
- تعرض:
  - طلبات الاهتمام
  - طلبات السرية
  - المشاريع المرسلة
- محمية بالبريد الإداري:
  - `ahmad.elshehri@gmail.com`
  - `ahmad.elshehri2@gmail.com`
- ملف SQL المطلوب:
  - `supabase/admin-review-policies.sql`

## التفعيل في Supabase

افتح Supabase → SQL Editor، وشغّل محتوى:

```text
supabase/admin-review-policies.sql
```


## v2.7 Admin Status Management

- إضافة تغيير حالة الطلبات داخل `/admin`.
- الحالات:
  - جديد
  - قيد المراجعة
  - تم التواصل
  - مغلق
- ملف SQL المطلوب:
  - `supabase/admin-status-management.sql`

## التفعيل في Supabase

افتح Supabase → SQL Editor، وشغّل محتوى:

```text
supabase/admin-status-management.sql
```


## v2.8 Admin Notes & Follow-up

- إضافة بحث داخل لوحة الإدارة.
- فلترة حسب الحالة.
- إضافة ملاحظات داخلية لكل طلب.
- إضافة تاريخ متابعة لكل طلب.
- ملف SQL المطلوب:
  - `supabase/admin-notes-followup.sql`

## التفعيل في Supabase

افتح Supabase → SQL Editor، وشغّل محتوى:

```text
supabase/admin-notes-followup.sql
```


## v2.9 Admin Metrics & Export

- إضافة إحصائيات سريعة حسب الحالة داخل `/admin`.
- جعل بطاقات الحالة قابلة للضغط كفلاتر.
- إضافة زر تصدير النتائج المعروضة إلى CSV.
- لا يحتاج SQL جديد.


## v3.0 Admin Follow-up Queue

- إضافة قائمة متابعة داخل لوحة الإدارة.
- إبراز:
  - متابعات متأخرة
  - متابعات اليوم
  - متابعات قادمة
  - طلبات بدون متابعة
- ترتيب الطلبات تلقائيًا بحيث تظهر المتأخرة أولًا.
- لا يحتاج SQL جديد لأنه يستخدم `follow_up_at` من v2.8.


## v3.1 Admin Communication Actions

- إضافة أزرار تواصل مباشرة داخل `/admin`:
  - اتصال
  - واتساب برسالة جاهزة
  - نسخ ملخص الطلب
- لا يحتاج SQL جديد.
- لا يغيّر قاعدة البيانات.


## v3.2 Admin Kanban Board

- إضافة عرض Kanban داخل `/admin`.
- توزيع الطلبات حسب الحالة:
  - جديد
  - قيد المراجعة
  - تم التواصل
  - مغلق
- إمكانية تغيير الحالة من داخل البطاقة.
- إمكانية التبديل بين عرض القائمة وعرض اللوحة.
- لا يحتاج SQL جديد.


## v3.3 Admin Priority Management

- إضافة أولوية لكل طلب داخل `/admin`.
- الأولويات:
  - عاجلة
  - عالية
  - عادية
  - منخفضة
- إضافة فلترة حسب الأولوية.
- ترتيب تلقائي: الأولوية العاجلة والعالية تظهر أولًا.
- إضافة شارات أولوية في القائمة واللوحة.
- ملف SQL المطلوب:
  - `supabase/admin-priority-management.sql`


## v3.4 Premium UI Polish

- تحسين الواجهة البصرية بشكل عام.
- تحسين البطاقات، الأزرار، النماذج، ولوحة الإدارة.
- تحسين تجربة الجوال.
- تحسين الظلال، الحدود، الخلفيات، والمسافات.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو منطق النماذج.


## v3.5 Mobile & Admin UX Refinement

- تحسين تجربة الجوال.
- تحسين لوحة الإدارة بصريًا.
- تحسين Kanban والبطاقات والفلاتر.
- تحسين النماذج وحالات التركيز.
- تحسين السوق وبطاقات الفرص.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو منطق الطلبات.


## v3.6 Homepage Clean Trust Copy

- حذف عبارات "لا توصيات / لا ضمانات" من الصفحة الرئيسية.
- استبدالها بعبارات أكثر إيجابية:
  - وضوح في العرض
  - عرض منظم
  - بيانات واضحة
  - تواصل منظم
- لم يتم حذف صفحات السياسات أو إخلاء المسؤولية.
- لا يحتاج SQL جديد.


## v3.7 Dark Header & Footer

- إضافة هيدر داكن احترافي.
- إضافة فوتر داكن متكامل.
- إبقاء محتوى الصفحة أبيض ورسمي.
- تحسين قائمة الجوال الداكنة.
- تحسين روابط الفوتر وأزرار الدعوة لاتخاذ إجراء.
- حذف العبارات السلبية من فوتر الواجهة واستبدالها بصياغة إيجابية.
- لا يحتاج SQL جديد.


## v3.8 Homepage Premium Sections

- تطوير الصفحة الرئيسية فقط.
- إضافة قسم "لمن المنصة؟".
- إضافة قسم "فرص مختارة".
- إضافة مسار بصري "كيف تعمل؟".
- إضافة قسم "لماذا حراج انڤست؟".
- تحسين CTA النهائي.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو لوحة الإدارة.


## v3.9 Footer Horizontal Layout

- إعادة ترتيب روابط الفوتر أفقيًا.
- توزيع أقسام الفوتر على 4 أعمدة في سطح المكتب.
- تحويل روابط كل قسم إلى أزرار صغيرة أفقية.
- تحسين استغلال المساحة.
- تحسين عرض الجوال مع التفاف الروابط.
- لا يحتاج SQL جديد.


## v4.1 Marketplace UX Upgrade

- تطوير صفحة السوق `/marketplace`.
- إضافة Hero خاص بالسوق.
- إضافة إحصائيات أعلى الصفحة.
- تحسين البحث والفلاتر.
- إضافة فلتر الجاهزية.
- إضافة ترتيب حسب الأحدث والقيمة والقطاع.
- تحسين بطاقات الفرص.
- تحسين الجوال.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v4.2 Opportunity Detail Premium Layout

- تطوير صفحة تفاصيل الفرصة `/opportunity/[slug]`.
- إضافة Hero احترافي للفرصة.
- إضافة ملخص تنفيذي.
- إضافة مؤشرات مالية مختصرة.
- إضافة نقاط قوة وما يحتاج مراجعة.
- إضافة مستندات مطلوبة.
- إضافة خطوات متابعة واضحة.
- تحسين الجوال.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v4.3 Multi-step Project Submission

- تطوير صفحة `submit-project`.
- تحويل نموذج إضافة المشروع إلى خطوات:
  - بيانات المشروع
  - الأرقام الأساسية
  - بيانات التواصل
  - مراجعة وإرسال
- إضافة مراجعة قبل الإرسال.
- تحسين تجربة الجوال.
- لا يحتاج SQL جديد.
- لا يغيّر Admin أو Auth أو Marketplace.


## v4.4 Account UX Upgrade

- تطوير صفحة الحساب `/account`.
- إضافة مقدمة احترافية للحساب.
- إضافة روابط سريعة جانبية.
- إضافة نصائح مختصرة للمستخدم.
- تحسين توزيع لوحة الحساب وقسم طلباتي.
- تحسين الجوال.
- لا يحتاج SQL جديد.
- لا يغيّر Admin أو Supabase أو Auth.


## v4.5 Forms & Auth UX Upgrade

- تحسين صفحة التواصل `/contact`.
- تحسين صفحة طلب NDA `/nda-request`.
- تحسين صفحة الدخول `/login`.
- تحسين صفحة إنشاء الحساب `/signup`.
- تحسين صفحة استعادة كلمة المرور `/reset-password`.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth logic أو Admin.


## v4.6 Trust Pages & SEO Polish

- تطوير صفحة `/about`.
- تطوير صفحة `/how-it-works`.
- تطوير صفحة `/verification`.
- إضافة `app/sitemap.js`.
- إضافة `app/robots.js`.
- تحسين محتوى صفحات الثقة والتعريف.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v4.7 Header Navigation & Mobile UX

- تحسين الهيدر الرئيسي.
- إضافة تمييز الصفحة الحالية في الهيدر.
- إضافة رابط "عن المنصة".
- تحسين قائمة الجوال وتقسيمها إلى:
  - ابدأ بسرعة
  - روابط المنصة
  - الدخول/الحساب
- إضافة مؤشر اتصال عند تسجيل الدخول.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Admin.


## v4.8 Site Reliability & Empty States

- إضافة صفحة 404 مخصصة.
- إضافة شاشة تحميل عامة.
- إضافة صفحة خطأ عامة.
- إضافة manifest للموقع.
- تحسين الحالات الفارغة بصريًا.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v4.9 Floating CTA & Quick Contact

- إضافة أزرار عائمة للتواصل السريع.
- إضافة زر واتساب عائم.
- إضافة شريط CTA ثابت للجوال:
  - تصفح الفرص
  - أضف مشروعك
- إخفاء الأزرار العائمة داخل `/admin`.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v5.0 Production Polish & SEO Metadata

- تحسين metadata العامة للموقع.
- إضافة Open Graph وTwitter metadata.
- إضافة Structured Data للموقع.
- إضافة Skip Link لتحسين الوصول.
- تحسين focus-visible للكيبورد.
- إضافة print styles.
- احترام تفضيل reduced motion.
- إضافة public/site.webmanifest.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v5.1 Saved Opportunities & Shortlist

- إضافة حفظ الفرص محليًا في المتصفح.
- إضافة صفحة `/saved`.
- إضافة زر "حفظ الفرصة" في السوق.
- إضافة زر "حفظ الفرصة" في صفحة تفاصيل الفرصة.
- إضافة رابط "المحفوظة" في الهيدر.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v5.2 Homepage Trust Metrics & Conversion Polish

- إضافة قسم مؤشرات ثقة خفيف في الصفحة الرئيسية.
- إضافة قسم "اختر مسارك" بثلاثة مسارات:
  - تصفح الفرص
  - أضف مشروعك
  - أرسل اهتمامك
- تحسين وضوح التحويل من الصفحة الرئيسية.
- لا يحتوي على Opportunity Compare.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v5.3 FAQ & Help Center

- إضافة صفحة `/faq`.
- إضافة قسم أسئلة شائعة مختصر في الصفحة الرئيسية.
- إضافة رابط الأسئلة الشائعة في الفوتر والهيدر.
- إضافة `/faq` إلى sitemap.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v5.4 Content & UI Consistency Polish

- تحسين اتساق الواجهة والصياغة.
- تحسين عناوين الصفحة الرئيسية وبعض النصوص.
- تحسين توازن الأزرار والبطاقات.
- تحسين القراءة العربية والتباعد.
- لا يضيف صفحة `/discover`.
- لا يحتوي على Sector & City Discovery.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v5.5 Mobile & Final Responsive Polish

- تحسينات نهائية لتجربة الجوال.
- تحسين قابلية لمس الأزرار والحقول.
- تحسين الهيدر وقائمة الجوال.
- تحسين البطاقات والفلاتر والنماذج.
- تحسين الفوتر على الشاشات الصغيرة.
- إزالة أي بقايا محتملة لمسارات مرفوضة مثل `/discover` و`/compare`.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v5.6 Production Cleanup & Build Safety

- تنظيف نهائي آمن للنسخة.
- إزالة أي بقايا محتملة لمسارات مرفوضة مثل `/discover` و`/compare`.
- إصلاح وقائي لأي علامات اقتباس JSX هاربة.
- تحسينات CSS خفيفة للأداء والاستقرار.
- تحسينات إضافية للجوال والطباعة والحالات المعطلة.
- لا يضيف صفحات جديدة.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v5.7 Policy Pages UX Polish

- تحسين صفحات `/privacy` و`/terms` و`/disclaimer`.
- تنظيم المحتوى داخل بطاقات واضحة.
- إضافة تنقل جانبي بين صفحات السياسات.
- تحسين تجربة الجوال.
- لا يضيف صفحات جديدة.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v5.8 Launch Readiness & Final UI Polish

- إضافة `.env.example`.
- إضافة `LAUNCH_CHECKLIST_AR.md`.
- إضافة `DEPLOY_TERMUX_COMMAND.md`.
- إضافة `vercel.json` بسيط وآمن.
- تحسينات نهائية خفيفة للواجهة والقراءة.
- تنظيف وقائي للمسارات المرفوضة `/discover` و`/compare`.
- لا يضيف صفحات جديدة.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v5.9 Stable Release & Final Conversion Polish

- تحسين نهائي لصياغة الصفحة الرئيسية.
- تحسين خفيف لأزرار التحويل.
- إضافة `VERSION.md`.
- إضافة `CHANGELOG_AR.md`.
- إضافة `FINAL_QA_AR.md`.
- رفع رقم الإصدار في `package.json` إلى 5.9.0.
- تنظيف وقائي للمسارات المرفوضة `/discover` و`/compare`.
- لا يضيف صفحات جديدة.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v6.0 Accessibility & Quality Hardening

- تحسينات نهائية للجودة والوصول.
- تحسين التركيز المرئي عند استخدام لوحة المفاتيح.
- تحسين قابلية القراءة والتفاف النصوص.
- تحسين ثبات الجوال.
- إضافة `QUALITY_HARDENING_AR.md`.
- رفع رقم الإصدار في `package.json` إلى 6.0.0.
- تنظيف وقائي للمسارات المرفوضة `/discover` و`/compare`.
- لا يضيف صفحات جديدة.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v6.1 Opportunity Share & Copy Link

- إضافة زر مشاركة/نسخ رابط للفرص.
- دعم Web Share API على الجوال.
- نسخ الرابط تلقائيًا إذا لم تكن المشاركة مدعومة.
- إضافة الزر في السوق وصفحة تفاصيل الفرصة.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v6.2 Forms Completion UX

- تحسين تجربة إرسال النماذج.
- إضافة حالة `جاري الإرسال`.
- منع الضغط المتكرر أثناء الإرسال.
- تحسين حقول الجوال والرسائل التوضيحية.
- تحسين رسائل النجاح والتنبيه.
- رفع الإصدار إلى 6.2.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v6.3 Footer Logo Match Header

- تعديل شعار واسم الفوتر ليستخدم نفس مكوّن Logo الموجود في الهيدر.
- إزالة شكل الشعار القديم في الفوتر.
- تحسين موضع الشعار والاسم داخل الفوتر على الجوال وسطح المكتب.
- رفع الإصدار إلى 6.3.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v6.4 Header Logo English Line

- تعديل مكوّن Logo ليعرض:
  - حراج انڤست
  - HARAJ INVEST
- الهيدر والفوتر يستخدمان نفس الشعار والاسم.
- منع إخفاء HARAJ INVEST في الهيدر على الجوال.
- رفع الإصدار إلى 6.4.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v6.5 Uploaded Logo Design

- تغيير مكوّن Logo ليستخدم صورة الشعار المرفوعة.
- ظهور التصميم الجديد في الهيدر والفوتر.
- إضافة الصورة داخل `public/haraj-invest-logo-design-v65.jpg`.
- رفع الإصدار إلى 6.5.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v6.6 Brand Assets & SEO Preview Polish

- تحديث صورة الشعار في `public/haraj-invest-logo-design-v66.jpg`.
- إضافة صورة Open Graph جديدة `public/og-image.jpg`.
- إضافة Apple Touch Icon.
- تحديث metadata لاستخدام صورة المشاركة.
- رفع الإصدار إلى 6.6.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v6.7 Logo Fit & Header Balance Polish

- تحسين مقاسات الشعار الجديد داخل الهيدر.
- تحسين مقاس الشعار داخل الفوتر.
- تقليل تزاحم الشعار مع روابط الهيدر.
- تحديث `favicon.png` و`apple-touch-icon.png`.
- رفع الإصدار إلى 6.7.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v6.8 Brand Color Harmonization

- توحيد ألوان الموقع مع الشعار الجديد.
- تحسين ألوان الهيدر والفوتر.
- تحسين ألوان أزرار التحويل.
- تحسين ألوان البطاقات والـ badges.
- رفع الإصدار إلى 6.8.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v6.9 Homepage Hero & Brand Presence Polish

- تحسين حضور الهوية في الصفحة الرئيسية.
- إضافة شريط مؤشرات مختصر أسفل Hero.
- تحسين توازن أزرار التحويل.
- تحسين ارتباط البطاقات بألوان الشعار.
- رفع الإصدار إلى 6.9.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v7.0 High-Impact Conversion & SEO Upgrade

- إضافة CTA سياقي ثابت في صفحة تفاصيل الفرصة.
- إضافة Structured Data للفرص.
- إضافة Metadata ديناميكية لصفحات الفرص.
- تحسين Metadata صفحة السوق.
- تحسين مسار التحويل من صفحة الفرصة.
- رفع الإصدار إلى 7.0.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v7.1 Marketplace Conversion UX Upgrade

- تحسين تجربة سوق الفرص.
- إضافة شريط تحويل في السوق.
- إضافة ملخص عدد النتائج.
- إضافة إعادة ضبط الفلاتر.
- تحسين حالة عدم وجود نتائج.
- رفع الإصدار إلى 7.1.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v7.2 Stability & Due Diligence UX Upgrade

- إصلاح استقرار صفحة السوق بعد تحسينات v7.1.
- إعادة تنظيم عدد النتائج وإعادة ضبط الفلاتر.
- إزالة تكرار أزرار المشاركة في صفحة تفاصيل الفرصة.
- إضافة لوحة فحص أولي والعناية الواجبة.
- رفع الإصدار إلى 7.2.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v7.3 Deal Flow Clarity Upgrade

- إضافة مكوّن DealFlowSteps.
- توضيح مسار التعامل بعد إرسال الاهتمام.
- تحسين صفحة `/how-it-works`.
- إضافة مسار التعامل في الصفحة الرئيسية وصفحة الفرصة.
- رفع الإصدار إلى 7.3.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v7.4 Opportunity Detail Premium Layout

- تحسين صفحة تفاصيل الفرصة بصريًا.
- إضافة مكوّن OpportunityPremiumSummary.
- إبراز القيمة والإيرادات والربح والمدينة.
- تحسين عرض نقاط القوة والمخاطر والمستندات.
- رفع الإصدار إلى 7.4.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v7.5 Request Tracking & Account UX Upgrade

- إضافة مكوّن AccountFollowupGuide.
- تحسين تجربة متابعة الطلبات داخل الحساب.
- تحسين قراءة حالات الطلبات.
- تحسين بطاقات الطلبات بصريًا.
- رفع الإصدار إلى 7.5.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v7.6 Submission Funnel Upgrade

- إضافة مكوّن SubmissionReadinessGuide.
- تحسين مسار إضافة المشاريع.
- توضيح البيانات المطلوبة لإرسال مشروع أقوى.
- تحسين إرشادات نموذج المشروع.
- رفع الإصدار إلى 7.6.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v7.7 Contact & Lead Quality Upgrade

- إضافة مكوّن LeadQualityGuide.
- تحسين جودة طلبات الاهتمام.
- تحسين إرشادات صفحة التواصل.
- تحسين placeholder ونصوص نموذج الاهتمام.
- رفع الإصدار إلى 7.7.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v7.8 NDA Funnel & Confidentiality UX Upgrade

- إضافة مكوّن NdaReadinessGuide.
- تحسين صفحة طلب السرية.
- توضيح متى يكون NDA مناسبًا.
- تحسين placeholder ونصوص نموذج NDA.
- رفع الإصدار إلى 7.8.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v7.9 Production QA & Route Stability Upgrade

- تحسين صفحات النظام: loading/error/not-found.
- إضافة ملف فحص الإنتاج النهائي `FINAL_PRODUCTION_QA_V79_AR.md`.
- تحسين استقرار المسارات.
- رفع الإصدار إلى 7.9.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v8.0 Performance & SEO Final Hardening

- تحديث sitemap وrobots.
- تقوية metadata العامة.
- تحسينات أداء عبر CSS.
- دعم reduced motion.
- إضافة `FINAL_RELEASE_NOTES_V80_AR.md`.
- رفع الإصدار إلى 8.0.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v8.1 Business Model & Monetization Clarity

- إضافة مكوّن BusinessModelClarity.
- توضيح القيمة لأصحاب المشاريع والمهتمين بالفرص.
- توضيح مسارات دخل مستقبلية محتملة.
- تحسين الصفحة الرئيسية وصفحة كيف تعمل.
- رفع الإصدار إلى 8.1.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v8.2 Investor Onboarding & Decision Path Upgrade

- إضافة مكوّن InvestorDecisionPath.
- توضيح مسار المستثمر من التصفح إلى إرسال الاهتمام.
- تحسين الصفحة الرئيسية والسوق.
- رفع الإصدار إلى 8.2.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v8.3 Owner Onboarding & Project Quality Upgrade

- إضافة مكوّن OwnerOnboardingPath.
- توضيح مسار صاحب المشروع قبل إضافة الفرصة.
- تحسين صفحة submit-project والصفحة الرئيسية.
- رفع الإصدار إلى 8.3.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v8.4 Navigation & Information Architecture Cleanup

- إضافة مكوّن PrimaryPaths.
- تحسين وضوح المسارات الأساسية.
- تقليل التشتت في التنقل.
- تحسين الصفحة الرئيسية وصفحة كيف تعمل.
- رفع الإصدار إلى 8.4.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v8.5 Footer & Policy Trust Cleanup

- تحسين بنية الفوتر.
- ترتيب الروابط المساعدة حسب الأولوية.
- إضافة مكوّن PolicyQuickGuide.
- تحسين صفحات privacy/terms/disclaimer.
- رفع الإصدار إلى 8.5.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v8.6 Mobile Experience & PWA Polish

- تحسين PWA manifest.
- إضافة مكوّن MobileQuickActions للجوال.
- تحسين themeColor وviewport.
- تحسين تجربة standalone على الجوال.
- رفع الإصدار إلى 8.6.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v8.7 Deploy Readiness & Build Safety Pack

- إضافة ملف أوامر الرفع `DEPLOY_TERMUX_V87.md`.
- إضافة ملف فحص السلامة `BUILD_SAFETY_CHECKLIST_V87_AR.md`.
- إضافة scripts:
  - `npm run check:build`
  - `npm run check:routes`
- رفع الإصدار إلى 8.7.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v8.8 Final Launch Polish & Go-Live Kit

- إضافة مكوّن GoLiveKit.
- إضافة ملف `GO_LIVE_KIT_V88_AR.md`.
- إضافة ملف `DEPLOY_TERMUX_V88.md`.
- إضافة script:
  - `npm run check:launch`
- رفع الإصدار إلى 8.8.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v8.9 Conversion Copy & Final UX Polish

- إضافة مكوّن FinalConversionAssurance.
- تحسين رسائل الطمأنة والتحويل.
- إضافة ملف `CONVERSION_COPY_NOTES_V89_AR.md`.
- رفع الإصدار إلى 8.9.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v9.0 Stable Launch Candidate

- اعتماد نسخة مرشح إطلاق مستقر.
- إضافة ملفات:
  - `STABLE_LAUNCH_CANDIDATE_V90_AR.md`
  - `DEPLOY_TERMUX_V90.md`
  - `POST_DEPLOY_TEST_V90_AR.md`
- تحديث الإصدار إلى 9.0.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v9.1 Post-Launch Monitoring & Maintenance Kit

- إضافة مكوّن MaintenanceChecklist.
- إضافة ملفات متابعة وصيانة بعد الإطلاق.
- إضافة أمر رفع v91.
- تحديث الإصدار إلى 9.1.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v9.2 Analytics Readiness & Event Tracking Plan

- إضافة مكوّن AnalyticsReadiness.
- إضافة `lib/analyticsEvents.js`.
- إضافة خطة قياس الأحداث `ANALYTICS_EVENT_PLAN_V92_AR.md`.
- لا يوجد إرسال بيانات لطرف خارجي.
- تحديث الإصدار إلى 9.2.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v9.3 Feedback Loop & User Insight Kit

- إضافة مكوّن FeedbackLoop.
- إضافة ملفات جمع الملاحظات وقرار التطوير التالي.
- تحديث الإصدار إلى 9.3.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v9.4 Growth Experiments & Prioritization Kit

- إضافة مكوّن GrowthExperiments.
- إضافة ملفات تجارب النمو ومصفوفة الأولويات.
- تحديث الإصدار إلى 9.4.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v9.5 Investor Outreach & Partnership Kit

- إضافة مكوّن OutreachKit.
- إضافة رسائل تواصل جاهزة.
- إضافة قائمة شرائح شراكات مستهدفة.
- تحديث الإصدار إلى 9.5.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v9.6 Commercial Packaging & Service Offers Kit

- إضافة مكوّن CommercialPackaging.
- إضافة تصور الباقات التجارية.
- إضافة نصوص عرض الخدمات.
- تحديث الإصدار إلى 9.6.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v9.7 Sales Enablement & Client Follow-up Kit

- إضافة مكوّن SalesEnablement.
- إضافة أسئلة تأهيل تجارية.
- إضافة رسائل متابعة جاهزة.
- إضافة خط متابعة العملاء.
- تحديث الإصدار إلى 9.7.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v9.8 Operations Playbook & SOP Kit

- إضافة مكوّن OperationsPlaybook.
- إضافة أدلة SOP لإدارة المشاريع والاهتمام وNDA.
- تحديث الإصدار إلى 9.8.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v9.9 Final Governance & Risk Controls Kit

- إضافة مكوّن GovernanceRiskControls.
- إضافة ضوابط الحوكمة والمخاطر.
- إضافة دليل صياغة إخلاء المسؤولية.
- تحديث الإصدار إلى 9.9.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v10.0 Production Master Release

- اعتماد نسخة رئيسية مستقرة.
- إضافة ملفات:
  - `PRODUCTION_MASTER_RELEASE_V100_AR.md`
  - `FINAL_MASTER_CHECKLIST_V100_AR.md`
  - `DEPLOY_TERMUX_V100.md`
- تحديث الإصدار إلى 10.0.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v10.6 Visitor-First Stable Cleanup

- نسخة مصححة مبنية على v102-full-review-fixes.
- تطبيق قاعدة: هل هذا ينفع الزائر أو صاحب المشروع مباشرة؟
- إزالة المكونات الداخلية من الواجهة دون كسر الصفحة الرئيسية.
- إبقاء التوثيق الداخلي كملفات فقط.
- تحديث الإصدار إلى 10.6.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v10.7 Opportunity Decision Clarity

- إضافة مكوّن OpportunityDecisionGuide.
- تحسين صفحة تفاصيل الفرصة بمسار قرار مباشر للزائر.
- يوضح متى يرسل اهتمامًا ومتى يطلب NDA.
- تحديث الإصدار إلى 10.7.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v10.8 Project Submission Clarity

- إضافة مكوّن ProjectSubmissionClarity.
- تحسين صفحة إضافة المشروع بإرشادات مباشرة لصاحب المشروع.
- يوضح ما يجب تجهيزه قبل الإرسال.
- تحديث الإصدار إلى 10.8.0.
- لا يحتاج SQL جديد.
- لا يغيّر Supabase أو Auth أو Admin.


## v10.9 Broker Submitter Stable Merge

- دمج ميزة صاحب المشروع / وسيط مفوّض فوق v10.8.
- إضافة إقرار إلزامي للوسيط.
- إضافة شارة "عبر وسيط" في صفحة الفرصة.
- إضافة ملف SQL:
  - `supabase/broker-submitter-fields-v109.sql`
- تحديث الإصدار إلى 10.9.0.
- يحتاج SQL جديد.
- لا يغيّر Auth أو Admin logic.


## v11.0 Commission Disclosure & Brokerage Alignment

- تصحيح النصوص التي كانت تنفي دور الوساطة.
- توضيح عمولة نجاح 5%.
- إضافة إقرار عمولة في نموذج إضافة المشروع.
- تحديث الشروط وإخلاء المسؤولية.
- إضافة SQL:
  - `supabase/commission-disclosure-v110.sql`
- تحديث الإصدار إلى 11.0.0.


## v11.1 Commission Page & Fee Calculator

- إضافة صفحة `/commission`.
- إضافة حاسبة عمولة نجاح 5%.
- توضيح متى تستحق العمولة ومتى لا تستحق.
- إضافة رابط في الفوتر.
- تحديث الإصدار إلى 11.1.0.
- لا يحتاج SQL جديد فوق v11.0.


## v11.2 Media Availability + Commission Acknowledgment Fix

- إصلاح ظهور خيار إقرار عمولة النجاح في خطوة المراجعة.
- إضافة منع واضح داخل الإرسال عند عدم الإقرار.
- تحسين خطوة توفّر الصور والمستندات.
- إضافة SQL:
  - `supabase/media-availability-v112.sql`
- تحديث الإصدار إلى 11.2.0.


## v11.3 No WhatsApp Auto Redirect

- منع فتح واتساب تلقائيًا عند فشل الحفظ.
- عرض رسالة واضحة للمستخدم.
- حفظ نسخة محلية بدل التحويل القسري.
- تحديث الإصدار إلى 11.3.0.
- لا يحتاج SQL جديد.


## v11.4 Project Submit Feedback Fix

- إصلاح وضوح نتيجة إرسال المشروع.
- إظهار رسالة بجانب زر الإرسال.
- منع تعطيل الزر بصمت عند عدم إقرار العمولة.
- لا SQL جديد.
- تحديث الإصدار إلى 11.4.0.


## v11.5 Admin Publish to Marketplace

- إضافة زر نشر المشاريع المرسلة في تصفح الفرص من لوحة الإدارة.
- إنشاء/تحديث جدول `opportunities`.
- إضافة SQL:
  - `supabase/admin-publish-to-marketplace-v115.sql`
- تحديث الإصدار إلى 11.5.0.
- يحتاج SQL جديد.


## v11.6 Marketplace Card Visual Consistency

- تحسين تناسق بطاقات الفرص في `/marketplace`.
- توحيد ارتفاع البطاقات والشارات والأزرار.
- تحسين عرض العنوان والوصف والمؤشرات المالية.
- تحديث الإصدار إلى 11.6.0.
- لا يحتاج SQL جديد.
