"use client"; // For client-side rendering in Next.js App Router

import React from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import classNames from "classnames";
import Categories from "../Shimmer/Categories";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const left = '/Assets/leftarrow.svg';


const bgColors = [
  "#008A000D",
  "#00ABA90D",
  "#1BA1E20D",
  "#0050EF0D",
  "#6A00FF0D",
  "#AA00FF0D",
  "#D800730D",
  "#A200250D",
];

const CategoryList = ({ products = [], categories, isLoading }) => {
  const router = useRouter();

  const handleCategoryClick = (categoryId) => {
    router.push(`/Product-list/${categoryId}`);
  };


  const shimmerArray = new Array(8).fill(null);
  const NextArrow = ({ onClick }) => (
    <button
      className="absolute top-1/2 right-[5px] transform -translate-y-1/2 z-10"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (onClick) onClick();
      }}
    >
      <img src={left} alt="Next" className="rotate-180" />
    </button>
  );
  
  const PrevArrow = ({ onClick }) => (
    <button
      className="absolute top-1/2 left-[5px]  transform -translate-y-1/2 z-10"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (onClick) onClick();
      }}
    >
      <img src={left} alt="Previous" />
    </button>
  );
  
  
  


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-white py-4 flex flex-col">
      <div className="h-auto sm:px-8 md:px-10 lg:px-24 xl:px-20">
        <h1 className="text-xl sm:text-2xl font-bold pb-4 text-center sm:text-left">
          Rent Furniture & Appliances
        </h1>

        {isLoading ? (
          // Shimmer Effect
          // <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 mt-4">
          //   {shimmerArray.map((_, index) => (
          //     <div
          //       key={index}
          //       className="w-full h-[100px] bg-gray-200 animate-pulse rounded-lg flex flex-col items-center"
          //     >
          //       <div className="w-12 h-12 bg-gray-300 rounded-full mt-3"></div>
          //       <div className="w-24 h-4 bg-gray-300 mt-2 rounded"></div>
          //     </div>
          //   ))}
          // </div>
          <Categories shimmerArray={shimmerArray} />
        ) : categories?.length > 8 ? (
          <Slider {...settings} className="relative">
            {categories.map((category, index) => (
              <div key={category._id} className="px-2">
                <div
                  className="text-sm font-semibold pt-3 rounded-lg flex flex-col items-center transition duration-300 cursor-pointer"
                  onClick={() => handleCategoryClick(category._id)}
                  style={{
                    backgroundColor: bgColors[index % bgColors.length],
                    borderRadius: "20px",
                    width: "150px",
                    height: "100px",
                    margin: "0 auto",
                  }}
                >
                  <Image
                    src={category.image}
                    alt={category.categoryName}
                    width={48}
                    height={48}
                    className="w-12 h-12"
                  />
                  <div className="relative group">
                    <span className="text-center pt-2 w-[120px] truncate block">
                      {category.categoryName}
                    </span>
                    {/* <div className="absolute left-1/2 -translate-x-1/2 top-[10px] mb-2 hidden group-hover:block bg-gray-500 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap">
                      {category.categoryName}
                    </div> */}
                  </div>


                </div>
              </div>
            ))}
          </Slider>

        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 mt-4">
            {categories?.map((category, index) => (
              <div
                key={category._id}
                className="text-xs font-semibold pt-3 border border-[rgba(7,7,7,0.05)] rounded-lg flex flex-col items-center transition duration-300 cursor-pointer w-full h-[100px]"
                onClick={() => handleCategoryClick(category._id)}
                style={{
                  backgroundColor: bgColors[index % bgColors.length],
                  borderRadius: "20px",
                }}
              >
                <Image
                  src={category.image}
                  alt={category.categoryName}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
                <span className="text-center pt-2 truncate w-24">
                  {category.categoryName}
                </span>
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
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      categoryName: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      bgColor: PropTypes.string,
      textColor: PropTypes.string,
    })
  ).isRequired,
};

export default CategoryList;
