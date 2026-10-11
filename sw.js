/* 京都しおり：オフライン用の Service Worker
   中身を更新したら VERSION の数字を上げる（古いキャッシュが消えて新しいものに入れ替わる） */
const VERSION = "shiori-bc48e153ff";
const PRECACHE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/apple-touch-icon.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/favicon-32.png",
  "./images/kitano.jpg",
  "./images/kinkaku.jpg",
  "./images/kinukake.jpg",
  "./images/ryoanji.jpg",
  "./images/hero.jpg",
  "./images/hotel.jpg",
  "./images/yakiniku.jpg",
  "./images/toyouke.jpg",
  "./images/sawaya.jpg",
  "./images/yokai.jpg",
  "./images/seigenin.jpg",
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // ページ本体：電波があれば最新、なければキャッシュ
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put("./index.html", copy)); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // 同じサイトの画像など＋Google Fonts：キャッシュ優先、無ければ取りに行って保存
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com";
  if (!sameOrigin && !isFont) return;

  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === "opaque") {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put(req, copy));
      }
      return res;
    }))
  );
});
