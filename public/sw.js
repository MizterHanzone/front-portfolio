// Service Worker for Han Portfolio PWA (arom-menu style)
const CACHE_NAME = 'han-portfolio-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icons/fox.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200) {
            return caches.match('/index.html') || caches.match('/');
          }
          return response;
        })
        .catch(() => caches.match('/index.html') || caches.match('/'))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (
          !response ||
          response.status !== 200 ||
          response.type !== 'basic'
        ) {
          return response;
        }
        const url = new URL(event.request.url);
        if (url.origin !== location.origin) return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        return response;
      });
    })
  );
});
