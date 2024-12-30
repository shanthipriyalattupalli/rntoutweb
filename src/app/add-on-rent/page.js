"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState(""); 
  const [error, setError] = useState("");
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [BusinessId, setBusinessId] = useState("");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("userToken");
    setUserId(userId);
    setToken(token);
  }, []);
  // console.log(token, "token of user")

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
    return isSelected ? "#FFFFFF" : "#000000";
  };

  const handleCardClick = (id, label) => {
    setSelectedCategory(id);
    setSelectedCategoryLabel(label);
    setError(""); 
    localStorage.setItem("selectedcategoryId", id);
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      console.log(response?.data.categories, "Categories fetched");
      setCategories(response?.data.categories);
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


  const fetchBusinessDetails = async () => {
    if (!token) {
      console.error("Token is not set yet");
      return;
    }
    try {
      // console.log("Token:", token);
      const response = await axios.get(`${BASE_URL}/business-info`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.data._id, "Business Information");
      setBusinessId(response.data?.data?._id)

    } catch (error) {
      console.error("Error :", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchBusinessDetails();
    }
  }, [token]);


  const handleNextClick = () => {
    if (selectedCategoryLabel && selectedCategory && BusinessId) {
      console.log(selectedCategory, "selected category");
      router.push(`/add-on-rent/add-details?${selectedCategoryLabel}`);
    }
     else {
      setError("Please select a category before proceeding.");
    }
  };

  return (
    <div className='category-container'>
      <ToastContainer/>
      <h1>🔥 Got something cool? Rent it out! 😎</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className='category-grid'>
        {categories?.map((category, index) => (
          <div
            key={category._id}
            className={`category-card ${selectedCategory === category._id ? "selected" : ""
              }`}
            style={{
              backgroundColor: getCategoryColor(
                index,
                selectedCategory === category._id
              ),
              color: getTextColor(selectedCategory === category._id),
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
      <button className='next-button' onClick={handleNextClick}>
        Next
      </button>
    </div>
  );
};

export default CategoryGrid;
