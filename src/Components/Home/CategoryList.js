'use client'; // For client-side rendering in Next.js App Router

import React, { useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Image from 'next/image';
import classNames from 'classnames';
// const  itIconImg = '/Assets/Icons/Monitor-Smartphone.png';
const  furnitureIconImg = '/Assets/Icons/Sofa.png';
// const  medicalIconImg = '/Assets/Icons/Stethoscope.png';
// const vacationIconImg = '/Assets/Icons/Suitcase-Tag.png';
// const vehiclesIconImg = '/Assets/Icons/Bus.png';
// const partyIconImg = '/Assets/Icons/Confetti.png';
// const sportsIconImg = '/Assets/Icons/Dumbbell.png';
// const houseIconImg = '/Assets/Icons/Chef-Hatt.png';

const CategoryList = ({ products = [],categories }) => {
  const router = useRouter();
  const handleCategoryClick = (categoryId) => {
    console.log(categoryId,"categoryclick")
    router.push(`/Product-list/${categoryId}`);
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white py-4">
      <div className="container mx-auto">
        {categories.length > 8 ? (
          <Slider {...settings}>
            {categories.map((category, index) => (
       
              <div key={category._id}>
                <div
                  className={classNames(
                    'text-sm font-semibold pt-3 rounded-lg flex flex-col items-center transition duration-300 cursor-pointer'
                  )}
                  onClick={() => handleCategoryClick(category._id)}
                  style={{
                    backgroundColor: category.bgColor,
                    color: category.textColor,
                    width: '148px',
                    height: '100px',
                    margin: '0 auto',
                    pointerEvents: 'auto',
                  }}
                >
                  <Image
                    src={furnitureIconImg}
                    alt={category.categoryName}
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                  <span className="text-center pt-2">{category.categoryName}</span>
                </div>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <div
                key={category._id}
                className={classNames(
                  'text-xs font-semibold pt-3 rounded-lg flex flex-col items-center transition duration-300 cursor-pointer'
                )}
                onClick={() => handleCategoryClick(category._id)}
                style={{
                  backgroundColor: category.bgColor,
                  color: category.textColor,
                  width: '148px',
                  height: '100px',
                }}
              >
                <Image
                  src={category.image}
                  alt={category.categoryName}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                <span className="text-center pt-2">{category.categoryName}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

CategoryList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default CategoryList;
