"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import axios from "axios";
const Navigation = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);
  const router = useRouter(); // Initialize useRouter
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const categoryImages = {
    ItInfrastructure: "/Assets/itinfrastructure.svg",
    Furniture: "/Assets/furnitures.svg",
    MedicalEquipment: "/Assets/medicalequip.svg",
    VacationEquipment: "/Assets/vaccationequip.svg",
    Vehicles: "/Assets/vehicle.svg",
    PartyMaterial: "/Assets/partmaterial.svg",
    Sport: "/Assets/gym.svg",
    Household: "/Assets/kitchen.svg",
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch Subcategories by Category ID
  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/subcategories/categories/${categoryId}`
      );
      setSubcategories(response.data || []);
      setActiveCategory(categoryId); // Set active category
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Handle Mouse Enter
  const handleMouseEnter = (categoryId) => {
    clearTimeout(timeoutId); // Clear any existing timeout
    fetchSubCategories(categoryId); // Fetch subcategories
  };

  // Handle Mouse Leave
  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setActiveCategory(null); // Hide subcategories after 1000ms
    }, 1000);
    setTimeoutId(id);
  };

  // Handle Subcategory Click
  const handleSubcategoryClick = (categoryId, subcategoryId) => {
    router.push(`/Product-list/${categoryId}`);
  };

  // Initialize Categories on Mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <nav className="w-full px-20 bg-white border border-slate-200 relative z-20">
      <div className="max-w-16xl mx-auto">
        <div className="flex items-center h-12 gap-1 ">
          {categories?.map((category) => (
            <div
              key={category._id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(category._id)}
              onMouseLeave={handleMouseLeave}
            >
              <button className="w-42 justify-center flex items-center space-x-2 text-gray-700 hover:text-gray-900 py-2">
                <img
                  src={category.image}
                  alt={category.categoryName}
                  className="w-5 h-5"
                />
                <span className="font-poppins text-sm font-normal leading-5 text-center [text-underline-position:from-font] [text-decoration-skip-ink:none]">
                  {category.categoryName}
                </span>
                <img
                  src={"/Assets/down_line.svg"}
                  alt={category.categoryName}
                  className="w-5 h-5"
                />
              </button>
              {activeCategory === category._id && (
                <div className="absolute left-0 top-full w-48 bg-white rounded-md shadow-lg z-10">
                  {subcategories.map((subcategory) => (
                    <a
                      key={subcategory._id}
                      onClick={() =>
                        handleSubcategoryClick(category._id, subcategory._id)
                      }
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-poppins text-sm font-normal leading-5 [text-underline-position:from-font] [text-decoration-skip-ink:none] cursor-pointer"
                    >
                      {subcategory.subCategoryName}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
