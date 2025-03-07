"use client";
import React, { use, useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
const left = '/Assets/leftarrow.svg';
const DeliveryIcon = "/Assets/Icons/delivery.png";
const AvailabilityIcon = "/Assets/Icons/availability.png";
const AvailabilIcon = "/Assets/Icons/ava-stock.png";
const cartIcon = "/Assets/Icons/add-to-cart.png";
const cartIconHov = "/Assets/Icons/add-to-cart-white.png";
const stars = "/Assets/stars.svg";
const favIcon = "/Assets/bookmarks_line.svg"
const Badge = '/Assets/Offer Badge.svg';
const favorited='/Assets/favoritedicon.svg'
import Link from "next/link";
// import DeliveryIcon from '/public/Assets/Icons/delivery.png';
// import AvailabilityIcon from '/public/Assets/Icons/availability.png';
// import AvailabilIcon from '/public/Assets/Icons/ava-stock.png';
// import cartIcon from '/public/Assets/Icons/add-to-cart.png';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const customStyles = `
  .product-title {    font-size: 14px;    font-weight: 400;    line-height: normal;  }
  .cart-btn {    font-size: 13px;    font-weight: 500;  }
  .cart-price {    color: #FF2D55;  }`;

const FavoriteItem = ({ product,fetchFavorites}) => {
  const swiperRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // const { imgSrc, name, price, dateRange, availability, stock } = product;
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  // const [userId, setUserId] = useState("");
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");
  //   const token = localStorage.getItem("userToken");
  //   setUserId(userId);
  //   setToken(token);
  // }, []);

  const userId = (typeof window !== 'undefined') ? localStorage.getItem("userId") : null;
  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;


  const [isView, setIsview] = useState(true);
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
    rentalAvailability?.startDate
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const formattedendDate = new Date(
    rentalAvailability?.endDate
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });


  const startdate = new Date(rentalAvailability?.startDate);
const endDate = new Date(rentalAvailability?.endDate);

// Calculate the difference in months
const monthsDifference =
  (endDate.getFullYear() - startdate.getFullYear()) * 12 +
  (endDate.getMonth() - startdate.getMonth());


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
    try {
      const payload = {
        user_id: userId,
        variant_id: productId,
        quantity: 1,
        rentalPeriod: "daily",
      };
      const response = await axios.post(`${BASE_URL}/cart/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });

      window.dispatchEvent(new CustomEvent("cartUpdated",));

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


  const handleRemoveFavorites = async () => {
    try {
      const response = await axios.delete(`${BASE_URL}/favorites/remove-fav/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchFavorites()
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error removing product from favorites:", error);
      // toast.error(
      //   error.response?.data?.message ||
      //   "Something went wrong. Please try again."
      // );
    }
  }



  const currentDate = new Date();
  const startDate = new Date(rentalAvailability?.startDate);

  const isOneWeekBefore =
  startDate &&
  currentDate.getTime() - startDate.getTime() === 7 * 24 * 60 * 60 * 1000;
  return (

    <div>
      {/* <ToastContainer /> */}
      <style>{customStyles}</style>

      <div className='w-[300px] bg-white rounded-lg border border-slate-200'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div className="relative rounded-lg">
          <div className="border-b-2 border-bottom-color: rgb(209 213 219 / var(--tw-border-opacity, 1))">
            {isHovered ? (
              <>
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
                  onClick={() => swiperRef.current?.slidePrev()} // Navigate to the previous slide
                >
                  <img src={left} alt="Previous" className="rotate-360" />
                </div>
                <div
                  className="absolute right-[0px] top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
                  onClick={() => swiperRef.current?.slideNext()} // Navigate to the next slide
                >
                  <img src={left} alt="Next" className="rotate-180" />
                </div>
                <Swiper
                  onSwiper={(swiper) => (swiperRef.current = swiper)} // Set the Swiper instance to the ref
                  navigation={false} // Disable default navigation as we are using custom buttons
                  pagination={{ clickable: true }}
                  modules={[Navigation]}
                  autoplay={{ delay: 3000 }}
                // className="rounded-[40px] border border-gray-200"
                // className="h-44"
                >
                  {images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <Link href={{ pathname: `/Products/${title}`, query: { id: _id } }} key={_id}>

                        <Image
                          src={img}
                          alt={`${title} - ${index + 1}`}
                          className="w-full h-44 object-cover rounded-lg"
                          width={500}
                          height={300}
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : (
              // Show single image when not hovered
              <Link href={{ pathname: `/Products/${_id}`, query: { id: _id } }} key={_id}>
                <Image
                  src={images[0]}
                  alt={title}
                  className="w-full h-44 object-cover rounded-lg"
                  width={500}
                  height={300}
                />
              </Link>
            )}

            {/* Rating and Fav Icon positioned on top */}
            <div className="absolute top-[14px] right-4 z-10 flex flex-col items-center space-x-2">
              {/* <p className="flex items-center bg-green-700 px-2 rounded-full text-white">
                <img src={stars} alt="Rating stars" className="w-4 h-4" />
                <span className="ml-1">4.5</span>
              </p> */}

              <p
                className="cursor-pointer"
                onClick={() => handleRemoveFavorites()}
              >

                <img src={favorited} className="w-7" alt="Favorite icon" />
              </p>
            </div>
            <div className="absolute top-[0px] left-4 z-10 flex flex-col items-center space-x-2">
            {isOneWeekBefore && (
        <img src={Badge} className="badge-icon" alt="Favorite icon" />
      )}



            </div>

            {/* View All Details Button */}
            <div className="absolute top-[159px]  z-10 flex items-center justify-center w-full">
              {isView ? (
                <span
                  className="bg-white text-black w-54 text-center rounded-full border-2 p-1 cursor-pointer"
                  onClick={handleclick}
                >
                  View all packages
                </span>
              ) : (
                <span
                  className="bg-white text-black w-54 text-center rounded-full border-2 p-1 cursor-pointer"
                  onClick={handleBack}
                >
                  Back to details
                </span>
              )}
            </div>
          </div>
        </div>


        {isView ? (
          <div className='p-4'>
           <h1 className="text-[16px] font-medium truncate w-full">{title}</h1>
            {/* Product Price */}
            <p className='cart-price text-bold text-lg mt-2'>
              <span className='text-blue-500 text-s font-medium'>
                ₹{rentalPrice[0]?.price && `${rentalPrice[0].price}`}
                <span className='text-[#070707A6] font-[400] text-[12]'>
                  /day
                </span>
              </span>
            </p>

            {/* Delivery Information */}
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

            {/* Availability */}
            <div className='flex items-center mt-2'>
              <Image
                src={AvailabilityIcon}
                alt='Availability icon'
                className='w-4 h-4 text-gray-500 mr-1'
                width={16}
                height={16}
              />
{rentalAvailability && formattedDate && !isNaN(new Date(rentalAvailability?.endDate)) ? (
  <span className="text-gray-500 text-xs">
    Availability: {formattedDate} - {formattedendDate}
  </span>
) : rentalAvailability && formattedDate ? (
  <span className="text-gray-500 text-xs">
    Availability: {formattedDate}
  </span>
) : null}

            </div>

            {/* Stock Information */}
            <div className='flex items-center mt-2'>
              <Image
                src={AvailabilIcon}
                alt='Check icon'
                className='w-4 h-4 text-blue-500'
                width={16}
                height={16}
              />
              <span className='text-blue-500 text-s font-medium'>
                {" "}
                {stockQuantity} Stock available
              </span>
            </div>

            {/* Add to Cart Button */}
            {/* <button
          className="cart-btn border-red-500 border hover:bg-red-600 text-black font-bold hover:text-white px-4 py-1 rounded-md mt-4 text-center w-full flex items-center justify-center space-x-2 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        > */}
            <button
              className={`cart-btn border-red-500 border hover:bg-red-600 text-black font-bold hover:text-white px-4 py-1 rounded-md mt-4 text-center w-full flex items-center justify-center space-x-2 group ${isHovered ? "bg-red-600 text-white" : ""}`}
              onClick={() => handleAddCart()}
            >
              <Image
                src={isHovered ? cartIconHov : cartIcon}
                alt='Cart icon'
                className='w-4 h-4'
                width={500}
                height={300}
              />
              <span className='text-sm'>Add to cart</span>
            </button>
          </div>
        ) : (
          <div>
            <div className='w-full'>
              <div className='grid grid-cols-2 text-center'>
                {rentalPrice.slice(0, -2)?.map((detail) => (
                  <div key={rentalPrice._id} className='border p-2.5'>
                    <span className='block text-blue-500 font-[500] text-[12px]'>
                      {detail.period}
                    </span>
                    <span className='block text-black text-lg font-[500] text-[16px]'>
                      ₹
                      {detail.price
                        ? detail.price.toLocaleString()
                        : "Not Available"}
                    </span>
                  </div>
                ))}
              </div>
              {/* Additional rows like "6 Months" */}
              <div className="mt-4">
    <div className="text-blue-500 font-[500] text-center text-[12px]">
      {monthsDifference} {monthsDifference === 1 ? "Month" : "Months"}
    </div>
    <div className="text-center text-gray-600 text-[16px] font-[500]">
      Available
    </div>
  </div>
            </div>
          </div>
        )}
      </div>
    </div>

  );
};

export default FavoriteItem;
