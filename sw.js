importScripts("workbox-sw.js");var PROJECT_NAME="balm-ui-pro",PROJECT_VERSION="v0231",CACHE_NAMES=[PROJECT_NAME+"-precache-"+PROJECT_VERSION,PROJECT_NAME+"-runtime-"+PROJECT_VERSION,PROJECT_NAME+"-ga-"+PROJECT_VERSION,"images"];workbox.core.setCacheNameDetails({prefix:PROJECT_NAME,suffix:PROJECT_VERSION,precache:"precache",runtime:"runtime",googleAnalytics:"ga"}),workbox.precaching.precacheAndRoute([{revision:"39fd36a50719c80e561193e69cb59a10",url:"css/app.8a2295a6.css"},{revision:"cb159a00459498b9e8d0ffe3ba6e4b66",url:"index.html"},{revision:"b60482dc6ae73c88321b670125de31c5",url:"js/app.9fe6ce72.js"},{revision:"18d9d1aaaf1910c45bf5fab0e17988d8",url:"js/chunk/1027.82ab06e4.js"},{revision:"bb17462546b3ba8d6c0880695191c3bc",url:"js/chunk/1181.31526cfd.js"},{revision:"45ee92452d5c2c8aa86098184e8c4506",url:"js/chunk/1379.ca3dab63.js"},{revision:"48194ad735568d2854f79163fb5b796b",url:"js/chunk/1388.3a9daf12.js"},{revision:"10ca4ae9a9e4a4824baddcd59f86e1d8",url:"js/chunk/17.365ab47c.js"},{revision:"10674479a8668755bcf19bfff05161ce",url:"js/chunk/1770.39dac724.js"},{revision:"8081d1a02717f604f35d7dfb8f77fa9d",url:"js/chunk/1839.b46e94da.js"},{revision:"2b3cd47199372117c24bc48857feb658",url:"js/chunk/1877.9aff32f9.js"},{revision:"a5880f290cbd61ccc097cab42378db39",url:"js/chunk/1883.1a2d7408.js"},{revision:"369e7a2ab8f4c9cef165164a2eb47bee",url:"js/chunk/2005.0b7987ce.js"},{revision:"392081bf8facbba31e8bfff988e1b893",url:"js/chunk/2039.04897d07.js"},{revision:"3c3f613b82b8f2f73ef844cd8664b3ea",url:"js/chunk/2192.574c9785.js"},{revision:"decc4289ac272b616cf9bc19547cc692",url:"js/chunk/2203.f7c8b6d4.js"},{revision:"5520dadb6eff3c05c30266c55c069576",url:"js/chunk/2274.814b5523.js"},{revision:"8c7450c30b87d13b666b46f162aa4846",url:"js/chunk/2476.e27b7f37.js"},{revision:"9eb134f54b47391ef7af31715a7cc9b5",url:"js/chunk/2486.9c4c9bc6.js"},{revision:"3baec4cf1979ee2f75ea5ba31e46e0b1",url:"js/chunk/2507.a83ddb21.js"},{revision:"b77d12ad8fad1970596b41f7927e8904",url:"js/chunk/2947.1c4a3497.js"},{revision:"c3d5566ddc0027df7be6709a27c7e4d5",url:"js/chunk/3000.f1d80986.js"},{revision:"0487adca0820ec854372467e9a2db086",url:"js/chunk/309.7820239b.js"},{revision:"4cdebf5998e076531979ba08aa30ec4b",url:"js/chunk/3095.9d6385b7.js"},{revision:"07df474af9d0025c1e306206589ec435",url:"js/chunk/3125.59a6ef7d.js"},{revision:"c26ada658c0d9cb00ff2b23618061219",url:"js/chunk/3139.6471c452.js"},{revision:"a5fa384ac031c4d7247683e0bf63362e",url:"js/chunk/3155.281452f5.js"},{revision:"50b71350fa01e3a446f1dd3f25ce8a40",url:"js/chunk/3266.51c4cb75.js"},{revision:"4da50de6691dd6d17fda11a209cba261",url:"js/chunk/3372.1613ae60.js"},{revision:"020415fa485511724f60c3cdbb4e608c",url:"js/chunk/3470.9bb6bf9c.js"},{revision:"543d8f2fa1b458b772fef64a20c29800",url:"js/chunk/3520.c5c9cc1c.js"},{revision:"259fc4b2eaf73064f6fe94aedb56dcc8",url:"js/chunk/361.24bec0c1.js"},{revision:"681b81b9d985521fecee6d1cf2d53a3f",url:"js/chunk/3640.2528f639.js"},{revision:"b5b68fd9e17230d4a89024528239f29a",url:"js/chunk/3641.d22c2cd3.js"},{revision:"04cdc0b9cef9f19a726ad6a0f8d9c90c",url:"js/chunk/3764.f886a4ac.js"},{revision:"9fefac2b34e763cb245aea17636415e1",url:"js/chunk/3814.52616db0.js"},{revision:"2a737e0b78a6d41101d02ef6e0052628",url:"js/chunk/3934.733eec1b.js"},{revision:"0c8a28948774bd93892b1f7e7d8a5fb3",url:"js/chunk/3944.4b2c184b.js"},{revision:"4d1bebee46d7b1ee4766980cb6a84564",url:"js/chunk/3972.274b72a1.js"},{revision:"dd732b08e085b13a7927ee8cc6899050",url:"js/chunk/4019.bbfb7ebb.js"},{revision:"cb424a6e1b083501e0174ab6de8b5635",url:"js/chunk/4048.de7cad63.js"},{revision:"d643fd8f5c318564d06945217d5f21de",url:"js/chunk/4123.b7942f3e.js"},{revision:"b1782b376db6f7751a949dad2509a853",url:"js/chunk/4131.73ba09dc.js"},{revision:"6bf882e378e96f2f57c708108e63781e",url:"js/chunk/4200.8b6eee3b.js"},{revision:"1a7495931bfa988a0de846113f5366bd",url:"js/chunk/4202.497b3f85.js"},{revision:"40e26ca5334fed62ea1d2eb939b59999",url:"js/chunk/445.73bd02bc.js"},{revision:"98393070515b18dc1e767a972fd7925a",url:"js/chunk/4659.11786763.js"},{revision:"911c28622ec411fa54a71ed4c55da2e6",url:"js/chunk/4699.1fbca4b9.js"},{revision:"96c0a6e0a7d41feee01c854162ff1d30",url:"js/chunk/4722.41a8c566.js"},{revision:"14c4269b21c5f5405a7c84f2acf8b84e",url:"js/chunk/4886.7749bb34.js"},{revision:"9bf50b2d9cf6c73ab1862828c8b90fd3",url:"js/chunk/4944.a6d0621a.js"},{revision:"de6e7c6806cf551516aa33594a3e199d",url:"js/chunk/5051.3a6ac94e.js"},{revision:"a3636023e33504c3eea8287152be668f",url:"js/chunk/5145.e2f57a22.js"},{revision:"505770d4230ab359731b89e7028f0cda",url:"js/chunk/5166.5aefd828.js"},{revision:"a401a53f94b8d4ff56479b5cf398aa8e",url:"js/chunk/5211.f20d84cc.js"},{revision:"0e4a4300d0c68681e3ef9299429d7186",url:"js/chunk/5381.1d83ded4.js"},{revision:"5752a49175a428c45080336b923293ca",url:"js/chunk/5453.b510f826.js"},{revision:"6ffebf9861e44b166f5f2ef232caebdd",url:"js/chunk/5519.0c2f682e.js"},{revision:"a2591f9e594843a1ceeec10441732a51",url:"js/chunk/5672.d30312a0.js"},{revision:"c3a57ea7349e387599be4d6a5569144c",url:"js/chunk/5707.668afd49.js"},{revision:"a5158d4ee79033df56dbe9167bd8d4f0",url:"js/chunk/5719.801d9f22.js"},{revision:"90f4e16ae2bfc6fd13c23177b0160f83",url:"js/chunk/5838.68a4fb65.js"},{revision:"a0e0dd4994c8d99453ddb7030d438065",url:"js/chunk/5890.82f264c2.js"},{revision:"a4eae5c6e51d2227fd8e399fb85a40f9",url:"js/chunk/5921.d5fcdd70.js"},{revision:"2db8ed76f7c27d452fe5fcc69aacb0f1",url:"js/chunk/5935.43114cac.js"},{revision:"945a96886a650087849fab1d9a37bdc8",url:"js/chunk/5950.95fdde44.js"},{revision:"a21003cb65f33f624a641558280e7af3",url:"js/chunk/5951.9fa6c582.js"},{revision:"871817fd3fb6594df4bce32cc01eeac2",url:"js/chunk/6005.e2c8fb45.js"},{revision:"052fe6e7aa9725f57840b188855da5bf",url:"js/chunk/6018.a4f6a2bb.js"},{revision:"afb2b4cde9f9a0f0637ffec07f6188bf",url:"js/chunk/6253.4bf7c95e.js"},{revision:"5624fba754814f1f4dc10048e86d99bd",url:"js/chunk/6279.00c20704.js"},{revision:"b9f52e4a6e10a52c45eca74332563d76",url:"js/chunk/6507.aa64ec1a.js"},{revision:"80ed6496d02b7b4a1bb3672d316ab753",url:"js/chunk/6513.fa36dc38.js"},{revision:"7a5c8e372b64241f6ffd08aefcb7e0fd",url:"js/chunk/6718.1eeb34dc.js"},{revision:"86f83732bc7da437f3bff93ff9747565",url:"js/chunk/6761.f4b81877.js"},{revision:"8ed786a6f7e5801a3a923de0183f4bc1",url:"js/chunk/6907.e2f558d4.js"},{revision:"22fa5f4d362e1853daf334798b2f3cb6",url:"js/chunk/697.7cd146c1.js"},{revision:"a0f8041833e5696919ee6ed0d66362d3",url:"js/chunk/7055.b59d1bec.js"},{revision:"3b5b526e8872b6900bcfaccde736bd33",url:"js/chunk/7121.741958d5.js"},{revision:"dff35963e342658f21a83e3edc80e851",url:"js/chunk/7238.53927043.js"},{revision:"255131a6f8af8c1024337cb53f022b6f",url:"js/chunk/7322.05c600a6.js"},{revision:"8c71fe96107e17e6bba164cd2752397e",url:"js/chunk/7410.79c1098a.js"},{revision:"afb407da817f4a093a7a221e805c485b",url:"js/chunk/7432.587c68ea.js"},{revision:"d114912e9fbdfc9caca000388662efe8",url:"js/chunk/7503.4d2ddce0.js"},{revision:"686be3f0ba664a8fbb1c5c4d2c8a321c",url:"js/chunk/7567.9d91dcea.js"},{revision:"62624de15ccf7036ca7283ec31a8969b",url:"js/chunk/7586.51529616.js"},{revision:"384265f72836659c2da33f83a612e060",url:"js/chunk/7641.61bf90d7.js"},{revision:"bd993566b282469caa063384681a528e",url:"js/chunk/7669.8e1afd5d.js"},{revision:"c74bcd6e223b40c1ea2647781dd3f4a6",url:"js/chunk/767.d2f9097d.js"},{revision:"cec6daca59fd63923c636949747569d5",url:"js/chunk/7674.8e46fd5b.js"},{revision:"e257df0f4feafd65a6377feea58897b5",url:"js/chunk/8236.eeeb9802.js"},{revision:"8563b56eb56755b134eed78dd7db89e7",url:"js/chunk/8241.f5a5b219.js"},{revision:"8386ae4a1f9a16f579ba88d1c7fffd5c",url:"js/chunk/8253.da3c3a29.js"},{revision:"b424bc8d61f4da0a3c9359c94f01b9e0",url:"js/chunk/8273.de1ffdd5.js"},{revision:"cae296d8c82d155b6e29aaa52ab6776d",url:"js/chunk/829.9a50c930.js"},{revision:"c472d22a4ce0299f102c28e544e2451a",url:"js/chunk/8388.5a21ff4f.js"},{revision:"ca1664e99201a1dd0f514c0ec18f9853",url:"js/chunk/8513.98a4dd23.js"},{revision:"1df10d9a9eb6d7976f2608e8bb5e2d50",url:"js/chunk/852.d19ec644.js"},{revision:"b3f482ba8964e219895d674c7cb59aa1",url:"js/chunk/8632.a91fbc3b.js"},{revision:"ba9be0fec7db70f99201b02a82d17be0",url:"js/chunk/8661.ec5b903d.js"},{revision:"99b8ce7a7b2fb879d8ff63b10f96133d",url:"js/chunk/8715.82dcce59.js"},{revision:"742e2437a59dc0e301474ca12071a7b3",url:"js/chunk/8920.b5448a38.js"},{revision:"e07b01aaccb05a842c7e1fde0f1e2bc9",url:"js/chunk/9002.16297d39.js"},{revision:"d459c8c8f1c0d907743cd89ae58fbbc5",url:"js/chunk/9011.12ca065e.js"},{revision:"775f513d028da4fdb15d91942e3bdb57",url:"js/chunk/9106.8fd68193.js"},{revision:"43acaaa7bfd9f0be22b3820f038a51d7",url:"js/chunk/9232.d007d7ba.js"},{revision:"fe3ea7f117e1736c7a2175bd943ebbd3",url:"js/chunk/9454.f316ddb2.js"},{revision:"f40cbfd285f06e8d9b5eec7dca819ac4",url:"js/chunk/9750.d9870aa6.js"},{revision:"071c941cad3a99562821b6e88fb625c1",url:"js/chunk/9759.a541af6a.js"},{revision:"7e09ac7fd46a1b9a01ec2bfe094e7803",url:"js/chunk/9913.7b47c0b5.js"},{revision:"cccdbcf02964620f70f0f914d13b200f",url:"js/chunk/9930.9b152a60.js"},{revision:"d10350a917da08678caa7883f2139e64",url:"js/chunk/9978.a3f47900.js"},{revision:"d6e9eb44a24f1e781164287002302b0c",url:"workbox-sw.js"}]),workbox.routing.registerRoute((function(e){return"script"===e.request.destination||"style"===e.request.destination}),new workbox.strategies.StaleWhileRevalidate),workbox.routing.registerRoute((function(e){return"image"===e.request.destination}),new workbox.strategies.CacheFirst({cacheName:"images",plugins:[new workbox.cacheableResponse.CacheableResponsePlugin({statuses:[0,200]}),new workbox.expiration.ExpirationPlugin({maxEntries:60,maxAgeSeconds:2592e3})]})),workbox.routing.registerRoute(/\.(?:ico)|json|ttf|woff2?$/,new workbox.strategies.StaleWhileRevalidate),workbox.googleAnalytics.initialize(),self.addEventListener("activate",(function(e){e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if(-1===CACHE_NAMES.indexOf(e))return caches.delete(e)})))})).then((function(){self.clients.claim()})))})),self.addEventListener("message",(function(e){"skipWaiting"===e.data.action&&self.skipWaiting()}));