import { precacheAndRoute } from 'workbox-precaching';

// Ensure that the precache manifest is included in the service worker build
precacheAndRoute(self.__WB_MANIFEST);

// You can add additional Workbox logic here, for example:
self.addEventListener('fetch', (event) => {
  // Customize your fetch event handling here
});
