import React from "react";
import Image from "next/image";
const mobileapp = "/Assets/mobileapp.svg";
const playstore="/Assets/playstore.png"
const appstore="/Assets/appstore.webp"

const MobileApp = () => {
  return (
    <section className="mt-4 relative flex flex-col lg:flex-row items-center lg:items-stretch w-full">
      {/* Background Gradient and Image */}
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-red-50 to-blue-50">
        <img
          src={mobileapp}
          alt="Mobile App"
          className="w-full h-full cursor-pointer"
          onClick={() => {
            document.getElementById("downloadPopup").classList.remove("hidden");
          }}
        />
      </div>

      {/* Content (Kept on the left) */}
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

      <div
        id="downloadPopup"
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 hidden z-50"
        onClick={() => {
          document.getElementById("downloadPopup").classList.add("hidden");
        }}
      >
        <div className="bg-white p-6 rounded-lg shadow-lg text-center w-1/3 relative">
          <h2 className="text-xl font-bold mb-4">Download RntOut Mobile App</h2>
          <p className="text-gray-600 mb-4">Choose your platform to download:</p>
          <div className="flex justify-evenly gap-4">

              <img src={playstore} className="w-[200px] h-[200px]" />
      
              <img src={appstore} className="w-[200px] h-[80px] mt-14" />


          </div>
          <button
            className="mt-4 px-4 py-2 bg-gray-400 text-white rounded"
            onClick={() => {
              document.getElementById("downloadPopup").classList.add("hidden");
            }}
          >
            Close
          </button>
        </div>
      </div>
    </section>
  );
};

export default MobileApp;
