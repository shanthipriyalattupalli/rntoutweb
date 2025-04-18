"use client";
import React, { useState,useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const favorite = "/Assets/favorite.svg";
const favorited = "/Assets/heart_fill.svg";

export const Images = ({ product, productId,variant}) => {
  const images = product.images;
  const isFavorites=variant.isFavorite
console.log(isFavorites,"is favorite")

  const token = Cookies.get("userToken");


  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const [isFavorite, setIsFavorite] = useState(isFavorites);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    setIsLoading(true);
    const img = new Image();
    img.src = images[selectedImage];
    img.onload = () => setIsLoading(false);
  }, [selectedImage]);


  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/favorites/add`,
        { variantId:(productId) },
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
          text: error.response?.data?.message,
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
  <div className="w-full h-[500px] rounded-lg shadow-lg overflow-hidden bg-gray-100 relative">
    {/* Favorite icon */}
    {isFavorite ? (
      <span
        className="absolute top-4 right-4 cursor-pointer w-8 h-8 rounded-full flex items-center justify-center"
        onClick={handleRemoveFavorites}
        style={{ backgroundColor: "rgba(255, 45, 85, 1)" }}
      >
        <img src={favorited} alt="Favorited" className="w-5 h-5" />
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

    {/* Main Image with shimmer */}
    {isLoading && <div className="absolute inset-0 shimmer rounded-lg" />}
    <img
      src={images[selectedImage]}
      alt="Product"
      className={`w-full h-full object-cover transition-opacity duration-300 ${
        isLoading ? "opacity-0" : "opacity-100"
      }`}
      onLoad={() => setIsLoading(false)}
    />
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
        <img
          src={image}
          alt={`Thumbnail ${index + 1}`}
          className="w-full h-full object-cover"
        />
      </button>
    ))}
  </div>
</div>

  );
};
