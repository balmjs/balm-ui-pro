importScripts("workbox-sw.js");var PROJECT_NAME="balm-ui-pro",PROJECT_VERSION="v0501",CACHE_NAMES=[PROJECT_NAME+"-precache-"+PROJECT_VERSION,PROJECT_NAME+"-runtime-"+PROJECT_VERSION,PROJECT_NAME+"-ga-"+PROJECT_VERSION,"images"];workbox.core.setCacheNameDetails({prefix:PROJECT_NAME,suffix:PROJECT_VERSION,precache:"precache",runtime:"runtime",googleAnalytics:"ga"}),workbox.precaching.precacheAndRoute([{revision:"24209060d898448d169807ad60f51423",url:"css/app.ba9e8188.css"},{revision:"96248ae4b6f8d7893fcc60e3c74193f4",url:"index.html"},{revision:"2de884c02caf0baf1b09bd965f2b7437",url:"js/app.2de884c0.js"},{revision:"51179510ba21e8f1570a5ddc7bea0b79",url:"js/vendor/balm-ui-pro.51179510.js"},{revision:"4a2c6a0e0d673424193b392e38b661ec",url:"js/vendor/hello.4a2c6a0e.js"},{revision:"d6e9eb44a24f1e781164287002302b0c",url:"workbox-sw.js"}]),workbox.routing.registerRoute((function(e){return"script"===e.request.destination||"style"===e.request.destination}),new workbox.strategies.StaleWhileRevalidate),workbox.routing.registerRoute((function(e){return"image"===e.request.destination}),new workbox.strategies.CacheFirst({cacheName:"images",plugins:[new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200]}),new workbox.expiration.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3})]})),workbox.routing.registerRoute(/\.(?:ico)|json|ttf|woff2?$/,new workbox.strategies.StaleWhileRevalidate),workbox.googleAnalytics.initialize(),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if(-1===CACHE_NAMES.indexOf(e))return caches.delete(e)})))})).then((function(){self.clients.claim()})))})),self.addEventListener("message",(function(e){"skipWaiting"===e.data.action&&self.skipWaiting()}));