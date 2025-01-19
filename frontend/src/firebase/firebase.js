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

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const messaging = getMessaging(app);

const VAPID_KEY = 'BCClyLmX0MzHcCFdSvQsfq4JDXodhjXxpd2PhUzTAyRlWYssYeli3IMHY6_CA20ZZHjufQvo4wbCEJzqQxN9ztM';

export const setupNotifications = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: VAPID_KEY
      });

      if (token) {
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
        } catch (error) {
          console.error("Error subscribing to topic:", error);
        }
      }
    }
  } catch (error) {
    console.error("Notification setup error:", error);
  }
};

export const setupMessageListener = () => {
  onMessage(messaging, (payload) => {
    const { title, body } = payload.notification || {};
    if (title) {
      new Notification(title, { body });
    }
  });
};

export { app, auth, messaging };

export const getFirebaseAuth = () => auth;