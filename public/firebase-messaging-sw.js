// Import Firebase scripts
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");
// Initialize Firebase inside the service worker
firebase.initializeApp({
  apiKey: "AIzaSyCGVdhAn9xsRa6TE5vpgTazvXXo0Ox4A7g",
  authDomain: "rentoutweb.firebaseapp.com",
  projectId: "rentoutweb",
  storageBucket: "rentoutweb.firebasestorage.app",
  messagingSenderId: "161533506811",
  appId: "1:161533506811:web:377a7514b61db708e12c5e",
  measurementId: "G-DCSWG5CZVR"
});
// Retrieve Firebase Messaging
const messaging = firebase.messaging();
// Handle background messages


messaging.onBackgroundMessage((payload) => {
  console.log("Received background message:", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    // icon: "/firebase-logo.png", // Update with your logo
  });

});









