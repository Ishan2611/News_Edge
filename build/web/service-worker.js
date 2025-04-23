//service-worker.js
const CACHE_NAME = 'news-app-cache-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
  '/main.dart.js',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
  return self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) {
        console.log('[Service Worker] Serving from cache:', event.request.url);
        return cached;
      }

      return fetch(event.request)
        .then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            console.log('[Service Worker] Fetched and cached:', event.request.url);
            return response;
          });
        })
        .catch(() => {
          console.log('[Service Worker] Fetch failed, serving offline page.');
          return caches.match('/offline.html');
        });
    })
  );
});

// 🔄 Sync event
self.addEventListener('sync', event => {
  console.log('[Service Worker] Sync event fired with tag:', event.tag);
  if (event.tag === 'sync-news') {
    event.waitUntil(sendQueuedArticles());
  }
});

// 📨 Push event
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    if (data.method === 'pushMessage') {
      const options = {
        body: data.message,
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-192x192.png'
      };
      event.waitUntil(
        self.registration.showNotification("News App", options)
      );
    }
  }
});

function sendQueuedArticles() {
  return Promise.resolve(console.log("✅ Background sync triggered: sending queued articles."));
}
