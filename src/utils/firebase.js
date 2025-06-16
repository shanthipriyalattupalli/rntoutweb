import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import axios from "axios";
import Cookies from "js-cookie";

const isBrowser = typeof window !== "undefined";
const token = Cookies.get("userToken") || null;
const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

const firebaseConfig = {
  apiKey: "AIzaSyCm7t5P-kgW-712ZPtQSR4q2VmJ2pHd_jY",
  authDomain: "rntout-20f3b.firebaseapp.com",
  projectId: "rntout-20f3b",
  storageBucket: "rntout-20f3b.firebasestorage.app",
  messagingSenderId: "662193399841",
  appId: "1:662193399841:web:2ae35542be5ec1c996db60",
  measurementId: "G-K41QVFNVFH"
};

const app = initializeApp(firebaseConfig);

let messaging = null;

if (isBrowser) {
  // Only attempt to initialize messaging if supported
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);

      // Foreground message listener
      onMessage(messaging, (payload) => {
        console.log("Foreground Message Received:", payload);

        if (Notification.permission === "granted") {
          new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: payload.notification.image || "/rntout.png"
          });
        } else {
          console.warn("Notifications are not allowed by the user.");
        }
      });
    } else {
      console.warn("Firebase Messaging is not supported in this browser.");
    }
  });
}

const saveFcmToken = async (fcmToken) => {
  if (!token) return;
  try {
    const response = await axios.post(
      `${BASE_URL}/users/save-fcm-token`,
      { fcmToken },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("FCM Token saved successfully", response);
  } catch (error) {
    console.error("Error saving FCM token:", error);
  }
};

export async function requestPermission() {
  if (!isBrowser) return;

  try {
    const supported = await isSupported();
    if (!supported) {
      console.warn("Firebase Messaging is not supported in this browser.");
      return;
    }

    const messagingInstance = getMessaging(app);
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

      const fcmtoken = await getToken(messagingInstance, {
        vapidKey: "BDDtxM6T5G3c9UDw4zIjbs5EnAljWscsLo28mdeilVYXYgdVjm8Xnq4Lu_br624g_ve93eoFUMNjvb2f1AFKcY4",
        serviceWorkerRegistration: registration,
      });

      console.log("Firebase Token:", fcmtoken);
      if (fcmtoken) {
        localStorage.setItem("fcmToken", fcmtoken);
        saveFcmToken(fcmtoken);
      }
      return fcmtoken;
    } else {
      console.warn("Notification permission denied");
    }
  } catch (error) {
    console.error("Error getting permission:", error);
  }
}

export { app, messaging };
