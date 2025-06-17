"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../styles/Add.css';
import Swal from "sweetalert2";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";


const CategoryGrid = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCategoryLabel, setSelectedCategoryLabel] = useState(""); 
  const [isRenterInfo,setRenterInfo]=useState()
  const [error, setError] = useState("");
  const router = useRouter();
  const token =Cookies.get("userToken")
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
    const baseColor = categoryColors[index % categoryColors.length];
    return isSelected ? baseColor.replace("0D", "80") : baseColor; // 50% opacity when selected
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


 const fetchBusinessProfile=async()=>{
  try {
    const response=await axios.get(`${BASE_URL}/users/business/check`,{
      headers: { Authorization: `Bearer ${token}` },
    });



    setRenterInfo(response.data.success)
  } catch (error) {

         if (error.response && error.response.status === 401) {
                Swal.fire({
                  icon: "error",
                  title: "Login Required",
                  text: "Please login to proceed with payment.",
                });
              }
    
  }
 }

 useEffect(()=>{
  fetchBusinessProfile()
 },[])



  const handleNextClick =async () => {
    if (selectedCategoryLabel && selectedCategory && isRenterInfo === true) {
      const encodedLable = encodeURIComponent(selectedCategoryLabel);
      router.push(`/add-on-rent/add-details?name=${encodedLable}`);
    }
      else {
            // Show confirmation alert before redirecting
            const result = await Swal.fire({
              title: "KYC Required",
              text: "To add a rent an item, you need a renter info",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "clik OK to add renter info",
              cancelButtonText: "Cancel",
            });
        
            if (result.isConfirmed) {
              router.push("/profile/Renter-information");
            }
          }
    }
  

  return (
    <div className='category-container'>
      <h1>🔥 Got something cool? Rent it out! 😎</h1>
      <p>Got something cool? Rent it out! </p>
      <div className='category-grid'>
        {categories?.map((category, index) => (
      <div
      key={category._id}
      className={`category-card ${selectedCategory === category._id ? "selected" : ""}`}
      style={{
        backgroundColor: getCategoryColor(index, selectedCategory === category._id),
        color: getTextColor(selectedCategory === category._id),
      }}
      onClick={() => handleCardClick(category._id, category.categoryName)}
    >
      <img
        src={category.image}
        className='category-icon'
        alt={category.categoryName}
        style={{
          backgroundColor: getCategoryColor(index, selectedCategory === category._id),
          color: getTextColor(selectedCategory === category._id),
        }}
      />
      <p>{category.categoryName}</p>
      {selectedCategory === category._id && <MdCheckCircle className='check-icon' />}
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
