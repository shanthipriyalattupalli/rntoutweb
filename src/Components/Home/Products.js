"use client";

import React, { Suspense } from "react";
import { useRouter,usePathname } from "next/navigation"
import Link from "next/link";
import dynamic from "next/dynamic";

const pro1 = "/Assets/laptop-1.jpg";
const pro2 = "/Assets/laptop-2.jpg";
const pro3 = "/Assets/laptop-3.jpg";
const pro4 = "/Assets/laptop-4.jpg";
const pro5 = "/Assets/laptop-5.jpg";

// Dynamically import the ProductItems component for lazy loading
const ProductItems = dynamic(() => import("../Home/ProductItems"), {
  suspense: true,
});

const Products = () => {
  const products = [
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
      imgSrc: pro3,
      name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
      price: "₹500",
      dateRange: "26 Sep - 28 Sep",
      availability: "26 Sep - 28 Sep",
      stock: 14,
    },
    {
        id: 6,
        imgSrc: pro3,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },
      {
        id: 7,
        imgSrc: pro3,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },
      {
        id: 8,
        imgSrc: pro3,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },
      {
        id: 9,
        imgSrc: pro3,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },  
       {
        id: 10,
        imgSrc: pro3,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },
      {
        id: 11,
        imgSrc: pro3,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },
      {
        id: 12,
        imgSrc: pro3,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },
      {
        id: 13,
        imgSrc: pro3,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },
      {
        id: 14,
        imgSrc: pro3,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },
      {
        id: 15,
        imgSrc: pro3,
        name: "Windows i3/8gb 4th/6th Gen - Powered by Soldrit",
        price: "₹500",
        dateRange: "26 Sep - 28 Sep",
        availability: "26 Sep - 28 Sep",
        stock: 14,
      },
    // Additional product items can be added here...
  ];
  const handleProducts = () => {
    router.push('/Products'); // Navigate to the profile page
  };

  return (
    <div className="container mx-auto p-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
        {/* Lazy load product items */}
        <Suspense fallback={<div>Loading...</div>}>
          {products.map((product) => (
            <Link href={`/Products/${product.id}`} key={product.id}>
              <ProductItems product={product} />
            </Link>
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

export default Products;
