const CACHE_NAME = 'my-app-cache-v1'; // Change the version number whenever you update the app
const ASSETS_TO_CACHE = [
  '/',
  '/index.html', // Ensure this exists in public
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon.ico',
  '/namarangLogo.svg',
  '/site.webmanifest',
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching all assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete old caches
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

//===================================================================================/
self.addEventListener('push', function (event) {
  console.log(`addEventListener push  5️⃣`);
  console.log(event);

  let data;

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      console.error('Error parsing push data:', e);
      data = { title: 'Notification11', body: 'Default message12345' };
    }
  } else {
    data = { title: 'Notification12', body: 'Default message00000000' };
  }

  const options = {
    body: data.body,
    icon: 'icons/icon-192x192.png',
    badge: 'icons/icon-192x192.png',
  };

  // Show the notification only if permission is granted
  if (Notification.permission === 'granted') {
    event.waitUntil(self.registration.showNotification(data.title, options));
  } else {
    console.warn('Notification permission not granted. Notification will not be shown.');
  }
});
