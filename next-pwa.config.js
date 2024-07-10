// next-pwa.config.js
const withPWA = require('next-pwa')({
    // swSrc: 'public/sw.js',
    // dest: 'public',
    // disable: process.env.NODE_ENV === 'development',
    // buildExcludes: [/middleware-manifest\.json$/],
    // customWorkerDir: 'public',
    dest: "public", // Destination directory for the PWA files
    disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
    register: true, // Register the PWA service worker
    skipWaiting: true, // Skip waiting for service worker activation
  });
  
  module.exports = withPWA;
  