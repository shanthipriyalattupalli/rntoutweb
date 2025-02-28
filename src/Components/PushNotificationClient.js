"use client";
import { useEffect } from "react";
import { requestForToken, onMessageListener } from "../utils/firebase";
export default function PushNotificationClient() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);

        })
        .catch((err) => console.log("Service Worker registration failed:", err));
    }
    requestForToken();
    onMessageListener()
      .then((payload) => {
        console.log("New foreground message:", payload);
        alert(`New Notification: ${payload.notification.title}`);

      })
      .catch((err) => console.log("Failed to receive message:", err));
  }, []);
  return null;
}