import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AdminShell } from "@/components/admin/AdminNav";
import { AdminProjectsClient } from "@/components/admin/AdminProjectsClient";

export default function AdminProjectsPage() {
  return (
    <main>
      <Navbar />
      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-5">
          <h1 className="text-4xl font-black text-[#0B1324]">مراجعة المشاريع</h1>
          <p className="mt-3 text-slate-600">قبول أو رفض أو إغلاق المشاريع المرسلة للمراجعة.</p>
        </div>
      </section>
      <AdminShell>
        <AdminProjectsClient />
      </AdminShell>
      <Footer />
    </main>
  );
}
