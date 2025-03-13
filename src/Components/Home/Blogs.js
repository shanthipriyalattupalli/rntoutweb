"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Blog = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [blogs, setBlogs] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default 4 items per slide
  const router = useRouter();
  const token = (typeof window !== "undefined") ? localStorage.getItem("userToken") : null;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blogs`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  // Update `itemsPerPage` based on screen width
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 425) {
        setItemsPerPage(1); // Small devices (mobile) - Show 1 item
      } else if (window.innerWidth > 425 && window.innerWidth <= 1024) {
        setItemsPerPage(3); // Medium devices (tablet) - Show 2 items
      } else {
        setItemsPerPage(4); // Large and XL screens - Show 4 items
      }
    };
  
    updateItemsPerPage(); // Run once on mount
    window.addEventListener("resize", updateItemsPerPage);
  
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);
  
  

  // Calculate the current blogs to display
  const currentBlogs = [
    ...blogs.slice(currentSlide),
    ...blogs.slice(0, currentSlide + itemsPerPage - blogs.length),
  ].slice(0, itemsPerPage);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + itemsPerPage) % blogs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - itemsPerPage + blogs.length) % blogs.length);
  };

  return (
    <div className='mt-8'>
      <div className='mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-5'>
        <div className='flex justify-between items-center mt-20 mb-4'>
          <h1 className='text-3xl font-bold text-gray-800 xl:px-16'>Our Exclusive Blogs</h1>
          <a href='#' className='text-blue-500 hover:text-blue-700 text-sm font-medium xl:pl-16'>
            View all blogs{" "}
            <svg className='w-4 h-4 inline-block ml-1' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5l7 7-7 7'></path>
            </svg>
          </a>
        </div>
        <p className='text-gray-600 text-left mb-8 px-16'>"Smart Renting, Happy Living!"</p>

        {/* Carousel Section */}
        <div className='relative px-12'>
          <div className={`grid grid-cols-1 ${itemsPerPage > 1 ? "md:grid-cols-3 lg:grid-cols-4" : ""} gap-6`}>
            {currentBlogs?.map((blog, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden'>
                <img src={blog.images} alt={blog.title} className='w-full h-40 2xl:h-[350px]' />
                <div className='p-4'>
                  <h3 className='text-lg font-medium text-gray-800 mb-2'>{blog.title}</h3>
                  <p className='text-gray-600 text-sm mb-4 line-clamp-3'>{blog.description}</p>
                  <button onClick={() => router.push(`/Blogs/${blog._id}`)} className='text-blue-500 hover:text-blue-700 text-sm font-medium'>
                    Read More
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Buttons */}
          <button onClick={prevSlide} className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full'>
            &#8592;
          </button>
          <button onClick={nextSlide} className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full'>
            &#8594;
          </button>

          {/* Carousel Dots */}
          <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2'>
            {blogs?.map((_, index) => index % itemsPerPage === 0 && (
              <button key={index} onClick={() => setCurrentSlide(index)} className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-red-800" : "bg-red-100"}`}></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
