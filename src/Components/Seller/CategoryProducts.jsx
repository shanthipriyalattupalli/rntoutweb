"use client";

import React, { Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ToastContainer } from "react-toastify";
import ProductCard from "../Shimmer/ProductCard";

const pro1 = "/Assets/laptop-1.jpg";
const pro2 = "/Assets/laptop-2.jpg";
const pro3 = "/Assets/laptop-3.jpg";
const pro4 = "/Assets/laptop-4.jpg";
const pro5 = "/Assets/laptop-5.jpg";
const noproducts = "/Assets/noproducts.svg";

// Dynamically import the ProductItems component for lazy loading
const ProductItems = dynamic(() => import("../Home/ProductItems"), {
  suspense: true,
});

const CategoryProducts = ({ products }) => {
  const router = useRouter();

  const handleProducts = () => {
    router.push("/Products");
  };

  return (
    <>
    <div className="container mx-auto">
      <ToastContainer />
      {products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
          <Suspense fallback={<div><ProductCard/></div>}>
            {products.map((product) => (
              <ProductItems key={product._id} product={product} />
            ))}
          </Suspense>
        </div>
          ) : (
        <div className="flex flex-col text-justify justify-center w-80 ml-80">
          <img src={noproducts} alt="No products available" className="w-full" />
          <span className="pl-14 pt-10 font-medium text-xl">No Rental Items found</span>
        </div>
      )}
                  </div>
</>

  );
};

export default CategoryProducts;
