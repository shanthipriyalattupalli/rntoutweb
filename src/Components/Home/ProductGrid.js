"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const CategorySection = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Get categoryId from localStorage or default to the first category
    const storedCategoryId =
      typeof window !== "undefined" ? localStorage.getItem("categoryId") : null;
    const defaultCategoryId =
      storedCategoryId || (categories[0] && categories[0]._id);

    if (defaultCategoryId) {
      setSelectedCategory(defaultCategoryId);
      localStorage.setItem("categoryId", defaultCategoryId); // Ensure it's stored by default
    }

    if (defaultCategoryId) {
      console.log(`Fetching products for categoryId: ${defaultCategoryId}`);
    }
  }, [categories]);

  const handleCategoryClick = (categoryId) => {
    console.log(categoryId, "categoryId in handleCategoryClick");
    localStorage.setItem("categoryId", categoryId); // Save to localStorage
    setSelectedCategory(categoryId); // Update state
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="bg-white pt-8">
      <div className="flex flex-col gap-2  px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">
          Our Top Trending Products
        </h1>
        <p className="text-gray-600">
        "Explore Our Most Popular Rental Picks – Trusted, Affordable, and Ready for You!" 🚀
        </p>
      </div>

      <div className="bg-white-100 py-6">
        <div className="flex flex-wrap justify-center gap-2">
          {categories?.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className={`flex items-center py-1  text-sm px-1 rounded-lg transition duration-300 ${
                selectedCategory === category._id
                  ? "bg-[#F0F5FF] border border-[#2F6FED] text-blue-700" // Selected background
                  : "bg-white text-gray-800 border border-slate-300 hover:bg-blue-100"
              }`}
              style={{
                boxShadow:
                  selectedCategory === category._id
                    ? "0px 1px 1px rgba(0, 0, 255, 0.1)"
                    : "none",
              }}
            >
              <Image
                src={category.image || "/default-icon.png"} // Use category-specific icon or a default
                alt={`${category.categoryName} icon`}
                className="h-5 w-5 mr-2"
                width={16}
                height={16}
              />
              {category.categoryName}
            </button>
          ))}
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
      icon: PropTypes.string,
    })
  ).isRequired,
};

export default CategorySection;
