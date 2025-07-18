"use client";

import React, { useState, useEffect, lazy, Suspense } from "react";
import Link from "next/link";
import ProductCard from "../Shimmer/ProductCard";
import Cookies from "js-cookie";
import axios from "axios";

const pro1 = "/Assets/laptop-1.jpg";
const pro2 = "/Assets/laptop-2.jpg";
const pro3 = "/Assets/laptop-3.jpg";
const pro4 = "/Assets/laptop-4.jpg";
const pro5 = "/Assets/laptop-5.jpg";

// Lazy loading ProductItem component
const ProductItems = lazy(() => import("../Home/ProductItems"));

const ITInfrastructure = ({ categoryName,title,categoryId,isLoading }) => {
const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  console.log(categoryName,"categoryName")
const latitude=Cookies.get('latitude');
const longitude=Cookies.get('longitude');
const radius=Cookies.get('selectedDistance');
console.log(longitude,latitude,radius,"latittuse")

  const [products,setProducts]=useState([])
const fetchProducts = async () => {
  console.log(latitude, longitude, radius, "");

  try {
    const response = await axios.get(`${BASE_URL}/variants/variants-by-category`, {
      params: {
        latitude,
        longitude,
        radius,
      },
    });

    console.log(response, "product array of fetch");

    const productsArray = response?.data?.data[categoryName];
    console.log(productsArray, "productarray");

    setProducts(productsArray);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

useEffect(() => {
  fetchProducts();
}, [latitude, longitude, radius]);



  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [numProducts, setNumProducts] = useState(4);


  const nextSlide = () => {
    if (products?.length > 0 && currentSlide < products?.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };

  const prevSlide = () => {
    if (products?.length > 0 && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    } else {
      setCurrentSlide(products?.length - 1);
    }
  };

  useEffect(() => {
    if (isAutoplay && products?.length > 0) {
      const autoplayTimer = setInterval(() => {
        nextSlide();
      }, 3000); // Change slide every 3 seconds
      return () => clearInterval(autoplayTimer);
    }
  }, [currentSlide, isAutoplay, products?.length]);



  useEffect(() => {
    if (typeof window === 'undefined') return; 
    const handleResize = () => {
      if (window.innerWidth >= 1535) {
        setNumProducts(5); // 2xl screens
      } else if (window.innerWidth >= 1280) {
        setNumProducts(5); // xl screens
      } else if (window.innerWidth >= 1024) {
        setNumProducts(4); // lg screens
      } else if (window.innerWidth >= 768) {
        setNumProducts(3); // md screens
      } else if (window.innerWidth >= 640) {
        setNumProducts(3); // sm screens
      } else {
        setNumProducts(2); 
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
  products?.length >0 &&  
<div className="mt-4 sm:mt-10 px-2 sm:px-6 md:px-8 lg:px-12 xl:px-16">
  <div className="mx-auto  md:p-6">
    {/* Heading Section */}
    <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
      <h1 className="text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-gray-800 text-center sm:text-left">
        {title}{" "}
        {/* <span className="text-white font-normal p-1 px-2 bg-teal-700 text-xs ml-2 rounded-lg">
          {products.length} Products
        </span> */}
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
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-[10px] sm:gap-4 md:gap-[30px] 2xl:gap-10 mt-6">
      {products?.slice(0, numProducts)?.map((product) => (
        <Suspense key={product._id} fallback={<ProductCard/>}>
          <ProductItems product={product} />
        </Suspense>
      ))}
    </div>
  </div>
</div>


  );
};

export default React.memo(ITInfrastructure);
