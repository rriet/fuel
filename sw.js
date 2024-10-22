const OFFLINE_VERSION = 1;
const CACHE_NAME = "TechLog";
var urlsToCache = [
    "/fuel/",
    "/fuel/flutter_bootstrap.js",
    "/fuel/version.json",
    "/fuel/index.html",
    "/fuel/main.dart.js",
    "/fuel/flutter.js",
    "/fuel/favicon.png",
    "/fuel/icons/Icon-192.png",
    "/fuel/icons/Icon-maskable-192.png",
    "/fuel/icons/Icon-maskable-512.png",
    "/fuel/icons/Icon-512.png",
    "/fuel/manifest.json",
    "/fuel/assets/AssetManifest.json",
    "/fuel/assets/NOTICES",
    "/fuel/assets/FontManifest.json",
    "/fuel/assets/AssetManifest.bin.json",
    "/fuel/assets/packages/cupertino_icons/assets/CupertinoIcons.ttf",
    "/fuel/assets/shaders/ink_sparkle.frag",
    "/fuel/assets/AssetManifest.bin",
    "/fuel/assets/fonts/MaterialIcons-Regular.otf",
    "/fuel/canvaskit/skwasm.js",
    "/fuel/canvaskit/skwasm.js.symbols",
    "/fuel/canvaskit/canvaskit.js.symbols",
    "/fuel/canvaskit/skwasm.wasm",
    "/fuel/canvaskit/chromium/canvaskit.js.symbols",
    "/fuel/canvaskit/chromium/canvaskit.js",
    "/fuel/canvaskit/chromium/canvaskit.wasm",
    "/fuel/canvaskit/canvaskit.js",
    "/fuel/canvaskit/canvaskit.wasm",
    "/fuel/canvaskit/skwasm.worker.js"
];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(async function() {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match(event.request);
    const networkResponsePromise = fetch(event.request);

    event.waitUntil(async function() {
      const networkResponse = await networkResponsePromise;
      await cache.put(event.request, networkResponse.clone());
    }());

    // Returned the cached response if we have one, otherwise return the network response.
    return cachedResponse || networkResponsePromise;
  }());
});
