import Image from "next/image";
import Link from "next/link";
import { Bell, Menu, PlusCircle, ShieldCheck } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-14 w-64 overflow-hidden md:h-16 md:w-80">
            <Image
              src="/brand/haraj-invest-logo.png"
              alt="حراج انڤست"
              fill
              priority
              className="object-contain object-right"
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-extrabold text-slate-600 md:flex">
          <Link href="/" className="hover:text-[#0B1324]">
            الرئيسية
          </Link>
          <Link href="/projects" className="hover:text-[#0B1324]">
            الفرص
          </Link>
          <Link href="/dashboard/projects/new" className="hover:text-[#0B1324]">
            أضف مشروعك
          </Link>
          <Link href="/dashboard" className="hover:text-[#0B1324]">
            حسابي
          </Link>
          <Link href="/contact" className="hover:text-[#0B1324]">
            تواصل
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            aria-label="الإشعارات"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -left-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#2563EB] px-1 text-xs font-black text-white">
              1
            </span>
          </Link>

          <Link
            href="/login"
            className="rounded-2xl px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-100"
          >
            دخول
          </Link>

          <Link
            href="/dashboard/projects/new"
            className="flex items-center gap-2 rounded-2xl bg-[#0B1324] px-4 py-2 text-sm font-black text-white hover:bg-[#111C33]"
          >
            <PlusCircle className="h-4 w-4" />
            أضف مشروعك
          </Link>

          <div className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-black text-emerald-700">
            <ShieldCheck className="h-4 w-4" />
            موثوق
          </div>
        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 md:hidden">
          <Menu className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
