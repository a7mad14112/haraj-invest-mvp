"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase-browser";

export function AuthForm({ type }: { type: "login" | "register" }) {
  const router = useRouter();
  const isRegister = type === "register";
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isSupabaseConfigured()) {
      setStatus("error");
      setMessage("لم يتم ضبط متغيرات Supabase بعد. أضف NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY في Vercel.");
      return;
    }

    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    setStatus("loading");
    setMessage("");

    if (isRegister) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setStatus("error");
        setMessage(error.message);
        return;
      }

      setStatus("success");
      setMessage("تم إنشاء الحساب. إذا كان تأكيد البريد مفعّلًا، راجع بريدك الإلكتروني. يمكنك بعدها تسجيل الدخول.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("success");
    setMessage("تم تسجيل الدخول بنجاح.");
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-16">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black tracking-tight text-[#0B1324]">
          {isRegister ? "إنشاء حساب" : "تسجيل الدخول"}
        </h1>
        <p className="mt-3 leading-7 text-slate-600">
          {isRegister ? "أنشئ حسابك لإضافة مشروع أو إرسال طلب اهتمام." : "ادخل إلى حسابك لإدارة مشاريعك وطلباتك."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5">
          {isRegister && (
            <div>
              <label className="mb-2 block text-sm font-black">الاسم الكامل</label>
              <input
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-[#0B1324] focus:bg-white"
                placeholder="اكتب اسمك الكامل"
                required
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-black">البريد الإلكتروني</label>
            <input
              type="email"
              dir="ltr"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left outline-none focus:border-[#0B1324] focus:bg-white"
              placeholder="name@example.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-black">كلمة المرور</label>
            <input
              type="password"
              dir="ltr"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-left outline-none focus:border-[#0B1324] focus:bg-white"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          {message && (
            <div
              className={`rounded-2xl p-4 text-sm font-bold leading-7 ${
                status === "error"
                  ? "border border-red-200 bg-red-50 text-red-700"
                  : "border border-emerald-200 bg-emerald-50 text-emerald-700"
              }`}
            >
              {message}
            </div>
          )}

          <button
            disabled={status === "loading"}
            className="rounded-2xl bg-[#0B1324] px-5 py-4 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "جاري المعالجة..." : isRegister ? "إنشاء الحساب" : "تسجيل الدخول"}
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-slate-600">
          {isRegister ? "لديك حساب بالفعل؟ " : "ليس لديك حساب؟ "}
          <Link href={isRegister ? "/login" : "/register"} className="font-black text-[#0B1324] hover:underline">
            {isRegister ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </Link>
        </div>
      </form>
    </div>
  );
}
