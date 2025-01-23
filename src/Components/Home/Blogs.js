"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Blog = () => {
  // Managing the active slide index (for 4 items at a time)
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [blogs, setBlogs] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [expanded, setExpanded] = useState({}); // Track expanded state for each blog
  // const [token, setToken] = useState("");
  // useEffect(() => {
  //   setToken(localStorage.getItem("userToken"));
  // }, []);

  const token=(typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;


  const toggleDescription = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Blog data
  // const blogs = [
  //   {
  //     title: "7 Best Places To Visit In Bangalore Under Rs. 500",
  //     description: "Bangalore, the capital of Karnataka, is the third largest city in India and is known as the Silicon...",
  //     image: "https://via.placeholder.com/400x250?text=Blog+Image+1",
  //     link: "#"
  //   },
  //   {
  //     title: "Best Street Foods in Delhi You Must Try",
  //     description: "Delhi is a bustling metropolis with a wide variety of street foods that are both delicious and affordable.",
  //     image: "https://via.placeholder.com/400x250?text=Blog+Image+2",
  //     link: "#"
  //   },
  //   {
  //     title: "Top 10 Adventure Spots in India",
  //     description: "India is known for its diverse landscape, offering countless options for thrilling adventures.",
  //     image: "https://via.placeholder.com/400x250?text=Blog+Image+3",
  //     link: "#"
  //   },
  //   {
  //     title: "A Guide to Budget Travel in India",
  //     description: "Traveling in India on a budget is easier than you think with the right planning and knowledge.",
  //     image: "https://via.placeholder.com/400x250?text=Blog+Image+4",
  //     link: "#"
  //   },
  //   {
  //     title: "5 Hidden Gems in Mumbai",
  //     description: "Explore the less-known yet beautiful spots of Mumbai that offer a refreshing experience.",
  //     image: "https://via.placeholder.com/400x250?text=Blog+Image+5",
  //     link: "#"
  //   },
  //   {
  //     title: "Exploring Nature in Kerala",
  //     description: "Kerala is a paradise for nature lovers, with its lush greenery and beautiful landscapes.",
  //     image: "https://via.placeholder.com/400x250?text=Blog+Image+6",
  //     link: "#"
  //   }
  // ];

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 4) % blogs.length); // Cycle through blogs, ensuring continuous loop
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 4 + blogs.length) % blogs.length); // Cycle backwards, ensuring continuous loop
  };

  // Function to jump to a specific slide based on the dot clicked
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/blogs`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.blogs, "blogs");
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  // Calculate the current 4 items to display (looping continuously)
  const currentBlogs = [
    ...blogs.slice(currentSlide),
    ...blogs.slice(0, currentSlide + 4 - blogs.length), // ensures continuous loop
  ].slice(0, 4); // Get only the first 4 items for display

  console.log(currentBlogs, "Blogs");
  return (
    <div className='mt-8'>
      <div className='container mx-auto'>
        {/* Header Section */}
        <div className='flex justify-between items-center mt-20 mb-4'>
          <h1 className='text-3xl font-bold text-gray-800'>
            Our Exclusive Blogs
          </h1>
          <a
            href='#'
            className='text-blue-500 hover:text-blue-700 text-sm font-medium'
          >
            View all blogs{" "}
            <svg
              className='w-4 h-4 inline-block ml-1'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M9 5l7 7-7 7'
              ></path>
            </svg>
          </a>
        </div>
        <p className='text-gray-600 text-left mb-8'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        {/* Carousel Section */}
        <div className='relative'>
          {/* Carousel Content */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {currentBlogs?.map((blog, index) => (
              <div
                key={index}
                className='bg-white rounded-lg shadow-md border border-slate-200 rounded-lg overflow-hidden'
              >
                <img src={blog.images} alt={blog.title} className='w-full' />
                <div className='p-4'>
                  <h3 className='text-lg font-medium text-gray-800 mb-2'>
                    {blog.title}
                  </h3>
                  <p
                    className={`text-gray-600 text-sm mb-4 ${
                      expanded[index] ? "" : "line-clamp-3"
                    }`}
                  >
                    {blog.description}
                  </p>
                  <button
                    onClick={() => toggleDescription(index)}
                    className='text-blue-500 hover:text-blue-700 text-sm font-medium'
                  >
                    {expanded[index] ? "Show Less" : "Read More"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Navigation Buttons */}
          <button
            onClick={prevSlide}
            className='absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full'
          >
            &#8592;
          </button>
          <button
            onClick={nextSlide}
            className='absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full'
          >
            &#8594;
          </button>

          {/* Carousel Dots */}
          <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2'>
            {blogs?.map(
              (_, index) =>
                index % 4 === 0 && (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentSlide === index ? "bg-red-800" : "bg-red-100"
                    }`}
                  ></button>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
