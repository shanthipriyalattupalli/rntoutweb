"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";

const codefacts = '/Assets/codefacts.svg'
const facebook = '/Assets/face book.svg'
const twitter = '/Assets/twitter.svg'
const instagram = '/Assets/instagram.svg'
const youtube = '/Assets/youtub.svg'
const rentoutlogo = '/Assets/rentoutlogo.svg'
import { useRouter } from "next/navigation"; 
const Newsletter = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

    const [categories, setCategories] = useState([]);
  
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      console.log(response.data.categories, "response in categ.....................");
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="bg-black pt-12 px-24">
      <div className="md:flex md:justify-between">
        {/* Newsletter Subscription Section */}
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-4">Stay in the loop with our newsletter!</h3>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter Email Address"
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="absolute top-1/2 right-3 transform -translate-y-1/2 text-red-500">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Subscribe to our newsletter and unlock a world of exclusive benefits. Be the first to know about our
            latest products, special promotions, and exciting updates. Join our community of like-minded individuals
            who share a passion for.
          </p>
          <div className="flex items-center mt-4">

            <span className="flex gap-2 text-gray-400 text-sm">
              Developed by:
              <div className="flex cursor-pointer">
                <a href="https://codefacts.com/" target="_blank" rel="noopener noreferrer">
                  <img
                    src={codefacts}
                    alt="CodeFacts Logo"
                    className="w-8 h-5 mr-2"
                  />
                </a>
                <a href="https://codefacts.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400">
                  CODEFACTS
                </a>
              </div>
            </span>

          </div>
        </div>

        {/* Links Section */}
        <div className="md:w-2/3 flex justify-between ml-8">
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Product</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              {categories.map((category)=>(
                <li key={category._id}>
                  <a href={`/Product-list/${category._id}`} className="text-gray-400 hover:text-gray-600 text-sm">{category.categoryName}</a>
                </li>
              ))}
              {/* <li>Employee database</li>
              <li>Payroll</li>
              <li>Absences</li>
              <li>Time tracking</li>
              <li>Shift planner</li>
              <li>Recruiting</li> */}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Information</h4>
            <ul className="text-gray-400 text-sm space-y-2 cursor-pointer">
              <li onClick={() => router.push("/Faq")} >FAQ</li>
              <li onClick={()=>router.push("/Blogs/67599401ddd3533ef08c6a3b")}>Blog</li>
              {/* <li>Support</li> */}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Company</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li onClick={() => router.push("/profile/aboutus")} className="cursor-pointer">About us</li>
              {/* <li>Careers</li> */}
              {/* <li>Contact us</li> */}
              {/* <li>Lift Media</li> */}
            </ul>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="w-96 ml-[600px] pt-8 items-center justify-center ">
        <img
          src={rentoutlogo}
          alt="rntout logo"
          className="w-40 h-46"
        />
      </div>

      {/* Footer Links */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-12 border-t-2 p-4 border-zinc-400  text-base font-medium leading-6 text-left ">
        <div className="text-white text-sm mt-4 md:mt-0">© 2025 All rights reserved</div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="text-white text-sm">Terms</a>
          <a href="#" className="text-white text-sm">Privacy</a>
          <a href="#" className="text-white text-sm">Cookies</a>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#">
            <img
              src={facebook}
              alt="Facebook icon"
              className="w-8 h-8"
            />
          </a>
          <a href="#">
            <img
              src={twitter}
              alt="Twitter icon"
              className="w-8 h-8"
            />
          </a>
          <a href="#">
            <img
              src={instagram}
              alt="Instagram icon"
              className="w-8 h-8"
            />
          </a>
          <a href="#">
            <img
              src={youtube}
              alt="YouTube icon"
              className="w-8 h-8"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
