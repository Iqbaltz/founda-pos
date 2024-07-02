// next-pwa.config.js
const withPWA = require('next-pwa')({
    // swSrc: 'public/sw.js',
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    buildExcludes: [/middleware-manifest\.json$/],
    customWorkerDir: 'public',
  });
  
  module.exports = withPWA;
  