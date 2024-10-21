const CACHE_NAME = 'my-app-cache-v1';

// Install the service worker and cache files (if you want to pre-cache specific files)
self.addEventListener('install', (event) => {
  // Optionally pre-cache specific files here if needed
});

// Fetch event to handle all requests
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((response) => {
        // Return cached response if available, otherwise fetch from the network
        return response || fetch(event.request).then((networkResponse) => {
          // Cache the newly fetched resource
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

// Activate the service worker and clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
