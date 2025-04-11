"use client"

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

const blog = "/Assets/blog1.svg";
const blogs ="/Assets/blogs-image.svg"
const BlogPage = () => {
    const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

    const params = useParams();
    const blogId = params.blogId
  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
  const [blogs, setBlogs] = useState([]);
  const [blog,setBlog] = useState()
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blogs/related/${blogId}`,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(response.data?.data)
        
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    useEffect(() => {
      fetchBlogs();
    }, []);


    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/blogs/${blogId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
  
    useEffect(() => {
      fetchBlog();
    }, [blogId]);


  return (
    <div className=" min-h-screen p-6 flex justify-center w-full">
      <div className=" w-full bg-white shadow-lg p-6 rounded-lg flex flex-col md:flex-row gap-6">
        <div  onClick={() => router.back()}>
                <div className="mt-2 cursor-pointer">
                  <IoMdArrowRoundBack />
                </div>
              </div>
        {/* Main Blog Section */}
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold">
            {blog?.title}
          </h1>
          {blog?.images?.map((image,index)=>(
          <img
          key={index}
          src={image} // Replace with actual image URL
          alt="Furniture"
          className="rounded-lg my-4"
        />
          ))}

          <p className="text-gray-700 leading-relaxed text-justify">
{blog?.description}
          </p>
         
          {/* <p className="text-gray-700 leading-relaxed mt-4">
          We’ll also discuss the benefits rental provides, like easy upgrades, storage solutions, and experimenting with new styles. Together, we’ll determine when renting furniture makes more sense than buying so you can make informed furniture decisions. Whether you’re accommodating guests, revamping your home office, or prepping for a special event, renting furniture may be the right call for furniture that’s only temporarily needed or likely to need replacement after heavy use.
          </p> */}
        </div>
        {/* Related Blogs Sidebar */}
        <div className="md:w-1/3   rounded-lg">
          <h2 className="text-xl font-semibold">Related Blogs</h2>
          <div className="mt-4 space-y-4">
            {blogs.map((singleblog, index) => (
              <Link
              href={`/Blogs/${singleblog?._id}`}
                key={index}
                className="flex gap-4 items-center  p-3 rounded-lg"
              >
                <img
                  src={singleblog?.images[0]} // Replace with actual image
                  alt="Blog"
                  className="w-16 h-16 rounded-lg"
                />
                <div>
                  <h3 className="text-sm font-semibold">
                  {singleblog?.title}
                  </h3>
                  <p className="text-xs text-gray-600 line-clamp-3">
                  {singleblog?.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogPage;