importScripts("workbox-sw.js");var PROJECT_NAME="balm-ui-pro",PROJECT_VERSION="v0570",CACHE_NAMES=[PROJECT_NAME+"-precache-"+PROJECT_VERSION,PROJECT_NAME+"-runtime-"+PROJECT_VERSION,PROJECT_NAME+"-ga-"+PROJECT_VERSION,"images"];workbox.core.setCacheNameDetails({prefix:PROJECT_NAME,suffix:PROJECT_VERSION,precache:"precache",runtime:"runtime",googleAnalytics:"ga"}),workbox.precaching.precacheAndRoute([{revision:"c018270a8aae9127a0d31badffec3045",url:"css/app.b7ae6e60.css"},{revision:"6737dc36fef1c1287bbed783aac683c2",url:"index.html"},{revision:"da0e89d7e2e4d54a076dec95b928170c",url:"js/app.da0e89d7.js"},{revision:"e93eb33e974eb1de6a5b5a2f857608c0",url:"js/vendor/balm-ui-pro.e93eb33e.js"},{revision:"1933255f08d1039db83010765bf0bc5a",url:"js/vendor/hello.1933255f.js"},{revision:"d6e9eb44a24f1e781164287002302b0c",url:"workbox-sw.js"}]),workbox.routing.registerRoute((function(e){return"script"===e.request.destination||"style"===e.request.destination}),new workbox.strategies.StaleWhileRevalidate),workbox.routing.registerRoute((function(e){return"image"===e.request.destination}),new workbox.strategies.CacheFirst({cacheName:"images",plugins:[new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200]}),new workbox.expiration.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3})]})),workbox.routing.registerRoute(/\.(?:ico)|json|ttf|woff2?$/,new workbox.strategies.StaleWhileRevalidate),workbox.googleAnalytics.initialize(),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if(-1===CACHE_NAMES.indexOf(e))return caches.delete(e)})))})).then((function(){self.clients.claim()})))})),self.addEventListener("message",(function(e){"skipWaiting"===e.data.action&&self.skipWaiting()}));