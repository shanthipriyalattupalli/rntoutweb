"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const Submenu = ({ categories }) => {
  const router = useRouter();
  const params = useParams(); // Get the categoryId from the route params
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    if (params?.categoryId) {
      setActiveMenu(params.categoryId); // Set active menu from the route
    }
  }, [params?.categoryId]);

  const handleMenuClick = (categoryId) => {
    setActiveMenu(categoryId);
    router.push(`/Product-list/${categoryId}`); // Navigate to ProductList with categoryId
  };

  return (
    <div className="container mx-auto flex mt-4 pt-4">
      <nav className="flex flex-row gap-4 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleMenuClick(category._id)}
            className={`flex items-center gap-1 px-1 py-1 border-t border-l border-r rounded-t-lg ${
              activeMenu === category._id
                ? "bg-white text-red-500"
                : "bg-slate-200"
            } hover:bg-white transition-colors duration-300`}
          >
            <span className="text-sm font-xs">{category.categoryName}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Submenu;
