"use client"

import React from "react";
import { CiStar } from "react-icons/ci";

const OrderItem = ({ hideHeader, orderData }) => {
  // Check if the order object has required data
  if (!orderData || !orderData.id || !orderData.date) {
    return null; // Render nothing if order data is missing
  }

  return (
    <div className="order-item">
      <div
        className="order-header"
        style={{ display: hideHeader ? "none" : "flex" }}
      >
        <span>ID: #{orderData.id}</span>
        <span>Date: {orderData.date}</span>
      </div>
      <div class="order-product">
        <img
          src={
            orderData.image ||
            "/static/media/orderHistoryImage.f6b21b67034c337ac59b.png"
          } // Default image fallback
          alt={orderData.name || "Product Image"}
          className="product-image"
        />
        <div className="product-info">
          <h4>{orderData.name || "Product Name"}</h4>
          <div className="product_info_detail_name">
            <p>
              <span>₹{orderData.price || "0"}</span> /month | Rented for:{" "}
              <span>{orderData.rentedDuration || "N/A"}</span>
            </p>
            {orderData.status === "completed" && (
              <a href="#" className="review_cta">
                <span>
                  <CiStar />
                </span>
                Write Product Review
              </a>
            )}
          </div>
          {/* Conditionally render feedback if available */}
          {orderData.review && orderData.review.feedback && (
            <div className="review-section-feedback">
              <h3><span>{5}</span> {orderData.review.title}</h3>
              <p>{orderData.review.feedback}</p>
              <div className="review-images">
                {orderData.review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Review image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
