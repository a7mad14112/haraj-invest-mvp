# دليل: نشر حراج إنڤست على Play Store عبر Bubblewrap

## قبل أن تبدأ — تأكد من:
- [ ] نشر إصدار v128 (PWA) على Vercel ويعمل على https://haraj-invest.com
- [ ] الموقع على HTTPS (Vercel يوفّره)
- [ ] حساب مطوّر Google Play مفعّل (رسوم 25$ مرة واحدة)

---

## الجزء 1: إعداد Termux

```bash
# تحديث الحزم
pkg update && pkg upgrade -y

# تثبيت Node.js و Java (OpenJDK 17)
pkg install nodejs openjdk-17 -y

# تأكد من التثبيت
node --version
java -version
```

---

## الجزء 2: تثبيت Bubblewrap

```bash
# ملاحظة: بدون sudo إطلاقًا
npm install -g @bubblewrap/cli
```

إن واجهت مشكلة صلاحيات، اضبط مجلد npm العام:
```bash
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
npm install -g @bubblewrap/cli
```

---

## الجزء 3: تهيئة المشروع

```bash
# أنشئ مجلدًا جديدًا للتطبيق
mkdir ~/haraj-twa && cd ~/haraj-twa

# هيّئ المشروع من manifest موقعك
bubblewrap init --manifest https://haraj-invest.com/manifest.webmanifest
```

**مهم جدًا:** في أول تشغيل، سيسألك Bubblewrap:
- هل تريد تنزيل JDK و Android SDK تلقائيًا؟ → **اختر نعم (Yes)**. دعه يثبّتها — هذا أضمن من اليدوي.

ثم سيسألك سلسلة أسئلة، أهمها:
- **Domain**: haraj-invest.com
- **Application name**: حراج إنڤست
- **Short name**: حراج إنڤست
- **Application ID (package)**: `com.harajinvest.app` (مهم: احفظه، يجب أن يطابق ملف assetlinks.json)
- **Display mode**: standalone
- **Status bar color**: #061527
- **Signing key**: اختر إنشاء مفتاح جديد (Create new). **احفظ ملف المفتاح وكلمة مروره في مكان آمن — فقدانه يمنعك من تحديث التطبيق مستقبلًا.**

---

## الجزء 4: البناء

```bash
bubblewrap build
```

الناتج:
- `app-release-signed.apk` — للتجربة على جهاز أندرويد.
- `app-release-bundle.aab` — هذا ما ترفعه إلى Play Store.

كما سيظهر لك **SHA-256 fingerprint** — انسخه، ستحتاجه في الجزء التالي.

لمعرفة الـ fingerprint لاحقًا:
```bash
keytool -list -v -keystore android.keystore -alias android
```

---

## الجزء 5: ربط النطاق (Digital Asset Links) — خطوة حرجة

بدون هذه الخطوة، سيظهر شريط عنوان المتصفح داخل التطبيق (لن يبدو تطبيقًا أصليًا).

1. في مشروع Next.js، الملف جاهز في:
   `public/.well-known/assetlinks.json`

2. افتحه واستبدل:
   - `REPLACE_WITH_YOUR_SHA256_FINGERPRINT` بالـ fingerprint من الجزء 4.
   - تأكد أن `package_name` = `com.harajinvest.app` (نفس ما أدخلته في init).

3. انشر الموقع على Vercel مجددًا.

4. تأكد أن الملف متاح على:
   `https://haraj-invest.com/.well-known/assetlinks.json`

---

## الجزء 6: الرفع إلى Play Console

1. play.google.com/console → All apps → Create app.
2. املأ بيانات التطبيق (الاسم، الوصف، الفئة، الأيقونة، لقطات الشاشة).
3. ارفع ملف `app-release-bundle.aab`.
4. ابدأ بمسار **Internal testing** أولًا (اختبار داخلي) قبل النشر العام.
5. أضف نفسك كمختبِر، ثبّت التطبيق، وتأكد أنه يفتح بلا شريط متصفح.
6. بعد التأكد → انشر للإنتاج (Production).

---

## بديل أسهل إن تعثّر Termux: حاوية Docker

إن واجهت مشاكل في Termux مع JDK/SDK، يوفّر Bubblewrap صورة Docker جاهزة بكل التبعيات:
```bash
docker run --rm -ti ghcr.io/googlechromelabs/bubblewrap:latest [command]
```
(يحتاج جهازًا يدعم Docker — كمبيوتر، وليس الجوال.)

---

## ملاحظات مهمة
- احتفظ بنسخة احتياطية من ملف المفتاح (keystore) وكلمة مروره. فقدانه = لا تستطيع تحديث التطبيق إطلاقًا.
- معرّف الحزمة (com.harajinvest.app) ثابت — لا يمكن تغييره بعد النشر.
- لتحديث التطبيق مستقبلًا: عدّل، ثم `bubblewrap update` و `bubblewrap build` بنفس المفتاح.
