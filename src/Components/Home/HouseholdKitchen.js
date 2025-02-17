"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";

const pro1 = "/Assets/laptop-1.jpg";
const pro2 = "/Assets/laptop-2.jpg";
const pro3 = "/Assets/laptop-3.jpg";
const pro4 = "/Assets/laptop-4.jpg";
const pro5 = "/Assets/laptop-5.jpg";
// Lazy loading ProductItems component
const ProductItems = lazy(() => import("./ProductItems"));

const HouseholdKitchen = ({ products, categoryId }) => {
  // Defaulting to an empty array
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [numProducts, setNumProducts] = useState(4);
  // Check if there are products and set the slide logic accordingly
  const nextSlide = () => {
    if (products.length > 0 && currentSlide < products.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    if (products.length > 0 && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(products.length - 1);
    }
  };

  useEffect(() => {
    if (isAutoplay && products.length > 0) {
      const autoplayTimer = setInterval(() => {
        nextSlide();
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(autoplayTimer);
    }
  }, [currentSlide, isAutoplay, products.length]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1535) {
        setNumProducts(5); // 2xl screens
      } else if (window.innerWidth >= 1280) {
        setNumProducts(4); // xl screens
      } else if (window.innerWidth >= 1024) {
        setNumProducts(4); // lg screens
      } else if (window.innerWidth >= 768) {
        setNumProducts(3); // md screens
      } else if (window.innerWidth >= 640) {
        setNumProducts(2); // sm screens
      } else {
        setNumProducts(1); // default (small screens)
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
   products.length >0 && 
<div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
  <div className="mx-auto p-4 md:p-6">
    {/* Heading Section */}
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <h1 className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-gray-800 text-center sm:text-left">
      HouseholdKitchen{" "}
        <span className="text-white font-normal p-1 px-2 bg-teal-700 text-xs ml-2 rounded-lg">
          {products.length} Products
        </span>
      </h1>
      <a
        href={`/Product-list/${categoryId}`}
        className="text-blue-500 hover:text-blue-700 text-sm font-medium flex items-center mt-2 sm:mt-0"
      >
        View all{" "}
        <svg
          className="w-4 h-4 inline-block ml-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </a>
    </div>

    {/* Product Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-2 sm:gap-4 md:gap-6 2xl:gap-10 mt-6">
      {products?.slice(0, numProducts)?.map((product) => (
        <Suspense key={product._id} fallback={<div>Loading...</div>}>
          <ProductItems product={product} />
        </Suspense>
      ))}
    </div>

  </div>
</div>
  );
};

export default React.memo(HouseholdKitchen);
