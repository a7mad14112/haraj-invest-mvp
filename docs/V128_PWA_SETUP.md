# V128 — تحويل الموقع إلى PWA (تطبيق ويب قابل للتثبيت)

## ما تم
1. حذف ملف manifest مكرر (public/site.webmanifest) — الإبقاء على app/manifest.js فقط (الطريقة الصحيحة في Next 16).
2. إضافة Service Worker يدوي خفيف (public/sw.js):
   - استراتيجية "الشبكة أولًا" للصفحات (بيانات حديثة دائمًا).
   - صفحة offline احتياطية (public/offline.html) بهوية حراج إنڤست.
   - تجاهل مسارات /api و /admin (تُترك للشبكة).
   - يُفعّل في الإنتاج فقط.
3. مكوّن تسجيل الـ SW (components/ServiceWorkerRegister.jsx) — مضاف إلى layout، يسجّل في الإنتاج فقط.
4. أيقونات PWA صحيحة:
   - icon-192 / icon-512 (purpose: any)
   - icon-maskable-192 / icon-maskable-512 (purpose: maskable, بهامش آمن حتى لا يُقص التصميم على أندرويد)
5. توحيد themeColor على #061527 (الكحلي) في viewport والـ manifest.

## كيف تختبرها بعد النشر على Vercel
1. انشر هذا الإصدار. الـ SW يعمل في الإنتاج فقط (ليس على localhost dev).
2. افتح الموقع على Chrome (أندرويد) → قائمة المتصفح → ستجد "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية".
3. على iPhone (Safari) → زر المشاركة → "إضافة إلى الشاشة الرئيسية".
4. بعد التثبيت: يفتح بملء الشاشة بلا شريط عنوان، بأيقونة حراج إنڤست.

## التحقق من الجودة (اختياري)
- على كمبيوتر: Chrome DevTools → Application → Manifest و Service Workers للتأكد من عدم وجود أخطاء.
- Lighthouse → قسم PWA يجب أن يمر (installable).

## ملاحظات
- شرط أساسي: الموقع على HTTPS (Vercel يوفّره تلقائيًا) — وإلا لا يعمل الـ SW.
- شاشة التثبيت تظهر تلقائيًا في Chrome عند توفّر: manifest صحيح + SW مسجّل + HTTPS.
- لتفعيل إشعارات Push لاحقًا، نبني فوق هذا الأساس (يحتاج VAPID keys).
