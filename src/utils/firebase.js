// utils/firebase.js
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCGVdhAn9xsRa6TE5vpgTazvXXo0Ox4A7g",
  authDomain: "rentoutweb.firebaseapp.com",
  projectId: "rentoutweb",
  storageBucket: "rentoutweb.firebasestorage.app",
  messagingSenderId: "161533506811",
  appId: "1:161533506811:web:377a7514b61db708e12c5e",
  measurementId: "G-DCSWG5CZVR"
};

const app = initializeApp(firebaseConfig);
const messaging = typeof window !== "undefined" ? getMessaging(app) : null;

export { messaging, getToken, onMessage };
