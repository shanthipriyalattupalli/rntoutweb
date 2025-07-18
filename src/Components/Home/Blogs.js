"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import axios from "axios";

const left = "/Assets/leftarrow.svg";

const Blog = ({ blogs }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    if (typeof window === 'undefined') return; 
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 425) {
        setItemsPerPage(2);
      } else if (window.innerWidth > 425 && window.innerWidth <= 768) {
        setItemsPerPage(2);

      }else if (window.innerWidth > 425 && window.innerWidth <= 1024) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  return (
    <div className="mt-0 sm:mt-8">
      <div className="mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-5">
        <div className="flex justify-between items-center mt-20 mb-4 gap-2">
          <h1 className="text-[16px] sm:text-[32px] font-[700] text-gray-800 xl:px-16">
            Our Exclusive Blogs
          </h1>
          <a
            href="/Blogs"
            className="text-blue-500 hover:text-blue-700 text-[12px] sm:text-[14px] font-medium xl:pl-16"
          >
            View all blogs{" "}
            <svg
              className="w-4 h-4 inline-block ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </a>
        </div>
        <p className="text-gray-600 text-left mb-8 px-0 sm:px-14 ">
          "Smart Renting, Happy Living!"
        </p>

        {/* Conditional Rendering */}
        {blogs.length >= 4 ? (
          // Swiper Slider for 4 or more blogs
          <div className="relative px-12">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={itemsPerPage}
              loop={true}
            >
              {blogs.map((blog, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden cursor-pointer" 
                   onClick={() => router.push(`/Blogs/${blog._id}`)}>
                    <img
                      src={blog.images}
                      alt={blog.title}
                      className="w-full h-40 2xl:h-[350px]"
                    />
                    <div className="p-4">
                      <div className="h-[82px]">
                        <h3 className="h-[40px] truncate text-[14px] font-medium text-gray-800 mb-2">
                          {blog.title}
                        </h3>
                        <p className="h-[36px] text-gray-600 text-[12px] mb-4 line-clamp-2">
                          {blog.description}
                        </p>
                      </div>
                      <div className="flex justify-center pt-3">
                        <button
                          onClick={() => router.push(`/Blogs/${blog._id}`)}
                          className="text-blue-500 hover:text-blue-700 text-[12px] font-medium"
                        >
                          Read More
                        </button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          // Simple Flex Row for Less than 3 blogs
         <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:px-12">
            {blogs.map((blog, index) => (
              <div
                key={index}
                className="w-auto bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden cursor-pointer"
                onClick={() => router.push(`/Blogs/${blog._id}`)}
              >
                <img
                  src={blog.images}
                  alt={blog.title}
                  className="w-full h-40 2xl:h-[350px]"
                />
                <div className="p-4">
                  <div className="h-[82px]">
                    <h3 className="h-[40px] truncate text-[14px] font-medium text-gray-800 mb-0 sm:mb-2">
                      {blog.title}
                    </h3>
                    <p className="h-[36px] text-gray-600 text-[12px] mb-0 sm:mb-4 line-clamp-2">
                      {blog.description}
                    </p>
                  </div>
                  <div className="flex justify-center pt-3">
                    <button
                      onClick={() => router.push(`/Blogs/${blog._id}`)}
                      className="text-blue-500 hover:text-blue-700 text-[12px] font-medium"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
