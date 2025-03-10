
import Image from 'next/image';
import React from 'react';
const acheivementImg = '/Assets/redchair-achieve.svg';

const Achievements = () => {
  return (
<div className="mt-12">
  <div className="relative 2xl:px-10 px-4 rounded-lg border border-slate-200 overflow-hidden flex flex-col md:flex-row items-center">
    
    {/* Image Section - Left Side */}
    <div className="w-full md:w-1/2">
      <Image
        src={acheivementImg}
        alt="Office with Chairs"
        className="w-full h-auto"
        width={500}
        height={300}
      />
    </div>

    {/* Text Section - Right Side */}
    <div className="w-full md:w-1/2 h-full p-6 md:p-10 text-center md:text-left">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-black">
        Our Achievements
      </h1>
      <p className="text-gray-600 text-sm sm:text-base md:text-md lg:text-lg mb-6">
        "Celebrating Our Milestones – Trusted by Thousands, Powered by Quality Rentals!" 🎉🚀
      </p>

      {/* Stats Section */}
      <div className="flex flex-col sm:flex-row justify-center md:justify-start">
        <div className="text-blue-600 px-4 py-2 font-bold text-xl sm:text-2xl">
          10,25,496+ <span className="text-gray-600 text-sm md:text-base">Products on Rent</span>
        </div>
        <div className="text-blue-600 px-4 py-2 font-bold text-xl sm:text-2xl">
          5,00,000+ <span className="text-gray-600 text-sm md:text-base">Happy Customers</span>
        </div>
        <div className="text-blue-600 px-4 py-2 font-bold text-xl sm:text-2xl">
          1,00,000+ <span className="text-gray-600 text-sm md:text-base">Successful Deliveries</span>
        </div>
      </div>

      {/* Button */}
      <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg mt-6 sm:mt-8">
        Browse Products Now!
      </button>
    </div>

  </div>
</div>


  );
};

export default Achievements;
