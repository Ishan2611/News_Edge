'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {".git/COMMIT_EDITMSG": "ef1a27de28ed85f232e264ae2c4d80a8",
".git/config": "f71d9578cfea29d47027a14cb08be0f5",
".git/description": "a0a7c3fff21f2aea3cfa1d0316dd816c",
".git/HEAD": "5ab7a4355e4c959b0c5c008f202f51ec",
".git/hooks/applypatch-msg.sample": "ce562e08d8098926a3862fc6e7905199",
".git/hooks/commit-msg.sample": "579a3c1e12a1e74a98169175fb913012",
".git/hooks/fsmonitor-watchman.sample": "a0b2633a2c8e97501610bd3f73da66fc",
".git/hooks/post-update.sample": "2b7ea5cee3c49ff53d41e00785eb974c",
".git/hooks/pre-applypatch.sample": "054f9ffb8bfe04a599751cc757226dda",
".git/hooks/pre-commit.sample": "5029bfab85b1c39281aa9697379ea444",
".git/hooks/pre-merge-commit.sample": "39cb268e2a85d436b9eb6f47614c3cbc",
".git/hooks/pre-push.sample": "2c642152299a94e05ea26eae11993b13",
".git/hooks/pre-rebase.sample": "56e45f2bcbc8226d2b4200f7c46371bf",
".git/hooks/pre-receive.sample": "2ad18ec82c20af7b5926ed9cea6aeedd",
".git/hooks/prepare-commit-msg.sample": "2b5c047bdb474555e1787db32b2d2fc5",
".git/hooks/push-to-checkout.sample": "c7ab00c7784efeadad3ae9b228d4b4db",
".git/hooks/sendemail-validate.sample": "4d67df3a8d5c98cb8565c07e42be0b04",
".git/hooks/update.sample": "647ae13c682f7827c22f5fc08a03674e",
".git/index": "91affa1f778699bef9ebe831a16b36ea",
".git/info/exclude": "036208b4a1ab4a235d75c181e685e5a3",
".git/logs/HEAD": "55f3f6ae5679cae5c6fa525cf83a63b2",
".git/logs/refs/heads/gh-pages": "55f3f6ae5679cae5c6fa525cf83a63b2",
".git/logs/refs/remotes/origin/gh-pages": "2dbb6ee92383bbc8299fdfba7c282c74",
".git/objects/02/d379985de129bf1118143f9405993014d84a88": "49a3fd720a605cdff3cce75df2a0f8a8",
".git/objects/04/f53187fbf8c574a6ebd67fe7ce6f0bd6959fce": "49283115b953d686171bf4c90407d53f",
".git/objects/05/a9058f513cce5faf1704e06e3c150688b0a01f": "e8d02f60cf87abd4c1de4b153dd696dc",
".git/objects/09/46e27f624ddd390532d2b539c61ce78c6b673f": "af1440305a2dcdfac4fc797e00f912d3",
".git/objects/0e/c2871704af1119ff711c87b56c93dda680eab1": "abefa6de132adc244782f69165ab18fa",
".git/objects/27/a297abdda86a3cbc2d04f0036af1e62ae008c7": "51d74211c02d96c368704b99da4022d5",
".git/objects/33/d2413d583bc23861320e6dac333d1f8319b6fd": "374366574b33bf8619e08478ed51c609",
".git/objects/34/b839ca16e52ea6def6bec22133fb4cae6d2bd0": "d4d7300d46c16863f48b02899326acda",
".git/objects/3a/bf18c41c58c933308c244a875bf383856e103e": "30790d31a35e3622fd7b3849c9bf1894",
".git/objects/5c/3f8386bb167376668beb82408ecb60608b5173": "0c765e247ea76661ca2a9b77777332df",
".git/objects/63/6931bcaa0ab4c3ff63c22d54be8c048340177b": "8cc9c6021cbd64a862e0e47758619fb7",
".git/objects/68/c5e19b07cea25ee17d4f7e9235e593d2a3aa34": "e7fa881afc41914fb86a92ffde77b25a",
".git/objects/6b/ce1be934348cd66c2caf3e2c88d23eb77a74b6": "6e4b598ef01ac0e150df4cc9e4e2fb71",
".git/objects/6d/5f0fdc7ccbdf7d01fc607eb818f81a0165627e": "2b2403c52cb620129b4bbc62f12abd57",
".git/objects/6e/63ab7f44816a4a7105c4e330be4a53185b2a38": "7ab14da132bd07627112f5949b03f06b",
".git/objects/73/7f149c855c9ccd61a5e24ce64783eaf921c709": "1d813736c393435d016c1bfc46a6a3a6",
".git/objects/88/cfd48dff1169879ba46840804b412fe02fefd6": "e42aaae6a4cbfbc9f6326f1fa9e3380c",
".git/objects/8a/aa46ac1ae21512746f852a42ba87e4165dfdd1": "1d8820d345e38b30de033aa4b5a23e7b",
".git/objects/8c/59773bee8314a8ffb4431593d0fb49f52e34c6": "2eb993d30677573ffd0e58484cc6a514",
".git/objects/95/ef1aa6a24dbec140336471779efacf0e4ca60f": "3b867eb727e20e0458cab7e85170665c",
".git/objects/96/56b8a63ed85828a611fe4461b0c303ac3b8b1d": "78ba5ed1cf5a0f607cbab5d23ed301db",
".git/objects/97/8a4d89de1d1e20408919ec3f54f9bba275d66f": "dbaa9c6711faa6123b43ef2573bc1457",
".git/objects/af/31ef4d98c006d9ada76f407195ad20570cc8e1": "a9d4d1360c77d67b4bb052383a3bdfd9",
".git/objects/b1/5ad935a6a00c2433c7fadad53602c1d0324365": "8f96f41fe1f2721c9e97d75caa004410",
".git/objects/b1/619f351ad9dea53f970bf3dabfd9e7c89baeef": "ed4c17c508e09275c2b59df932a6d236",
".git/objects/b1/afd5429fbe3cc7a88b89f454006eb7b018849a": "e4c2e016668208ba57348269fcb46d7b",
".git/objects/b1/d86b1e9e7dab0168e59e35b1c6406c0a5c4129": "39a9a7914431353bfccf0c1d52cf7eb1",
".git/objects/b6/6c15d53f5946089f3bc84c8043168971437b44": "3ba4e179ba9567f56ad50cb521f21bee",
".git/objects/b7/49bfef07473333cf1dd31e9eed89862a5d52aa": "36b4020dca303986cad10924774fb5dc",
".git/objects/c3/e81f822689e3b8c05262eec63e4769e0dea74c": "8c6432dca0ea3fdc0d215dcc05d00a66",
".git/objects/c6/06caa16378473a4bb9e8807b6f43e69acf30ad": "ed187e1b169337b5fbbce611844136c6",
".git/objects/cf/ab58a5990a4605f40b5750a67f03cccbaecd3b": "28fec57df92fe5b5c177d24b1244f981",
".git/objects/d1/a71ec68c8f2e7241b5570efa1005c5800a8dda": "27f7d1a0df2737d9caa33855f4532ed6",
".git/objects/d2/250ba9ce0ece839dcc1c5ef13e659a2873d83f": "68881b90711654911166b20897949116",
".git/objects/d4/3532a2348cc9c26053ddb5802f0e5d4b8abc05": "3dad9b209346b1723bb2cc68e7e42a44",
".git/objects/d4/da986ad0e076e1535903b285c1b3af1466908e": "5e0478e85cba3581b1fb784f5fa64826",
".git/objects/d6/9c56691fbdb0b7efa65097c7cc1edac12a6d3e": "868ce37a3a78b0606713733248a2f579",
".git/objects/e7/3e2f65f02210f0110f00d2ca907fd07337d8b4": "1853aeb7f8b388dfe14e858157e56fe7",
".git/objects/ea/9b39989b48251a5d6145b3b6eb9c152166e8bc": "9b516f1f45c14ce5a04882700d9bcf68",
".git/objects/eb/9b4d76e525556d5d89141648c724331630325d": "37c0954235cbe27c4d93e74fe9a578ef",
".git/objects/ec/361605e9e785c47c62dd46a67f9c352731226b": "d1eafaea77b21719d7c450bcf18236d6",
".git/objects/ed/adf37754dc6528bd76c4115984d3149d65ae6d": "8c5ed39a71442dadb9a55662f21ae5c7",
".git/objects/f2/04823a42f2d890f945f70d88b8e2d921c6ae26": "6b47f314ffc35cf6a1ced3208ecc857d",
".git/objects/f2/6ee05f05bf9b4b78b3ad4e48440abf7f87d7eb": "3322debeb78be06cb464754580aeb3a4",
".git/objects/f2/fed56357270bc57707e2e64a10ea23472acfb1": "5b72115f6f7b99444de707262f3f5359",
".git/objects/f8/aff58021720ece2f233e7529b62549e79ddf94": "786b257e1d5da95dd9a3d9a0353a210e",
".git/refs/heads/gh-pages": "70d0c2eb61caec2db954565bfe8c59f0",
".git/refs/remotes/origin/gh-pages": "70d0c2eb61caec2db954565bfe8c59f0",
"assets/AssetManifest.bin": "2e7a779b6252889136e221f5d0bb0f68",
"assets/AssetManifest.bin.json": "d9c48fe32a139fe4b2765ec8f01e787d",
"assets/AssetManifest.json": "c52fba42c144a0dfda5a10c8cb7e9f1c",
"assets/assets/News-1.png": "29ea506a450f45ad0bbbf7d57b5c0d6f",
"assets/assets/news_placeholder.png": "1df170681fd6ccab2e71bdd40d04b7f5",
"assets/FontManifest.json": "7b2a36307916a9721811788013e65289",
"assets/fonts/MaterialIcons-Regular.otf": "19a5aaae2a504441ac7c8b7d0650f637",
"assets/NOTICES": "5bb78f3dbc77981665c3041e34fa0e75",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"flutter_bootstrap.js": "082750422dd2ba50ee935f7c23c870eb",
"icons/icon-192x192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/icon-512x512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/icon-maskable-192x192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/icon-maskable-512x512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/screenshot.png": "5e60df6df43d2b9798ad08dbb8850752",
"icons/screenshot1.png": "ba4fa68fe95a312c0b200eedb807a089",
"index.html": "0f0f8166b0fce936ff5e22c73c36647c",
"/": "0f0f8166b0fce936ff5e22c73c36647c",
"main.dart.js": "7f19e6bc52f6b31718cb53a7ddb1e6b6",
"manifest.json": "ab9fc330447746d2d5bec30e221c5e4e",
"offline.html": "4db683666a32d21281cfce0424c55849",
"service-worker.js": "63227b24d562f990e699aa7654d0c3f6",
"service_worker_register.js": "e2daa6276fbcd66cdfa116ab3cb436b7",
"version.json": "d5e6bdcae47dbf7206697d11261fcae0"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
