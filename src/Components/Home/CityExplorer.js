// "use client";
import React from "react";

const city1 = "/Assets/cities.jpg";
const city2 = "/Assets/cities-1.jpg";

const CityCard = ({ href, imgSrc, altText, cityName, productCount }) => (
  <a
    href={href}
    className='bg-white rounded-lg border border-gray-200 overflow-hidden'
  >
    <img src={imgSrc} alt={altText} className='w-full h-40 object-cover' />
    <div className='p-4'>
      <h3 className='text-base font-medium text-gray-800'>{cityName}</h3>
      <div className='flex items-center justify-between mt-2'>
        <div className='flex items-center'>
          <svg
            className='w-4 h-4 text-red-500 mr-1'
            fill='currentColor'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              d='M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z'
              clipRule='evenodd'
            ></path>
          </svg>
          <span className='text-gray-600 text-xs'>{productCount} Products</span>
        </div>
        <svg
          className='w-4 h-4 text-gray-500'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='M9 5l7 7-7 7'
          ></path>
        </svg>
      </div>
    </div>
  </a>
);

const CityExplorer = () => {
  const cities = [
    {
      id: 1,
      href: "#",
      imgSrc: city1,
      altText: "Delhi/NCR",
      cityName: "Delhi / NCR",
      productCount: "3500+",
    },
    {
      id: 2,
      href: "#",
      imgSrc: city2,
      altText: "Mumbai",
      cityName: "Mumbai",
      productCount: "2500+",
    },
    {
      id: 2,
      href: "#",
      imgSrc: city1,
      altText: "Mumbai",
      cityName: "Mumbai",
      productCount: "2500+",
    },
    {
      id: 2,
      href: "#",
      imgSrc: city2,
      altText: "Mumbai",
      cityName: "Mumbai",
      productCount: "2500+",
    },


  ];

  return (
    <div className='container mx-auto p-y-8 mb-6'>
      <h1 className='text-3xl pt-12 font-bold text-gray-800 text-center mb-6'>
        Explore RntOut in Popular Indian Cities
      </h1>
      <p className='text-gray-600 text-center mb-8'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {cities?.map((city) => (
          <CityCard
            key={city.id}
            href={city.href}
            imgSrc={city.imgSrc}
            altText={city.altText}
            cityName={city.cityName}
            productCount={city.productCount}
          />
        ))}
      </div>
    </div>
  );
};

export default CityExplorer;
