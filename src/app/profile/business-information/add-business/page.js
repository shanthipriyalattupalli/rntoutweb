'use client';


import React from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";

import '@/styles/BusinessInformation2.css';
import { useRouter } from 'next/navigation';

export default function BusinessInformation2  ()  {
    const router = useRouter();
  return (
    <div>
    <h2 className='item-header'>
      <div className='back-business' onClick={() => router.back()}>
        <IoMdArrowRoundBack style={{marginRight:"12px"}}  />
        Business Information
      </div>
      </h2>
    <div className="bi2-main-div">
      {/* Owner Info Section */}
      <div className="section">
   
        <h3 className="section-title">Owner Info</h3>
        <div className="input-group">
  <div className="input-item">
    <label htmlFor="owner-name">Owner Name</label>
    <input id="owner-name" type="text" placeholder="Enter name" />
  </div>
  <div className="input-item">
    <label htmlFor="owner-email">Owner Email Address</label>
    <input id="owner-email" type="email" placeholder="Enter email address" />
  </div>
  <div className="input-item">
    <label htmlFor="owner-mobile">Owner Mobile Number</label>
    <input id="owner-mobile" type="text" placeholder="Enter mobile number" />
  </div>
</div>
<div className='address-bar'>
<div className="input-item">
        <label htmlFor="Address">Address</label>
        <input type="text" placeholder="Address" className="full-width" />
        </div>
        </div>
        <label className="checkbox-label">
          <input type="checkbox" />
          Same address as the store
        </label>
      </div>

      {/* Bank Details Section */}
      <div className="section">
  <h3 className="section-title">Bank Details</h3>
  <div className="input-group">
    <div className="input-item">
      <label htmlFor="bank-select">Bank</label>
      <select id="bank-select">
        <option>Select bank</option>
        {/* Add bank options here */}
      </select>
    </div>
    <div className="input-item">
      <label htmlFor="ifsc">IFSC</label>
      <input id="ifsc" type="text" placeholder="Enter code" />
    </div>
    <div className="input-item">
      <label htmlFor="bank-mobile">Owner Mobile Number</label>
      <input id="bank-mobile" type="text" placeholder="Enter mobile number" />
    </div>
  </div>
  <div className='address-bar'>
  <div className="input-item">
    <label htmlFor="bank-address">Address</label>
    <input id="bank-address" type="text" placeholder="Enter address" className='full-width' />
  </div></div>
</div>


      {/* Basic Info Section */}
      <div className="section">
  <h3 className="section-title">Basic Info</h3>
  <div className="basic-info">
    <div className="icon-text">
      <div className="icon">
        <img src='/Assets/upload-image.svg' alt="Icon" />
      </div>
    </div>
    <div className='icon-button'>
    <button className="edit-image-button">Edit Image</button>
  </div>
  </div>
  <h4 className="info-title">Advertisement Banner</h4>

  <div className="banner-upload">
  <div className="bi-file-upload">
    <div className="upload-icon">
      <img src='/upload-file.svg' alt='' className='icon' /> {/* Use any upload icon here */}
    </div>
    <p className='image-direction'>
      Drag your file(s) or <span className="browse-link">browse</span>
    </p>
    <p className="image-format">Image format will be a JPEG, PNG, JPG</p>
  </div>
 
</div>
<p className="upload-note">
    Kindly make sure to upload a minimum of 1 image. <span className="icon">&#128247;</span>
  </p>

</div>


      {/* Business Details Section */}
      <div className="section">
  <div className='address-bar'>
    <div className="input-item">
      <label htmlFor="business-name">Business Name</label>
      <input id="business-name" type="text" placeholder="Enter name"  className='full-width'/>
    </div>
    </div>
    <div className="input-group">
      <div className="input-item">
        <label htmlFor="store-name">Store Name</label>
        <input id="store-name" type="text" placeholder="Enter name" />
      </div>
      <div className="input-item">
        <label htmlFor="mobile-number">Mobile Number</label>
        <input id="mobile-number" type="text" placeholder="Enter mobile number" />
      </div>
      <div className="input-item">
        <label htmlFor="email-address">Email Address</label>
        <input id="email-address" type="email" placeholder="Enter email address" />
      </div>
    </div>
    <div className='address-bar'>
    <div className="input-item ">
      <label htmlFor="store-description">Store Description</label>
      <textarea id="store-description" placeholder="Enter description" className="full-width" rows={5}></textarea>
    </div></div>
  </div>

    </div>
    </div>
  );
}

