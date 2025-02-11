"use client";

import React from "react";
import { CiStar } from "react-icons/ci";
const laptop = "/Assets/laptop-2.jpg";

const OrderItem = ({ hideHeader, orderData }) => {
  console.log(orderData, "orderData");

  // Check if orderData has subOrders
  if (!orderData || !orderData.subOrders || orderData.subOrders.length === 0) {
    return <p>No orders found</p>; // Handle case where there are no sub-orders
  }

  return (
    <>
      {orderData.subOrders.map((item) => (
        <div className="order-item" key={item._id}>
          {/* Order Header */}


          {/* Order Product */}
          <div className="order-product">
            <img
              src={
                // laptop
                item.variantId.images?.[0] ||
                "/static/media/orderHistoryImage.f6b21b67034c337ac59b.png"
              } // Default image fallback
              alt={item.variantId.title || "Product Image"}
              className="product-image"
            />
            <div className="product-info">
              <h4>{item.variantId.title || "Apple 14 pro"}</h4>
              <div className="product_info_detail_name">
                <p>
                  <span>₹{item.price || "0"}</span> / {item.rentalPeriod} | Rented for:{" "}
                  <span>{item.quantity} item(s)</span>
                </p>|
                {item.orderStatus === "placed" && (
                  <a href={`/profile/orders/orderreview/${item?.variantId?._id}`} className="review_cta">
                    <span>
                      <CiStar />
                    </span>
                    Write Product Review
                  </a>
                )}
              </div>

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
        </div>
      ))}
    </>
  );
};

export default OrderItem;
