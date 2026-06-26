# أمر الرفع من Termux — v9.4

```bash
cd /sdcard/Download || exit 1

ZIP_FILE="v94.zip"

if [ ! -f "$ZIP_FILE" ]; then
  echo "❌ الملف غير موجود في Download: $ZIP_FILE"
  echo "الملفات الموجودة:"
  ls | grep "v94"
  exit 1
fi

rm -rf haraj-upload
unzip -o "$ZIP_FILE" -d haraj-upload

PROJECT_DIR=$(dirname "$(find /sdcard/Download/haraj-upload -name package.json | head -n 1)")

if [ -z "$PROJECT_DIR" ] || [ ! -f "$PROJECT_DIR/package.json" ]; then
  echo "❌ لم يتم العثور على package.json داخل الملف المضغوط"
  exit 1
fi

cd ~ || exit 1
rm -rf haraj-invest-nextjs-final
mkdir haraj-invest-nextjs-final
cp -r "$PROJECT_DIR"/. ~/haraj-invest-nextjs-final/

cd ~/haraj-invest-nextjs-final || exit 1

git init
git config --global --add safe.directory "$(pwd)"
git config user.name "a7mad14112"
git config user.email "ahmad.elshehri2@gmail.com"

git remote remove origin 2>/dev/null
git remote add origin https://github.com/a7mad14112/haraj-invest-mvp.git

git add .
git commit -m "Release v9.4 growth experiments"
git branch -M main
git push -f origin main
```
