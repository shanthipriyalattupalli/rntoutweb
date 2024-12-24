"use client"

import React from 'react'
import OrderItem from './OrderItem'

const orderData = [
    {
      id: "1234567890",
      date: "27/08/2024",
      name: "Dell 27 inch P2725H Monitor | Anti-Glare With 3H Hardness | 100Hz | 5ms gray-to-gray (Fast mode)",
      price: 1500,
      rentedDuration: "3 months",
      image: "/static/media/orderHistoryImage.f6b21b67034c337ac59b.png",
    },
    {
      id: "0987654321",
      date: "15/09/2024",
      name: "Dell 24 inch P2425H Monitor | Full HD Display | 100Hz | 99% sRGB",
      price: 1300,
      rentedDuration: "2 months",
      image: "/static/media/orderHistoryImage.f6b21b67034c337ac59b.png",
    },
    {
      id: "5678901234",
      date: "05/10/2024",
      name: "Dell XPS 8940 Desktop | Intel Core i7 | 16GB RAM | 512GB SSD",
      price: 5000,
      rentedDuration: "6 months",
      image: "/static/media/orderHistoryImage.f6b21b67034c337ac59b.png",
    },
  ];

  
const WriteReview = () => {
  return (
    <div>
        <OrderItem id={id} product={product} price={price} />
    </div>
  )
}

export default WriteReview