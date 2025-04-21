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
const emptyproducts = "/Assets/emptyproducts.svg";


const ProductItems = dynamic(() => import("./ProductItems"), {
  suspense: true,
});

const CategoryProducts = ({ products,loading,moreData }) => {
  const router = useRouter();
  const handleProducts = () => {
    router.push("/Products");
  };

  return (
    <>
      <ToastContainer />
      {products?.length > 0 ? (
        <>
        <div className="px-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 2xl:pl-10 mt-3">
          {products.map((product,index) => (
            <Suspense fallback={<div><ProductCard /></div>}>
              <ProductItems key={index} product={product} />
            </Suspense>
          ))}

        </div>
        {/* {
                loading &&
                <div>Loading</div>
            }
            {
                !loading &&
                !moreData &&
                <div>
                    No more data
                </div>
            } */}
        </>) : (
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
    </>
  );
};

export default CategoryProducts;
