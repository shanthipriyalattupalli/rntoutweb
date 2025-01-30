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

const Sidebar = ({ subCategories, subcategoryId, subcategoryID, onPriceChange,distance }) => {
  console.log(subCategories, "subcategories in sidebar menu");
  const [activeIndex, setActiveIndex] = useState(null);
  const [priceRange, setPriceRange] = useState(0); // Current slider value
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
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const params = useParams();
  const categoryId = params.categoryId; // Extract categoryId directly from params
  console.log("categoryId from params:", categoryId);
  const router = useRouter();
  console.log(subcategoryId, "subcategoryid....")


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

  const handleDurationToggle = () => {
    setIsDurationOpen((prevState) => !prevState);
  };

  const handleFilterToggle = () => {
    setIsFilterOpen((prevState) => !prevState);
  };

  const handleClick = (subcategoryId, categoryId) => {
    console.log(categoryId, "categoryID.............");
    console.log(subcategoryId, "subcategoryIds...........");


    setActiveIndex(subcategoryId === activeIndex ? null : subcategoryId);
    subcategoryID(subcategoryId);
    localStorage.setItem("subcategoryId", subcategoryId);

    // router.push(`/Product-list/${categoryId}/${subcategoryId}`);
    // setActiveIndex(subcategoryId);
  };

  // useEffect(() => {
  //   console.log("Active Index Updated:", activeIndex);
  // }, [activeIndex]);

  useEffect(() => {
    if (subCategories.length > 0 && !activeIndex) {
      setActiveIndex(subCategories[0]._id);

    }
  }, [subCategories]);
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

  return (
    <div className='w-80'>
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
            <ul className="space-y-1">
              {subCategories?.map((subcategory) => (
                <li key={subcategory._id}>
                  <div
                    onClick={() => handleClick(subcategory._id, subcategory.categoryId._id)}
                    className={`flex justify-between text-gray-700 border rounded-lg hover:text-gray-900 cursor-pointer p-2 ${activeIndex === subcategory._id
                      ? "bg-[#F0F5FF] text-black border-[#2F6FED]"
                      : "bg-[#0707070D] text-black border-[#0707071A]"
                      }`}
                  >
                    {subcategory.subCategoryName}
                    <ChevronDownIcon className="w-5 h-5 text-gray-600" />
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
              <span className="text-blue-400 px-6 pb-4">Clear all</span>
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
                          <div>
                            <span className="text-gray-200 ">|</span>
                            <span>₹0</span>
                          </div>
                          <div>
                            <span className="text-gray-200 ">|</span>
                            <span>₹500</span>
                          </div>
                          <div>
                            <span className="text-gray-200 ">|</span>
                            <span>₹1k</span>
                          </div>
                          <div>
                            <span className="text-gray-200 ">|</span>
                            <span>₹1.5k</span>
                          </div>
                          <div>
                            <span className="text-gray-200 ">|</span>
                            <span>₹2k+</span>
                          </div>
                        </div>



                        {/* Display Selected Range */}
                        <div className="mt-4">
                          <div>Selected Price Range: ₹{minPrice} - ₹{maxPrice}</div>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
                <div className='bt-2'>
                  <div className='px-6 pb-4'>
                    <div
                      className='flex items-center justify-between cursor-pointer'
                      onClick={handleDeliveryByToggle}
                    >
                      <h3 className='text-md font-bold mb-2'>Delivery By</h3>
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
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
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
                        <div className="price0">
                          {priceRange && priceRange}
                        </div>



                      </div>
                    )}
                  </div>
                </div>
                <div className='bt-2'>
                  <div className='px-6 pb-4'>
                    <div
                      className='flex items-center justify-between cursor-pointer'
                      onClick={handleDeliveryByToggle}
                    >
                      <h3 className='text-md font-bold mb-2'>Delivery By</h3>
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
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
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
                        <div className="price0">
                          {priceRange && priceRange}
                        </div>



                      </div>
                    )}
                  </div>
                </div>


              </div>
            </>

          </div>
        </div>



        {/* <div className='border-b-2'>
          <div className='px-6 pb-4'>
            <div
              className='flex items-center justify-between cursor-pointer'
              onClick={handleDiscountToggle}
            >
              <h3 className='text-md font-bold mb-2'>Discount</h3>
              {isDiscountOpen ? (
                <ChevronDownIcon className='w-5 h-5 text-gray-600' />
              ) : (
                <ChevronRightIcon className='w-5 h-5 text-gray-600' />
              )}
            </div>
            {isDiscountOpen && (
              // <div className='space-y-1'>
              //   <label className='flex items-center'>
              //     <input
              //       type='radio'
              //       name='discount'
              //       value=''
              //       checked={discount === null}
              //       onChange={handleDiscountChange}
              //       className='mr-2'
              //     />
              //     Clear all
              //   </label>
              //   <label className='flex items-center'>
              //     <input
              //       type='radio'
              //       name='discount'
              //       value='900'
              //       checked={discount === "900"}
              //       onChange={handleDiscountChange}
              //       className='mr-2'
              //     />
              //     ₹900
              //   </label>
              //   <label className='flex items-center'>
              //     <input
              //       type='radio'
              //       name='discount'
              //       value='1000'
              //       checked={discount === "1000"}
              //       onChange={handleDiscountChange}
              //       className='mr-2'
              //     />
              //     ₹1000
              //   </label>
              // </div>
              <div className="w-2">
              <input
    type="range"
    id="price"
    min="0"
    max="15000"
    step="1000"
    value={priceRange}
    onChange={(e) => setPriceRange(e.target.value)} 
      className="w-[200px] h-2 bg-red-500 rounded-lg cursor-pointer accent-red-500"
      style={{
        WebkitAppearance: 'none', 
        MozAppearance: 'none',
      }}
  />
  <div className="price-values3">
    <div>
      <span className="ml-2 text-gray-200 ">|</span>
    <span>₹0</span>
    </div>
    <div>
      <span className="ml-2 text-gray-200 ">|</span>
    <span>₹500</span>
    </div>
    <div>
      <span className="ml-2 text-gray-200 ">|</span>
    <span>₹1k</span>
    </div>
    <div>
      <span className="ml-2 text-gray-200 ">|</span>
    <span>₹1.5k</span>
    </div>
    <div>
      <span className="ml-2 text-gray-200 ">|</span>
    <span>₹2k+</span>
    </div>
  </div>
  <div className="price0">
    {priceRange && `Selected Price: ₹${priceRange}`}
  </div>
     
  
  
                </div>
            )}
          </div>
        </div> */}



        {/* <div className='border-b-2'>
          <div className='px-6 pb-4'>
            <div
              className='flex items-center justify-between cursor-pointer'
              onClick={handleDurationToggle}
            >
              <h3 className='text-md font-bold mb-2'>Duration</h3>
              {isDurationOpen ? (
                <ChevronDownIcon className='w-5 h-5 text-gray-600' />
              ) : (
                <ChevronRightIcon className='w-5 h-5 text-gray-600' />
              )}
            </div>
            {isDurationOpen && (
              <div className='space-y-1'>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='duration'
                    value=''
                    checked={duration === null}
                    onChange={handleDurationChange}
                    className='mr-2'
                  />
                  Clear all
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='duration'
                    value='1 day'
                    checked={duration === "1 day"}
                    onChange={handleDurationChange}
                    className='mr-2'
                  />
                  1 day
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='duration'
                    value='3 days'
                    checked={duration === "3 days"}
                    onChange={handleDurationChange}
                    className='mr-2'
                  />
                  3 days
                </label>
                <label className='flex items-center'>
                  <input
                    type='radio'
                    name='duration'
                    value='1 week'
                    checked={duration === "1 week"}
                    onChange={handleDurationChange}
                    className='mr-2'
                  />
                  1 week
                </label>
              </div>
            )}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
