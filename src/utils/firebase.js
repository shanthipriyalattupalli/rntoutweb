// Import the functions you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Ensure code runs only in browser
const isBrowser = typeof window !== "undefined";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCXrABKNar-okOGSL02ZQwvCUVwytA-SF8",
  authDomain: "testings-61b1e.firebaseapp.com",
  projectId: "testings-61b1e",
  storageBucket: "testings-61b1e.firebasestorage.app",
  messagingSenderId: "424655797418",
  appId: "1:424655797418:web:8e807cc3adb51800aba4d3",
  measurementId: "G-K1ZLTX68N7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Messaging (Only in browser)
const messaging = isBrowser ? getMessaging(app) : null;

// Register service worker and get token
export async function requestPermission() {
  if (!isBrowser || !messaging) return;

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // 🔹 Register service worker before getting token
      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

      const token = await getToken(messaging, {
        vapidKey: "BPLGIvQ-9aMp31vTuUGfxxLYccS4ICe0ny1AoYRIsuUZJe_H_sYTq06-gUKTXuviow2xqcG-EORWma66CXX_0wE",
        serviceWorkerRegistration: registration, // Pass service worker registration
      });

      console.log("Firebase Token:", token);
      return token;
    } else {
      console.warn("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting permission:", error);
  }
}

onMessage(messaging, (payload) => {
  console.log("Foreground Message Received:", payload);

  // Check if notifications are granted
  if (Notification.permission === "granted") {
    new Notification(payload.notification.title, {
      body: payload.notification.body,
      icon: payload.notification.image || "/firebase-logo.png",
    });
  } else {
    console.warn("Notifications are not allowed by the user.");
  }
});

export { app, messaging };
