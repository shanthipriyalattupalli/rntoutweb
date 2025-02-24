"use-client"

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import  { AppProps } from "next/app";
import ScrollToTop from './ScrollToTop';
import WebNotificationController from '../Components/WebNotificationController ';

function MyApp({ Component, pageProps }) {
  // Register service worker
  if (typeof window !== "undefined" && "serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((registration) => {
        console.log("Service Worker registered:", registration);
      })
      .catch((error) => console.error("Service Worker registration failed:", error));
  }

  return (
    <>
      <WebNotificationController />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
