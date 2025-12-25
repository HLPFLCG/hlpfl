// Service Worker for HLPFL Link-in-Bio
// Version 1.0.0

const CACHE_NAME = 'hlpfl-v1';
const RUNTIME_CACHE = 'hlpfl-runtime-v1';

// Assets to cache on install
const PRECACHE_ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/form.css',
    '/script.js',
    '/logo.svg',
    '/manifest.json'
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Precaching assets');
                return cache.addAll(PRECACHE_ASSETS);
            })
            .then(() => self.skipWaiting())
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames
                    .filter((cacheName) => {
                        return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
                    })
                    .map((cacheName) => {
                        console.log('[Service Worker] Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    })
            );
        }).then(() => self.clients.claim())
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    // Return cached version and update cache in background
                    fetchAndCache(event.request);
                    return cachedResponse;
                }

                // Not in cache, fetch from network
                return fetchAndCache(event.request);
            })
            .catch(() => {
                // Network failed, return offline page if available
                if (event.request.destination === 'document') {
                    return caches.match('/index.html');
                }
            })
    );
});

// Helper function to fetch and cache
function fetchAndCache(request) {
    return fetch(request)
        .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type === 'error') {
                return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the fetched response
            caches.open(RUNTIME_CACHE)
                .then((cache) => {
                    cache.put(request, responseToCache);
                });

            return response;
        });
}

// Handle messages from clients
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Background sync for form submissions (if supported)
self.addEventListener('sync', (event) => {
    if (event.tag === 'sync-form-submissions') {
        event.waitUntil(syncFormSubmissions());
    }
});

async function syncFormSubmissions() {
    // Implement form submission sync logic here
    console.log('[Service Worker] Syncing form submissions...');
}

// Push notification support (for future use)
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New update from HLPFL',
        icon: '/logo.svg',
        badge: '/logo.svg',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };

    event.waitUntil(
        self.registration.showNotification('HLPFL Records', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});

console.log('[Service Worker] Loaded successfully');