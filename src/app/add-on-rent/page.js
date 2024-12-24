"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "@/styles/Add.css";
import {
  FaDesktop,
  FaCouch,
  FaCar,
  FaDumbbell,
  FaStethoscope,
  FaHome,
  FaUmbrellaBeach,
  FaBirthdayCake,
  FaEllipsisH,
} from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

const CategoryGrid = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState(""); // State to store the selected category label
  const [error, setError] = useState(""); // State to handle errors
  const router = useRouter();

  // Define background colors
  const categoryColors = [
    "#008A000D",
    "#00ABA90D",
    "#6A00FF0D",
    "#D800730D",
    "#1BA1E20D",
    "#A200250D",
    "#0050EF0D",
    "#AA00FF0D",
    "#F480030D",
  ];

  // Function to get background color for a category
  const getCategoryColor = (index, isSelected) => {
    return isSelected
      ? "#6A00FF"
      : categoryColors[index % categoryColors.length];
  };

  // Function to get text color for a category
  const getTextColor = (isSelected) => {
    return isSelected ? "#FFFFFF" : "#000000"; // White for selected, black for others
  };

  const handleCardClick = (id, label) => {
    setSelectedCategory(id);
    setSelectedCategoryLabel(label);
    setError(""); // Clear error if a category is selected
    localStorage.setItem("selectedcategoryId", id);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      console.log(response?.data.categories, "Categories fetched");
      setCategories(response?.data.categories);

      // Automatically select the first category
      if (response?.data.categories.length > 0) {
        const firstCategory = response.data.categories[0];
        setSelectedCategory(firstCategory._id);
        setSelectedCategoryLabel(firstCategory.categoryName);
        localStorage.setItem("selectedcategoryId", firstCategory._id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNextClick = () => {
    if (selectedCategoryLabel && selectedCategory) {
      console.log(selectedCategory, "selected category");
      // Navigate to the next page with the selected category ID
      router.push(`/add-on-rent/add-details?${selectedCategoryLabel}`);
    } else {
      setError("Please select a category before proceeding.");
    }
  };

  return (
    <div className='category-container'>
      <h1>🔥 Got something cool? Rent it out! 😎</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className='category-grid'>
        {categories?.map((category, index) => (
          <div
            key={category._id}
            className={`category-card ${
              selectedCategory === category._id ? "selected" : ""
            }`}
            style={{
              backgroundColor: getCategoryColor(
                index,
                selectedCategory === category._id
              ),
              color: getTextColor(selectedCategory === category._id), // Apply text color dynamically
            }}
            onClick={() => handleCardClick(category._id, category.categoryName)}
          >
            <img
              src={category.image}
              className='category-icon'
              alt={category.categoryName}
            />
            <p
              style={{ color: getTextColor(selectedCategory === category._id) }}
            >
              {category.categoryName}
            </p>
            {selectedCategory === category._id && (
              <MdCheckCircle className='check-icon' />
            )}
          </div>
        ))}
      </div>
      {error && <p className='error-message'>{error}</p>}{" "}
      {/* Display error message */}
      <button className='next-button' onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};

export default CategoryGrid;
