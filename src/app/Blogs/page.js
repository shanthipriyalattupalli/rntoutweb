
import React  from "react";
import axios from "axios";
const left = '/Assets/leftarrow.svg';
import Link from "next/link";
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blogs`);
    // setBlogs(response?.data?.blogs)
    return response?.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const metadata = {
  title: "RNT Out Blog - Insights, News, and Updates from Hyderabad",
  description: "Stay informed with RNT Out’s blog in Hyderabad. Read about the latest trends, tips, and updates on a range of topics from technology to fashion and more.",
};


export default async function  Blog  ({}) {

  const blogs = await fetchBlogs();

  return (
    <div className='mt-8'>
      <div className='mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-5'>
        <div className='flex justify-between items-center mt-10 sm:mt-0 mb-4'>
          <h1 className='text-[16px] sm:text-[32px] font-[700] text-gray-800 xl:px-16'>Our Exclusive Blogs</h1>
        </div>
        <p className='text-gray-600 text-[10px] text-[12px] text-left mb-8 px-4 sm:px-16'>"Smart Renting, Happy Living!"</p>
        <div className='relative px-2 sm:px-12'>
          <div className={`grid grid-cols-2 lg:grid-cols-5 gap-6`}>
            {blogs?.blogs?.map((blog, index) => (
              <div key={index} className='bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden cursor-pointer' >
                <img src={blog.images} alt={blog.title} className='w-full h-40 2xl:h-[350px]' />
                <div className='p-4'>
                  <div className="h-[82px]">
                    <h3 className='h-[40px] truncate text-[12px] sm:text-[14px] font-medium text-gray-800 mb-2'>{blog.title}</h3>
                    <p className='h-[36px] text-gray-600 text-[12px] mb-0 sm:mb-4 line-clamp-2'>{blog.description}</p>
                  </div>
                  <div className="flex justify-center pt-3 ">
                    <Link href={`/Blogs/${blog._id}`} >
                      <button className='text-blue-500 hover:text-blue-700 text-[12px] jusify-center font-medium'>
                        Read More
                      </button>
                    </Link>
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


