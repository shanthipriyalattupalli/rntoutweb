"use client";

import React, { useState, useEffect } from "react";
import '../../../styles/productslist.css';
import {
  ArrowDownNarrowWide,
  ChevronDownIcon,
  ChevronRightIcon,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
// import { useParams } from 'next/navigation';
const downArrow = "/Assets/down_line.png";
import Cookies from "js-cookie";

const Sidebar = ({categories, subCategories, subcategoryId, subcategoryID, onPriceChange, distance, rating }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [priceRange, setPriceRange] = useState(25); // Current slider value
  const [ratings, setRating] = useState(5)
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2000);
  const [discount, setDiscount] = useState(null);
  const [deliveryBy, setDeliveryBy] = useState("Today");
  const [duration, setDuration] = useState(null);
  const [filter, setFilter] = useState(null);
  const [isSubCategoriesOpen, setIsSubCategoriesOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [isDeliveryByOpen, setIsDeliveryByOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);


  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const params = useParams();
  const categoryId = params.categoryId; // Extract categoryId directly from params
  const router = useRouter();

 const latitude=Cookies.get("latitude");
 const longitude=Cookies.get("longitude")
 


  // Set the default active subcategory when the component mounts



  // const handlePriceRangeChange = (event) => {
  //   const [min, max] = event.target.value.split(",")?.map(Number);
  //   setPriceRange([min, max]);
  // };

  const handleDiscountChange = (event) => {
    setDiscount(event.target.value);
  };

  const handleDeliveryByChange = (event) => {
    setDeliveryBy(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSubCategoriesToggle = () => {
    setIsSubCategoriesOpen((prevState) => !prevState);
  };

  const handlePriceToggle = () => {
    setIsPriceOpen((prevState) => !prevState);
  };

  const handleDiscountToggle = () => {
    setIsDiscountOpen((prevState) => !prevState);
  };

  const handleDeliveryByToggle = () => {
    setIsDeliveryByOpen((prevState) => !prevState);
  };
  const handleRatingByToggle = () => {
    setIsRatingOpen((prevState) => !prevState);
  };

  const handleDurationToggle = () => {
    setIsDurationOpen((prevState) => !prevState);
  };

  const handleFilterToggle = () => {
    setIsFilterOpen((prevState) => !prevState);
  };

  const handleClick = (subcategoryId, categoryId) => {
    if (openIndex === subcategoryId) {
      setOpenIndex(null);
    } else {
      setOpenIndex(subcategoryId);
    }


    setActiveIndex(subcategoryId === activeIndex ? null : subcategoryId);
    subcategoryID(subcategoryId);
    localStorage.setItem(`subcategoryId_${categoryId}`, subcategoryId);
  };

  useEffect(() => {
    if (categories.length > 0) {
      categories.forEach((category) => {
        const storedSubcategoryId = localStorage.getItem(`subcategoryId_${category.id}`);
        
        if (!storedSubcategoryId && category.subcategories?.length > 0) {
          const firstSubcategoryId = category.subcategories[0].id;
          setActiveIndex(firstSubcategoryId);
          localStorage.setItem(`subcategoryId_${category.id}`, firstSubcategoryId);
        }
      });
    }
  }, [categories]);


  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "min") {
      const newMinPrice = Math.min(+value, maxPrice - 1);
      setMinPrice(newMinPrice);
      onPriceChange(newMinPrice, maxPrice); // Pass updated values to parent
    } else {
      const newMaxPrice = Math.max(+value, minPrice + 1);
      setMaxPrice(newMaxPrice);
      onPriceChange(minPrice, newMaxPrice); // Pass updated values to parent
    }
  };



  const handlePriceRange = (e) => {
    const distances = e.target.value;
    setPriceRange(distances);
    distance(distances);
  }

  const handleRating = (e) => {
    const newRating = e.target.value;
    setRating(newRating);
    rating(newRating);
  };

  const handleClearFilters = () => {
    setMinPrice(0);
    setMaxPrice(2000);
    setPriceRange(25);
    setRating(5);
    onPriceChange(0,2000);
    distance(25);
    rating(5)
  };


  return (
    <div className="w-full sm:w-80">
      <div className='border rounded-tl-lg'>
        <div className='mb-6 px-6 pt-4'>
          <div
            className='flex items-center justify-between cursor-pointer'
            onClick={handleSubCategoriesToggle}
          >
            <h3 className='text-md font-bold mb-2'>Sub Categories</h3>
            {isSubCategoriesOpen ? (
              <ChevronDownIcon className='w-5 h-5 text-gray-600' />
            ) : (
              <ChevronRightIcon className='w-5 h-5 text-gray-600' />
            )}
          </div>
          {isSubCategoriesOpen && (
            <ul className="space-y-1 ">
              {subCategories?.map((subcategory) => (
                <li key={subcategory._id} >
                  <div
                    onClick={() => handleClick(subcategory._id, subcategory.categoryId._id)}
                    className={`w-full 2xl:w-full flex justify-between items-center text-gray-700 border rounded-lg hover:text-gray-900 cursor-pointer p-2 ${openIndex === subcategory._id ||subcategoryId === subcategory._id
                      ? "bg-[#F0F5FF] text-black border-[#2F6FED]"
                      : "bg-[#0707070D] text-black border-[#0707071A]"
                      }`}
                  >
                    <span className="truncate w-[80%]">{subcategory.subCategoryName}</span>
                    {openIndex === subcategory._id ? (
                      <ChevronRightIcon className="w-5 h-5 text-gray-600" />

                    ) : (
                      <ChevronDownIcon className="w-5 h-5 text-gray-600" />
                    )}
                  </div>

                </li>
              ))}
            </ul>
          )}

        </div>
      </div>
      <div className='space-y-6'>
        <div className='pt-3 border rounded-bl-lg'>
          <div className=''>
            <div
              className='flex items-center justify-between cursor-pointer'
              onClick={handleFilterToggle}
            >
              <h2 className='text-md font-bold mb-2 px-6 pb-4'>Filters</h2>
              <span className="text-[#2F6FED] text-sm cursor-pointer px-6 pb-4" onClick={handleClearFilters}>
                Clear all
              </span>

              {/* {isFilterOpen ? (
                <ChevronDownIcon className='w-5 h-5 text-gray-600' />
              ) : (
                <ChevronRightIcon className='w-5 h-5 text-gray-600' />
              )} */}
            </div>

            <>
              <div className='space-y-1'>

              </div>
              <div className=''>
                <div className='px-6 pb-4'>
                  <div
                    className='flex items-center justify-between cursor-pointer'
                    onClick={handlePriceToggle}
                  >
                    <h3 className='text-md font-bold mb-2'>Price</h3>
                    {isPriceOpen ? (
                      <ChevronDownIcon className='w-5 h-5 text-gray-600' />
                    ) : (
                      <ChevronRightIcon className='w-5 h-5 text-gray-600' />
                    )}
                  </div>
                  {isPriceOpen && (
                    <div className="grid grid-cols-2 gap-2 cursor-pointer">



                      <div className="w-full flex flex-col">
                        <div className="relative w-[200px] ">
                          {/* Range Track */}
                          <div className="absolute bg-red-200 h-2 w-full rounded-lg"></div>
                          <div
                            className="absolute bg-red-500 h-2 rounded-lg"
                            style={{
                              left: `${(minPrice / 2000) * 100}%`,
                              right: `${100 - (maxPrice / 2000) * 100}%`,
                            }}
                          ></div>

                          {/* Input sliders */}
                          <input
                            type="range"
                            min="0"
                            max="2000"
                            step="1"
                            value={minPrice}
                            name="min"
                            onChange={handleChange}
                            className="absolute w-full appearance-none bg-transparent pointer-events-auto"
                            style={{ zIndex: 2 }}
                          />
                          <input
                            type="range"
                            min="0"
                            max="2000"
                            step="1"
                            value={maxPrice}
                            name="max"
                            onChange={handleChange}
                            className="absolute w-full appearance-none bg-transparent pointer-events-auto"
                            style={{ zIndex: 1 }}
                          />
                        </div>

                        {/* Price Labels */}
                        <div className="price-values3">
                          <div className="flex flex-col text-xs font-normal leading-[18px] text-left">
                            <span className="ml-2 text-gray-200 ">|</span>
                            <span>₹0</span>
                          </div>
                          <div className="flex flex-col text-xs font-normal leading-[18px] text-left">
                            <span className="ml-2 text-gray-200 ">|</span>
                            <span>₹2000</span>
                          </div>
                        </div>



                        {/* Display Selected Range */}
                        <div className="mt-4">
                          {/* <div>Selected Price Range: ₹{minPrice} - ₹{maxPrice}</div> */}
                        </div>
                      </div>

                    </div>
                  )}
                </div>

   {latitude && longitude &&             <div className='bt-2'>
                  <div className='px-6 pb-4'>
                    <div
                      className='flex items-center justify-between cursor-pointer'
                      onClick={handleDeliveryByToggle}
                    >
                      <h3 className='text-md font-bold mb-2'>Distance</h3>
                      {isDeliveryByOpen ? (
                        <ChevronDownIcon className='w-5 h-5 text-gray-600' />
                      ) : (
                        <ChevronRightIcon className='w-5 h-5 text-gray-600' />
                      )}
                    </div>
                    {isDeliveryByOpen && (


                      <div className="w-2">
                        <input
                          type="range"
                          id="price"
                          min="0"
                          max="25"
                          step="1"
                          value={priceRange}
                          onChange={(e) => handlePriceRange(e)}
                          // onChange={(e) => setPriceRange(e.target.value)} 
                          className="w-[200px] h-2 bg-red-500 rounded-lg cursor-pointer accent-red-500"
                          style={{
                            background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(priceRange / 25) * 100}%, #fecaca ${(priceRange / 25) * 100}%, #fecaca 100%)`,
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                          }}
                        />

                        <div className="price-values2">
                          <div className="flex flex-col text-xs font-normal leading-[18px] text-left">
                            <span className="ml-2 text-gray-200 ">|</span>
                            <span>0km</span>
                          </div>
                          <div className="flex flex-col text-xs font-normal leading-[18px] text-left">
                            <span className="ml-2 text-gray-200 ">|</span>
                            <span >5km</span>
                          </div>
                          <div className="flex flex-col text-xs font-normal leading-[18px] text-left">
                            <span className="ml-2 text-gray-200 ">|</span>
                            <span>10km</span>
                          </div>
                          <div className="flex flex-col text-xs font-normal leading-[18px] text-left">
                            <span className="ml-2 text-gray-200 ">|</span>
                            <span>15km</span>
                          </div>
                          <div className="flex flex-col text-xs font-normal leading-[18px] text-left">
                            <span className="ml-2 text-gray-200 ">|</span>
                            <span>20km</span>
                          </div>
                          <div className="flex flex-col text-xs font-normal leading-[18px] text-left">
                            <span className="ml-2 text-gray-200 ">|</span>
                            <span>25+km</span>
                          </div>
                        </div >
                        {/* <div className="price0">
                          {priceRange && priceRange}
                        </div> */}



                      </div>
                    )}
                  </div>
                </div>}
                <div className='bt-2'>
                  <div className='px-6 pb-4'>
                    <div
                      className='flex items-center justify-between cursor-pointer'
                      onClick={handleRatingByToggle}
                    >
                      <h3 className='text-md font-bold mb-2'>Rating</h3>
                      {isRatingOpen ? (
                        <ChevronDownIcon className='w-5 h-5 text-gray-600' />
                      ) : (
                        <ChevronRightIcon className='w-5 h-5 text-gray-600' />
                      )}
                    </div>
                    {isRatingOpen && (


                      <div className="w-2">
                        <input
                          type="range"
                          id="rating"
                          min="0"
                          max="5"
                          step="1"
                          value={ratings}
                          onChange={(e) => handleRating(e)}
                          // onChange={(e) => setPriceRange(e.target.value)} 
                          className="w-[200px] h-2 bg-red-500 rounded-lg cursor-pointer accent-red-500"
                          style={{
                            background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(ratings / 5) * 100}%, #fecaca ${(ratings / 5) * 100}%, #fecaca 100%)`,
                            WebkitAppearance: "none",
                            MozAppearance: "none",
                          }}
                        />

                        <div className="price-values4">
                          {[1, 2, 3, 4, 5].map((num) => (
                            <div key={num} className="flex flex-col text-xs font-normal leading-[18px] text-left">
                              <span className="ml-2 text-gray-200">|</span>
                              <span className="flex items-center gap-1">
                                {num}
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.158 3.554a1 1 0 00.95.69h3.75c.969 0 1.371 1.24.588 1.81l-3.033 2.213a1 1 0 00-.364 1.118l1.158 3.554c.3.921-.755 1.688-1.54 1.118l-3.033-2.213a1 1 0 00-1.176 0L5.037 16.99c-.784.57-1.839-.197-1.54-1.118l1.158-3.554a1 1 0 00-.364-1.118L1.258 9.004c-.784-.57-.38-1.81.588-1.81h3.75a1 1 0 00.95-.69l1.158-3.554z" />
                                </svg>
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* <div className="price0">
                          {ratings && ratings}
                        </div> */}



                      </div>
                    )}
                  </div>
                </div>



              </div>
            </>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
