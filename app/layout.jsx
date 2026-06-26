import './globals.css';
import StructuredData from '../components/StructuredData';
import ServiceWorkerRegister from '../components/ServiceWorkerRegister';
import { Tajawal, Plus_Jakarta_Sans } from 'next/font/google';

const tajawal = Tajawal({
  subsets: ['arabic'],
  weight: ['400', '500', '700', '800', '900'],
  variable: '--font-ar-next',
  display: 'swap'
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  variable: '--font-en-next',
  display: 'swap'
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://haraj-invest.vercel.app';

export const metadata = {
  appleWebApp: {
    capable: true,
    title: 'حراج إنڤست',
    statusBarStyle: 'black-translucent'
  },
  metadataBase: new URL('https://haraj-invest.com'),
  title: {
    default: 'حراج إنڤست — سوق للفرص التجارية والمشاريع',
    template: '%s | حراج إنڤست'
  },
  description: 'حراج إنڤست منصة لتنظيم عرض الفرص التجارية والمشاريع وتسهيل التواصل الأولي بين أصحاب المشاريع والمهتمين.',
  keywords: ['حراج إنڤست', 'فرص تجارية', 'مشاريع', 'استثمار', 'سوق مشاريع', 'بيع مشروع', 'شراكة تجارية'],
  authors: [{ name: 'حراج إنڤست' }],
  creator: 'حراج إنڤست',
  publisher: 'حراج إنڤست',
  applicationName: 'حراج إنڤست',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    images: ['/og-image.jpg'],
    type: 'website',
    locale: 'ar_SA',
    url: 'https://haraj-invest.com',
    siteName: 'حراج إنڤست',
    title: 'حراج إنڤست — سوق للفرص التجارية والمشاريع',
    description: 'منصة لتنظيم عرض الفرص التجارية والمشاريع وتسهيل التواصل الأولي.'
  },
  twitter: {
    images: ['/og-image.jpg'],
    card: 'summary_large_image',
    title: 'حراج إنڤست — سوق للفرص التجارية والمشاريع',
    description: 'منصة لتنظيم عرض الفرص التجارية والمشاريع وتسهيل التواصل الأولي.'
  },
  icons: {
    icon: ['/favicon.svg', '/favicon.png'],
    apple: '/apple-touch-icon.png'
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport = {
  themeColor: '#061527'
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${jakarta.variable}`}>
      <body>
        <a className="skip-link-v50" href="#main-content">تخطي إلى المحتوى</a>
        <StructuredData /><ServiceWorkerRegister />{children}</body>
    </html>
  );
}
