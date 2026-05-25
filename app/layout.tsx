import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "حراج انڤست | منصة رقمية للفرص التجارية والاستثمارية",
  description:
    "Marketplace رقمي حديث وموثوق لعرض المشاريع والفرص التجارية القابلة للبيع أو الشراكة أو الاستثمار في السعودية.",
  keywords: [
    "حراج انڤست",
    "بيع مشروع",
    "شراء مشروع قائم",
    "فرص استثمارية",
    "شراكة تجارية",
    "مشاريع للبيع",
    "استثمار في السعودية",
  ],
  openGraph: {
    title: "حراج انڤست",
    description: "منصة رقمية للفرص التجارية والاستثمارية.",
    type: "website",
    locale: "ar_SA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="bg-[#F6F8FB] text-slate-950 antialiased">{children}</body>
    </html>
  );
}
