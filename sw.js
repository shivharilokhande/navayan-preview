// Navayan offline cache: shell files up front; every lesson page, script and audio clip as it is first fetched.
const VERSION = 'navayan-v3';
const SHELL = ['./', 'index.html', 'book-data.js', 'unit-art.js', 'lib/engine.js', 'lib/engine.css', 'manifest.webmanifest', 'icon.svg'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  // Network first for HTML/JS/JSON (so updates arrive), cache first for audio (big and immutable).
  const audio = /\.(mp3|m4a|ogg)$/.test(url.pathname);
  e.respondWith(audio
    ? caches.match(e.request).then(r => r || fetch(e.request).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); return res; }))
    : fetch(e.request).then(res => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(e.request, copy)); } return res; }).catch(() => caches.match(e.request).then(r => r || caches.match('./'))));
});
