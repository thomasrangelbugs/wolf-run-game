/* Wolf Run — service worker (offline / instalável) */
const CACHE_PREFIX = 'wolf-run-';
const CACHE_VERSION = `${CACHE_PREFIX}v2`;
const APP_SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './Wolf_Stop/1.png',
  './Wolf_death/1.png',
  './Wolf_Run/1.png',
  './Wolf_Run/2.png',
  './Wolf_Run/3.png',
  './Wolf_Run/4.png',
  './Wolf_Run/5.png',
  './Wolf_Run/6.png',
  './Wolf_Run/7.png',
  './Wolf_Run/8.png',
  './Wolf_Run/9.png',
  './Wolf_Jump/1.png',
  './Wolf_Jump/2.png',
  './Wolf_Jump/3.png',
  './Wolf_Jump/4.png',
  './Wolf_Jump/5.png',
  './Wolf_Jump/6.png',
  './Wolf_Jump/7.png',
  './Wolf_Jump/8.png',
  './Wolf_Jump/9.png',
  './Wolf_Jump/10.png',
  './Wolf_Jump/11.png',
];

const OPTIONAL_MEDIA = [
  './audio/night.mp3',
  './audio/trilha.mp3',
  './audio/trilha1.mp3',
  './audio/trilha2.mp3',
  './audio/trilha3.mp3',
  './audio/trilha4.mp3',
  './audio/trilha5.mp3',
  './audio/trilha6.mp3',
  './audio/trilha7.mp3',
  './audio/trilha8.mp3',
  './audio/trilha9.mp3',
  './audio/trilha10.mp3',
];

async function cacheMissing(urls, required = false) {
  const cache = await caches.open(CACHE_VERSION);
  const missing = [];

  for (const url of urls) {
    if (!(await cache.match(url))) missing.push(url);
  }

  const results = await Promise.allSettled(
    missing.map(async (url) => {
      const response = await fetch(new Request(url, { cache: 'reload' }));
      if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
      await cache.put(url, response);
    })
  );

  const failed = results
    .map((result, index) => result.status === 'rejected' ? missing[index] : null)
    .filter(Boolean);

  if (required && failed.length) {
    throw new Error(`Arquivos essenciais indisponíveis: ${failed.join(', ')}`);
  }

  return { cached: missing.length - failed.length, failed };
}

async function prepareOfflineFiles() {
  await cacheMissing(APP_SHELL, true);
  const media = await cacheMissing(OPTIONAL_MEDIA);
  return { ready: true, mediaFailures: media.failed.length };
}

async function fetchWithTimeout(request, timeoutMs = 3500) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(request, { signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

function recoveryPage() {
  return new Response(`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#0e1f31">
  <title>Wolf Run — restaurar jogo</title>
  <style>
    body{margin:0;min-height:100vh;display:grid;place-items:center;background:#08121e;color:#e9f3ff;font:16px system-ui;text-align:center}
    main{max-width:34rem;padding:2rem}button{padding:.8rem 1.2rem;border:0;border-radius:.7rem;background:#55d8ff;color:#08121e;font-weight:700}
  </style>
</head>
<body><main>
  <h1>Wolf Run</h1>
  <p>Os arquivos offline foram removidos. Conecte este dispositivo à internet e tente novamente para restaurar o jogo.</p>
  <button onclick="location.reload()">TENTAR NOVAMENTE</button>
</main></body>
</html>`, {
    status: 503,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    cacheMissing(APP_SHELL, true).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE_VERSION)
          .map((key) => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  if (event.data?.type !== 'PREPARE_OFFLINE') return;

  const task = prepareOfflineFiles()
    .then((result) => event.ports[0]?.postMessage(result))
    .catch((error) => {
      event.ports[0]?.postMessage({
        ready: false,
        error: error?.message || String(error),
      });
    });

  event.waitUntil(task);
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  const isDoc = req.mode === 'navigate' || req.destination === 'document';

  if (isDoc) {
    event.respondWith(
      fetchWithTimeout(req)
        .then(async (response) => {
          if (response.ok) {
            const cache = await caches.open(CACHE_VERSION);
            await cache.put('./index.html', response.clone());
            await cache.put('./', response.clone());
          }
          return response;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_VERSION);
          return (await cache.match('./index.html'))
            || (await cache.match('./'))
            || recoveryPage();
        })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then(async (response) => {
        if (response?.ok && response.type !== 'opaque') {
          const cache = await caches.open(CACHE_VERSION);
          await cache.put(req, response.clone());
        }
        return response;
      });
    })
  );
});
