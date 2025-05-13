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
import Swal from "sweetalert2";
const Newsletter = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const [categories, setCategories] = useState([]);
  const [email, setEmail] = useState("");
  const router = useRouter();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);


  const handleSubscribe = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/users/subscribe`, { email });
      console.log("Subscription successful:", response.data);
     Swal.fire({
      title:"Done",
      text:response.data.message,
      confirmButtonColor:"red"
     })
    } catch (error) {
      console.error("Subscription failed:", error);
      Swal.fire({
        title:"Done",
        text:error.response.data.message,
        confirmButtonColor:"red"
       })
    
    }
  };

  return (
    <div className="bg-black pt-12 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">
      <div className="container mx-auto md:flex md:justify-between">
        {/* Newsletter Subscription Section */}
        <div className="md:w-80 mb-8 md:mb-0">
          <h3 className="text-xl font-bold text-white mb-4">Stay in the loop with our newsletter!</h3>
          <div className="relative">
            <input
              type="email"
              placeholder="Enter Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="button"
              onClick={handleSubscribe}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-red-500"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-4">
            Subscribe to our newsletter for exclusive updates and offers. Stay connected!
          </p>
          <div className="flex items-center mt-4">
            <span className="flex gap-2 text-gray-400 text-sm">
              Developed by:
              <div className="flex cursor-pointer">
                <a href="https://codefacts.com/" target="_blank" rel="noopener noreferrer">
                  <img src={codefacts} alt="CodeFacts Logo" className="w-8 h-5 mr-2" />
                </a>
                <a href="https://codefacts.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400">
                  CODEFACTS
                </a>
              </div>
            </span>
          </div>
        </div>

        {/* Links Section */}
        <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Products</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              {categories.map((category) => (
                <li key={category._id}>
                  <a href={`/Product-list/${category._id}`} className="text-gray-400 hover:text-gray-600 text-sm">
                    {category.categoryName}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Information</h4>
            <ul className="text-gray-400 text-sm space-y-2 cursor-pointer">
              <li onClick={() => router.push("/Faq")}>FAQ</li>
              <li onClick={() => router.push("/Blogs")}>Blogs</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Company</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li onClick={() => router.push("/aboutus")} className="cursor-pointer">About us</li>
              <li onClick={() => router.push("/terms-and-conditions")} className="cursor-pointer">Terms & Conditions</li>
              <li onClick={() => router.push("/privacy-policy")} className="cursor-pointer">Privacy Policy</li>

            </ul>
          </div>
        </div>
      </div>

      {/* Logo Section */}
      <div className="flex justify-center p-8">
        <img src={rentoutlogo} alt="RentOut Logo" className="w-40 h-auto" />
      </div>

      {/* Footer Links */}
      <div className="border-t-2  border-[rgba(255, 255, 255, 0.1)] py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <div>© 2025 All rights reserved</div>
        {/* <div className="flex space-x-4 mt-4 md:mt-0">
      <a href="/" className="hover:text-white">Terms</a>
      <a href="/" className="hover:text-white">Privacy</a>
      <a href="/" className="hover:text-white">Cookies</a>
    </div> */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="https://www.facebook.com/"><img src={facebook} alt="Facebook icon" className="w-6 h-6" /></a>
          <a href="https://x.com/?lang=en-in"><img src={twitter} alt="Twitter icon" className="w-6 h-6" /></a>
          <a href="https://www.instagram.com/"><img src={instagram} alt="Instagram icon" className="w-6 h-6" /></a>
          <a href="https://www.linkedin.com/"><img src={youtube} alt="Linkedin icon" className="w-6 h-6" /></a>
        </div>
      </div>
    </div>

  );
};

export default Newsletter;
