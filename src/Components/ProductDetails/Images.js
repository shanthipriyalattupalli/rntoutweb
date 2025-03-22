"use client";
import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const favorite = "/Assets/favorite.svg";
const favorited = "/Assets/favoritedicon.svg";

export const Images = ({ product, productId }) => {
  const images = product.images;


  const token = Cookies.get("userToken");


  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/favorites/add`,
        { variantId: String(productId) },
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
      Swal.fire({
        icon: "info",
        title: "Notice",
        text: error.response?.data?.message || "Something went wrong!",
      });
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
      <div className="relative">

        {isFavorite ? (
          <span
            className="absolute top-4 right-4 cursor-pointer"
            onClick={handleRemoveFavorites}
          >
            <img src={favorited} />
          </span>
        ) : (
          <span
            className="absolute top-4 right-4 cursor-pointer"
            onClick={handleAddToFavorites}
          >
            <img src={favorite} />
          </span>
        )}
        <img
          src={images[selectedImage]}
          alt="Product Image"
          className="w-full h-[500px] rounded-lg shadow-lg"
        />
      </div>

      <div className="grid grid-cols-6 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            className={`border-2 rounded-lg overflow-hidden ${selectedImage === index ? "border-red-500" : "border-gray-200"
              }`}
            onClick={() => setSelectedImage(index)}
          >
            <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
};
