const CACHE_VERSION = 'ecopowerhub-ai-v122.1';
const CACHE_NAME = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const IMAGE_CACHE = `${CACHE_VERSION}-images`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/generated/ecopowerhub-ai-logo-transparent.dim_200x200.png',
  '/assets/generated/pwa-energy-app-icon-transparent.dim_200x200.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing version:', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating version:', CACHE_VERSION);
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName.startsWith('ecopowerhub-ai-') && 
                     cacheName !== CACHE_NAME && 
                     cacheName !== RUNTIME_CACHE &&
                     cacheName !== IMAGE_CACHE;
            })
            .map((cacheName) => {
              console.log('[Service Worker] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - cache-first for images, network-first for others
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Determine if this is an image request
  const isImage = /\.(png|jpg|jpeg|svg|webp|gif)$/i.test(url.pathname) || 
                  url.pathname.includes('/generated/');

  if (isImage) {
    // Cache-first strategy for images to prevent flicker
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            console.log('[Service Worker] Serving image from cache:', request.url);
            return cachedResponse;
          }

          // Not in cache, fetch from network
          return fetch(request)
            .then((response) => {
              // Clone the response before caching
              const responseToCache = response.clone();
              
              // Cache successful responses
              if (response.status === 200) {
                caches.open(IMAGE_CACHE)
                  .then((cache) => {
                    cache.put(request, responseToCache);
                  });
              }
              
              return response;
            })
            .catch(() => {
              // Network failed, return a placeholder or error
              return new Response('Image not available', {
                status: 404,
                statusText: 'Not Found',
                headers: new Headers({
                  'Content-Type': 'text/plain'
                })
              });
            });
        })
    );
  } else {
    // Network-first strategy for non-image resources
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response before caching
          const responseToCache = response.clone();
          
          // Cache successful responses
          if (response.status === 200) {
            caches.open(RUNTIME_CACHE)
              .then((cache) => {
                cache.put(request, responseToCache);
              });
          }
          
          return response;
        })
        .catch(() => {
          // Network failed, try cache
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                console.log('[Service Worker] Serving from cache:', request.url);
                return cachedResponse;
              }
              
              // If not in cache and it's a navigation request, return index.html
              if (request.mode === 'navigate') {
                return caches.match('/index.html');
              }
              
              // Otherwise return a basic offline response
              return new Response('Offline - content not available', {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'text/plain'
                })
              });
            });
        })
    );
  }
});

// Message event - handle skip waiting
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[Service Worker] Skip waiting requested');
    self.skipWaiting();
  }
});
