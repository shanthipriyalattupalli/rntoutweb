'use client';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';

const GlobalLoading = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // For detecting route changes

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
    }, 1000); // Adjust as needed

    return () => {
      router.events?.off('routeChangeStart', handleStart);
      router.events?.off('routeChangeComplete', handleComplete);
      router.events?.off('routeChangeError', handleComplete);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/70">
      <img
        src="/spinner.svg" // Or any loading image
        alt="Loading..."
        className="w-16 h-16 animate-spin"
      />
    </div>
  );
};

export default GlobalLoading;
