# V124 — تدقيق الطبقات الميتة في CSS الخاص بالفوتر

## المنهجية
1. استخراج كل الأصناف (classes) التي يستخدمها الفوتر فعليًا من `components/Footer.jsx`.
2. التأكد من عدم استخدام أي صنف فوتر في أي ملف `.jsx`/`.js` آخر (لتفادي الحذف الخاطئ).
3. تصنيف كل قاعدة CSS تخص الفوتر إلى: **حيّة (LIVE)** / **ميتة (DEAD)** / **متجاوَزة لكن غير ضارة (SUPERSEDED)**.

## الأصناف الحيّة (مستخدمة فعلًا في DOM)
`site-footer`, `footer-v85`, `footer-top`, `footer-top-v85`, `footer-brand`, `footer-brand-v63`,
`footer-brand-inner-v63`, `footer-trust-box-v85`, `footer-nav-horizontal`, `footer-nav-v85`,
`footer-link-group-v85`, `footer-link-row`, `footer-link-row-v85`, `footer-bottom`, `footer-bottom-v85`,
`logo-v65`, `logo-image-v65` (من مكوّن Logo داخل الفوتر).

## الأصناف الميتة (لا تظهر في أي عنصر — مرشّحة للحذف)
| الصنف | السبب |
|------|------|
| `.footer` (المجرّد) | لا يُستخدم كصنف مستقل إطلاقًا |
| `.footer-actions` | أُزيلت أزرار CTA من الفوتر |
| `.footer-cta` | صندوق CTA القديم لم يعد موجودًا |
| `.footer-grid` | استُبدل بـ `footer-nav-v85` |
| `.footer-links` | استُبدل بـ `footer-link-row-v85` |
| `.footer-logo-mark` | استُبدل بصورة الشعار `logo-image-v65` |
| `.footer-nav-group` | استُبدل بـ `footer-link-group-v85` |
| `.footer-nav-group h3` | تبع للصنف الميت أعلاه |

## ما تمّ حذفه فعليًا
- قواعد تستهدف **حصريًا** أصنافًا ميتة (مثل `.footer-cta`, `.footer-logo-mark`, `.footer-grid`, `.footer-links`, `.footer-nav-group`, `.footer-actions` بمفردها، و`.footer` المجرّد).
- أُزيلت أجزاء الأصناف الميتة من القوائم المشتركة متعددة المحددات (مع الإبقاء على بقية المحدد الحيّ سليمًا)، مثل إزالة `.footer-actions` من قاعدة الطباعة `@media print` ومن قاعدة `.hero-actions,...`.
- القاعدة `.site-footer .footer-grid{display:none}` (كانت تُخفي شبكة قديمة) — حُذفت لأن الصنف لم يعد موجودًا.

## ما تُرك عمدًا (متجاوَز لكن غير ضار)
- قواعد الأصناف الأساسية الحيّة `.footer-top` / `.footer-brand` / `.footer-bottom` / `.footer-nav-horizontal` / `.footer-link-row`: هذه الأصناف ما زالت موجودة على عناصر حيّة (مدمجة مع أصناف `-v85`)، وتنسيقاتها يتجاوزها بالكامل بلوك v85 + v122. حذف تنسيقاتها تجميلي وعالي المخاطرة (قد يكسر السلوك الاحتياطي للشبكة)، لذا أُبقيت.
- أجزاء `.footer-link-row a` داخل القوائم المشتركة الضخمة (مثل قاعدة `font-weight` و`will-change`): صارت بلا أثر على الفوتر بعد تجاوز v122، لكن إزالتها من محددات مشتركة بطول 8–10 أصناف عالية المخاطرة مقابل فائدة شبه معدومة — أُبقيت.

## النتيجة
- لم يتغيّر الشكل النهائي للفوتر إطلاقًا (الحذف اقتصر على قواعد ميتة لا تؤثر على DOM الحالي).
- تم التحقق من توازن الأقواس `{ }` قبل وبعد التعديل.
