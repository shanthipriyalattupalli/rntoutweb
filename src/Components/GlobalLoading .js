'use client';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const MinimalLoading = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Next.js 13+ App Router doesn't use router.events
    // We need to create listeners for navigation state
    const handleRouteChangeStart = () => {
      setLoading(true);
    };
    
    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    // Add event listeners for navigation
    window.addEventListener('beforeunload', handleRouteChangeStart);
    
    // Initial page load
    handleStart();
    setTimeout(() => {
      handleComplete();
    }, 800);

    return () => {
      window.removeEventListener('beforeunload', handleRouteChangeStart);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/20 backdrop-blur-sm">
      <div className="flex flex-col items-center">
        <div className="space-x-8 flex">
          <div className="w-10 h-10 rounded-full animate-bounce" style={{background:"rgba(255, 45, 85, 1)"}}></div>
          <div className="w-10 h-10  rounded-full animate-bounce" style={{ animationDelay: '0.2s' ,background:"rgba(255, 45, 85, 1)"}}></div>
          <div className="w-10 h-10  rounded-full animate-bounce" style={{ animationDelay: '0.4s' ,background:"rgba(255, 45, 85, 1)"}}></div>
          <div className="w-10 h-10  rounded-full animate-bounce" style={{ animationDelay: '0.6s' ,background:"rgba(255, 45, 85, 1)"}}></div>
        </div>
        <p className="mt-4 text-md font-medium text-white">Loading....</p>
      </div>
    </div>
  );
};

export default MinimalLoading;