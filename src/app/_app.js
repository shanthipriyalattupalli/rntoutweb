"use-client"

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import '@/styles/globals.css';
import ScrollToTop from './ScrollToTop';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
    {/* <ScrollToTop/> */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
