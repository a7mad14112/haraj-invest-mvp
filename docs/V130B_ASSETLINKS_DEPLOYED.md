# V130 (تحديث) — ملف ربط النطاق Digital Asset Links

تم وضع ملف assetlinks.json الصحيح من PWABuilder في:
public/.well-known/assetlinks.json

- package_name: com.haraj_invest.twa
- يحتوي SHA-256 fingerprint من حزمة التوقيع.

## بعد النشر، تأكد أن الملف يظهر على:
https://haraj-invest.com/.well-known/assetlinks.json

## تحذير أمني
ملف signing.keystore وكلمة مروره (في signing-key-info.txt) من حزمة PWABuilder:
احفظهما في مكان آمن جدًا. فقدانهما يمنع تحديث التطبيق على Play نهائيًا.
