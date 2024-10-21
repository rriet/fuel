self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          // Return the cached response if it exists
          if (response) {
            return response;
          }
          // Otherwise, fetch the resource from the network
          return fetch(event.request).then((networkResponse) => {
            // Cache the new resource
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
              return networkResponse;
            });
          });
        })
    );
});
  