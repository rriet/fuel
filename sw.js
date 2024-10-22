const OFFLINE_VERSION = 1;
const CACHE_NAME = "TechLog";
var urlsToCache = [
    "/",
    "flutter_bootstrap.js",
    "version.json",
    "index.html",
    "main.dart.js",
    "flutter.js",
    "favicon.png",
    "icons/Icon-192.png",
    "icons/Icon-maskable-192.png",
    "icons/Icon-maskable-512.png",
    "icons/Icon-512.png",
    "manifest.json",
    "assets/AssetManifest.json",
    "assets/NOTICES",
    "assets/FontManifest.json",
    "assets/AssetManifest.bin.json",
    "assets/packages/cupertino_icons/assets/CupertinoIcons.ttf",
    "assets/shaders/ink_sparkle.frag",
    "assets/AssetManifest.bin",
    "assets/fonts/MaterialIcons-Regular.otf",
    "canvaskit/skwasm.js",
    "canvaskit/skwasm.js.symbols",
    "canvaskit/canvaskit.js.symbols",
    "canvaskit/skwasm.wasm",
    "canvaskit/chromium/canvaskit.js.symbols",
    "canvaskit/chromium/canvaskit.js",
    "canvaskit/chromium/canvaskit.wasm",
    "canvaskit/canvaskit.js",
    "canvaskit/canvaskit.wasm",
    "canvaskit/skwasm.worker.js"
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
