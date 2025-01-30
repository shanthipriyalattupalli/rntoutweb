"use client"
import React from 'react';
const mobileAppImg = '/Assets/mobile-app.jpg'; 
const mobileapp=' /Assets/mobileapp.svg'
const MobileApp = () => {
  return (
    <section className="mt-4 relative"> 
      {/* Background Gradient and Image */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-50 to-blue-50">
        <img 
          src={mobileapp} 
          alt="Mobile App" 
          className="w-full h-full object-cover" 
        />
      </div>

      {/* Content */}
      <div className="w-1/2 h-full bg-white px-20 py-16 relative z-10"> 
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-black">
          Download RntOut Mobile App
        </h1>
        <p className="text-gray-600 text-sm md:text-base mb-8">
          and never miss out on any updates
        </p>

        <ul className="list-disc pl-6 mb-8 space-y-2 text-sm"> 
          <li className="text-black">
          Download the app now from the App Store or Google Play.
          </li>
          <li className="text-black">
          Get real-time notifications and updates directly to your phone.
          </li>
          <li className="text-black">
          Explore Rental items near your location with detailed maps and navigation.
          </li>
        </ul>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <img
            src="https://www.freepnglogos.com/uploads/google-play-png-logo/google-play-png-logo-1.png"
            alt="Get it on Google Play"
            className="w-24"
          />
          
        </div>
      </div>

      {/* Mobile Phone Image */}
      <div className="absolute top-1/2 right-10 w-1/4 transform -translate-y-1/2">
        {/* <img
          src="https://www.nicepng.com/png/full/83-833946_mobile-phone-png-transparent-images-iphone-png-white.png"
          // alt="Mobile Phone"
        /> */}
      </div>
    </section>
  );
};

export default MobileApp;