"use client";

import React, { useState, useEffect, memo } from "react";
const curated1 = "/Assets/curated1.svg";
const curated2 = "/Assets/curated2.svg";
const curated3 = "/Assets/curated3.svg";

// Lazy-loaded image component for better performance
const LazyImage = memo(({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-[200px] object-cover rounded-lg"
      loading="lazy"
    />
  );
});

const CuratedCollections = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [slidesToShow, setSlidesToShow] = useState(3); // Default: Show 3 slides

  const collections = [
    { id: 1, image: curated1, title: "Furniture", description: "130+ Properties" },
    { id: 2, image: curated2, title: "Appliances", description: "230+ Properties" },
    { id: 3, image: curated3, title: "Workspace", description: "220+ Properties" },
    { id: 4, image: curated2, title: "Outdoor Living", description: "50+ Properties" },
    { id: 5, image: curated1, title: "Home Office", description: "180+ Properties" },
  ];

  // Responsive Slide Count
  useEffect(() => {
    if (typeof window === 'undefined') return; 
    const updateSlidesToShow = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1); // Small devices: Show 1 slide
      } else {
        setSlidesToShow(3); // Larger screens: Show 3 slides
      }
    };

    updateSlidesToShow(); // Initial check
    window.addEventListener("resize", updateSlidesToShow);

    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  // Navigate to the next set of slides
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % collections.length);
  };

  // Navigate to the previous set of slides
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? collections.length - slidesToShow : prevIndex - 1
    );
  };

  // Auto-play functionality
  useEffect(() => {
    let timer;
    if (autoPlay) {
      timer = setInterval(nextImage, 3000); // autoplay every 3 seconds
    }
    return () => clearInterval(timer); // cleanup timer
  }, [autoPlay, currentIndex]);

  // Get the current slides to display
  const currentCollections = collections?.slice(
    currentIndex,
    currentIndex + slidesToShow
  );
  const wrapAroundCollections =
    currentCollections.length < slidesToShow
      ? [
          ...currentCollections,
          ...collections?.slice(0, slidesToShow - currentCollections.length),
        ]
      : currentCollections;

  return (
    <div className="mx-auto py-2 w-full px-6 sm:px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-4">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Curated Rental Collections
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Your Gateway to Premium Rental Experiences.
      </p>

      <div className="relative">
        {/* Grid layout updates for responsive behavior */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10 px-4 sm:px-14">
          {wrapAroundCollections.map((collection) => (
            <div key={collection.id} className="relative">
              <LazyImage src={collection.image} alt={collection.title} />
              <div className="absolute bg-black opacity-50 rounded-lg"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6 py-8">
                <div className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium mb-4">
                  For Tenants with Company Lease
                </div>
                <div className="text-lg font-medium mb-2">{collection.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-0 flex justify-between items-center px-4 py-2 z-10">
          <button onClick={prevImage} className="bg-black bg-opacity-50 text-white p-2 rounded-full">
            &#10094;
          </button>
          <button onClick={nextImage} className="bg-black bg-opacity-50 text-white p-2 rounded-full">
            &#10095;
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(CuratedCollections);
