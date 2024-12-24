import React, { useState } from 'react';

"use client"
import React, { useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

const DeliveryIcon = '/Assets/Icons/delivery.png'; 
const AvailabilityIcon = '/Assets/Icons/availability.png'; 
const AvailabilIcon = '/Assets/Icons/ava-stock.png'; 
const cartIcon = '/Assets/Icons/add-to-cart.png';
const cartIconHov = '/Assets/Icons/add-to-cart-white.png';
import Link from "next/link";
import DeliveryIcon from '/public/Assets/Icons/delivery.png';
import AvailabilityIcon from '/public/Assets/Icons/availability.png';
import AvailabilIcon from '/public/Assets/Icons/ava-stock.png';
import cartIcon from '/public/Assets/Icons/add-to-cart.png';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const customStyles = `
  .product-title {    font-size: 14px;    font-weight: 400;    line-height: normal;  }
  .cart-btn {    font-size: 13px;    font-weight: 500;  }
  .cart-price {    color: #FF2D55;  }`;

const ProductItem = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false); 

  const { imgSrc, name, price, dateRange, availability, stock } = product;
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const userId=localStorage.getItem('userId');
  const token = localStorage.getItem('userToken');

  const [isView,setIsview]=useState(true);
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


  console.log(rentalPrice,"rental price")
  const formattedDate = new Date(rentalAvailability?.startDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const Details=[
    {label:"Day" ,price:rentalPrice.daily},
    {label:"Week",price:rentalPrice.weekly},
    {label:"Month",price:rentalPrice.monthly},
    {label:"Quarter",price:rentalPrice.threeMonths},
  ]

  const handleclick=()=>{
    setIsview(!isView);
  }
  const handleBack=()=>{
    setIsview(true);
  }

  const handleAddToCart = async (productId) => {
    console.log(productId,"variant id")
    try {
      const payload = {
        user_id: userId,
        variant_id: productId,
        quantity: 1,
        rentalPeriod:"monthly"
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
        error.response?.data?.message || "Something went wrong. Please try again."
      );
    }
  };
  
  const handleAddCart = () => {
    if (userId) {
      handleAddToCart(_id);
    } else {
      toast.error("You must be logged in to add items to cart.");
    }
  }

  return (
    <>
    <div>
    <ToastContainer />
      <style>{customStyles}</style>

      <div className="bg-white rounded-lg border border-slate-200 p-4">
        {/* Product Image */}
        <Image
          src={imgSrc}
          alt={name}
          className="w-full h-40 object-cover mb-4 rounded-lg"
          width={500}
          height={300}
        />
        {/* Product Name */}
      <Link href={{pathname:`/Products/${title}`,   query: { id: _id }}} key={_id}>
  <Image
    src={images[0]}
    alt={title}
    className="w-full h-40 object-cover mb-4 rounded-lg" 
    width={500}
    height={300}
  />
      </Link>
        <h2 className="product-title text-gray-800">{name}</h2>

        {/* Product Price */}
        <p className="cart-price text-bold text-lg mt-2">
          {price}
          <span className="text-gray-600 text-sm">/day</span>
          {price}
          <span className="text-gray-600 text-sm text-[#FF2D55] font-medium text-sm">
          ₹{rentalPrice[0]?.price ? `${rentalPrice[0].price}` : "N/A"}<span className='text-[#070707A6] font-sm'>/day</span>
</span>


        </p>

        {/* Delivery Information */}
        <div className="flex items-center mt-2">
          <Image
            src={DeliveryIcon}
            alt="Calendar icon"
            className="w-4 h-4 text-gray-500 mr-1"
            width={500}
            height={300}
          />
          <Image
            src={DeliveryIcon}
            alt="Calendar icon"
            className="w-4 h-4 text-gray-500 mr-1"
            width={16}
            height={16}
          />
          <span className="text-gray-500 text-xs">Delivery: {dateRange}</span>
        </div>

        {/* Availability */}
        <div className="flex items-center mt-2">
          <Image
            src={AvailabilityIcon}
            alt="Availability icon"
            className="w-4 h-4 text-gray-500 mr-1"
            width={500}
            height={300}
          />
          <span className="text-gray-500 text-xs">Availability: {availability}</span>
          <Image
            src={AvailabilityIcon}
            alt="Availability icon"
            className="w-4 h-4 text-gray-500 mr-1"
            width={16}
            height={16}
          />
       { rentalAvailability &&  <span className="text-gray-500 text-xs">Availability: {formattedDate}</span>}
        </div>

        {/* Stock Information */}
        <div className="flex items-center mt-2">
          <Image
            src={AvailabilIcon}
            alt="Check icon"
            className="w-4 h-4 text-blue-500"
            width={500}
            height={300}
          />
          <span className="text-blue-500 text-xs">Available Stock: {stock}</span>
          <Image
            src={AvailabilIcon}
            alt="Check icon"
            className="w-4 h-4 text-blue-500"
            width={16}
            height={16}
          />
          <span className="text-blue-500 text-xs"> Available Stock: {stockQuantity}</span>
        </div>

        {/* Add to Cart Button */}
        <button
          className="cart-btn border-red-500 border hover:bg-red-600 text-black font-bold hover:text-white px-4 py-1 rounded-md mt-4 text-center w-full flex items-center justify-center space-x-2 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
        <button className="cart-btn border-red-500 border hover:bg-red-600 text-black font-bold hover:text-white px-4 py-1 rounded-md mt-4 text-center w-full flex items-center justify-center space-x-2 group"
          onClick={() => handleAddCart()}>
          <Image
            src={isHovered ? cartIconHov : cartIcon}
            alt="Cart icon"
            className="w-4 h-4"
            width={500}
            height={300}
          />
          <span className="text-sm">Add to cart</span>
        </button>
      </div>
      </div>
    </>
  );
};

export default ProductItem;
