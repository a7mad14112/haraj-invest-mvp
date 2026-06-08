export default function manifest() {
  return {
    name: 'حراج إنڤست',
    short_name: 'حراج إنڤست',
    description: 'منصة لتنظيم عرض الفرص التجارية والمشاريع وتسهيل التواصل الأولي.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    dir: 'rtl',
    lang: 'ar',
    background_color: '#061527',
    theme_color: '#061527',
    categories: ['business', 'finance', 'productivity'],
    icons: [
      {
        src: '/favicon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable'
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ],
    shortcuts: [
      {
        name: 'تصفح الفرص',
        short_name: 'الفرص',
        description: 'استعرض الفرص التجارية',
        url: '/marketplace',
        icons: [{ src: '/favicon.png', sizes: '512x512' }]
      },
      {
        name: 'أضف مشروعك',
        short_name: 'أضف',
        description: 'أضف مشروعك للعرض',
        url: '/submit-project',
        icons: [{ src: '/favicon.png', sizes: '512x512' }]
      },
      {
        name: 'أرسل اهتمامك',
        short_name: 'اهتمام',
        description: 'أرسل طلب اهتمام',
        url: '/contact',
        icons: [{ src: '/favicon.png', sizes: '512x512' }]
      }
    ]
  };
}
