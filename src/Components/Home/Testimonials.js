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
        console.log("API Response:", response.data);

        // Adjust based on API response structure
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
    setCurrentSlide(
      (prev) => (prev - 3 + testimonials.length) % testimonials.length
    );
  };

  const currentTestimonials = Array.isArray(testimonials)
    ? [
      ...testimonials.slice(currentSlide),
      ...testimonials.slice(0, (currentSlide + 3) % testimonials.length),
    ].slice(0, 3)
    : [];

  if (loading) return <p>Loading testimonials...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='mt-4'>
      <div className='max-w-7xl mx-auto px-4 py-16'>
        <div className='text-center mb-12'>
          <p className='text-red-600 text-sm font-semibold mb-2'>
            OVER 1.5 LAC HAPPY CUSTOMERS
          </p>
          <h2 className='text-4xl font-bold text-gray-900 mb-4'>
            Real Stories from Satisfied Customers
          </h2>
          <p className='text-gray-600 max-w-3xl mx-auto'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna.
          </p>
        </div>

        <div className='relative'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {currentTestimonials.map((testimonial, index) => {
              const isMiddle = index === 1;
              return (
                <div
                  key={index}
                  className={`p-8 rounded-xl shadow-sm ${isMiddle
                      ? "bg-gradient-to-br from-red-50 to-blue-50"
                      : "bg-white border border-slate-200"
                    }`}
                >
                  <div className='flex flex-col items-center text-center'>
                    <img
                      src={testimonial.image || "/Assets/Photo.png"}
                      alt={testimonial.name}
                      className='w-20 h-20 rounded-full mb-4'
                    />
                    <h3 className='text-xl font-semibold mb-1'>
                      {/* {testimonial.name} */}
                    </h3>
                    <p className='text-gray-600 text-sm mb-6'>
                      {testimonial.role}
                    </p>
                    <p className='text-gray-700 italic'>
                      {testimonial.testimonial}
                    </p>
                    <p className="text-gray-500">{testimonial.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

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

          <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2'>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${currentSlide === index ? "bg-red-800" : "bg-red-200"
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
