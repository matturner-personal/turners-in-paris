// Turners in Paris: offline support.
// Bump VERSION whenever index.html changes so phones pick up the new plan.
const VERSION = 'tip-v1';
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // The page itself: try the network first so updates show up, fall back to the saved copy offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Google Fonts: serve the saved copy straight away and refresh it in the background.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(
      caches.open(VERSION).then(async c => {
        const hit = await c.match(req);
        const net = fetch(req).then(res => { c.put(req, res.clone()); return res; }).catch(() => hit);
        return hit || net;
      })
    );
    return;
  }

  // Everything else from this site: saved copy first.
  if (url.origin === location.origin) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req)));
  }
});
