"use client";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const CategorySection = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Check localStorage for selected categoryId or default to the first category
    const storedCategoryId = localStorage.getItem("categoryId");
    const defaultCategoryId = storedCategoryId || (categories[0] && categories[0]._id);
    setSelectedCategory(defaultCategoryId);
  }, [categories]);

  const handleCategoryClick = (categoryId) => {
    localStorage.setItem("categoryId", categoryId); // Save to localStorage
    setSelectedCategory(categoryId); // Update state
    window.location.reload(); // Refresh the page
  };

  return (
    <div className="bg-white pt-6">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Our Top Trending Products</h1>
        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="bg-white-100 py-4">
        <div className="container mx-auto flex flex-wrap justify-center gap-1">
          {categories.map((category) => (
            <button
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className={`flex items-center py-1 text-sm px-1 rounded-lg transition duration-300 ${
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
                className="h-4 w-4 mr-2"
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
