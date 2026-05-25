import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#0B1324] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-2 text-2xl font-black">
            حراج انڤست
            <ShieldCheck className="h-5 w-5 text-emerald-300" />
          </div>
          <p className="mt-3 max-w-md text-sm leading-8 text-slate-300">
            Marketplace رقمي حديث وموثوق لعرض المشاريع والفرص التجارية القابلة للبيع أو الشراكة أو الاستثمار.
          </p>
        </div>

        <div>
          <div className="mb-3 font-black">روابط المنصة</div>
          <div className="grid gap-2 text-sm font-bold text-slate-300">
            <Link href="/projects" className="hover:text-white">تصفح الفرص</Link>
            <Link href="/dashboard/projects/new" className="hover:text-white">أضف مشروعك</Link>
            <Link href="/dashboard" className="hover:text-white">لوحة التحكم</Link>
            <Link href="/contact" className="hover:text-white">تواصل معنا</Link>
          </div>
        </div>

        <div>
          <div className="mb-3 font-black">الثقة والامتثال</div>
          <div className="grid gap-2 text-sm font-bold text-slate-300">
            <Link href="/terms" className="hover:text-white">الشروط والأحكام</Link>
            <Link href="/privacy" className="hover:text-white">سياسة الخصوصية</Link>
            <span>© 2026 حراج انڤست</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
