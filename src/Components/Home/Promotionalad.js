"use client";
import { useState } from "react";

const defaultImages = ["/Assets/Hero 6.png", "/Assets/Hero 23.png"];

const BannerSection = ({ banner }) => {
  const [loadedImages, setLoadedImages] = useState([]);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => [...prev, index]);
  };

  const imagesToRender = banner?.images?.length > 0 ? banner.images : defaultImages;

  return (
    <div className="flex flex-wrap justify-center gap-8 px-4 md:px-20">
      {imagesToRender.map((src, index) => (
        <div
          key={index}
          className="w-full max-w-[650px] aspect-[13/6] relative rounded-lg overflow-hidden"
        >
          {/* Shimmer placeholder */}
          {!loadedImages.includes(index) && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}

          {/* Actual image */}
          <img
            src={src}
            alt={`Promotional Banner ${index + 1}`}
            className={`w-full h-full object-cover rounded-lg transition-transform duration-500 ease-in-out hover:scale-105 ${
              loadedImages.includes(index) ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => handleImageLoad(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default BannerSection;
