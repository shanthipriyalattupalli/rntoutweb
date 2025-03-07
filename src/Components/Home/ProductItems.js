"use client";
import React, { use, useEffect, useState, useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
const left = '/Assets/leftarrow.svg';
const DeliveryIcon = "/Assets/delivery.svg";
const AvailabilityIcon = "/Assets/Icons/availability.png";
const AvailabilIcon = "/Assets/Icons/ava-stock.png";
const cartIcon = "/Assets/add-to-cart.svg";
const cartIconHov = "/Assets/Icons/add-to-cart-white.png";
const stars = "/Assets/stars.svg";
const favIcon = "/Assets/bookmarks_line.svg"
const Badge = '/Assets/Offer Badge.svg';
const favorited = '/Assets/favoritedicon.svg'
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

const ProductItem = ({ product }) => {
  const swiperRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState("daily");
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
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
    averageRating,
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


  const rentalStartDate = new Date(rentalAvailability?.startDate);


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
        rentalPeriod: selectedRentalPeriod,
      };

      const response = await axios.post(`${BASE_URL}/cart/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });



      // Retrieve the current cart count from localStorage (default to 0 if null)
      // let cartCount = parseInt(localStorage.getItem("cart")) || 0;
      // cartCount += 1; // Increment count by 1

      // // Update localStorage with the new cart count
      // localStorage.setItem("cart", cartCount);

      // Dispatch event with the updated cart count
      window.dispatchEvent(new CustomEvent("cartUpdated",));

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
  };


  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/favorites/add`, { variantId: _id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding product to favorites:", error);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    }
  }



  const currentDate = new Date();
  const startDate = new Date(rentalAvailability?.startDate);

  const isOneWeekBefore =
    startDate &&
    currentDate.getTime() - startDate.getTime() === 7 * 24 * 60 * 60 * 1000;
  return (

    <>
      {/* <ToastContainer /> */}
      <style>{customStyles}</style>

      <div className="2xl:w-full xl:w-full xl:h-[436px] bg-white rounded-lg border border-slate-200"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div className="relative rounded-xl">
          <div className="border-b-2 border-bottom-color: rgb(209 213 219 / var(--tw-border-opacity, 1))">
            {isHovered ? (
              <>
                <div
                  className={`absolute top-1/2 transform -translate-y-1/2 z-10 cursor-pointer ${isBeginning ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  onClick={() => {
                    if (!isBeginning) swiperRef.current?.slidePrev();
                  }}
                >
                  <img src={left} alt="Previous" className="rotate-360" />
                </div>

                <div
                  className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer ${isEnd ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  onClick={() => {
                    if (!isEnd) swiperRef.current?.slideNext();
                  }}
                >
                  <img src={left} alt="Next" className="rotate-180" />
                </div>

                <Swiper
                  onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                  }}
                  onSlideChange={(swiper) => {
                    setIsBeginning(swiper.isBeginning);
                    setIsEnd(swiper.isEnd);
                  }}
                  navigation={false}
                  pagination={{ clickable: true }}
                  modules={[Navigation]}
                  autoplay={{ delay: 3000 }}
                >
                  {images.map((img, index) => (
                    <SwiperSlide key={index}>
                      <Link href={{ pathname: `/Products/${title}`, query: { id: _id } }} key={_id}>
                        <Image
                          src={img}
                          alt={`${title} - ${index + 1}`}
                          className="w-full h-[220px] object-cover rounded-lg"
                          width={308}
                          height={220}
                        />
                      </Link>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </>
            ) : (
              <Link href={{ pathname: `/Products/${_id}`, query: { id: _id } }} key={_id}>
                <Image
                  src={images[0]}
                  alt={title}
                  className="w-full h-[220px] object-cover rounded-lg"
                  width={308}
                  height={220}
                />
              </Link>
            )}

            {/* Rating and Fav Icon positioned on top */}
            <div className="absolute top-[14px] right-4 z-10 flex flex-col items-center space-x-2">
              {averageRating && <p className="flex items-center bg-green-700 px-2 rounded-full text-white">
                <img src={stars} alt="Rating stars" className="w-4 h-3" />
                <span className="ml-1">{averageRating}</span>
              </p>}

              {/* <p
                className="cursor-pointer"
                onClick={() => handleAddToFavorites()}
              >

                <img src={favorited} className="w-7" alt="Favorite icon" />
              </p> */}
            </div>
            <div className="absolute top-[0px] left-4 z-10 flex flex-col items-center space-x-2">
              {isOneWeekBefore && (
                <img src={Badge} className="badge-icon" alt="Favorite icon" />
              )}



            </div>

            {/* View All Details Button */}
            <div className="absolute top-[200px]  z-10 flex items-center justify-center w-full">
              {isView ? (
                <span
                  className="bg-white text-black w-54 font-sm text-center rounded-full border-2  px-2 py-1 cursor-pointer"
                  onClick={handleclick}
                >
                  View all packages
                </span>
              ) : (
                <span
                  className="bg-white text-black w-54  text-center rounded-full border-2 px-2 py-1 cursor-pointer"
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
            <h2 className="product-title text-gray-800 truncate w-full overflow-hidden whitespace-nowrap">
              {title}
            </h2>


            {/* Product Price */}
            <p className='cart-price text-bold text-lg mt-2'>
              <span className='text-[#FF2D55] font-[600] text-[14px]'>
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
              <span className="text-gray-500 text-xs">
                <span className="hidden sm:inline">Free Delivery for: </span>5 km
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
                <span className='text-gray-500 text-xs truncate w-full'>
                  <span className="hidden sm:inline">Availability:</span> {formattedDate}-{formattedendDate}
                </span>
              ) : rentalAvailability && formattedDate ? (
                <span className="text-gray-500 text-xs hidden sm:inline">
                  Availability: {formattedDate}
                </span>) : null}
            </div>
            {/* <Image
                src={AvailabilIcon}
                alt='Check icon'
                className='w-4 h-4 text-blue-500'
                width={16}
                height={16}
              /> */}
            {/* Stock Information */}
            <div className="flex items-center mt-2">
              <span
                className={`text-xs border px-1 py rounded-full ${stockQuantity > 0
                  ? "text-blue-500 border-blue-200 bg-blue-100"
                  : "text-red-500 border-red-200 bg-red-100"
                  }`}
              >
                {stockQuantity > 0 ? "In stock" : "Out of stock"}
              </span>
            </div>


            {/* Add to Cart Button */}
            {/* <button
          className="cart-btn border-red-500 border hover:bg-red-600 text-black font-bold hover:text-white px-4 py-1 rounded-md mt-4 text-center w-full flex items-center justify-center space-x-2 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        > */}
            {/* {
              rentalStartDate > new Date() ? ( // Compare raw Date objects
                <button
                  className="notify-btn border-blue-500 border  text-blue-400 font-medium px-4 py-1 rounded-md mt-4 text-center w-full flex items-center justify-center space-x-2"
                  onClick={() => handleNotifyMe()}
                >
                  <span className="text-sm">Notify Me Availability</span>
                </button>
              ) : ( */}
            <button
              className={`${stockQuantity > 0
                ? "cart-btn border-red-500 border hover:bg-red-600 text-black font-bold hover:text-white px-4 py-1 rounded-md mt-4 text-center w-full flex items-center justify-center space-x-2 group"
                : "cart-btn border-red-100 border text-black font-bold px-4 py-1 rounded-md mt-4 text-center w-full flex items-center justify-center space-x-2 group"
                } ${isHovered && stockQuantity > 0 ? "bg-red-600 text-white" : ""}`}
              onClick={() => stockQuantity > 0 && handleAddCart()}
              disabled={stockQuantity <= 0}
            >
              <Image
                src={isHovered && stockQuantity > 0 ? cartIconHov : cartIcon}
                alt="Cart icon"
                className="w-4 h-4"
                width={500}
                height={300}
              />
              <span className={`text-sm ${stockQuantity > 0 ? "" : "text-gray-400"}`}>Add to cart</span>
            </button>
            {/* ) */}
            {/* } */}

          </div>
        ) : (
          <div>
            <div className='w-full'>
              <div className='grid grid-cols-2 text-center'>
                {rentalPrice.slice(0, -2)?.map((detail) => (
                  <div
                    key={detail._id}
                    className={`border p-2.5 cursor-pointer ${selectedRentalPeriod === detail.period ? "border-blue-500 bg-blue-500" : ""
                      }`}
                    onClick={() => setSelectedRentalPeriod(detail.period)}
                  >
                    <span className={`block font-[500] text-[12px] ${selectedRentalPeriod === detail.period ? "text-white" : "text-blue-500"}`}>
                      {detail.period.charAt(0).toUpperCase() + detail.period.slice(1)}
                    </span>
                    <span className={`block text-lg font-[500] text-[16px] ${selectedRentalPeriod === detail.period ? "text-white" : "text-black"}`}>
                      ₹
                      {detail.price ? detail.price.toLocaleString() : "Not Available"}
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
    </>

  );
};

export default ProductItem;
