"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const CategorySection = ({ categories, isLoading,categoryIds }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const storedCategoryId =
      typeof window !== "undefined" ? localStorage.getItem("categoryId") : null;
    const defaultCategoryId =
      storedCategoryId || (categories[0] && categories[0].categoryId);

    if (defaultCategoryId) {
      setSelectedCategory(defaultCategoryId);
      localStorage.setItem("categoryId", defaultCategoryId);
    }
  }, [categories]);

  const handleCategoryClick = (categoryId) => {

    categoryIds(categoryId);
    setSelectedCategory(categoryId);
  };

  return (
    <div className="bg-white pt-8 justify-center">
<div className="flex flex-col gap-2 px-[20px] sm:px-[80px] text-center">
        <h1 className="text-sm sm:text-3xl font-bold text-gray-800">
          Our Top Trending Products
        </h1>
        <p className="text-gray-600">
          "Explore Our Most Popular Rental Picks – Trusted, Affordable, and Ready for You!" 🚀
        </p>
      </div>

      <div className="bg-white py-6">
  <div className="w-full overflow-x-auto px-[80px]">
    <div
      className={`flex gap-2 xl:gap-6 scrollbar-hide ${
        categories?.length > 5 ? "overflow-x-auto flex-nowrap" : "flex-wrap justify-between"
      }`}
    >
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="w-[150px] h-[40px] bg-gray-300 rounded-[10px] animate-pulse flex-shrink-0"
            ></div>
          ))
        : categories?.map((category) => (
            <button
              key={category?.categoryId}
              onClick={() => handleCategoryClick(category?.categoryId)}
              className={`w-auto flex items-center py-1 text-sm px-1 rounded-[10px] transition duration-300 flex-shrink-0 ${
                selectedCategory === category?.categoryId
                  ? "bg-[#F0F5FF] border border-[#2F6FED] text-blue-700"
                  : "bg-white text-gray-800 border border-slate-300 hover:bg-blue-100"
              }`}
              style={{
                boxShadow:
                  selectedCategory === category?.categoryId
                    ? "0px 1px 1px rgba(0, 0, 255, 0.1)"
                    : "none",
              }}
            >
              <Image
                src={category?.image || "/default-icon.png"}
                alt={`${category?.categoryName} icon`}
                className="h-5 w-5 mr-2"
                width={16}
                height={16}
              />
              {category?.categoryName}
            </button>
          ))}
    </div>
  </div>
</div>


    </div>
  );
};

CategorySection.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      categoryName: PropTypes.string.isRequired,
      image: PropTypes.string,
    })
  ).isRequired,
};

export default CategorySection;
