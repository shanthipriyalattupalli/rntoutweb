"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import ProductGrid from "../../Components/Home/ProductGrid";
import ProductCard from "../Shimmer/ProductCard";
import axios from "axios";
import Cookies from "js-cookie";
const emptyproducts = "/Assets/emptyproducts.svg";

// Dynamically import the ProductItems component for lazy loading
const ProductItems = dynamic(() => import("../Home/ProductItems"), {
  suspense: true,
});

const Products = ({ categories }) => {
  const category = categories
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const [categoryProducts, setCategoryProducts] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(null);


  const latitude = Cookies.get("latitude");
  const longitude = Cookies.get("longitude");
  const distance = Cookies.get("selectedDistance")



  const fetchProductsByCategory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/variants/trending/${categoryId}`);


      setCategoryProducts(response?.data?.data);
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
  }, [categoryId])


  const handleCategoryClick = (categoryId) => {

    setCategoryId(categoryId);
    Cookies.set("categoryId", categoryId, { expires: 7, secure: true, sameSite: "Strict" });
    localStorage.setItem("categoryId", categoryId);
  };

  useEffect(() => {
    const storedCategoryId =
      typeof window !== "undefined" ? localStorage.getItem("categoryId") : null;
    const defaultCategoryId =
      storedCategoryId || (category?.length > 0 ? category[0]?.categoryId : null);

    if (defaultCategoryId) {
      setCategoryId(defaultCategoryId);
      Cookies.set("categoryId", categoryId, { expires: 7, secure: true, sameSite: "Strict" });

      localStorage.setItem("categoryId", defaultCategoryId);
    }
  }, [category]);



  // let products = categoryProducts[categoryId] || []

  return (
    <>
      <ProductGrid categories={category} isLoading={isLoading} categoryIds={handleCategoryClick} />
      {categoryProducts.length > 0 ? <div className='2xl:px-[80px] px-2 sm:px-8 md:px-10 lg:px-24 xl:px-20'>
        <ToastContainer />

        {/* Product Grid */}
        <div className='grid grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-2 sm:gap-4 md:gap-6 2xl:gap-10 gap-3   mt-3'>
          {categoryProducts.map((product) => (
            <Suspense key={product._id} fallback={<ProductCard />}>
              <ProductItems key={product._id} product={product} />
            </Suspense>
          ))}

        </div>

        {/* View All Button Section */}
        <div className='container mx-auto py-4 sm:py-12 sm:py-14 md:py-16'>
          <div className='flex justify-center'>
            <Link href={`/Product-list/${categoryId}`}>
              <button
                className='bg-red-500 hover:bg-red-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl shadow-md focus:outline-none transition duration-300 ease-in-out'
              >
                View all products
              </button>
            </Link>
          </div>
        </div>
      </div> :
        <div className="flex flex-col gap-4 items-center justify-center w-80 mx-auto h-[500px] text-center">
          <img
            src={emptyproducts}
            alt="No products available"
            className="w-full animate-float"
          />
          <span className="pt-10 font-medium text-xl">No Rental Items found</span>
          <span className="font-poppins font-normal text-[12px] leading-[18px] tracking-normal text-center text-[rgba(7,7,7,0.8)]">
            No product found in this category so meanwhile you can explore our other categories.
          </span>
          {/* <a href="/" className="border p-3 rounded-[8px] font-[500] text-[14px] cursor-pointer" style={{ borderColor: "rgba(255, 45, 85, 0.6) ", color:"rgba(255, 45, 85, 1)" }}>
Explore Now
</a> */}

        </div>}
    </>

  );
};

export default Products;
