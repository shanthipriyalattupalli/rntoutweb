"use client"

import React, { memo } from 'react';
import Image from 'next/image';

const Promoad = '../Assets/redchair.png';

// Lazy loaded image component
const LazyImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-full h-[400px] object-cover" loading="lazy" />;
};

const FurnishAd = ({banner}) => {
  console.log(banner,"banner in promotional add")
  return (
<div className="mt-8 mb-8 flex flex-col md:flex-row items-center relative">
  {/* Text Section */}
  <div className="w-full md:w-1/2 px-8 md:px-16 lg:px-24 z-10">
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-red-500">
      Be free when you furnish.
    </h1>
    <p className="text-sm md:text-base lg:text-lg mb-4 text-gray-700">
      We know you know what you want. <br />
      So get it how you want it, only with us.
    </p>
    <p className="text-red-500 font-bold text-base md:text-lg lg:text-xl mb-4">
      RENT IT or BUY IT.
    </p>
    <p className="text-sm md:text-base lg:text-lg text-gray-700">
      Because being home is being free.
    </p>
  </div>

  {/* Image Section with Gradient */}
  <div className="w-full md:w-1/2 relative">
    {/* Gradient Overlay */}
    <div className="absolute bg-gradient-to-l from-transparent to-white"></div>
    
    <img
      src={banner?.image}
      alt="Promotional Banner"
      className="w-full h-[400px] object-cover"
    />
  </div>
</div>


  );
};

// Memoizing the component for performance optimization
export default memo(FurnishAd);
