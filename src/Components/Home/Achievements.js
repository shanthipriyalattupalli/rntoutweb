"use client"
import Image from 'next/image';
import React from 'react';
import acheivementImg from '../../../public/Assets/redchair-achieve.jpg';

const Achievements = () => {
  return (
    <div className="mt-12">
      <div className="relative container mx-auto px-4 rounded-lg border border-slate-200 overflow-hidden">
        

        <div className="w-1/2 absolute right-0 top-0">
          <Image
            src={acheivementImg}
            alt="Office with Chairs"
            className="w-full h-auto"
          />
        </div>


        <div className="w-1/2 h-full bg-slate-50 p-10">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-4 text-black">
            Our Achievements
          </h1>
          <p className="text-gray-600 text-sm md:text-md lg:text-lg mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>


          <div className="flex flex-col md:flex-row">
            <div className="text-blue-600 px-4 py-2 font-bold text-2xl">
              10,25,496+ <span className="text-gray-600 text-sm md:text-base">Products on Rent</span>
            </div>
            <div className="text-blue-600 px-4 py-2 font-bold text-2xl">
              10,25,496+ <span className="text-gray-600 text-sm md:text-base">Products on Rent</span>
            </div>
            <div className="text-blue-600 px-4 py-2 font-bold text-2xl">
              10,25,496+ <span className="text-gray-600 text-sm md:text-base">Products on Rent</span>
            </div>
          </div>


          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg mt-8">
            Browse Products Now!
          </button>
        </div>
      
      </div>
    </div>
  );
};

export default Achievements;
