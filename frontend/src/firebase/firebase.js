// firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyB5fe51z2AoZhLxEMLLR2_8HOQ3nf3ARQk",
  authDomain: "canteen-management-189be.firebaseapp.com",
  projectId: "canteen-management-189be",
  storageBucket: "canteen-management-189be.firebasestorage.app",
  messagingSenderId: "1108240455",
  appId: "1:1108240455:web:c7e170709bbc3519b2a962",
  measurementId: "G-GMGTJFH3B4"
};

const app = initializeApp(firebaseConfig, 'student-app');
const analytics = getAnalytics(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

const VAPID_KEY = 'BCClyLmX0MzHcCFdSvQsfq4JDXodhjXxpd2PhUzTAyRlWYssYeli3IMHY6_CA20ZZHjufQvo4wbCEJzqQxN9ztM';

export const setupNotifications = async () => {
  try {
    const permission = await Notification.requestPermission();
    console.log('Permission status:', permission);

    if (permission === "granted") {
      // Validate VAPID key format
      if (!VAPID_KEY || !VAPID_KEY.startsWith('B')) {
        throw new Error('Invalid VAPID key format. It should start with "B"');
      }

      console.log('Requesting FCM token with VAPID key...');
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY
      });

      if (token) {
        console.log('FCM Token obtained:', token);
        
        try {
          const response = await fetch("http://localhost:5050/subscribe-to-topic", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });

          if (!response.ok) {
            throw new Error(`Server responded with status: ${response.status}`);
          }

          console.log("Successfully subscribed to topic");
        } catch (error) {
          console.error("Error subscribing to topic:", error);
        }
      } else {
        console.error('Failed to obtain FCM token');
      }
    }
  } catch (error) {
    console.error("Notification setup error:", error);
    if (error.code) {
      console.error('Error code:', error.code);
    }
    if (error.message) {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export const setupMessageListener = () => {
  onMessage(messaging, (payload) => {
    console.log('Received foreground message:', payload);
    const { title, body } = payload.notification || {};
    if (title) {
      new Notification(title, { body });
    }
  });
};

export { app, auth, messaging };