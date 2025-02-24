// components/WebNotificationController.tsx
"use client";

import { useEffect } from "react";
import { onMessage } from "@/utils/firebase";
import { requestNotificationPermission } from "@/utils/webNotification";

const WebNotificationController = () => {
  useEffect(() => {
    const initializeNotifications = async () => {
      await requestNotificationPermission();

      // Listen for foreground messages
      onMessage(messaging, (payload) => {
        console.log("Message received in foreground: ", payload);
        new Notification(payload.notification.title, {
          body: payload.notification.body,
          icon: payload.notification.icon,
        });
      });
    };

    initializeNotifications();
  }, []);

  return null;
};

export default WebNotificationController;
