import React, { useState, useEffect } from "react";
import axios from "axios";

const Testimonials = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [testimonials, setTestimonials] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 3) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 3 + testimonials.length) % testimonials.length);
  };

  const currentTestimonials = Array.isArray(testimonials)
    ? [
      ...testimonials.slice(currentSlide),
      ...testimonials.slice(0, (currentSlide + 3) % testimonials.length),
    ].slice(0, 3)
    : [];

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {currentTestimonials.map((testimonial, index) => {
              const isMiddle = index === 1;
              return (
                <div
                  key={index}
                  className={`p-4 sm:p-6 md:p-8 rounded-xl shadow-md ${isMiddle ? "bg-gradient-to-br from-red-50 to-blue-50" : "bg-white border border-slate-200"
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
                    <p className="text-gray-700 text-sm sm:text-base italic">{testimonial.testimonial}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{testimonial.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Buttons */}
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
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${currentSlide === index ? "bg-red-800" : "bg-red-200"
                  }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
