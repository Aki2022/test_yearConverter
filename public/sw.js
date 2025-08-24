// Service Worker for 和暦変換アプリ
const CACHE_NAME = 'wareki-converter-v1';
const STATIC_CACHE_URLS = [
  '/',
  '/manifest.json',
  '/_next/static/css/',
  '/_next/static/js/',
];

// インストール時のキャッシュ戦略
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .catch((error) => {
        console.error('[SW] Cache failed:', error);
      })
  );
  // 新しい Service Worker を即座に有効化
  self.skipWaiting();
});

// アクティベーション時の古いキャッシュクリーンアップ
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // 全てのタブで新しい Service Worker を有効化
        return self.clients.claim();
      })
  );
});

// フェッチ時のキャッシュ戦略
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 同じオリジンのリクエストのみキャッシュ対象
  if (url.origin !== location.origin) {
    return;
  }

  // Network First 戦略（動的コンテンツ用）
  if (request.method === 'GET') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // レスポンスが有効な場合のみキャッシュ
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // ネットワークエラー時はキャッシュから返す
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // オフライン用のフォールバックページ
              if (request.mode === 'navigate') {
                return caches.match('/');
              }
              return new Response('オフラインです', {
                status: 503,
                statusText: 'Service Unavailable'
              });
            });
        })
    );
  }
});

// バックグラウンド同期（将来の拡張用）
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);
});

// プッシュ通知（将来の拡張用）
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);
});