importScripts("workbox-sw.js");var PROJECT_NAME="balm-ui-pro",PROJECT_VERSION="v0600",CACHE_NAMES=[PROJECT_NAME+"-precache-"+PROJECT_VERSION,PROJECT_NAME+"-runtime-"+PROJECT_VERSION,PROJECT_NAME+"-ga-"+PROJECT_VERSION,"images"];workbox.core.setCacheNameDetails({prefix:PROJECT_NAME,suffix:PROJECT_VERSION,precache:"precache",runtime:"runtime",googleAnalytics:"ga"}),workbox.precaching.precacheAndRoute([{revision:"574ed5f22531d70197a4784603d27324",url:"css/app.35a08737.css"},{revision:"1b561f5c22d18c67f04e4cb29424404d",url:"index.html"},{revision:"197e70e4c575f678104cfb6744a6d048",url:"js/app.197e70e4.js"},{revision:"9602f3c597b7908b48bce6880abfefd5",url:"js/vendor/balm-ui-pro.9602f3c5.js"},{revision:"3f8c15cbd8dc466c556d5afea8c57a03",url:"js/vendor/hello.3f8c15cb.js"},{revision:"7f18882caf646c8a7c8cd9dbab0bf74a",url:"workbox-sw.js"}]),workbox.routing.registerRoute((function(e){return"script"===e.request.destination||"style"===e.request.destination}),new workbox.strategies.StaleWhileRevalidate),workbox.routing.registerRoute((function(e){return"image"===e.request.destination}),new workbox.strategies.CacheFirst({cacheName:"images",plugins:[new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200]}),new workbox.expiration.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3})]})),workbox.routing.registerRoute(/\.(?:ico)|json|ttf|woff2?$/,new workbox.strategies.StaleWhileRevalidate),workbox.googleAnalytics.initialize(),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if(-1===CACHE_NAMES.indexOf(e))return caches.delete(e)})))})).then((function(){self.clients.claim()})))})),self.addEventListener("message",(function(e){"skipWaiting"===e.data.action&&self.skipWaiting()}));