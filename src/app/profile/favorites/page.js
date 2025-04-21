"use client";
import React, { useState, useEffect } from "react";
// import "@/styles/Favorites.css";
import '../../../styles/Favorites.css';
import axios from "axios";
import Image from "next/image"; // Import Image component
import ProductItem from "@/Components/Home/ProductItems";
import FavoriteItem from "@/Components/Home/FavoriteItems";
import { ToastContainer, toast } from "react-toastify";
const pro1 = "/Assets/laptop-1.jpg";
const pro2 = "/Assets/laptop-2.jpg";
const pro3 = "/Assets/laptop-3.jpg";
const pro4 = "/Assets/laptop-4.jpg";
const pro5 = "/Assets/laptop-5.jpg";
const hp33 = "/Assets/hp33.png";
const hp34 = "/Assets/hp34.png";
const vector = "/Assets/Vector.png";
import { Heart } from "lucide-react";
import Cookies from "js-cookie";


export default function Profile({ }) {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const [products, setProducts] = useState([])
  const token = Cookies.get("userToken");

  const fetchFavorites = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/favorites/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data.favoriteItems)

    } catch (error) {
      console.error("Error fetching favorite details:", error);
    }
  };
  useEffect(() => {
    if (token) {
      fetchFavorites();
    }

  }, [token]);


  return (
    <>
      <h2 className='item-header'>
        <div>
          Favorites
        </div>

      </h2>
      {products.length > 0 ? <div className='products-container'>
        {products?.map((product, index) => (
          <FavoriteItem key={product._id} product={product} fetchFavorites={fetchFavorites} />
        ))}
      </div> :
      <div className="flex flex-col justify-center items-center h-3/4">
  <img src="/Assets/nofavourites.svg"className="text-6xl animate-blink"/>
  <span className="text-lg font-semibold">No Favorites Yet</span>
  <p className="text-center px-6 py-2">
    Browse our collection and click the ❤️ icon to save your favorite items.
  </p>
  <a href="/" className="px-4 py-2 bg-red-500 text-white rounded-md mt-3">
    Browse Products
  </a>
</div>
}
    </>
  );
}
