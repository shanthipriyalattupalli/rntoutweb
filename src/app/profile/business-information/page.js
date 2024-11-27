'use client';
import React, { useState } from 'react';
import '@/styles/BusinessInformation1.css';
import { useRouter } from 'next/navigation';

const BusinessInformation1 = () => {
  const router = useRouter();
  
  return (
    <div>
        <div className='busi-ness-page'>
          <h2 className='item-header'>Business Information</h2>
          <div className='bi-main-div'>
            <div className='bi-1-div'>
              <img src='/Assets/business information.png' alt="business information" />
            </div>
            <div className='bi-text-section'>
              <h2 className='title-text'>Hey, seems like you forgot to add your business!</h2>
              <p className='description-text'>
              If you want to add your business and share the deets, just hit that <span>“Add Business”</span> button.
              </p>
            </div>
            <button className='add-business-button' onClick={() => router.push('/profile/business-information/add-business')}>+ Add Business</button>
          </div>
        </div>
 
    </div>
  );
}

export default BusinessInformation1;
