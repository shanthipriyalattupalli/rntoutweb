"use client"

import React from "react";
import { useParams } from "react-router-dom";
import OrderDetail from "./OrderDetail";

const ViewOrderDetails = () => {
  const { id } = useParams(); // Get the order ID from the URL

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <OrderDetail />
    </div>
  );
};

export default ViewOrderDetails;
