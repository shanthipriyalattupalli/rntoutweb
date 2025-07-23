"use client"; // For client-side rendering in Next.js App Router

import React from "react";
import { useRouter } from "next/navigation";
import PropTypes from "prop-types";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
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
      className="absolute top-1/2 left-[5px] transform -translate-y-1/2 z-10"
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
        breakpoint: 1440,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1340,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="bg-white py-4 flex flex-col">
      <div className="h-auto px-2 md:px-10 lg:px-24 xl:px-20">
        <h1 className="text-xl sm:text-2xl font-bold pb-4 text-left">Explore</h1>

        {isLoading ? (
          <Categories shimmerArray={shimmerArray} />
        ) : (
          <>
            {/* Grid for small devices */}
            <div className="grid grid-cols-4 gap-4 mt-4 sm:hidden">
              {categories?.map((category, index) => (
                <div key={category._id} className="flex flex-col gap-2 items-center">
                  <div
                    title={category.categoryName}
                    className="text-xs font-semibold pt-3 border border-[rgba(7,7,7,0.05)] flex flex-col items-center transition duration-300 cursor-pointer w-full h-[50px]"
                    onClick={() => handleCategoryClick(category._id)}
                    style={{
                      backgroundColor: bgColors[index % bgColors.length],
                      borderRadius: "5px",
                    }}
                  >
                    <Image
                      src={category.image}
                      alt={category.categoryName}
                      width={48}
                      height={48}
                      className="w-8 h-8"
                    />
                  </div>
                  <span className="text-center truncate w-16 text-[12px]">
                    {category.categoryName}
                  </span>
                </div>
              ))}
            </div>

            {/* Slider for sm and above */}
            <div className="hidden sm:block">
              <Slider {...settings} className="relative">
                {categories.map((category, index) => (
                  <div key={category._id} className="px-2">
                    <div
                      title={category.categoryName}
                      className="text-sm font-semibold pt-3 w-[40px] sm:w-[150px] rounded-lg flex flex-col items-center transition duration-300 cursor-pointer"
                      onClick={() => handleCategoryClick(category._id)}
                      style={{
                        backgroundColor: bgColors[index % bgColors.length],
                        borderRadius: "20px",
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
                      <span className="text-center pt-2 w-[120px] truncate block">
                        {category.categoryName}
                      </span>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </>
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
