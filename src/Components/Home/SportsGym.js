"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
const pro1 = "/Assets/laptop-1.jpg";
const pro2 = "/Assets/laptop-2.jpg";
const pro3 = "/Assets/laptop-3.jpg";
const pro4 = "/Assets/laptop-4.jpg";
const pro5 = "/Assets/laptop-5.jpg";
// Lazy loading ProductItems component
const ProductItems = lazy(() => import("./ProductItems"));

const SportsGym = ({ }) => { // Defaulting to an empty array
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const products=[
    {
        id: 1,
        imgSrc: pro1,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },
      {
        id: 2,
        imgSrc: pro2,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },
      {
        id: 3,
        imgSrc: pro3,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },
      {
        id: 4,
        imgSrc: pro4,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },
      {
        id: 5,
        imgSrc: pro5,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      }
  ]
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

  if (!products || products.length === 0) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800">Sports & Gym</h1>
        <p>No products available in the Sports & Gym category.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">
            SportsGym{" "}
            <span className="text-blue-300 p-1 px-2 bg-slate-100 text-xs ml-2 rounded-lg">
              {products.length} Products
            </span>
          </h1>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 text-sm font-medium"
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

        {/* Carousel */}
        {products.length > 5 && (
          <div className="carousel flex items-center justify-center space-x-4">
            <button
              onClick={prevSlide}
              className="text-white bg-blue-500 p-2 rounded-full"
            >
              Prev
            </button>
            <Suspense fallback={<div>Loading...</div>}>
              <ProductItems product={products[currentSlide]} />
            </Suspense>
            <button
              onClick={nextSlide}
              className="text-white bg-blue-500 p-2 rounded-full"
            >
              Next
            </button>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {products.map((product) => (
            <Suspense key={product.id} fallback={<div>Loading...</div>}>
              <ProductItems product={product} />
            </Suspense>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(SportsGym);
