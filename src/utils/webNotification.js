// utils/webNotification.js
import { messaging, getToken } from "./firebase";

export const requestNotificationPermission = async () => {
  if (!("Notification" in window)) {
    console.error("This browser does not support desktop notification");
    return false;
  }

  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const fcmToken = await getToken(messaging, {
        vapidKey: "YOUR_PUBLIC_VAPID_KEY",
      });
      if (fcmToken) {
        console.log("FCM Token:", fcmToken);
        localStorage.setItem("fcmToken", fcmToken);
      } else {
        console.log("Failed to get FCM token.");
      }
      return true;
    } else {
      console.log("Notification permission not granted.");
      return false;
    }
  } catch (error) {
    console.error("An error occurred while requesting notification permission:", error);
    return false;
  }
};
