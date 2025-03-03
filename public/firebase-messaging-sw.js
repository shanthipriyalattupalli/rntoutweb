importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyD6c9EO44Za_692sMUNCw4nyWsZT-w4K3U",
  authDomain: "rntout-28514.firebaseapp.com",
  projectId: "rntout-28514",
  storageBucket: "rntout-28514.firebasestorage.app",
  messagingSenderId: "637936986952",
  appId: "1:637936986952:web:5c41006ff48abad233217d",
  measurementId: "G-7B7BMMHMN7"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});