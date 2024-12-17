'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchInput from '../SearchInput';
import { useRouter } from 'next/navigation';
import logo from '../../../public/Assets/Rntout_logo.png';
const Photo = "/Assets/Photo.png"

function Header() {

  const name = localStorage.getItem('userName');
  console.log(name);
  
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
    router.push('/Login');
  };


  const [isLoggedIn, setIsLoggedIn] = useState(false); // To manage login state
  const [userName, setUserName] = useState(""); // To store the user's name after login
  



  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    router.push("/Login"); // Redirect to login page on logout
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
        <div className="ml-6" onClick={() => { router.push('/Cartpage') }}>
          <button className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-100">
            <svg className="h-6 w-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
            </svg>
          </button>
        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-2 rounded-full text-white text-lg font-medium shadow-lg 
  bg-gradient-to-r from-red-500 via-rose-500 to-red-700 
  hover:scale-105 hover:shadow-xl hover:from-red-600 hover:via-rose-600 hover:to-red-800 
  transition-transform duration-300 ml-10" onClick={() => { router.push('/add-on-rent') }}>
          <span className="text-xl font-bold ">+</span> Rent
        </button>


        <nav className="navbar">
      {!name ? (
        <button
          className="ml-5 bg-[#FF2D55] hover:bg-[#e6264c] text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300"
          onClick={() => router.push("/Login")}
        >
          Sign In / Sign Up
        </button>
      ) : (
        <div
          onClick={() => router.push("/profile")} // Redirect to profile page
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            border: "1px solid #E1E6EF",
            borderRadius: "44px",
            overflow: "hidden",
            padding: "0 10px 0 0",
            cursor: "pointer",
            marginLeft: "20px",
          }}
        >
          <img
            src={Photo}
            alt="user"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <p style={{ margin: 0 }}>{name}</p>
          {/* <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent triggering profile page redirect
              handleLogout();
            }}
            style={{
              marginLeft: "10px",
              background: "transparent",
              border: "none",
              color: "#007BFF",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Logout
          </button> */}
        </div>
      )}
    </nav>

        {/* <button className="ml-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" onClick={handleNavigate}>
          Sign In / Sign Up
        </button> */}
        {/* {!name ?
         <button className="ml-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg" onClick={() => {router.push('/Login')}}>
         Sign In / Sign Up
       </button>
        <button className='nav-login' style={{color:"black"}} onClick={() => {router.push('/Login')}}> Login</button>
          : (<div onClick={() => { router.push('/') }} style={{ display: "flex", alignItems: "center", gap: "10px", border: "1px solid #E1E6EF", borderRadius: "44px", overflow: "hidden", padding: "0 04px 0 0" }}>
            <img src={Photo} alt='user' />
            <p style={{ margin: 0 }}>nithin</p>
          </div>)
        } */}
      </div>
    </header>
  );
}

export default Header;