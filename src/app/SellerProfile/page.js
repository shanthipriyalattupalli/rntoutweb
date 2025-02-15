"use client";

import React, { useEffect, useState, Suspense, lazy } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
// import "@/styles/SellerProfile.css";
import SellerProfile from '../../Components/Seller/SellerProducts'
import '../../styles/Sellerprofile.css'
import { useRouter } from "next/navigation";
const startfill='/Assets/star_fill.svg'
const stars = "/Assets/stars.svg";
const userProfile = '/Assets/userProfile.svg'

// Lazy load components
const Aboutus = lazy(() => import("@/Pages/Aboutus"));
const Fqa = lazy(() => import("@/Pages/Fqa"));
const Products = lazy(() => import("@/app/Products/page"));

const SellerCarouselProfile = () => {
  /* const searchParams = useSearchParams();
  const sellerId = searchParams.get("id"); */
  const params = useParams();
  const sellerId = params.id;

  const slides = [
    { id: 1, image: "/Assets/sofa.svg" },
    { id: 2, image: "/Assets/sofa.svg" },
    { id: 3, image: "/Assets/sofa.svg" },
  ];
  const [userRatings, setUserRatings] = useState([])

  const [currentSlide, setCurrentSlide] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 1;
    const totalPages = Math.ceil(userRatings.length / itemsPerPage);
  
  const [activeTab, setActiveTab] = useState("products");

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };


  // const fetchProductRatings = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/reviews/variant/${productId}`);

  //     const data = response.data;
  //     console.log(data.data, "fetch review by id");
  //     setUserRatings(data.data)
  //   } catch (error) {
  //     console.error("Error fetching product:", error);
  //   }
  // };
  // useEffect(() => {
  //   fetchProductRatings();
  // }, [productId]);


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


  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <Suspense fallback={<div>Loading Products...</div>}>
            <div className="p-5">
            {/* <div className='seller-tab-content'> */}
              {/* <Products /> */}
              <SellerProfile/>
            {/* </div> */}
            </div>
          </Suspense>
        );
      case "about":
        return (
          <Suspense fallback={<div>Loading About Us...</div>}>
            <div className="p-5">
              <Aboutus />
            </div>
          </Suspense>
        );
      case "reviews":
        return (
          <div className="px-16 py-5 bg-none">
          <div className='seller-tab-content'>
            <h2 className="p-2 text-blue-500 font-semibold text-md">Ratings and Reviews</h2>
           <div className="flex flex-col w-full gap-2 border b-black-200 bg-white-900 p-10 rounded-lg text-center justify-center">
             <h2 className="text-black-500 text-5xl font-bold ">4.7</h2>
             <div className="flex gap-2 text-center justify-center">
             <img src={startfill} alt="Rating stars"className="" />
             <img src={startfill} alt="Rating stars"className="" />
             <img src={startfill} alt="Rating stars"className="" />
             <img src={startfill} alt="Rating stars"className="" />
             <img src={startfill} alt="Rating stars"className="" />
             </div>
             </div>
             <div className="pt-3 w-full justify-center text-center">
             <button className="border b-orange-200 bg-orange-400 p-3 w-80 rounded-lg text-white font-semibold">write a review</button>
             </div>
   
         
         <h2 className='pb-4 pt-8 font-semibold text-black-700'>
           Community Feedback
         </h2>
         <div className="flex gap-2 mb-4">
          <input type="search" placeholder="Search Reviews" className="w-1/2 border b-grey-100 p-2 rounded-md"/>
          <select className="border b-grey-100 p-2 rounded-md">
            <option value="Top Reviews">Top Reviews</option>
            <option value="Top Reviews">Top Reviews</option>
            <option value="Top Reviews">Top Reviews</option>
          </select>
          <select className="border b-grey-100 p-2 rounded-md">
            <option value="Top Reviews">All starts</option>
            <option value="Top Reviews">All starts</option>
            <option value="Top Reviews">All starts</option>
          </select>
          <select className="border b-grey-100 p-2 rounded-md">
            <option value="Top Reviews">All Text and Image Reviews</option>
            <option value="Top Reviews">All Text and Image Reviews</option>
            <option value="Top Reviews">All Text and Image Reviews</option>
          </select>
         </div>
         <div>
         {/* {currentRatings.map((rating) => ( */}
           <div  className="flex flex-col gap-3">
             <table className="flex flex-col gap-2 w-[610px]  text-sm p-4">
               <tbody>
                 <tr>
                   <div className="flex flex-col gap-2">
                     <div className="flex gap-3">
                       <p
                         className={`flex gap-1 items-center px-2 bg-green-700  rounded-full text-white `}
                       >
                         <img src={stars} alt="Rating stars" className="w-4 h-4 " />
                         <span className="ml-1">4.5</span>
                       </p>
                       <p className="text-[14px] font-medium leading-[20px] ">Best chair at this budget</p>
                     </div>
                     <p className="text-[14px] font-medium leading-[20px] ">Chair quality is good it's value for money as it's a sale deal, back support and massager is best , fabric is also breathable</p>
                   </div>
                 </tr>
               </tbody>
             </table>
             <div className="flex gap-2 p-2">
               <img src={userProfile} alt="User Profile" />
               <p className="flex gap-2 text-[14px] font-medium text-gray-500 text-left">
                Nikitha <span>. Just Now</span>
                 {/* {formatDistanceToNow(new Date(rating.createdAt), { addSuffix: true })} */}
               </p>
             </div>
           </div>
         {/* ))} */}
   
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
               className={`px-3 py-1 border rounded-full ${
                 currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
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
          </div>
          </div>
        );
      case "faq":
        return (
          <Suspense fallback={<div>Loading FAQ...</div>}>
            <div>
              <Fqa />
            </div>
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className='seller-carousel-container'>
        <div className='seller-carousel-slide'>
          <img
            src={slides[currentSlide].image}
            alt={`Slide ${currentSlide + 1}`}
            className='seller-carousel-image'
          />
        </div>
        <button className='seller-carousel-prev-button' onClick={handlePrev}>
          &#x276E;
        </button>
        <button className='seller-carousel-next-button' onClick={handleNext}>
          &#x276F;
        </button>
        <div className='seller-carousel-indicators'>
          {slides?.map((_, index) => (
            <span
              key={index}
              className={`seller-carousel-indicator ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className='seller-profile-container'>
        {/* Header Section */}
        <div className='seller-profile-header'>
          <div className='seller-company-info'>
            <h1>
              RntOut Enterprise{" "}
              <span className='seller-verified'>&#x2714;</span>
            </h1>
            <p>
              <span className='seller-contact-item'>📞 +91 12345 67890</span> |{" "}
              <span className='seller-contact-item'>
                ✉️ rntout.enterprise@gmail.com
              </span>{" "}
              |{" "}
              <span className='seller-contact-item'>
                📍 3-6-288/3, Sri Siva Rama Towers, King Koti, Hyderabad,
                Telangana, India 500029
              </span>
            </p>
          </div>
        </div>

        {/* About Us Section */}
        <div className='seller-about-us'>
          <h2>About Us</h2>
          <p>
            Fantaslook focusing on garment production and sales, vigorously
            develop cross-border e-commerce platform to sell clothing, the
            company mainly sells all kinds of women's clothing, the annual sales
            are on the rise, the variety of clothing is more and more, women's
            shirts, tops, dresses, miniskirts, home wear, sportswear, etc.
            Fantaslook was founded in.{" "}
            <a href='#' className='seller-read-more'>
              read more...
            </a>
          </p>
          <p className='seller-business-name'>
            <strong>Business Name:</strong> Yueyang Guangzhou Import and Export
            Co Ltd
          </p>
        </div>

        {/* Reviews Section */}
        <div className='seller-store-reviews'>
          <p>
            <strong>Store Reviews:</strong>{" "}
            <span className='seller-rating'>4.4 out of 5</span>{" "}
            <span className='seller-review-stats'>
              (19,997 ratings and 1,273 reviews)
            </span>
          </p>
        </div>

        {/* Tab Navigation */}
        <div className='seller-tabs'>
          <button
            className={`seller-tab ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button
            className={`seller-tab ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Rating & Reviews
          </button>
          <button
            className={`seller-tab ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            About Us
          </button>
          <button
            className={`seller-tab ${activeTab === "faq" ? "active" : ""}`}
            onClick={() => setActiveTab("faq")}
          >
            FAQ
          </button>
        </div>

        {/* Dynamic Tab Content */}
        {renderContent()}
      </div>
    </>
  );
};

export default SellerCarouselProfile;
