import React, { memo } from 'react';
import Image from 'next/image';

const Promoad = '../Assets/redchair.png';

// Lazy loaded image component
const LazyImage = ({ src, alt }) => {
  return <img src={src} alt={alt} className="w-full h-auto" loading="lazy" />;
};

const FurnishAd = () => {
  return (
    <div className="mt-8 mb-8">
      <div className="relative">
        <LazyImage src={Promoad} alt="Red Room with Chair" />
        <div className="absolute top-1/4 left-10 text-white w-full md:w-3/4 lg:w-1/2">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 text-black">
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
      </div>
    </div>
  );
};

// Memoizing the component for performance optimization
export default memo(FurnishAd);
