"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";

const pro1 = "/Assets/laptop-1.jpg";
const pro2 = "/Assets/laptop-2.jpg";
const pro3 = "/Assets/laptop-3.jpg";
const pro4 = "/Assets/laptop-4.jpg";
const pro5 = "/Assets/laptop-5.jpg";
const noproducts = "/Assets/noproducts.svg";

// Dynamically import the ProductItems component for lazy loading
const ProductItems = dynamic(() => import("./ProductItems"), {
  suspense: true,
});

const CategoryProducts = ({ products }) => {
  const router = useRouter();
  console.log(products, "products by categoryId");

  const handleProducts = () => {
    router.push("/Products"); // Navigate to the products page
  };

  return (
    <div className="xl:px-10 pl-6">
      <ToastContainer />
      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-6 gap-2 mt-3">

          <Suspense fallback={<div>Loading...</div>}>
            {products.map((product) => (
              <ProductItems key={product._id} product={product} />
            ))}
          </Suspense>

        </div>) : (
        <div className="flex flex-col text-justify justify-center w-80 ml-80">
          <img src={noproducts} alt="No products available" className="w-full" />
          <span className="pl-14 pt-10 font-medium text-xl">No Rental Items found</span>
        </div>
      )}
      {products?.length > 0 && (
        <div className="container mx-auto py-16">
          <div className="flex justify-center">
            {/* <Link href="/Products">
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-md focus:outline-none"
                onClick={handleProducts}
              >
                View all products
              </button>
            </Link> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
