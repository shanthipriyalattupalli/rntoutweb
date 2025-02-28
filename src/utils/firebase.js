import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
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
const messaging = getMessaging(app);
// Request FCM Token for Push Notifications
export const requestForToken = async () => {
  try {
    
    const currentToken = await getToken(messaging, {
      vapidKey: "BJoiDFvVi8iMCZdlYBXfomD8McGhsFuxCRUG3mzhN47CWGYl_U2x34d17p8HRkqpwXse7DvtWmD-DdRtXdowwlw",
    });
    if (currentToken) {
      console.log("FCM Token:", currentToken);
      localStorage.setItem("FCMToken", currentToken);
      return currentToken;
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
  }
};
// Foreground Message Listener
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
export { messaging };









