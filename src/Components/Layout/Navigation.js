"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navigation = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const categoryRefs = useRef({});
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const timeoutRef = useRef(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(`${BASE_URL}/subcategories/categories/${categoryId}`);
      setSubcategories(response.data || []);
      setActiveCategory(categoryId);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleCategoryHover = (categoryId, event) => {
    clearTimeout(timeoutRef.current); // Clear timeout if any
    fetchSubCategories(categoryId);

    if (categoryRefs.current[categoryId]) {
      const rect = categoryRefs.current[categoryId].getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom - 10,
        left: rect.left,
      });
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveCategory(null);
      setSubcategories([]);
    }, 200);
  };

  const handleSubcategoryClick = (categoryId, subcategoryId) => {
    router.push(`/Product-list/${categoryId}`);
    localStorage.setItem(`subcategoryId_${categoryId}`, subcategoryId);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const categoryContainer = document.getElementById("category-container");
    if (categoryContainer) {
      const handleWheelScroll = (event) => {
        if (event.deltaY !== 0) {
          event.preventDefault();
          categoryContainer.scrollLeft += event.deltaY;
        }
      };
      categoryContainer.addEventListener("wheel", handleWheelScroll);
      return () => categoryContainer.removeEventListener("wheel", handleWheelScroll);
    }
  }, []);

  return (
    <nav className="px-4 sm:px-20 bg-white border border-slate-200 relative">
      <div className="relative">
        <div
          id="category-container"
          className="flex items-center h-12 gap-2 2xl:gap-16 overflow-x-auto overflow-visible whitespace-nowrap scrollbar-hide relative"
        >
          {categories?.map((category) => (
            <div
              key={category._id}
              className="relative"
              onMouseEnter={(event) => handleCategoryHover(category._id, event)}
              onMouseLeave={handleMouseLeave}
              ref={(el) => (categoryRefs.current[category._id] = el)}
            >
              <button className="flex items-center space-x-1 sm:space-x-2 text-gray-700 hover:text-gray-900 py-2 px-2 sm:px-4">
                <img src={category.image} alt={category.categoryName} className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-poppins text-xs sm:text-sm font-normal leading-5 text-center">
                  {category.categoryName}
                </span>
                <img src={"/Assets/down_line.svg"} alt="Dropdown" className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          ))}
        </div>

        {activeCategory && subcategories.length > 0 && (
          <div
            className="absolute flex flex-col left-0 min-w-[12rem] bg-white rounded-md shadow-lg z-50 border border-gray-200"
            style={{ top: `${dropdownPosition.top - 60}px`, left: `${dropdownPosition.left - 40}px` }}
            onMouseEnter={() => clearTimeout(timeoutRef.current)}
            onMouseLeave={handleMouseLeave}
          >
            {subcategories.map((subcategory) => (
              <a
                key={subcategory._id}
                onClick={() => handleSubcategoryClick(activeCategory, subcategory._id)}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap"
              >
                {subcategory.subCategoryName}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
