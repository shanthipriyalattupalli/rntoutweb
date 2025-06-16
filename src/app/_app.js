"use-client"

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import  { AppProps } from "next/app";
import ScrollToTop from '../Components/ScrollToTop';
// import UseFcmToken from '../Components/PushNotificationClient';


function MyApp({ Component, pageProps }) {




  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("../../public/firebase-messaging-sw")
        .then((registration) => {

        })
        .catch((err) => console.log("Service Worker registration failed:", err));
    }
  }, []);
  return (
    <>
      {/* <WebNotificationController /> */}
      {/* <UseFcmToken/> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
