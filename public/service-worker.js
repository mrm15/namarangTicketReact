const CACHE_NAME = 'my-app-cache-v20000100'; // Change the version number whenever you update the app
const ASSETS_TO_CACHE = [
  // '/',
  // '/index.html', // Ensure this exists in public

  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/favicon.ico',
  '/namarangLogo.svg',
  '/site.webmanifest',
  '/offline.html',
  // '/login'
];

// Function to open cache and cache assets on install
const openCacheOnInstall = (CACHE_NAME) => {
  return caches.open(CACHE_NAME).then(cache => {
    console.log('Caching all assets  => ' + CACHE_NAME);
    return cache.addAll(ASSETS_TO_CACHE);
  });
}
// Function to send message to all clients (open pages)
const sendMessageToClients = async (message) => {
  const allClients = await clients.matchAll({ type: 'window' });
  allClients.forEach(client => {
    client.postMessage(message);
  });
};

// Function to delete old caches on activation and notify React app
const deleteCacheOnActive = (CACHE_NAME) => {
  console.log("deleteCacheOnActive")
  return caches.keys().then(cacheNames => {
    return Promise.all(cacheNames.map(cacheName => {
      // Delete old caches
      if (cacheName !== CACHE_NAME) {
        console.log('Deleting old cache:', cacheName);
        return caches.delete(cacheName);
      }
    })).then(() => {
      // Send message to the React app after cache activation
      //sendMessageToClients({ type: 'CACHE_UPDATED', cacheName: CACHE_NAME })

    });
  });
};
// Function to respond with cached or fetched resources
const responseCacheOnFetch = (event) => {
  return caches.match(event.request).then(response => {
    return response || fetch(event.request);
  }).catch(error => {
    console.log("به نظر میرسه که بله نت نداریم و همه چی قطع شده!")
    return caches.match('offline.html')
  })
}
const handlePushNotification = event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Default title';
  const options = {
    body: data.body || 'Default body',
    icon: '/android-chrome-192x192.png',
    badge: '/favicon-32x32.png',
    data: { url: data.url || '/' } // Pass URL with the notification
  };
  event.waitUntil(self.registration.showNotification(title, options));
};

const handleClickOnNotification = event => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
};
// Install event
self.addEventListener('install', event => {
  console.log('Service Worker installing...');
  self.skipWaiting(); // Force activation of the new SW immediately
  event.waitUntil(openCacheOnInstall(CACHE_NAME));
});

// Activate event
self.addEventListener('activate', event => {
  event.waitUntil(deleteCacheOnActive(CACHE_NAME));
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(responseCacheOnFetch(event)); // Pass the event to the function
});

// Listen for push event
self.addEventListener('push', handlePushNotification);

// Handle notification click
self.addEventListener('notificationclick', handleClickOnNotification);

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});


