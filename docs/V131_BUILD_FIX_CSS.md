# V131 — إصلاح خطأ بناء Vercel (CSS) + ملف ربط النطاق

## سبب فشل النشر
كان البناء على Vercel يفشل بسبب محدّد CSS خاطئ في globals.css:
`.home-final-box::before::before` (عنصر زائف مكرر مرتين — غير صالح).
موجود في موضعين (السطر 3491 و 4499). Turbopack في Next 16 يرفضه فيتوقف البناء،
ولهذا بقيت النسخة القديمة منشورة (كل نشر جديد يفشل).

ملاحظة: هذا الخطأ كان موجودًا مسبقًا في الكود، لكن Turbopack أصبح أكثر صرامة.

## الإصلاح
- تصحيح `::before::before` إلى `::before` في الموضعين.
- التحقق: لا محددات خاطئة متبقية، الأقواس متوازنة (1868/1868).

## ملف ربط النطاق
- public/.well-known/assetlinks.json يحتوي القيم الصحيحة:
  package_name: com.haraj_invest.twa + الـ fingerprint الحقيقي.
- بعد نجاح البناء، سيُنشر تلقائيًا على:
  https://haraj-invest.com/.well-known/assetlinks.json

## مهم عند الرفع من الجوال
تأكد أن مجلد public/.well-known وصل GitHub فعلًا — بعض أدوات Git على الجوال
تتجاهل المجلدات التي تبدأ بنقطة. افتح مستودعك على github.com وتأكد من
وجود public/.well-known/assetlinks.json قبل أن تتوقع ظهوره.
