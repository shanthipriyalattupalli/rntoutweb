"use client";

import React from "react";
import { useRouter } from "next/navigation";
import "../../../styles/productlist.css";

const Submenu = ({ categories, setCategoryId, categoryId }) => {
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
 <div className="w-full overflow-x-auto scroll-hidden">
  <nav className="flex flex-row gap-4 border-b-2 px-2 py-2 whitespace-nowrap">
    {categories?.map((category, index) => (
      <button
        key={category._id}
        onClick={() => setCategoryId(category._id)}
        className={`flex items-center gap-2 px-3 py-2 border-t border-l border-r rounded-t-lg shrink-0 ${
          categoryId === category._id
            ? "bg-white text-red-500 border-red-400"
            : "bg-slate-200"
        } hover:bg-white transition-colors duration-300`}
      >
        {images[index] && (
          <img
            src={images[index]}
            alt={`${category.categoryName} icon`}
            className={`w-6 h-6 ${categoryId === category._id ? "filter-red" : ""}`}
          />
        )}
        <span className="text-sm">{category.categoryName}</span>
      </button>
    ))}
  </nav>
</div>

  );
};

export default Submenu;
