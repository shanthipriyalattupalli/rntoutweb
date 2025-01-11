'use client';
import React, { useState } from 'react';
import '@/styles/BusinessInformation1.css';
import { useRouter } from 'next/navigation';

const BusinessInformation1 = ({ children }) => { // Add children as a prop
  const router = useRouter();
  
  return (
    <div>
      {children} {/* Render the children prop */}
    </div>
  );
}

export default BusinessInformation1;
