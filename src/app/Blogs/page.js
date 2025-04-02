"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const left = '/Assets/leftarrow.svg';



const Blog = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [blogs, setBlogs] = useState([]);
  const router = useRouter();
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/blogs`);
      console.log(response, "aPI hit in blogs")
      setBlogs(response?.data?.blogs)
      return;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };
  useEffect(() => {
    fetchBlogs();
  }, []);


  return (
    <div className='mt-8'>
      <div className='mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-5'>
        <div className='flex justify-between items-center mt-20 mb-4'>
          <h1 className='text-[23px] sm:text-[32px] font-[700] text-gray-800 xl:px-16'>Our Exclusive Blogs</h1>
        </div>
        <p className='text-gray-600 text-left mb-8 px-4 sm:px-16'>"Smart Renting, Happy Living!"</p>
        <div className='relative px-12'>
          <div className={`grid grid-cols-1 lg:grid-cols-4 gap-6`}>
            {blogs?.map((blog, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden' onClick={() => router.push(`/Blogs/${blog._id}`)}>
                <img src={blog.images} alt={blog.title} className='w-full h-40 2xl:h-[350px]' />
                <div className='p-4'>
                  <div className="h-[82px]">
                    <h3 className='h-[40px] text-[14px] font-medium text-gray-800 mb-2'>{blog.title}</h3>
                    <p className='h-[36px] text-gray-600 text-[12px] mb-4 line-clamp-2'>{blog.description}</p>
                  </div>
                  <div className="flex justify-center pt-3 ">
                    <button className='text-blue-500 hover:text-blue-700 text-[12px] jusify-center font-medium'>
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
