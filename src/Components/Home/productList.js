"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import DeliveryIcon from "/public/Assets/Icons/delivery.png";
import AvailabilityIcon from "/public/Assets/Icons/availability.png";
import AvailabilIcon from "/public/Assets/Icons/ava-stock.png";
import cartIcon from "/public/Assets/Icons/add-to-cart.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const customStyles = `
.group:hover .group-hover\:invert {
  filter: invert(1) brightness(1) contrast(1); /* More intense white effect */
}
`;

const productList = ({ product }) => {
  console.log(product, "productlist in produclist");
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isView, setIsview] = useState(true);
  let userId;
  let token;

  useEffect(() => {
    userId = localStorage.getItem("userId");
    token = localStorage.getItem("userToken");
  }, []);

  const {
    availability,
    dateRange,
    images,
    name,
    price,
    stock,
    title,
    rentalAvailability,
    stockQuantity,
    rentalPrice,
    _id,
  } = product;

  const formattedDate = new Date(
    rentalAvailability.startDate
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const Details = [
    { label: "Day", price: rentalPrice.daily },
    { label: "Week", price: rentalPrice.weekly },
    { label: "Month", price: rentalPrice.monthly },
    { label: "Quarter", price: rentalPrice.threeMonths },
  ];

  const handleclick = () => {
    setIsview(!isView);
  };
  const handleBack = () => {
    setIsview(true);
  };

  const handleAddToCart = async (productId) => {
    console.log(productId, "variant id");
    try {
      const payload = {
        user_id: userId,
        variant_id: productId,
        quantity: 1,
        rentalPeriod: "monthly",
      };
      const response = await axios.post(`${BASE_URL}/cart/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  const handleAddCart = () => {
    if (userId) {
      handleAddToCart(_id);
    } else {
      toast.error("You must be logged in to add items to cart.");
    }
  };

  return (
    <>
      <div>
        <ToastContainer />
        <style>{customStyles}</style>
        <div className='bg-white rounded-lg border border-slate-200' key={_id}>
          <div className='relative border rounded-lg'>
            {/* Image */}
            <Link
              href={{ pathname: `/Products/${title}`, query: { id: _id } }}
              key={_id}
            >
              <Image
                src={images[0]}
                alt={title}
                className='h-45 object-cover rounded-lg'
                width={500}
                height={300}
              />
            </Link>

            {/* View Details */}
            <div className='absolute top-[310px] left-20 flex items-center justify-center'>
              {isView ? (
                <span
                  className='bg-white text-black w-54 text-center rounded-full border-2 p-1'
                  onClick={handleclick}
                >
                  view all packages
                </span>
              ) : (
                <span
                  className='bg-white text-black w-54 text-center rounded-full border-2 p-1'
                  onClick={handleBack}
                >
                  Back to details
                </span>
              )}
            </div>
          </div>
          {isView ? (
            <div className='p-4'>
              <h2 className='text-lg mt-6 font-medium text-gray-800'>
                {title}
              </h2>
              <p className='cart-price text-bold text-lg mt-2'>
                {price}
                <span className='text-gray-600 text-sm'>
                  {" "}
                  {rentalPrice.daily}/day
                </span>
              </p>
              <div className='flex items-center mt-2'>
                <Image
                  src={DeliveryIcon}
                  alt='Calendar icon'
                  className='w-4 h-4 text-gray-500 mr-1'
                  width={16}
                  height={16}
                />
                <span className='text-gray-500 text-xs'>
                  Delivery: {dateRange}
                </span>
              </div>
              <div className='flex items-center mt-2'>
                <Image
                  src={AvailabilityIcon}
                  alt='Availability icon'
                  className='w-4 h-4 text-gray-500 mr-1'
                  width={16}
                  height={16}
                />
                <span className='text-gray-500 text-xs'>
                  Availability: {formattedDate}
                </span>
              </div>
              <div className='flex items-center mt-2'>
                <Image
                  src={AvailabilIcon}
                  alt='Check icon'
                  className='w-4 h-4 text-blue-500'
                  width={16}
                  height={16}
                />
                <span className='text-blue-500 text-xs'>
                  {" "}
                  Available Stock: {stockQuantity}
                </span>
              </div>
              <button
                className='border-red-500 border hover:bg-red-600 text-black font-bold hover:text-white px-4 py-2 rounded-md mt-4 text-center w-full flex items-center justify-center space-x-2 group'
                onClick={() => handleAddCart()}
              >
                <Image
                  src={cartIcon}
                  alt='Cart icon'
                  className='w-4 h-4 group-hover:invert'
                  width={16}
                  height={16}
                />
                <span>Add to cart</span>
              </button>
            </div>
          ) : (
            <div>
              <div className='w-full'>
                <div className='grid grid-cols-2 text-center'>
                  {Details?.map((detail, index) => (
                    <div key={index} className='border p-4'>
                      <span className='block text-blue-500 font-bold'>
                        {detail.label}
                      </span>
                      <span className='block text-black text-lg font-semibold'>
                        ₹
                        {detail.price
                          ? detail.price.toLocaleString()
                          : "Not Available"}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Additional rows like "6 Months" */}
                <div className='mt-4'>
                  <div className='text-blue-500 font-bold text-center'>
                    6 Months
                  </div>
                  <div className='text-center text-gray-600 text-lg'>
                    Not Available
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default productList;
