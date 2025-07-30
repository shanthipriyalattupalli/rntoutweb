"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const favorite = "/Assets/favorite.svg";
const favorited = "/Assets/Heart.svg";

export const Images = ({ product, productId, variant }) => {
  const images = product.images || [];
  const isFavorites = variant?.isFavorite;

  const token = Cookies.get("userToken");
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const [isFavorite, setIsFavorite] = useState(isFavorites);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Helper to detect if the file is a video
  const isVideo = (url) => {
    return /\.(mp4|webm|ogg)$/i.test(url);
  };

  useEffect(() => {
    setIsLoading(true);
    const src = images[selectedImage];

    if (!src) return;

    if (isVideo(src)) {
      const video = document.createElement("video");
      video.src = src;
      video.onloadeddata = () => setIsLoading(false);
    } else {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoading(false);
    }
  }, [selectedImage]);

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/favorites/add`,
        { variantId: productId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsFavorite(true);
        Swal.fire({
          icon: "success",
          title: "Done!",
          text: response.data.message,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error adding product to favorites:", error);

      if (error.response?.status === 401) {
        Swal.fire({
          icon: "info",
          title: "Please Login!",
          text: "Please Login to add your Favourite item",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "Notice",
          text: error.response?.data?.message || "Something went wrong",
        });
      }
    }
  };

  const handleRemoveFavorites = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/favorites/remove-fav/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setIsFavorite(false);
        Swal.fire({
          icon: "success",
          title: "Done!",
          text: response.data.message,
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Error removing product from favorites:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to remove from favorites.",
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Image/Video */}
      <div className="w-full h-[200px] sm:h-[500px] rounded-lg shadow-lg overflow-hidden bg-gray-100 relative">
        {/* Favorite Icon */}
        {isFavorite ? (
          <span
            className="absolute top-4 right-4 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center"
            onClick={handleRemoveFavorites}
          >
            <img src={favorited} alt="Favorited" className="w-10 h-10" />
          </span>
        ) : (
          <span
            className="absolute top-4 right-4 cursor-pointer w-10 h-10 rounded-full flex items-center justify-center"
            onClick={handleAddToFavorites}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
          >
            <img src={favorite} alt="Favorite" className="w-10 h-10" />
          </span>
        )}

        {/* Shimmer */}
        {isLoading && <div className="absolute inset-0 shimmer rounded-lg" />}

        {/* Render image or video */}
        {isVideo(images[selectedImage]) ? (
          <video
            src={images[selectedImage]}
            controls
            className={`w-full h-full object-fill transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoadedData={() => setIsLoading(false)}
          />
        ) : (
          <img
            src={images[selectedImage]}
            alt="Product"
            className={`w-full h-full object-fill transition-opacity duration-300 ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
            onLoad={() => setIsLoading(false)}
          />
        )}
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-6 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`border-2 rounded-lg overflow-hidden ${
              selectedImage === index ? "border-red-500" : "border-gray-200"
            }`}
            onClick={() => setSelectedImage(index)}
          >
            {isVideo(image) ? (
              <div className="relative w-full h-full">
                <video
                  src={image}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4l12 6-12 6V4z" />
                  </svg>
                </div>
              </div>
            ) : (
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
