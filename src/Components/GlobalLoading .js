'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const GlobalLoading = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events?.on('routeChangeStart', handleStart);
    router.events?.on('routeChangeComplete', handleComplete);
    router.events?.on('routeChangeError', handleComplete);

    // Initial page load
    handleStart();
    setTimeout(() => {
      handleComplete();
    }, 1000);

    return () => {
      router.events?.off('routeChangeStart', handleStart);
      router.events?.off('routeChangeComplete', handleComplete);
      router.events?.off('routeChangeError', handleComplete);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/80 backdrop-blur-md">
      <div className="relative w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-blue-400 border-t-transparent animate-spin-slow shadow-lg" />
        <div className="absolute inset-4 rounded-full border-4 border-purple-500 border-b-transparent animate-spin-reverse-slower" />
      </div>
      <p className="text-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
        Please wait, loading...
      </p>
    </div>
  );
};

export default GlobalLoading;
