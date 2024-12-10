
"use client";

import React, { useState,useEffect } from 'react';
import { ArrowDownNarrowWide, ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
const downArrow ='/Assets/down_line.png'

const Sidebar = ({subCategories}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [priceRange, setPriceRange] = useState([800, 1000]);
  const [discount, setDiscount] = useState(null);
  const [deliveryBy, setDeliveryBy] = useState('Today');
  const [duration, setDuration] = useState(null);
  const [filter, setFilter] = useState(null);
  const [isSubCategoriesOpen, setIsSubCategoriesOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  const [isDiscountOpen, setIsDiscountOpen] = useState(false);
  const [isDeliveryByOpen, setIsDeliveryByOpen] = useState(false);
  const [isDurationOpen, setIsDurationOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handlePriceRangeChange = (event) => {
  const BASE_URL=process.env.NEXT_PUBLIC_APP_BASE_URL
  
  const params = useParams();
  const categoryId = params.categoryId; // Extract categoryId directly from params
  console.log("categoryId from params:", categoryId);

    const [min, max] = event.target.value.split(',').map(Number);
    setPriceRange([min, max]);
  };

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


  const handleClick = (subcategoryId,categoryId) => {
    console.log(categoryId,"categoryID.............")
    console.log(subcategoryId,"subcategoryIds...........")
    setActiveIndex(subcategoryId === activeIndex ? null : subcategoryId); // Toggle the active index
    router.push(`/Product-list/${categoryId}/${subcategoryId}`);
  };

  return (
    <div className="w-80 bg-white border-r border-gray-300">
        <div className='border-b-2'>
      <div className="mb-6 px-6 pt-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={handleSubCategoriesToggle}
        >
          <h3 className="text-md font-bold mb-2">Sub Categories</h3>
          {isSubCategoriesOpen ? (
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          )}
        </div>
        {isSubCategoriesOpen && (
          <ul className="space-y-1">
      {subCategories.map((subcategory) => (
        <li key={subcategory._id}>
          <a
            href={`/Product-list/${subcategory.categoryId._id}/${subcategory._id}`}
            onClick={() => handleClick(subcategory._id)}
            className={`flex justify-between text-gray-700 border rounded-lg  hover:text-gray-900 border-[Neutral/200] cursor-pointer p-2 ${
              activeIndex === subcategory._id ? 'bg-[#F0F5FF] text-Black border-[#2F6FED]' : ''
            }`}
          >
            {subcategory.subCategoryName}
            <ChevronDownIcon className="w-5 h-5 text-gray-600" />
          </a>
        </li>
      ))}
    </ul>
)}
      </div>
      </div>
      <div className="space-y-6">
      <div className='border-b-2 pt-3'>
        <div className='px-6 pb-4'>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={handleFilterToggle}
          >
            <h3 className="text-md font-bold mb-2">Filter</h3>
            {isFilterOpen ? (
              <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            )}
          </div>
          {isFilterOpen && (
            <div className="space-y-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="filter"
                  value=""
                  checked={filter === null}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Clear all
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="filter"
                  value="Best Seller"
                  checked={filter === 'Best Seller'}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Best Seller
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="filter"
                  value="Top Rated"
                  checked={filter === 'Top Rated'}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Top Rated
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="filter"
                  value="New Arrivals"
                  checked={filter === 'New Arrivals'}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                New Arrivals
              </label>
            </div>
            
          )}
        </div>
        </div>

        <div className='border-b-2'>
        <div className='px-6 pb-4'>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={handlePriceToggle}
          >
            <h3 className="text-md font-bold mb-2">Price</h3>
            {isPriceOpen ? (
              <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            )}
          </div>
          {isPriceOpen && (
            <div className="flex flex-col">
              <input
                type="range"
                min="800"
                max="1100"
                value={priceRange.join(',')}
                onChange={handlePriceRangeChange}
                className="w-full"
              />
              <div className="flex justify-between text-gray-600 text-sm">
                <span>₹{priceRange[0]}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>
          )}
        </div>
          </div>

        <div className='border-b-2'>
        <div className='px-6 pb-4'>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={handleDiscountToggle}
          >
            <h3 className="text-md font-bold mb-2">Discount</h3>
            {isDiscountOpen ? (
              <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            )}
          </div>
          {isDiscountOpen && (
            <div className="space-y-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="discount"
                  value=""
                  checked={discount === null}
                  onChange={handleDiscountChange}
                  className="mr-2"
                />
                Clear all
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="discount"
                  value="900"
                  checked={discount === '900'}
                  onChange={handleDiscountChange}
                  className="mr-2"
                />
                ₹900
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="discount"
                  value="1000"
                  checked={discount === '1000'}
                  onChange={handleDiscountChange}
                  className="mr-2"
                />
                ₹1000
              </label>
            </div>
          )}
        </div>
          </div>

        <div className='border-b-2'>
        <div className='px-6 pb-4'>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={handleDeliveryByToggle}
          >
            <h3 className="text-md font-bold mb-2">Delivery By</h3>
            {isDeliveryByOpen ? (
              <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            )}
          </div>
          {isDeliveryByOpen && (
            <div className="space-y-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="delivery-by"
                  value="Today"
                  checked={deliveryBy === 'Today'}
                  onChange={handleDeliveryByChange}
                  className="mr-2"
                />
                Today
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="delivery-by"
                  value="Tomorrow"
                  checked={deliveryBy === 'Tomorrow'}
                  onChange={handleDeliveryByChange}
                  className="mr-2"
                />
                Tomorrow
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="delivery-by"
                  value="24 Sep"
                  checked={deliveryBy === '24 Sep'}
                  onChange={handleDeliveryByChange}
                  className="mr-2"
                />
                24 Sep
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="delivery-by"
                  value="25 Sep"
                  checked={deliveryBy === '25 Sep'}
                  onChange={handleDeliveryByChange}
                  className="mr-2"
                />
                25 Sep
              </label>
            </div>
          )}
        </div>
          </div>

        <div className='border-b-2'>
        <div className='px-6 pb-4'>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={handleDurationToggle}
          >
            <h3 className="text-md font-bold mb-2">Duration</h3>
            {isDurationOpen ? (
              <ChevronDownIcon className="w-5 h-5 text-gray-600" />
            ) : (
              <ChevronRightIcon className="w-5 h-5 text-gray-600" />
            )}
          </div>
          {isDurationOpen && (
            <div className="space-y-1">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="duration"
                  value=""
                  checked={duration === null}
                  onChange={handleDurationChange}
                  className="mr-2"
                />
                Clear all
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="duration"
                  value="1 day"
                  checked={duration === '1 day'}
                  onChange={handleDurationChange}
                  className="mr-2"
                />
                1 day
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="duration"
                  value="3 days"
                  checked={duration === '3 days'}
                  onChange={handleDurationChange}
                  className="mr-2"
                />
                3 days
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="duration"
                  value="1 week"
                  checked={duration === '1 week'}
                  onChange={handleDurationChange}
                  className="mr-2"
                />
                1 week
              </label>
            </div>
          )}
        </div>
          </div>
        
      </div>
    </div>
  );
};

export default Sidebar;