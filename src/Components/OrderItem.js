"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { CiStar } from "react-icons/ci";
import OrderTracking from "./OrderTracking";
import '../styles/OrderTrackingWithNavigate.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReturnOrder from "./Orders/ReturnOrder";
import CancelOrder from "./Orders/CancelOrder";
import { Edit, Edit2Icon } from "lucide-react";
const stars = "/Assets/stars.svg";
const download = "/Assets/download.svg";
import Swal from "sweetalert2";

const OrderItem = ({ hideHeader, orderData, onShowTracking, selectedSubOrder, steps, getCurrentStep, returnSteps, getReturnedCurrentStep }) => {

  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
  const [expandedSubOrderIds, setExpandedSubOrderIds] = useState([]);
  const [subOrderHistories, setSubOrderHistories] = useState({});
  const [isReturned, setIsReturned] = useState(false);
  
  // NEW STATES FOR CANCELLATION
  const [isCanceled, setIsCanceled] = useState(false);
  const [selectedCancelItem, setSelectedCancelItem] = useState(null);
  console.log(isCanceled, "isCanceled in OrderItem");
  const [cancellationEligibility, setCancellationEligibility] = useState({});
  console.log(cancellationEligibility, "cancellationEligibility in OrderItem");

  if (!orderData || !orderData.subOrders || orderData.subOrders.length === 0) {
    return <p>No orders found</p>;
  }

  const handleShowTracking = (item) => {
    if (expandedSubOrderIds.includes(item._id)) {
      setExpandedSubOrderIds(prev => prev.filter(id => id !== item._id));
    } else {
      setExpandedSubOrderIds(prev => [...prev, item._id]);
      onShowTracking(item);
    }
  };

  // NEW FUNCTION: Check cancellation eligibility
  const checkCancellationEligibility = async (subOrderId) => {
    console.log("Checking cancellation eligibility for:", subOrderId);
    try {
      const response = await axios.get(`${BASE_URL}/orders/suborder/${subOrderId}/cancel-eligibility`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCancellationEligibility((prev) => ({
        ...prev,
        [subOrderId]: response.data,
      }));
    } catch (error) {
      console.error(`Error checking cancellation eligibility for ${subOrderId}:`, error);
    }
  };

  // NEW FUNCTION: Handle cancel button click
  const handleCancelClick = async (item) => {
    console.log("Handling cancel click for item:", item);
    const eligibility = cancellationEligibility[item._id];
    
    if (!eligibility?.canCancel) {
      Swal.fire({
        icon: "warning",
        title: "Cannot Cancel Order",
        text: eligibility?.reason || "This order cannot be cancelled at this time.",
        html: eligibility?.data ? `
          <div class="text-left mt-3">
            <p><strong>Delivery Date:</strong> ${eligibility.data.deliveryDate}</p>
            <p><strong>Days Since Delivery:</strong> ${eligibility.data.daysSinceDelivery}</p>
            <p><strong>Status:</strong> ${eligibility.data.status}</p>
            ${eligibility.data.timeRemaining ? 
              `<p><strong>Time Remaining:</strong> ${eligibility.data.timeRemaining.exact}</p>` : 
              `<p><strong>Cancellation Expired:</strong> ${eligibility.data.cancellationDeadline}</p>`
            }
          </div>
        ` : undefined,
      });
      return;
    }
console.log("Setting selectedCancelItem:", item);
    setSelectedCancelItem(item);
    setIsCanceled(true);
  };

  useEffect(() => {
    console.log(orderData, "orderData in OrderItem");
    console.log(orderData?.subOrders, "orderData.subOrders in OrderItem");
    if (orderData?.subOrders?.length > 0) {
      orderData.subOrders.forEach(async (item) => {
        console.log(item, "item in OrderItem");
        await fetchSuborderHistory(item._id);
        // Check cancellation eligibility for delivered orders
        if (item.orderStatus === "delivered") {
          await checkCancellationEligibility(item._id);
        }
      });
    }
  }, [orderData]);

  const fetchSuborderHistory = async (subOrderId) => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/suborder/${subOrderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const reviews = Array.isArray(response.data.reviews) ? response.data.reviews : [];
      const deliveryReview = Array.isArray(response?.data?.deliveryReview) ? response?.data?.deliveryReview: [];

      setSubOrderHistories((prev) => ({
        ...prev,
        [subOrderId]: {
          reviews,
          deliveryReview,
        },
      }));
    } catch (error) {
      console.error(`Error fetching suborder history for ${subOrderId}:`, error);
    }
  };

  const fetchDownloadInvioce = async (subOrderId) => {
    try {
      const response = await axios.get(`${BASE_URL}/invoice/download/${subOrderId}`, {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const file = new Blob([response.data], { type: 'application/pdf' });
      const fileURL = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = fileURL;
      link.setAttribute('download', `Invoice_${subOrderId}.pdf`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.log(error, "error in invoice");
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Required",
          text: "Please login to proceed with payment.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to download invoice. Please try again later.",
        });
      }
    }
  };

  return (
    <div>
      <ToastContainer />
      {orderData.subOrders.map((item) => (
        <div className="order-item-card bg-white  shadow-md p-6 mb-3" key={item._id}>
          <div className="flex flex-col sm:flex-row gap-6 items-start justify-between">
            {/* Product Image */}
            <img
              src={item?.variantId?.images?.[0] || "/static/media/orderHistoryImage.f6b21b67034c337ac59b.png"}
              alt={item?.variantId?.title || "Product Image"}
              className="product-image rounded-lg border w-24 h-24 object-cover"
            />

            {/* Product Info & Actions */}
            <div className="flex-1 flex flex-col gap-2">
              {/* Header Row: Title & Download Invoice */}
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-bold text-lg text-gray-800">{item?.variantId?.title || "Apple 14 pro"}</h4>
                <a
                  href="#"
                  className="download-invoice font-semibold text-[#0b827c] flex items-center gap-1 hover:underline"
                  onClick={() => fetchDownloadInvioce(item._id)}
                >
                  <Image src={download} alt="" width={20} height={20} />
                  <span className="hidden sm:inline">Download Invoice</span>
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-gray-600 text-sm">
                <span className="font-semibold text-[#0b827c]">₹{item.price || "0"}</span>
                <span>/ {item.rentalPeriod}</span>
                <span>{item.quantity} item(s)</span>
                <span className={`badge px-2 py-1 rounded-full text-xs font-semibold ${
                  item.orderStatus === "delivered" ? "bg-green-100 text-green-800" :
                  item.orderStatus === "canceled" ? "bg-red-100 text-red-800" :
                  item.orderStatus === "shipped" ? "bg-blue-100 text-blue-800" :
                  "bg-yellow-100 text-yellow-800"
                }`}>
                  {item.orderStatus.toUpperCase()}
                </span>
              </div>

              {/* Actions Row */}
              <div className="flex flex-wrap gap-4 mt-2 items-center">
                {/* Cancel Button & Timer */}
                {item.orderStatus === "delivered" && cancellationEligibility[item._id]?.canCancel && (
                  <>
                    <button
                      className="cancel-btn text-red-600 font-semibold px-3 py-1 rounded hover:bg-red-50 transition"
                      onClick={() => handleCancelClick(item)}
                    >
                      Cancel Order
                    </button>
                    {cancellationEligibility[item._id]?.data?.timeRemaining && (
                      <span className="text-orange-600 text-xs font-medium bg-orange-50 px-2 py-1 rounded">
                        Cancel within: {cancellationEligibility[item._id].data.timeRemaining.exact}
                      </span>
                    )}
                  </>
                )}

                {/* Review CTA */}
                {item.orderStatus === "delivered" &&
                  subOrderHistories[item._id] &&
                  Array.isArray(subOrderHistories[item._id].reviews) &&
                  subOrderHistories[item._id].reviews.length === 0 && (
                    <a href={`/profile/orders/orderreview/${item._id}`} className="review_cta flex items-center gap-1 text-blue-600 hover:underline">
                      <CiStar />
                      Write Product Review
                    </a>
                  )}

                {/* Delivery Review CTA */}
                {item.orderStatus === "delivered" &&
                  subOrderHistories[item._id] &&
                  Array.isArray(subOrderHistories[item._id].deliveryReview) &&
                  subOrderHistories[item._id].deliveryReview.length === 0 && (
                    <a href={`/profile/orders/deliveryreview/${item._id}`} className="review_cta flex items-center gap-1 text-blue-600 hover:underline">
                      <CiStar />
                      Write Delivery Review
                    </a>
                  )}

                                    {/* EXISTING MODAL LOGIC */}
                                    {isReturned && (
                                      <div className="modal-overlays" onClick={() => setIsReturned(false)}>
                                        <div className="modal-contents" onClick={(e) => e.stopPropagation()}>
                                          <ReturnOrder setIsReturned={setIsReturned} item={item} />
                                        </div>
                                      </div>
                                    )}
                  
                                    {/* NEW CANCELLATION MODAL */}
                                    {isCanceled && selectedCancelItem && (
                                      <div className="modal-overlays" onClick={() => setIsCanceled(false)}>
                                        <div className="modal-contents" onClick={(e) => e.stopPropagation()}>
                                          <CancelOrder 
                                            setIsCanceled={setIsCanceled} 
                                            subOrderId={selectedCancelItem._id}
                                            item={selectedCancelItem}
                                            isSubOrder={true}
                                          />
                                        </div>
                                      </div>
                                    )}

                {/* Tracking Button */}
                <button
                  className="tracking-btn text-blue-500 font-semibold px-3 py-1 rounded hover:bg-blue-50 transition"
                  onClick={() => handleShowTracking(item)}
                >
                  {expandedSubOrderIds.includes(item._id) ? "Hide Tracking ▼" : "Show Tracking ▶"}
                </button>
              </div>

              
                              {/* {item.review && item.review.feedback && (
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
                              )} */}
            </div>
          </div>
          {/* Reviews Display, Modal Logic, Tracking, etc. */}
          {expandedSubOrderIds.includes(item._id) && (
            <OrderTracking
              selectedSubOrder={item}
              steps={steps}
              getCurrentStep={getCurrentStep}
              getReturnedCurrentStep={getReturnedCurrentStep}
              returnSteps={returnSteps}
            />
          )}
          {subOrderHistories[item._id] && Array.isArray(subOrderHistories[item._id].reviews) && (
  <div className="suborder-history mt-4">
    {/* Product Reviews */}
    {subOrderHistories[item._id].reviews.length > 0 && (
      <div className="review-card bg-gray-50 rounded-lg p-4 mb-3 shadow-sm">
        <span className="block text-base font-semibold text-gray-700 mb-2 text-center">
          Product Review
        </span>
        {subOrderHistories[item._id].reviews.map((review, index) => (
          <div className="flex flex-row gap-4 items-start border-b pb-3 mb-3 last:border-b-0 last:mb-0" key={index}>
            <div>
              {review.rating && (
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-white text-xs font-bold ${
                    review.rating >= 1 && review.rating <= 2
                      ? "bg-red-500"
                      : review.rating > 2 && review.rating <= 3.5
                      ? "bg-orange-500"
                      : "bg-green-700"
                  }`}
                >
                  <img src={stars} alt="Rating stars" className="w-4 h-3 mr-1" />
                  {review.rating}
                </span>
              )}
            </div>
            <div className="flex-1">
              {review.title && <p className="font-medium text-sm mb-1">{review.title}</p>}
              <p className="text-gray-600 text-sm">{review.comment}</p>
            </div>
            <a
              href={`/profile/orders/orderreview/${item._id}?variantId=${review.variantId}`}
              className="ml-2 text-blue-500 hover:text-blue-700"
              title="Edit Review"
            >
              <Edit2Icon className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    )}

    {/* Delivery Reviews */}
    {subOrderHistories[item._id]?.deliveryReview?.length > 0 && (
      <div className="review-card bg-gray-50 rounded-lg p-4 shadow-sm">
        <span className="block text-base font-semibold text-gray-700 mb-2 text-center">
          Delivery Review
        </span>
        {subOrderHistories[item._id].deliveryReview.map((review, index) => (
          <div className="flex flex-row gap-4 items-start border-b pb-3 mb-3 last:border-b-0 last:mb-0" key={index}>
            <div>
              {review.rating && (
                <span
                  className={`inline-flex items-center px-2 py-1 rounded-full text-white text-xs font-bold ${
                    review.rating >= 1 && review.rating <= 2
                      ? "bg-red-500"
                      : review.rating > 2 && review.rating <= 3.5
                      ? "bg-orange-500"
                      : "bg-green-700"
                  }`}
                >
                  <img src={stars} alt="Rating stars" className="w-4 h-3 mr-1" />
                  {review.rating}
                </span>
              )}
            </div>
            <div className="flex-1">
              {review.title && <p className="font-medium text-sm mb-1">{review.title}</p>}
              <p className="text-gray-600 text-sm">{review.comment}</p>
            </div>
            <a
              href={`/profile/orders/deliveryreview/${item?._id}?variantId=${review?.variantId?._id}`}
              className="ml-2 text-blue-500 hover:text-blue-700"
              title="Edit Delivery Review"
            >
              <Edit2Icon className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>
    )}
  </div>
)}
        </div>
      ))}
      
    </div>
  );
};

export default OrderItem;