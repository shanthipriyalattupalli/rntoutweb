
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";
import Cookies from "js-cookie";


const isBrowser = typeof window !== "undefined";
const token = Cookies.get("userToken") || null;
const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;


const firebaseConfig = {
  apiKey: "AIzaSyD6c9EO44Za_692sMUNCw4nyWsZT-w4K3U",
  authDomain: "rntout-28514.firebaseapp.com",
  projectId: "rntout-28514",
  storageBucket: "rntout-28514.firebasestorage.app",
  messagingSenderId: "637936986952",
  appId: "1:637936986952:web:5c41006ff48abad233217d",
  measurementId: "G-7B7BMMHMN7"
};


const app = initializeApp(firebaseConfig);


const messaging = isBrowser ? getMessaging(app) : null;


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
  if (!isBrowser || !messaging) return;

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {

      const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

      const fcmtoken = await getToken(messaging, {
        vapidKey: "BJoiDFvVi8iMCZdlYBXfomD8McGhsFuxCRUG3mzhN47CWGYl_U2x34d17p8HRkqpwXse7DvtWmD-DdRtXdowwlw",
        serviceWorkerRegistration: registration,
      });

      console.log("Firebase Token:", fcmtoken);
      if (fcmtoken) {

        localStorage.setItem("fcmToken", fcmtoken);
        saveFcmToken(fcmtoken)
      }
      return fcmtoken;
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

    if (Notification.permission === "granted") {
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: payload.notification.image || "/rntout.png"
      });
    } else {
      console.warn("Notifications are not allowed by the user.");
    }
  });
}


export { app, messaging };
