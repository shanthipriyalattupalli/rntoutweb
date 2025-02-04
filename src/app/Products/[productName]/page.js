"use client";

import React, { useEffect, useState, useRef } from "react";
import '../../../styles/productslist.css';
import Reviews from '../../../Components/Reviews'
import axios from "axios";
// import { useRouter } from "next/router";
import {
  Star,
  Minus,
  Plus,
  Truck,
  ArrowUpDown,
  Settings,
  Smartphone,
  ChevronDown,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { formatDistanceToNow } from 'date-fns';
import Link from "next/link";
import ProductItem from "@/Components/Home/ProductItems";
const productimg = "/Assets/pi-1.png";
const AvailIcon = "/Assets/Icons/ava-stock.png";
const AvailtyIcon = "/Assets/Icons/availability.png";
const stars = "/Assets/stars.svg";
const reviewimage = '/Assets/reviewimage.svg'
const userProfile = '/Assets/userProfile.svg'
const favorite = "/Assets/favorite.svg"
const favorited = '/Assets/favoritedicon.svg'
const star2 = "/Assets/star2.png";
const star3 = "/Assets/star3.png";
const star4 = "/Assets/star4.png";
const star5 = "/Assets/star5.png";
const star6 = "/Assets/star6.png";
const star7 = "/Assets/star7.png";
const left = '/Assets/leftarrow.svg';
const startfill = '/Assets/star_fill.svg'
const quality = '/Assets/quality.svg';
const relocation = '/Assets/relocation.svg';
const maintenance = '/Assets/maintenance.svg';
const upgrading = '/Assets/upgrading.svg';
const sample = '/Assets/Sample.png';


const ProductPage = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [quantity, setQuantity] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [selectedcustomDuration, setselectedcustomDuration] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [product, setProduct] = useState([]);
  const [rentalPrice, setRentalPrice] = useState([]);
  const [rentalAvailability, setRentalAvailability] = useState({});
  const [otherDetail, setOtherDetails] = useState({});
  const [owner, setOwner] = useState({});
  const [images, setImages] = useState([]);
  const [relatedItems, setRelatedItems] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)
  const [userRatings, setUserRatings] = useState([]);
  const [isReview, setIsReview] = useState(false)
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const swiperRef = useRef(null);
  // console.log(router , "route information")
  //   const { id, title } = router;
  //   console.log(id, "productId");
  const params = useParams();
  //   console.log(params,"params")
  // const productId = params.id;
  console.log(productId, "productId");

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


  console.log(productId, "productIdurdfcvbjhhgc");

  const fetchProductById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/variants/${productId}?includeRelated=false`);

      const data = response.data.variant;
      console.log(response, "fetch product by productid");
      setProduct(data);
      setRentalPrice(data.rentalPrice);
      setRentalAvailability(data.rentalAvailability);
      setOtherDetails(data.itemDetails);
      setImages(data.images);
      setOwner(data.owner);
      setRelatedItems(response.data.relatedItems)
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchProductById();
  }, [productId]);


  const fetchProductRatings = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/reviews/variant/${productId}`);

      const data = response.data;
      console.log(data.data, "fetch review by id");
      setUserRatings(data.data)
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchProductRatings();
  }, [productId]);


  let daily = rentalPrice.daily;
  let weekly = rentalPrice.weekly;
  let monthly = rentalPrice.monthly;
  let threeMonths = rentalPrice.threeMonths;
  let sixMonths = rentalPrice.sixMonths;
  let oneYear = rentalPrice.oneYear;

  const rentalPrices = [
    { label: "Per Day", price: daily },
    { label: "Per Week", price: weekly },
    { label: "Per Month", price: monthly },
    { label: "Per Quarter", price: threeMonths },
    { label: "Per 6 Months", price: sixMonths },
    { label: "Per year", price: oneYear },
  ];

  const durations = Object.entries(rentalPrice).map(([key, value]) => ({
    name: key,
    label: key.charAt(0).toUpperCase() + key.slice(1),
    price: `$${parseFloat(value).toFixed(2)}`, // Convert to number and format price
  }));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // Get short month name
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    return `${day} ${month} ‘${year}`;
  };
  const formattedStartDate = formatDate(rentalAvailability.startDate);
  const formattedEndDate = formatDate(rentalAvailability?.endDate);

  const services = [
    { icon: quality, label: "Finest-Quality" },
    { icon: relocation, label: "Free relocation" },
    { icon: maintenance, label: "Free maintenance" },
    { icon: upgrading, label: "Keep upgrading" },
  ];

  const productImages = [
    productimg,
    productimg,
    productimg,
    productimg,
    productimg,
    productimg,
  ];
  const otherDetails = otherDetail
    ? Object.entries(otherDetail).map(([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    }))
    : [];

  const productDetails = otherDetail
    ? Object.entries(otherDetail).map(([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    }))
    : [];
  console.log(otherDetails, "otherDetails")

  const faqItems = [
    {
      question: "Can I return before 2 months?",
      answer:
        "Yes, you can return the product within 2 months if you are not satisfied with it.",
    },
    {
      question: "How do I extend after 6 months?",
      answer:
        "You can extend your rental period by contacting our customer support team.",
    },
  ];

  const handleAddToCart = async (productId) => {
    console.log(productId, "variant id");
    try {
      const payload = {
        user_id: userId,
        variant_id: productId,
        quantity: 1,
        rentalPeriod: selectedDuration,
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
    console.log(product._id, "productidijnfmjm");
    if (userId) {
      handleAddToCart(product._id);
    } else {
      toast.error("You must be logged in to add items to cart.");
    }
  };

  const handleSellerclick = () => {
    if (owner && owner._id) {
      router.push(`/SellerProfile?id=${owner._id}`);
    } else {
      toast.error("Seller information is missing.");
    }
  };
  console.log(selectedDuration, "selectedDuration");

  const handleCustomSelection = () => {
    setselectedcustomDuration("Custom");
    setSelectedDuration(null)
  }

  const handleselectedDuration = (period) => {
    setSelectedDuration(period)
    setselectedcustomDuration(null)
  }


  const [priceRange, setPriceRange] = useState(0);
  const handlePriceRange = (e) => {
    const value = e.target.value;
    setPriceRange(value);

    // Update the background dynamically
    const percentage = (value / 360) * 100; // Calculate the percentage
    e.target.style.background = `linear-gradient(to right, #ef4444 ${percentage}%, #e5e7eb ${percentage}%)`;
  };


  const handleAddToFavorites = async () => {
    // setIsFavorite(true)
    try {
      const response = await axios.post(`${BASE_URL}/favorites/add`, { variantId: String(productId) }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setIsFavorite(true)
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding product to favorites:", error);
      toast.error(
        // error.response?.data?.message ||
        "You must be log in to add favourites."
      );
    }
  }




  const handleRemoveFavorites = async () => {
    // setIsFavorite(false)
    try {
      const response = await axios.delete(`${BASE_URL}/favorites/remove-fav/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setIsFavorite(false)
      // fetchFavorites()
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error removing product from favorites:", error);
      // toast.error(
      //   error.response?.data?.message ||
      //   "Something went wrong. Please try again."
      // );
    }
  }

  // let selectedcustomDuration = "Custom"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  // Calculate total pages
  const totalPages = Math.ceil(userRatings.length / itemsPerPage);

  const currentRatings = userRatings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPaginationNumbers = () => {
    const pages = [];
    if (totalPages <= 10) {
      // Show all pages if total pages are 10 or less
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first 3 pages, last page, and ellipsis when necessary
      pages.push(1, 2, 3);
      if (currentPage > 5) pages.push("...");
      if (currentPage > 4 && currentPage < totalPages - 3) pages.push(currentPage);
      if (currentPage < totalPages - 4) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };


  return (
    <>
      <div className='max-w-7xl mx-auto px-4'>
        <ToastContainer />
        {/* Top Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 py-6'>
          {/* Product Images */}
          <div className='space-y-4'>
            {/* Main Image */}
            <div className='relative'>
              <span className='absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-md text-sm'>
                NEW ARRIVALS
              </span>
              {isFavorite ? <span className='absolute top-4 right-4  text-white px-3 py-1 rounded-md text-sm cursor-pointer' onClick={() => handleRemoveFavorites()}>
                <img src={favorited} />
              </span> : <span className='absolute top-4 right-4  text-white px-3 py-1 rounded-md text-sm cursor-pointer' onClick={() => handleAddToFavorites()}>
                <img src={favorite} />
              </span>}
              <img
                src={images[selectedImage]} // Dynamically bind the selected image
                alt={`Product Image ${selectedImage + 1}`}
                className='w-full h-[500px] rounded-lg shadow-lg'
              />
            </div>

            {/* Thumbnails */}
            <div className='grid grid-cols-6 gap-2'>
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`border-2 rounded-lg overflow-hidden ${selectedImage === index ? "border-red-500" : "border-gray-200"
                    }`}
                  onClick={() => setSelectedImage(index)} // Update the selected image
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className='w-full h-full object-cover'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className='space-y-6'>
            <div className='space-y-2'>
              <nav className='text-sm text-gray-500'>
                Home/ Furniture/ DROGO Throne Ergonomic Gaming Chair
              </nav>
              <h1 className='text-2xl font-bold'>{product.title}</h1>

              {/* Ratings */}
              <div className='flex items-center space-x-2 cursor-pointer'>
                <img
                  src={sample}
                  alt='Seller'
                  className='w-6 h-6 rounded-full'
                />
                {owner && (

                  <Link href='/SellerProfile'><span
                    className='text-xs'
                    onClick={handleSellerclick}
                    key={owner._id}
                  >
                    {owner.name}
                  </span>
                  </Link>
                )}
                <div className='flex items-center'>
                  <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                  <span className='ml-1 text-xs'>4.6</span>
                  <span className='text-gray-500 text-xs ml-1'>(41 reviews)</span>
                </div>
              </div>
            </div>

            {/* Duration Selection */}
            <div>
              <h3 className='font-medium mb-3 text-sm'>SELECT DURATION</h3>
              <div className='grid grid-cols-5 gap-3 bg-white'>
                {rentalPrice.map((price) => (
                  <button
                    key={price._id}
                    className={`p-3 rounded-lg border text-center ${selectedDuration === price.period
                      ? "border-[#F48003] bg-[#FFF5EB]"
                      : "border-gray-200"
                      }`}
                    onClick={() => handleselectedDuration(price.period)}
                  >
                    <div className='text-xs'>{price.period}</div>
                    <div className='font-bold'>₹{price.price}</div>
                  </button>
                ))}
                <button
                  className={`p-3 rounded-lg border text-center ${selectedcustomDuration === "Custom"
                    ? "border-[#F48003] bg-[#FFF5EB]"
                    : "border-gray-200"
                    }`}
                  onClick={() => handleCustomSelection()}
                >
                  <div className='text-xs'>Custom</div>
                  {/* <div className='font-bold'>₹{price.price}</div> */}
                </button>

              </div>
            </div>

            {selectedcustomDuration === "Custom" && <div className="w-2">
              <div className="flex gap-20 text-center">
                <div>
                  <span className="ml-2 text-gray-200 ">|</span>
                  <span>₹0</span>
                </div>
                <div>
                  <span className="ml-2 text-gray-200 ">|</span>
                  <span>30d</span>
                </div>
                <div>
                  <span className="ml-2 text-gray-200 ">|</span>
                  <span>60d</span>
                </div>
                <div>
                  <span className="ml-2 text-gray-200 ">|</span>
                  <span>90d</span>
                </div>
                <div>
                  <span className="ml-2 text-gray-200 ">|</span>
                  <span>180d</span>
                </div>
                <div>
                  <span className="ml-2 text-gray-200 ">|</span>
                  <span>360d</span>
                </div>
              </div>
              <input
                type="range"
                id="price"
                min="0"
                max="360"
                step="1"
                value={priceRange}
                onInput={handlePriceRange} // Trigger on input
                className="w-[620px] h-2 bg-red-500 rounded-lg cursor-pointer accent-red-500"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  background: `linear-gradient(to right, #ef4444 0%,rgb(165, 162, 162) 0%)`, // Initial background
                }}
              />

              <div className="price0">
                {priceRange && `Selected Price: ₹${priceRange}`}
              </div>
            </div>}

            {/* Quantity */}

            {/* Availability */}

            <div className='flex items-center space-x-4 text-sm'>
              {product.stockQuantity > 0 && <div className='flex items-center text-blue-600 bg-[#2F6FED1A] rounded-full p-1.5 text-xs font-normal'>
                <img src={AvailIcon} alt='Available' className='mr-2 w-4 h-4' />
                In stock
              </div>}
              <div className='text-orange-500 bg-blue-100 rounded-md p-1 text-xs   font-[400] text-xs'>
                <img
                  src={AvailtyIcon}
                  alt='Availability'
                  className='mr-2 w-4 h-4 inline'
                />
                Availability: {formattedStartDate} {formattedEndDate && `-`}{formattedEndDate && formattedEndDate}
              </div>
            </div>
            <div className='flex items-center space-x-4'>
              <div className='flex items-center border border-red-500 text-white font-[600] rounded-lg bg-[#FF2D55]'>
                <button className='p-2 w-64' onClick={() => handleAddCart()}>
                  Add to cart
                </button>
              </div>
              {/* <div className="flex items-center border border-red-500 rounded-full bg-red-50">
              <button
                className="p-2"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-12">{quantity}</span>
              <button
                className="p-2"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div> */}
            </div>

            {/* Delivery Info */}
            <div className='flex items-center justify-around bg-white p-3 border border-slate-200 rounded-xl'>
              <div className='flex items-center text-center  justify-center'>
                <Truck className='w-5 h-5 mr-2' />
                <span className=' text-sm text-[#070707CC] font-[600]'>
                  within 2 days
                </span>
              </div>|
              <div className='flex items-center text-center  justify-center'>
                <Truck className='w-5 h-5 mr-2' />
                <span className=' text-sm text-[#070707CC] font-[600]'>
                  {formattedStartDate} {formattedEndDate === "NaN Invalid Date ‘aN" ? "" : "-"}{formattedEndDate === "NaN Invalid Date ‘aN" ? "" : formattedEndDate}
                </span>
              </div>
              <span>|</span>
              <div className='flex items-center text-blue-600 text-[#070707CC] font-[600] text-sm'>
                <span className='mr-2 '>✓</span>
                As good as new
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className='font-medium mb-3 text-sm'>SERVICES</h3>
              <div className='grid grid-cols-4 gap-4'>
                {services.map((service, index) => (
                  <div key={index} className='text-center border rounded-md py-4'>
                    <div className='flex justify-center text-blue-600 mb-2'>
                      <img src={service.icon} />
                    </div>
                    <div className='text-xs'>{service.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
    { productDetails.length >0 &&<div className='grid md:grid-cols-2 gap-8 py-6'>
          {/* Left Side - Product Details and Other Details */}
          <div className='space-y-6'>
            {/* Product Details */}
            <div className=''>
              <table className='flex flex-col w-full text-sm border bg-white rounded-3xl p-4'>
                <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                  Product Details
                </h2>
                <tbody>
                  {productDetails.map((detail, index) => (
                    <tr key={index} className=''>
                      <td className='p-2 font-semibold'>{detail.label}</td>
                      <td className='p-2 text-gray-600'>{detail.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Other Details */}
            <div>
              <table className='flex flex-col w-full border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4'>
                <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                  Other Details
                </h2>
                <tbody>
                  {otherDetails?.map((detail, index) => (
                    <tr key={index} className=''>
                      <td className='p-2 font-semibold'>{detail.label}</td>
                      <td className='p-2 text-gray-600'>{detail.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <table className='flex flex-col w-full border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4'>
                <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                  Product Description
                </h2>
                <tbody>
  <p className="font-sm text-md text-gray-700 leading-relaxed">{product.description}</p>
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Side - FAQ Section */}
          <div>
            <h2 className='text-lg font-semibold mb-3'>FAQ ABOUT THIS PRODUCT</h2>
            <div className='border bg-white rounded-lg border-slate-200'>
              {faqItems?.map((faq, index) => (
                <div key={index} className='border-b'>
                  <button
                    className='flex items-center justify-between w-full p-2'
                    onClick={() =>
                      setExpandedFaq(expandedFaq === index ? null : index)
                    }
                  >
                    <span className='text-sm font-medium'>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-200 ${expandedFaq === index ? "transform rotate-180" : ""
                        }`}
                    />
                  </button>
                  {expandedFaq === index && (
                    <div className='text-sm text-gray-600 px-3 py-2'>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>}

        {/* Left Side - Product Details and Other Details */}
        {/* <div className='space-y-6'>
    
          <div className=''>
            <table className='flex flex-col w-full text-sm border bg-white rounded-3xl p-4'>
              <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                Product Details
              </h2>
              <tbody>
                {productDetails.map((detail, index) => (
                  <tr key={index} className=''>
                    <td className='p-2 font-semibold'>{detail.label}</td>
                    <td className='p-2 text-gray-600'>{detail.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

   
          <div>
            <table className='flex flex-col w-full border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4'>
              <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                Other Details
              </h2>
              <tbody>
                {otherDetails?.map((detail, index) => (
                  <tr key={index} className=''>
                    <td className='p-2 font-semibold'>{detail.label}</td>
                    <td className='p-2 text-gray-600'>{detail.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
        <div className="flex flex-col w-1/2 gap-2 border b-black-200 bg-white-500 p-10 rounded-lg text-center justify-center">
          <h2 className="text-black-500 text-5xl font-bold ">4.7</h2>
          <div className="flex gap-2 ml-48">
            <img src={startfill} alt="Rating stars" className="" />
            <img src={startfill} alt="Rating stars" className="" />
            <img src={startfill} alt="Rating stars" className="" />
            <img src={startfill} alt="Rating stars" className="" />
            <img src={startfill} alt="Rating stars" className="" />
          </div>
        </div>
        <div className="pt-3 w-1/2 justify-center text-center">
          <button className="border b-orange-200 bg-orange-400 p-3 w-80 rounded-lg text-white font-semibold" onClick={() => setIsReview(true)}>write a review</button>
        </div>
        {isReview && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => setIsReview(false)}>
                ✕
              </button>
              <Reviews />
            </div>
          </div>

        )}

        {currentRatings.length > 0 && (
          <>
            <h2 className='pb-4 pt-8 font-semibold text-black-700'>
              Community Feedback
            </h2>
            <div>
              {currentRatings.map((rating) => (
                <div key={rating._id} className="flex flex-col gap-3">
                  <table className="flex flex-col gap-2 w-[610px] border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4">
                    <tbody>
                      <tr>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-3">
                            <p
                              className={`flex gap-1 items-center px-2 rounded-full text-white 
                      ${rating.rating >= 4 ? "bg-green-700" : rating.rating >= 2 ? "bg-orange-500" : "bg-red-500"}`}
                            >
                              <img src={stars} alt="Rating stars" className="w-4 h-4" />
                              <span className="ml-1">{rating.rating}</span>
                            </p>
                            <p className="text-[14px] font-medium leading-[20px] ">{rating.comment}</p>
                          </div>
                          <p className="text-[14px] font-medium leading-[20px] ">{rating.comment}</p>
                        </div>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex gap-2 p-2">
                    <img src={userProfile} alt="User Profile" />
                    <p className="flex gap-2 text-[14px] font-medium text-gray-500 text-left">
                      {formatDistanceToNow(new Date(rating.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}

              {/* Pagination Controls */}
              <div className="flex mt-4 gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Prev
                </button>

                {/* Page Numbers */}
                {getPaginationNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === "number" && setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-full ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    disabled={page === "..."}
                  >
                    {page}
                  </button>
                ))}

                {/* Next Button */}
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>)}
        {relatedItems.length > 3 && <div className="py-10">
          <h2 className="font-medium text-xl">Related products</h2>
          <div className="relative flex gap-5 pt-10">
            <div
              className="absolute top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
              onClick={() => swiperRef.current?.slidePrev()} // Navigate to the previous slide
            >
              <img src={left} alt="Previous" className="rotate-360" />
            </div>
            <div
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <img src={left} alt="Next" className="rotate-180" />
            </div>
            <Swiper
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              spaceBetween={20}
              slidesPerView={4}
              navigation={false}
              pagination={false}
              // pagination={{ clickable: true }}
              modules={[Navigation, Pagination]}
              style={{ width: '100%' }}

            >
              {relatedItems.map((product) => (
                <SwiperSlide key={product._id} className="flex justify-center">
                  <ProductItem product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>}
      </div>

    </>
  );
};

export default ProductPage;
