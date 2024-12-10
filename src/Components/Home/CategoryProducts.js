"use client";

import React, { Suspense } from "react";
import { useRouter,usePathname } from "next/navigation"
import Link from "next/link";
import dynamic from "next/dynamic";
// import productList from "./productList";

const pro1 = "/Assets/laptop-1.jpg";
const pro2 = "/Assets/laptop-2.jpg";
const pro3 = "/Assets/laptop-3.jpg";
const pro4 = "/Assets/laptop-4.jpg";
const pro5 = "/Assets/laptop-5.jpg";

// Dynamically import the ProductItems component for lazy loading
const ProductList = dynamic(() => import("./productList"), {
  suspense: true,
});

const CategoryProducts = ({products}) => {
  console.log(products,"products by categoryId")

  const handleProducts = () => {
    router.push('/Products'); // Navigate to the profile page
  };

  return (
    <div className="container mx-auto p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2 mt-3">
        <Suspense fallback={<div>Loading...</div>}>
          {products.map((product) => (
              <ProductList product={product} />
          ))}
        </Suspense>
      </div>
      <div className="container mx-auto py-16">
        <div className="flex justify-center">
          <Link href="/Products">
            <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-md focus:outline-none" onClick={handleProducts}>
              View all products
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
