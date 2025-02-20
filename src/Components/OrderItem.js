"use client";

import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import OrderTracking from "./OrderTracking";

const laptop = "/Assets/laptop-2.jpg";

const OrderItem = ({ hideHeader, orderData, onShowTracking, selectedSubOrder, steps, getCurrentStep }) => {
  const [expandedSubOrderId, setExpandedSubOrderId] = useState(null);

  // Check if orderData has subOrders
  if (!orderData || !orderData.subOrders || orderData.subOrders.length === 0) {
    return <p>No orders found</p>;
  }

  const handleShowTracking = (item) => {
    if (expandedSubOrderId === item._id) {
      setExpandedSubOrderId(null); // Collapse if already open
    } else {
      setExpandedSubOrderId(item._id); // Expand tracking for the clicked suborder
      onShowTracking(item);
    }
  };

  return (
    <>
      {orderData.subOrders.map((item) => (
        <div className="order-item" key={item._id}>
          {/* Order Product */}
          <div className="order-product">
            <img
              src={item.variantId.images?.[0] || "/static/media/orderHistoryImage.f6b21b67034c337ac59b.png"}
              alt={item.variantId.title || "Product Image"}
              className="product-image"
            />
            <div className="product-info">
              <h4>{item.variantId.title || "Apple 14 pro"}</h4>
              <div className="product_info_detail_name">
                <p>
                  <span>₹{item.price || "0"}</span> / {item.rentalPeriod} | Rented for:{" "}
                  <span>{item.quantity} item(s)</span>
                </p>
                |
                {item.orderStatus === "delivered" && (
                  <a href={`/profile/orders/orderreview/${item._id}`} className="review_cta">
                    <span>
                      <CiStar />
                    </span>
                    Write Product Review
                  </a>
                )}
                <button
                  className="text-blue-500 font-semibold px-4 rounded"
                  onClick={() => handleShowTracking(item)}
                >
                  {expandedSubOrderId === item._id ? "Hide Tracking" : "Show Tracking"}
                </button>
              </div>

              {/* Show tracking only for the selected suborder */}
              {/* Conditionally render feedback if available */}
              {item.review && item.review.feedback && (
                <div className="review-section-feedback">
                  <h3>
                    <span>5</span> {item.review.title}
                  </h3>
                  <p>{item.review.feedback}</p>
                  <div className="review-images">
                    {item.review.images?.map((image, index) => (
                      <img key={index} src={image} alt={`Review image ${index + 1}`} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          {expandedSubOrderId === item._id && (
                <OrderTracking selectedSubOrder={selectedSubOrder} steps={steps} getCurrentStep={getCurrentStep} />
              )}
        </div>
      ))}
      
    </>
  );
};

export default OrderItem;
