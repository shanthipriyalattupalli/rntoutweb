"use client"

import React, { memo } from 'react';
import Image from 'next/image';

const Promoad = '../Assets/redchair.png';
const banners = '../Assets/banners.png';


// Lazy loaded image component
const LazyImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-full h-[400px] object-cover" loading="lazy" />;
};

const FurnishAd = ({banner}) => {

  return (
<>
  {/* Text Section */}
  {/* <div className="absolute sm:relative w-full md:w-1/2 px-8 md:px-16 lg:px-24 z-10 top-0 left-0">
  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-red-500">
    Be free when you furnish.
  </h1>
  <p className="text-sm md:text-base lg:text-lg mb-4 text-gray-700 ">
    We know you know what you want. <br />
    So get it how you want it, only with us.
  </p>
  <p className="text-red-500 font-bold text-base md:text-lg lg:text-xl mb-4">
    RENT IT or BUY IT.
  </p>
  <p className="text-sm md:text-base lg:text-lg text-gray-700">
    Because being home is being free.
  </p>
</div> */}


  {/* Image Section with Gradient */}

    {/* Gradient Overlay */}
<div className="flex flex-wrap justify-center gap-8 px-4 md:px-20">
  <img
    src={banner?.image}
    alt="Promotional Banner"
    className="w-full max-w-[650px] aspect-[13/6] rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out"
  />
  <img
    src={banners}
    alt="Promotional Banner"
    className="w-full max-w-[650px] aspect-[13/6] rounded-lg hover:scale-105 transition-transform duration-500 ease-in-out"
  />
</div>

</>


  );
};

// Memoizing the component for performance optimization
export default memo(FurnishAd);
