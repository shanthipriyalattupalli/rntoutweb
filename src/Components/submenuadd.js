"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
// import "@/styles/Adddetail.css";
import { useRouter } from "next/navigation";
import '../styles/Adddetail.css';

const MenuItems = () => {
  const router = useRouter()
  const searchParams = useSearchParams();
  const selectedCategoryLabel = searchParams.get('name');
  console.log(selectedCategoryLabel, "label available");
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const [subcategories, setSubcategories] = useState([]);
  const [activeItem, setActiveItem] = useState(null); // State to track the active subcategory

  const categoryId=(typeof window !== 'undefined') ? localStorage.getItem("selectedcategoryId") : null;

  // Fetch subcategories by categoryId
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/subcategories/categories/${categoryId}`
      );
      setSubcategories(response.data);

      // Automatically select the first subcategory on page load
      if (response?.data.length > 0) {
        const firstSubcategory = response.data[0];
        setActiveItem(firstSubcategory._id);
        localStorage.setItem("selectedSubCategoryId", firstSubcategory._id);
        window.dispatchEvent(new Event("storage"));
        
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [categoryId]);

  // Handle click event to set the active subcategory
  const handleItemClick = (itemId) => {
    setActiveItem(itemId);

    localStorage.setItem("selectedSubCategoryId", itemId); // Update localStorage
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className='sidebar-menu'>
      <div className='menu-header'>
        <span className='category-title'>{selectedCategoryLabel}</span>
        <button className='change-button'onClick={() => router.back()}>Change</button>
      </div>
      <ul className='menu-list'>
        {subcategories?.map((item) => (
          <li
            key={item._id}
            className={`menu-item ${activeItem === item._id ? "active" : ""}`}
            onClick={() => handleItemClick(item._id)}
          >
            {item.subCategoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItems;
