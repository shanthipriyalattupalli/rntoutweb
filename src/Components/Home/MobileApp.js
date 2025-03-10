"use client";
import React from "react";
const mobileAppImg = "/Assets/mobile-app.jpg";
const mobileapp = "/Assets/mobileapp.svg";

const MobileApp = () => {
  return (
    <section className="mt-4 relative flex flex-row lg:flex-row items-center lg:items-stretch w-full">
      {/* Background Gradient and Image */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-50 to-blue-50">
        <img src={mobileapp} alt="Mobile App" className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full lg:w-1/2 bg-white px-6 sm:px-10 md:px-16 py-8 md:py-16 text-center lg:text-left">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-black">
          Download RntOut Mobile App
        </h1>
        <p className="text-gray-600 text-sm md:text-base mb-6">
          and never miss out on any updates
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2 text-xs sm:text-sm md:text-base">
          <li className="text-black">Download the app now from the App Store or Google Play.</li>
          <li className="text-black">Get real-time notifications and updates directly to your phone.</li>
          <li className="text-black">Explore Rental items near your location with detailed maps and navigation.</li>
        </ul>

        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <img
            src="https://www.freepnglogos.com/uploads/google-play-png-logo/google-play-png-logo-1.png"
            alt="Get it on Google Play"
            className="w-20 sm:w-24"
          />
        </div>
      </div>

      {/* Mobile Phone Image */}
      {/* <div className="relative w-full lg:w-1/2 flex justify-center lg:justify-end mt-6 lg:mt-0">
        <img
          src="https://www.nicepng.com/png/full/83-833946_mobile-phone-png-transparent-images-iphone-png-white.png"
          alt="Mobile Phone"
          className="w-32 sm:w-40 md:w-48 lg:w-64"
        />
      </div> */}
    </section>
  );
};

export default MobileApp;