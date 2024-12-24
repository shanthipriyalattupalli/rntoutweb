"use client";

import React, { memo, useState } from 'react';

const ser1 = '/Assets/Icons/ser-1.png';
const ser2 = '/Assets/Icons/ser-2.png';
const ser3 = '/Assets/Icons/ser-3.png';
const ser4 = '/Assets/Icons/ser-4.png';
const ser5 = '/Assets/Icons/ser-5.png';
const ser6 = '/Assets/Icons/ser-6.png';

const ServiceCard = memo(({ iconSrc, alt, title, description, bgColor }) => (
  <div className="bg-white rounded-lg border border-slate-200 p-6">
    <div className={`flex items-center justify-center mb-4 p-3 rounded-full ${bgColor}`}>
      <img src={iconSrc} className="p-2 bg-blue-100 rounded-full" alt={alt} /> 
    </div>
    <h3 className="text-sm font-medium text-gray-800 text-center mb-2">{title}</h3>
    <p className="text-gray-600 text-xs text-center">{description}</p>
  </div>
));

const OurBestServices = () => {
  const [selected, setSelected] = useState(null);

  // Link data to make it dynamic
  const links = [
    { id: 1, label: 'Our Promises', href: '#our-promises' },
    { id: 2, label: 'Complete Flexibility', href: '#complete-flexibility' },
    { id: 3, label: 'We got you covered', href: '#we-got-you-covered' },
  ];

  return (
    <div className="w-full bg-white border border-y border-slate-200 mx-auto p-8 mt-4 mb-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Our Best Services
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>

      {/* Responsive Links Section */}
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={() => setSelected(link.id)}
            className={`px-4 w-full py-2 rounded-lg font-medium transition-colors duration-200 ease-in-out w-48 text-center
                ${selected === link.id ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-800'}
                hover:bg-red-500 hover:text-white`}
          >
            {link.label}
          </a>
        ))}
      </div>

      {/* Service Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ServiceCard
          iconSrc={ser1}
          alt="Finest-quality products icon"
          title="Finest-quality products"
          description="Quality matters to you and us! That's why we do a strict quality-check for every product."
        //   bgColor="bg-[#FF5733]"
        />
        <ServiceCard
          iconSrc={ser2}
          alt="Free relocation icon"
          title="Free relocation"
          description="Changing your house or even your city? We'll relocate your rented products for free."
        //   bgColor="bg-[#3498DB]"
        />
        <ServiceCard
          iconSrc={ser3}
          alt="Free maintenance icon"
          title="Free maintenance"
          description="Keeping your rented products in a spick and span condition is on us, so you can sit back and relax."
        //   bgColor="bg-[#2ECC71]"
        />
        <ServiceCard
          iconSrc={ser4}
          alt="Cancel anytime icon"
          title="Cancel anytime."
          description="Pay only for the time you use the product and close your subscription without any hassle."
        //   bgColor="bg-[#F1C40F]"
        />
        <ServiceCard
          iconSrc={ser5}
          alt="Easy return on delivery icon"
          title="Easy return on delivery"
          description="If you don't like the product on delivery, you can return it right away - no questions asked."
        //   bgColor="bg-[#9B59B6]"
        />
        <ServiceCard
          iconSrc={ser6}
          alt="Keep upgrading icon"
          title="Keep upgrading"
          description="Bored of the same product? Upgrade to try another, newer design and enjoy the change!"
        //   bgColor="bg-[#FFA500]"
        />
      </div>
    </div>
  );
};

export default memo(OurBestServices);
