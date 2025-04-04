"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Testimonials = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/testimonial`);
        if (Array.isArray(response.data)) {
          setTestimonials(response.data);
        } else if (Array.isArray(response.data.data)) {
          setTestimonials(response.data.data);
        } else {
          throw new Error("Unexpected API response structure");
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError("Failed to load testimonials.");
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const updateItemsPerSlide = () => {
      if (window.innerWidth <= 425) {
        setItemsPerSlide(1);
      } else {
        setItemsPerSlide(3);
      }
    };
    updateItemsPerSlide();
    window.addEventListener("resize", updateItemsPerSlide);
    return () => window.removeEventListener("resize", updateItemsPerSlide);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + itemsPerSlide) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - itemsPerSlide + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonials =
    testimonials.length >= 4
      ? [
          ...testimonials?.slice(currentSlide),
          ...testimonials?.slice(0, (currentSlide + itemsPerSlide) % testimonials.length),
        ].slice(0, itemsPerSlide)
      : testimonials;

  if (loading) return <p className="text-center">Loading testimonials...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="mt-4">
      <div className="px-4 py-8 md:py-16 2xl:px-16 xl:px-16">
        <div className="text-center mb-6 md:mb-12">
          <p className="text-red-600 text-xs sm:text-sm font-semibold mb-1 sm:mb-2">
            OVER 1.5 LAC HAPPY CUSTOMERS
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
            Real Stories from Satisfied Customers
          </h2>
          <p className="text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
            "Success Stories from Renters & Owners"
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="w-full relative">
          <div
            className={`grid gap-4 md:gap-6 ${
              testimonials.length < 4
                ? "grid-cols-1 sm:grid-cols-2 md:flex md:flex-row md:gap-10"
                : itemsPerSlide === 1
                ? "grid-cols-1"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {currentTestimonials.map((testimonial, index) => {
               const middleIndex = Math.floor(itemsPerSlide / 2); 
               return(
              <div
                key={index}
                className={`w-[340px] sm:w-[413px] md:[300px] h-[458px] p-4 sm:p-6 md:p-8 rounded-[20px] shadow-md bg-white border border-slate-200${
                  index === middleIndex ? "bg-white" : "bg-gray-100"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <img
                    src={testimonial.image || "/Assets/Photo.png"}
                    alt={testimonial.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-2 sm:mb-4"
                  />
                  <h3 className="text-lg sm:text-xl font-semibold mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-4">{testimonial.role}</p>
                  <p className="text-gray-700 text-sm sm:text-base italic">
                    {testimonial.testimonial}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm">{testimonial.description}</p>
                </div>
              </div>
               )
            
  })}
          </div>

          {/* Show navigation buttons only if there are at least 4 testimonials */}
          {testimonials.length >= 4 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full"
              >
                &#8592;
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full"
              >
                &#8594;
              </button>

              {/* Dots Navigation */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
                      currentSlide === index ? "bg-red-800" : "bg-red-200"
                    }`}
                  ></button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
