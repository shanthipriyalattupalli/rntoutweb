"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
// import '@/styles/productlist.css'
import '../../../styles/productlist.css';
// const it='/Assets/it.svg'
// const furniture='/Assets/furniture.svg';
// const medical ='/Assets/medical.svg';
// const vaccation='/Assets/vaccaton.svg';
// const vehicles='/Aseets/vehicles.svg';
// const party ='/Assets/party.svg';
// const sport='Assets/sport.svg';
// const household='Assets/household.svg'; 
const Submenu = ({ categories, setCategoryId,categoryId }) => {
  let category = categories;
  const router = useRouter();
  const images = [
    "/Assets/it.svg",
    "/Assets/furniture.svg",
    "/Assets/medical.svg",
    "/Assets/vaccation.svg",
    "/Assets/vehicles.svg",
    "/Assets/party.svg",
    "/Assets/sport.svg",
    "/Assets/household.svg",
  ];

  return (
    <div className='container flex '>
      <nav className='flex flex-row gap-4 overflow-x-auto border-b-2'>
      {categories?.map((category, index) => (
  <button
    key={category._id}
    onClick={() => setCategoryId(category._id)}
    className={`flex items-center gap-1 px-1 py-1 border-t border-l border-r rounded-t-lg ${
      categoryId === category._id ? "bg-white text-red-500 border-red-400" : "bg-slate-200"
    } hover:bg-white transition-colors duration-300`}
  >
    {images[index] && (
      <img 
        src={images[index]} 
        alt={`${category.categoryName} icon`} 
        className={`w-6 h-6 ${categoryId === category._id ? "filter-red" : ""}`} 
      />
    )}
    <span className="text-sm font-xs">{category.categoryName}</span>
  </button>
))}

      </nav>
    </div>
  );
};

export default Submenu;
