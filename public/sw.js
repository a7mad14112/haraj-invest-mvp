/* حراج إنڤست — Service Worker (PWA)
   استراتيجية: الشبكة أولًا مع احتياطي offline.
   مناسبة لمنصة ديناميكية: نعرض أحدث البيانات دائمًا، ونرجع لصفحة offline فقط عند انقطاع الشبكة.
*/

const CACHE_VERSION = 'haraj-invest-v1';
const OFFLINE_URL = '/offline.html';

// أصول أساسية نخزّنها مسبقًا حتى تعمل صفحة الـ offline والأيقونات بلا اتصال.
const PRECACHE_ASSETS = [
  OFFLINE_URL,
  '/favicon.png',
  '/favicon.svg',
  '/apple-touch-icon.png'
];

// التثبيت: خزّن الأصول الأساسية.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(PRECACHE_ASSETS))
  );
  self.skipWaiting();
});

// التفعيل: احذف الكاش القديم عند تحديث الإصدار.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// الجلب: الشبكة أولًا. عند فشل طلبات التنقّل (الصفحات) نرجع لصفحة offline.
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // لا نتدخّل إلا في طلبات GET ونفس الأصل.
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // تجاهل طلبات Supabase/الـ API وأي مسار ديناميكي حساس — اتركها للشبكة مباشرة.
  if (url.pathname.startsWith('/api') || url.pathname.startsWith('/admin')) return;

  // طلبات التنقّل (فتح صفحة): شبكة أولًا، ثم offline احتياطيًا.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match(OFFLINE_URL).then((res) => res || new Response('Offline', { status: 503 }))
      )
    );
    return;
  }

  // الأصول الثابتة (صور/خطوط/أيقونات): كاش أولًا للسرعة، ثم الشبكة.
  if (PRECACHE_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request))
    );
  }
});
