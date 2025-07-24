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
    variantId
  } = product;

  const swiperRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedRentalPeriod, setSelectedRentalPeriod] = useState(rentalPrice[0]?.period);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [modalSelectedPeriod, setModalSelectedPeriod] = useState(rentalPrice[0]?.period); // <-- add this
  const isVideo = (url) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
  };
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

  // const productId = _id;
  const [productID, setProductId] = useState(_id);
  console.log(rentalPrice, "rental price")


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
  const isDateExpired = endDate && endDate < new Date();

  const currentDate = new Date();


  let monthsDifference =
    (endDate.getFullYear() - currentDate.getFullYear()) * 12 +
    (endDate.getMonth() - currentDate.getMonth());


  let displayAvailability = "Not Available";

  if (endDate > currentDate) {
    const isSameMonth =
      currentDate.getFullYear() === endDate.getFullYear() &&
      currentDate.getMonth() === endDate.getMonth();

    if (isSameMonth) {
      const daysDifference = Math.ceil(
        (endDate - currentDate) / (1000 * 60 * 60 * 24)
      );
      displayAvailability = `${daysDifference} ${daysDifference === 1 ? "Day" : "Days"
        } Available`;
    } else {
      const monthsDifference =
        (endDate.getFullYear() - currentDate.getFullYear()) * 12 +
        (endDate.getMonth() - currentDate.getMonth());
      displayAvailability = `${monthsDifference} ${monthsDifference === 1 ? "Month" : "Months"
        } Available`;
    }
  }


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



  const handleAddCart = () => {
    if (userId) {
      setModalSelectedPeriod(rentalPrice[0]?.period); // default to first package
      setShowPackageModal(true);
    } else {
      toast.error("You must be logged in to add items to cart.");
    }
  };

  const handleModalOk = async () => {
    setSelectedRentalPeriod(modalSelectedPeriod);
    setShowPackageModal(false);
    await handleAddToCart(_id, modalSelectedPeriod);
  };

  const handlePackageSelect = async (period) => {
    setSelectedRentalPeriod(period);
    setShowPackageModal(false);
    await handleAddToCart(_id, period);
  };

  // Update handleAddToCart to accept period
  const handleAddToCart = async (productId, period = selectedRentalPeriod) => {
    try {
      const payload = {
        user_id: userId,
        variant_id: productId,
        quantity: 1,
        rentalPeriod: period,
      };
      const response = await axios.post(`${BASE_URL}/cart/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.dispatchEvent(new CustomEvent("cartUpdated",));
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Please try again."
      );
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

  const periodMapping = {
    quarterly: "3 Months",
    semiannual: "6 Months",
    annual: "Year",
  };

  const startDate = new Date(rentalAvailability?.startDate);

  const isOneWeekBefore =
    startDate &&
    currentDate.getTime() - startDate.getTime() === 7 * 24 * 60 * 60 * 1000;
  return (

    <>
      {/* <ToastContainer /> */}
      <style>{customStyles}</style>

      <div className={`2xl:w-full xl:w-full h-[340px] sm:h-[370px] rounded-[12px] bg-gray-50  border border-slate-200 ${isHovered ? "shadow-lg" : "shadow-sm"}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <div className="relative">
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
                  {images.map((img, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Link href={`/Products/${_id}`}>
                          {isVideo(img) ? (
                            <video
                              src={img}
                              controls
                              className="w-full h-[130px] sm:h-[150px] object-cover rounded-t-[12px]"
                            />
                          ) : (
                            <Image
                              src={img}
                              alt={`${title} - ${index + 1}`}
                              className="w-full h-[130px] sm:h-[150px] object-cover rounded-t-[12px]"
                              width={308}
                              height={220}
                            />
                          )}

                        </Link>
                      </SwiperSlide>
                    )
                  })}
                </Swiper>
              </>
            ) : (
              <Link href={{ pathname: `/Products/${_id}`, query: { id: _id } }} key={_id}>
                {images[0] &&
                  (isVideo(images[0]) ? (
                    <video
                      src={images[0]}
                      className="w-full h-[130px] sm:h-[150px] object-cover rounded-t-[12px]"
                      muted
                      playsInline
                    />
                  ) : (
                    <Image
                      src={images[0]}
                      alt={title}
                      className="w-full h-[130px] sm:h-[150px] object-cover rounded-t-[12px]"
                      width={308}
                      height={220}
                    />
                  ))}

              </Link>
            )}

            {/* Rating and Fav Icon positioned on top */}
            <div className="absolute top-[14px] right-4 z-10 flex flex-col items-center space-x-2">
              {averageRating && (
                <p
                  className="w-[49px] h-[20px] flex items-center px-2 rounded-full text-white"
                  style={{
                    backgroundColor:
                      averageRating >= 4
                        ? "rgba(8, 135, 93, 1)"
                        : averageRating >= 2
                          ? "rgba(244, 128, 3, 1)"
                          : "rgba(224, 45, 60, 1)",
                  }}
                >
                  <img src={stars} alt="Rating stars" className="w-4 h-3" />
                  <span className="ml-1">{averageRating}</span>
                </p>
              )}


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
            <div className="absolute top-[110px] sm:top-[124px]  z-10 flex items-center justify-center w-full">
              {isView ? (
                <span
                  className="bg-white text-black w-54 truncate font-sm text-center rounded-full border-2  px-2 py-1 cursor-pointer"
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
          <div className="p-2 sm:p-4 mt-4 sm:mt-0">
            <h2 className="product-title text-[#070707] font-[500] truncate w-full overflow-hidden whitespace-nowrap">
              {title || title.charAt(0).toUpperCase() + title?.slice(1)}
            </h2>


            {/* Product Price */}
            <p className='cart-price text-bold text-lg mt-1 sm:mt-2'>
              <span className='text-[#FF2D55] font-[600] text-[14px]'>
                ₹{rentalPrice[0]?.price && `${rentalPrice[0].price}`}
                <span className='text-[#070707A6] font-[400] text-[12px]'>
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
                <span className="hidden sm:inline">Free Delivery for: </span><span className="font-[500] text-[12px]">5 km</span>
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
                <span className="text-gray-500 text-[12px] hidden sm:inline">
                  Availability:<span className="font-[500px] text-[12px]"> {formattedDate}</span>
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




            <button
              className={`${stockQuantity > 0 && !isDateExpired
                ? "cart-btn border border-[rgba(255,45,85,0.6)] hover:bg-[rgba(255,45,85,1)] text-[rgba(255,45,85,1)] hover:text-white font-bold px-4 py-1  rounded-[8px] mt-4 text-center w-full flex items-center justify-center space-x-2 group"
                : "cart-btn border border-[rgba(255,45,85,0.6)] text-white font-bold px-4 py-1 rounded-[8px] mt-4 text-center w-full  flex items-center justify-center space-x-2 group"
                } ${isHovered && stockQuantity > 0 && !isDateExpired ? "bg-[rgba(255,45,85,1)] hover:text-white cart-hover-shadow" : ""}`}
              onClick={() => stockQuantity > 0 && !isDateExpired && handleAddCart()}
              disabled={stockQuantity <= 0 || isDateExpired}
            >
              <Image
                src={isHovered && stockQuantity > 0 && !isDateExpired ? cartIconHov : cartIcon}
                alt="Cart icon"
                className="w-4 h-4"
                width={500}
                height={300}
              />
              <span className={`text-sm ${stockQuantity > 0 && !isDateExpired
                ? isHovered
                  ? "text-white"
                  : ""
                : "text-gray-400 cursor-not-allowed "
                }`}>
                Add to cart
              </span>
            </button>




            {/* ) */}
            {/* } */}

          </div>
        ) : (
          <div>
            <div className='w-full'>
              <div className='grid grid-cols-2 text-center'>
                {rentalPrice?.map((detail, index) => (
                  <div
                    key={detail._id || detail.variantId}
                    className={`p-1 cursor-pointer flex flex-col gap-[4px] ${selectedRentalPeriod === detail.period ? "border-blue-500 bg-blue-500" : ""} 
    border ${index < 2 ? "border-t-0" : "border-t"}`}
                    onClick={() => setSelectedRentalPeriod(detail.period)}
                  >
                    <span
                      className={`block font-[500] text-[12px] ${selectedRentalPeriod === detail.period ? "text-white" : "text-blue-500"
                        }`}
                    >
                      {periodMapping[detail.period] || detail.period.charAt(0).toUpperCase() + detail.period?.slice(1)}
                    </span>
                    <span className={`block text-lg font-[500] text-[12px] sm:text-[16px] ${selectedRentalPeriod === detail.period ? "text-white" : "text-black"}`}>
                      ₹
                      {detail.price && detail.price.toLocaleString()}
                    </span>
                  </div>
                ))}

              </div>
              {/* Additional rows like "6 Months" */}
              <div className="mt-2">
                <div className="text-blue-500 font-[500] text-center text-[16px]">
                  {displayAvailability}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for package selection */}
      {showPackageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg p-6 w-[90vw] max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Select a Package</h3>
            <div className="grid grid-cols-2 gap-2">
              {rentalPrice?.map((detail) => (
                <button
                  key={detail._id || detail.variantId}
                  className={`border rounded p-3 transition ${modalSelectedPeriod === detail.period
                      ? "bg-blue-500 text-white border-blue-500"
                      : "hover:bg-blue-500 hover:text-white"
                    }`}
                  onClick={() => setModalSelectedPeriod(detail.period)}
                  type="button"
                >
                  <div className="font-medium">
                    {periodMapping[detail.period] ||
                      detail.period.charAt(0).toUpperCase() + detail.period?.slice(1)}
                  </div>
                  <div className="text-sm">₹{detail.price}</div>
                </button>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setShowPackageModal(false)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleModalOk}
                disabled={!modalSelectedPeriod}
                type="button"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>

  );
};

export default ProductItem;
