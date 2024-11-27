'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchInput from '../SearchInput';
import { useRouter } from 'next/navigation';
import logo from '../../../public/Assets/Rntout_logo.png';

function Header() {
  const [location, setLocation] = useState('HYD - 500008');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    setIsDropdownOpen(false);
  };

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
  };


  const handleNavigate = () => {
    router.push('/profile'); 
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md"> 
      <div className="flex items-center">
        <a href="/"> 
          <Image src={logo} alt="RNT Out Logo" className="h-10" /> 
        </a>
      </div>
      <div className="flex items-center">
        <div className="relative ml-4">
        <SearchInput onChange={handleSearchInputChange} />
        </div>
        <div className="relative ml-4"> 
          <button 
            id="dropdownBtn"
            className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-gray-100" 
            onClick={toggleDropdown}
          >
            <span className="text-gray-700">{location}</span> 
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          {isDropdownOpen && (
            <div 
              id="dropdownMenu"
              className="absolute origin-top-right right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100"
            >
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                {['HYD - 500008', 'HYD - 500028', 'HYD - 500032', 'HYD - 500084'].map((loc) => (
                  <a 
                    key={loc} 
                    href="#" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                    role="menuitem"
                    onClick={() => handleLocationChange(loc)}
                  >
                    {loc}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="ml-6"   onClick={() => {router.push('/Cartpage')}}>
          <button className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-100"> 
            <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </button>
        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-2 rounded-full text-white text-lg font-medium shadow-lg bg-gradient-to-r from-pink-400 via-red-400 to-blue-400 hover:scale-105 hover:shadow-xl transition-transform ml-10" onClick={() => {router.push('/add-on-rent')}}>
      <span className="text-xl font-bold ">+</span> Rent
    </button>

        <button className="ml-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handleNavigate}>
          Sign In / Sign Up
        </button>
      </div>
    </header>
  );
}

export default Header;