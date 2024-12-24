import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5fe51z2AoZhLxEMLLR2_8HOQ3nf3ARQk",
  authDomain: "canteen-management-189be.firebaseapp.com",
  projectId: "canteen-management-189be",
  storageBucket: "canteen-management-189be.firebasestorage.app",
  messagingSenderId: "1108240455",
  appId: "1:1108240455:web:c7e170709bbc3519b2a962",
  measurementId: "G-GMGTJFH3B4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)

export {app,auth} ;