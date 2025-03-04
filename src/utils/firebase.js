// Import the functions you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// Ensure code runs only in browser
const isBrowser = typeof window !== "undefined";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD6c9EO44Za_692sMUNCw4nyWsZT-w4K3U",
  authDomain: "rntout-28514.firebaseapp.com",
  projectId: "rntout-28514",
  storageBucket: "rntout-28514.firebasestorage.app",
  messagingSenderId: "637936986952",
  appId: "1:637936986952:web:5c41006ff48abad233217d",
  measurementId: "G-7B7BMMHMN7"
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
        vapidKey: "BJoiDFvVi8iMCZdlYBXfomD8McGhsFuxCRUG3mzhN47CWGYl_U2x34d17p8HRkqpwXse7DvtWmD-DdRtXdowwlw",
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

if (messaging) {
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
}


export { app, messaging };
