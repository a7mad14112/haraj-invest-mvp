'use client';

import { useEffect } from 'react';

// يسجّل الـ Service Worker في الإنتاج فقط (لتفادي التخزين المؤقت أثناء التطوير).
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch(() => {
          // فشل التسجيل لا يجب أن يكسر الموقع — نتجاهله بصمت.
        });
    };

    // نسجّل بعد التحميل حتى لا نزاحم تحميل الصفحة.
    if (document.readyState === 'complete') {
      register();
    } else {
      window.addEventListener('load', register);
      return () => window.removeEventListener('load', register);
    }
  }, []);

  return null;
}
