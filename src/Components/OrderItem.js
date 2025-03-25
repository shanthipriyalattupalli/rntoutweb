"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import OrderTracking from "./OrderTracking";
import '../styles/OrderTrackingWithNavigate.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CancelOrder from "./Orders/CancelOrder";
import { Edit, Edit2Icon } from "lucide-react";
const stars = "/Assets/stars.svg";
const download="/Assets/download.svg";


const OrderItem = ({ hideHeader, orderData, onShowTracking, selectedSubOrder, steps, getCurrentStep }) => {

  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
  const [expandedSubOrderId, setExpandedSubOrderId] = useState(null);
  const [subOrderHistories, setSubOrderHistories] = useState({});
  const [isCanceled, setIsCanceled] = useState(false);

  if (!orderData || !orderData.subOrders || orderData.subOrders.length === 0) {
    return <p>No orders found</p>;
  }

  const handleShowTracking = (item) => {
    if (expandedSubOrderId === item._id) {
      setExpandedSubOrderId(null);
    } else {
      setExpandedSubOrderId(item._id);
      onShowTracking(item);
    }
  };

  useEffect(() => {
    if (orderData?.subOrders?.length > 0) {
      orderData.subOrders.forEach(async (item) => {
        await fetchSuborderHistory(item._id);
      });
    }
  }, [orderData]); // Fetch history whenever orderData changes

  const fetchSuborderHistory = async (subOrderId) => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/suborder/${subOrderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const reviews = Array.isArray(response.data.reviews) ? response.data.reviews : [];
      setSubOrderHistories((prev) => ({
        ...prev,
        [subOrderId]: reviews, // Store data in state by suborder ID
      }));
    } catch (error) {
      console.error(`Error fetching suborder history for ${subOrderId}:`, error);
    }
  };


  const handleUpdateReview = async (reviewId) => {
    try {
      const response = await axios.put(`${BASE_URL}/reviews/${reviewId}`, {

      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Review updated successfully!");
    } catch (error) {
      console.error(`Error updating review for ${reviewId}:`, error);
      toast.error("Failed to update review!");
    }
  }

  return (
    <div>
      <ToastContainer />

      {orderData.subOrders.map((item) => (
        <div className="order-item" key={item._id}>
          {/* Order Product */}
          <div className="flex flex-col sm:flex-row justify-between w-full">
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
                  <span>₹{item.price || "0"}</span> / {item.rentalPeriod}
                  <span>{item.quantity} item(s)</span>
                </p>
               <span className="hidden sm:flex">|</span>
                {(item.orderStatus === "delivered") &&
                  Array.isArray(subOrderHistories[item._id]) &&
                  subOrderHistories[item._id].length === 0 && (
                    <a href={`/profile/orders/orderreview/${item._id}`} className="review_cta">
                      <span>
                        <CiStar />
                      </span>
                      Write Product Review
                    </a>
                  )}


                <button
                  className="text-blue-500 font-semibold sm:px-4 px-0 rounded items-left text-left"
                  onClick={() => handleShowTracking(item)}
                >
                  {expandedSubOrderId === item._id ? (
                    <>Hide Tracking &#x25BE;</> // Down arrow
                  ) : (
                    <>Show Tracking &#x276F;</> // Side arrow
                  )}
                </button>
              </div>

              {subOrderHistories[item._id] && Array.isArray(subOrderHistories[item._id]) && (
                <div className="suborder-history">
                  {/* Check if reviews exist */}
                  {subOrderHistories[item._id].length > 0 && (
                    subOrderHistories[item._id].map((review) => (
                      <div className="flex flex-row space-x-2">
                        <div className="flex flex-col space-x-2">
                          {review.rating && (
                            <p
                              className={`flex items-center px-2 rounded-full text-white ${review.rating >= 1 && review.rating <= 2
                                  ? "bg-red-500"
                                  : review.rating > 2 && review.rating <= 3.5
                                    ? "bg-orange-500"
                                    : "bg-green-700"
                                }`}
                            >
                              <img src={stars} alt="Rating stars" className="w-4 h-3" />
                              <span className="ml-1">{review.rating}</span>
                            </p>
                          )}

                        </div>
                        <p>{review.comment}</p><span className="w-4 h-4"><Edit2Icon className="w-4 h-4" /></span>
                        {/* <p>{new Date(review.createdAt).toLocaleDateString()}</p> */}
                      </div>
                    ))
                  )}
                </div>
              )}


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
          <div className="flex gap-2">
            <Image src={download} alt="" width={20} height={20} className="mb-20"/>
          <a href="#" className="font-semibold text-[#0b827c] " onClick={null}>
          Download Invoice
        </a>
        </div>
</div>
          {expandedSubOrderId === item._id && (
            <OrderTracking selectedSubOrder={selectedSubOrder} steps={steps} getCurrentStep={getCurrentStep} />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderItem;
