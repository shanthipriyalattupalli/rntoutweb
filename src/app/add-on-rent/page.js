"use client";
import React, { useState } from 'react';
import "@/styles/Add.css";
import { FaDesktop, FaCouch, FaCar, FaDumbbell, FaStethoscope, FaHome, FaUmbrellaBeach, FaBirthdayCake, FaEllipsisH } from 'react-icons/fa';
import { MdCheckCircle } from 'react-icons/md';
import { useRouter } from "next/navigation";

const CategoryGrid = () => {
  const categories = [
    { id: 1, icon: <FaDesktop />, label: "IT Infrastructure", color: "category-green" },
    { id: 2, icon: <FaCouch />, label: "Furniture", color: "category-lightgreen" },
    { id: 3, icon: <FaCar />, label: "Vehicles", color: "category-lavender" },
    { id: 4, icon: <FaDumbbell />, label: "Sport & Gym", color: "category-pink" },
    { id: 5, icon: <FaStethoscope />, label: "Medical Equipment", color: "category-lightblue" },
    { id: 6, icon: <FaHome />, label: "Household & Kitchen", color: "category-beige" },
    { id: 7, icon: <FaUmbrellaBeach />, label: "Vacation Equipment", color: "category-blue" },
    { id: 8, icon: <FaBirthdayCake />, label: "Party Material", color: "category-lightpurple" },
    { id: 9, icon: <FaEllipsisH />, label: "Other", color: "category-lightyellow" }
  ];

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCardClick = (id) => {
    setSelectedCategory(id);
  };

  const router = useRouter();

  return (
    <div className="category-container">
      <h1>🔥 Got something cool? Rent it out! 😎</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      <div className="category-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${category.color} ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => handleCardClick(category.id)}
          >
            <div className="category-icon">{category.icon}</div>
            <p>{category.label}</p>
            {selectedCategory === category.id && <MdCheckCircle className="check-icon" />}
          </div>
        ))}
      </div>
      <button className="next-button" onClick={() => router.push("/add-on-rent/add-details")}>Next</button>
    </div>
  );
};

export default CategoryGrid;
