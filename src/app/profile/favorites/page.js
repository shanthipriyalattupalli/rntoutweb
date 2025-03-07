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

export default function Profile({ }) {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const [products,setProducts]=useState([])
  const token=(typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;

  const fetchFavorites=async()=>{
    try {
      const response = await axios.get(`${BASE_URL}/favorites/all`,{
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
      if(token){
        fetchFavorites();
      }
  
  }, [token]);
  

  return (
    <>
      <div className='item-header'>
        <ToastContainer/>
        <h2>Favorites</h2>
      </div>
      <div className='products-container'>
        {products?.map((product, index) => (
          // <div key={product._id} className='product-card'>
          //   <div className='product-image-container'>
          //     <img
          //       src={product.image}
          //       alt={product.title}
          //       className='product-image'
          //       layout='fill'
          //       objectFit='cover'
          //     />{" "}
          //     {/* Use Image component */}
          //     <div className='badge-icon'>
          //       <img
          //         src='/Assets/bookmark.png'
          //         alt='Bookmark Icon'
          //         className='book'
          //         layout='fixed'
          //         width={20}
          //         height={20}
          //       />
          //     </div>
          //   </div>
          //   <div className='product-details'>
          //     <h3 className='product-title'>{product.title}</h3>
          //     <p className='product-price'>
          //       {product.price} <span className='pro-span'>/day</span>
          //     </p>
          //     <div className='pro-date'>
          //       <img
          //         src='/Assets/hp33.png'
          //         alt='Calendar Icon'
          //         className='vector1'
          //       />
          //       <p className='product-dates m-0'>{product.dates}</p>
          //     </div>
          //     <div className='pro-stock'>
          //       <img
          //         src='/Assets/hp34.png'
          //         alt='Stock Icon'
          //         className='vector1'
          //       />
          //       <p className='product-stock m-0'>
          //         {product.stockQuantity} stock available
          //       </p>
          //     </div>
          //     <div className='pro-last'>
          //       <img
          //         src='/Assets/Vector.png'
          //         alt='Cart Icon'
          //         className='vector'
          //       />
          //       <button className='add-to-cart-btn'>Add to cart</button>
          //     </div>
          //   </div>
          // </div>
          // <ProductItem  key={product._id} product={product} />
          <FavoriteItem key={product._id} product={product} fetchFavorites={fetchFavorites}/>
        ))}
      </div>
    </>
  );
}
