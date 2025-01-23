"use client";
import React, { useState } from "react";
const photo = "/Assets/Photo.png";

const Testimonials = () => {
  // Testimonial data
  const testimonials = [
    {
      name: "Sarah K.",
      role: "UX Designer",
      testimonial: `"When I moved to Bangalore from Chennai, I went to multiple websites to get a bed until I found out about RntOut. I rented a bed and mattress, just to try it out. They delivered it within a day and set it up at my place without any hassle. Now I sleep so peacefully that I always end up being late for work :D"`,
      image: photo,
    },
    {
      name: "Michael L.",
      role: "Creative Director",
      testimonial: `"I got to know about RentoMojo through a friend and looked up for AC on their website and finally rented one. The delivery guys installed the AC in 2 days. And with such a low deposit and rent, I didn't have to spend a whole lot for my comfort. Thank you RentoMojo, for being so easy breezy on my pocket."`,
      image: photo,
    },
    {
      name: "Lauren M.",
      role: "UI Designer",
      testimonial: `"RntOut was unbelievably helpful. Never thought that setting up a new place would be just a few clicks away. The customer support staff was on their toes to help me. Anytime I need something for my house, Rentomojo has it. :)"`,
      image: photo,
    },
    {
      name: "John D.",
      role: "Web Developer",
      testimonial: `"I used RntOut to rent a desk and chair for my home office. I was amazed at how easy the process was, and they delivered everything within a few hours. Highly recommended for anyone looking for short-term rental furniture!"`,
      image: photo,
    },
    {
      name: "Emily R.",
      role: "Product Manager",
      testimonial: `"Rentomojo made furnishing my new apartment so much easier! I was able to rent everything I needed at an affordable price, and the delivery team set everything up quickly and professionally. Couldn’t ask for a better service!"`,
      image: photo,
    },
    {
      name: "David W.",
      role: "Photographer",
      testimonial: `"Renting a mattress was never this easy! RntOut helped me get a perfect mattress for my guest room, and the service was flawless. I’m definitely going to use them for my next rental needs."`,
      image: photo,
    },
  ];

  // State for tracking the current slide
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to move to the next slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 3) % testimonials.length); // Loop to the next 3 testimonials
  };

  // Function to move to the previous slide
  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 3 + testimonials.length) % testimonials.length
    ); // Loop to the previous 3 testimonials
  };

  // Get the 3 testimonials to display based on the current slide
  const currentTestimonials = [
    ...testimonials.slice(currentSlide),
    ...testimonials.slice(0, (currentSlide + 3) % testimonials.length),
  ].slice(0, 3); // Display only 3 testimonials at a time

  return (
    <div className='mt-4'>
      <div className='max-w-7xl mx-auto px-4 py-16'>
        {/* Header Section */}
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

        {/* Testimonials Carousel */}
        <div className='relative'>
          {/* Testimonials Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {currentTestimonials?.map((testimonial, index) => {
              const isMiddle = index === 1; // Middle item is always index 1
              return (
                <div
                  key={index}
                  className={`p-8 rounded-xl shadow-sm ${
                    isMiddle
                      ? "bg-gradient-to-br from-red-50 to-blue-50" // Gradient for the middle item
                      : "bg-white border border-slate-200" // Default for other items
                  }`}
                >
                  <div className='flex flex-col items-center text-center'>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className='w-20 h-20 rounded-full mb-4'
                    />
                    <h3 className='text-xl font-semibold mb-1'>
                      {testimonial.name}
                    </h3>
                    <p className='text-gray-600 text-sm mb-6'>
                      {testimonial.role}
                    </p>
                    <p className='text-gray-700 italic'>
                      {testimonial.testimonial}
                    </p>
                  </div>
                </div>
              );
            })}
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
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  currentSlide === index ? "bg-red-800" : "bg-red-200"
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
