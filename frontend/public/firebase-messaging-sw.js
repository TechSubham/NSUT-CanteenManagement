
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyB5fe51z2AoZhLxEMLLR2_8HOQ3nf3ARQk",
  authDomain: "canteen-management-189be.firebaseapp.com",
  projectId: "canteen-management-189be",
  storageBucket: "canteen-management-189be.firebasestorage.app",
  messagingSenderId: "1108240455",
  appId: "1:1108240455:web:c7e170709bbc3519b2a962"
});

const messaging = firebase.messaging();

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

messaging.onBackgroundMessage(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  if (payload.notification) {
    const notificationOptions = {
      body: payload.notification.body,
      icon: '/favicon.ico'
    };

    return self.registration.showNotification(
      payload.notification.title,
      notificationOptions
    );
  }
});