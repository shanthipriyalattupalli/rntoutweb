"use client";

import React, { Suspense } from "react";
import { useRouter,usePathname } from "next/navigation"
import Link from "next/link";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";

const pro1 = "/Assets/laptop-1.jpg";
const pro2 = "/Assets/laptop-2.jpg";
const pro3 = "/Assets/laptop-3.jpg";
const pro4 = "/Assets/laptop-4.jpg";
const pro5 = "/Assets/laptop-5.jpg";

// Dynamically import the ProductItems component for lazy loading
const ProductItems = dynamic(() => import("../Home/ProductItems"), {
  suspense: true,
});


const Products = ({products,categoryId}) => {
  console.log(products,"products by categoryId")

  const handleProducts = () => {
    router.push('/Products'); // Navigate to the profile page
  };

  return (
    <div className="container mx-auto p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
        {/* Lazy load product items */}
        <Suspense fallback={<div>Loading...</div>}>
          {products.map((product) => (

              <ProductItems product={product} />
         
          ))}
        </Suspense>
      </div>
      <div className="container mx-auto py-16">
        <div className="flex justify-center">
          <Link href={`/Product-list/${categoryId}`}>
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-md focus:outline-none" onClick={handleProducts}>
              View all products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Products;
