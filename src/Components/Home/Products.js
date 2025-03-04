"use client";

import React, { Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import ProductCard from "../Shimmer/ProductCard";

const pro1 = "/Assets/laptop-1.jpg";
const pro2 = "/Assets/laptop-2.jpg";
const pro3 = "/Assets/laptop-3.jpg";
const pro4 = "/Assets/laptop-4.jpg";
const pro5 = "/Assets/laptop-5.jpg";

// Dynamically import the ProductItems component for lazy loading
const ProductItems = dynamic(() => import("../Home/ProductItems"), {
  suspense: true,
});

const Products = ({ products, categoryId }) => {
  console.log(products, "products by categoryId");

  const handleProducts = () => {
    router.push("/Products"); // Navigate to the profile page
  };

  return (
<div className='2xl:px-[80px] px-2 sm:px-8 md:px-10 lg:px-24 xl:px-20'>
  <ToastContainer />

  {/* Product Grid */}
  <div className='grid grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-2 sm:gap-4 md:gap-6 2xl:gap-10 gap-3   mt-3'>

      {products.map((product) => (
            <Suspense key={product._id} fallback={<ProductCard/>}>
        <ProductItems key={product._id} product={product} />
        </Suspense>
      ))}

  </div>

  {/* View All Button Section */}
  <div className='container mx-auto py-12 sm:py-14 md:py-16'>
    <div className='flex justify-center'>
      <Link href={`/Product-list/${categoryId}`}>
        <button
          className='bg-red-500 hover:bg-red-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg sm:rounded-xl shadow-md focus:outline-none transition duration-300 ease-in-out'
          onClick={handleProducts}
        >
          View all products
        </button>
      </Link>
    </div>
  </div>
</div>

  );
};

export default Products;
