importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyCXrABKNar-okOGSL02ZQwvCUVwytA-SF8",
  authDomain: "testings-61b1e.firebaseapp.com",
  projectId: "testings-61b1e",
  storageBucket: "testings-61b1e.firebasestorage.app",
  messagingSenderId: "424655797418",
  appId: "1:424655797418:web:8e807cc3adb51800aba4d3",
  measurementId: "G-K1ZLTX68N7"
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