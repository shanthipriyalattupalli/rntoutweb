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
  const [expandedSubOrderIds, setExpandedSubOrderIds] = useState([]);  // Changed to an array
  const [subOrderHistories, setSubOrderHistories] = useState({});
  const [isReturned, setIsReturned] = useState(false);

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

  useEffect(() => {
    if (orderData?.subOrders?.length > 0) {
      orderData.subOrders.forEach(async (item) => {
        await fetchSuborderHistory(item._id);
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

      console.log(response.data, "response of suborders")

      const reviews = Array.isArray(response.data.reviews) ? response.data.reviews : [];
      setSubOrderHistories((prev) => ({
        ...prev,
        [subOrderId]: reviews,
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
        <div className="order-item" key={item._id}>
          {/* Order Product */}
          <div className="flex flex-col sm:flex-row justify-between w-full">
            <div className="order-product">
              <img
                src={item?.variantId?.images?.[0] || "/static/media/orderHistoryImage.f6b21b67034c337ac59b.png"}
                alt={item?.variantId?.title || "Product Image"}
                className="product-image"
              />
              <div className="product-info">
                <h4>{item?.variantId?.title || "Apple 14 pro"}</h4>
                <div className="product_info_detail_name">
                  <p>
                    <span>₹{item.price || "0"}</span> / {item.rentalPeriod}
                    <span className="ml-2"> {item.quantity} item(s)</span>
                  </p>
                  <span className="hidden sm:flex" style={{ color: "rgba(7, 7, 7, 0.1)" }}>|</span>
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
                  {(item.orderStatus === "delivered") && <span className="hidden sm:flex" style={{ color: "rgba(7, 7, 7, 0.1)" }}> |</span>}
                  {(item.orderStatus === "delivered") &&
                    Array.isArray(subOrderHistories[item._id]) &&
                    subOrderHistories[item._id].length === 0 && (
                      <span className="return-order" onClick={() => {
                        setIsReturned(true)
                      }}>
                        Return Product?
                      </span>
                    )}
                  {isReturned && (
                    <div className="modal-overlays" onClick={() => setIsReturned(false)}>
                      <div className="modal-contents" onClick={(e) => e.stopPropagation()}>


                        <ReturnOrder setIsReturned={setIsReturned} item={item} />

                      </div>
                    </div>
                  )}
                  {(item.orderStatus === "delivered") && <span className="hidden sm:flex" style={{ color: "rgba(7, 7, 7, 0.1)" }}> |</span>}
                  <button
                    className="text-blue-500 font-semibold sm:px-4 px-0 rounded items-left text-left"
                    onClick={() => handleShowTracking(item)}
                  >
                    {expandedSubOrderIds.includes(item._id) ? (
                      <>Hide Tracking &#x25BE;</>
                    ) : (
                      <>Show Tracking &#x276F;</>
                    )}
                  </button>
                </div>

                {subOrderHistories[item._id] && Array.isArray(subOrderHistories[item._id]) && (
                  <div className="suborder-history">
                    {/* Check if reviews exist */}
                    {subOrderHistories[item._id].length > 0 && (
                      subOrderHistories[item._id].map((review, index) => (
                        <div className="flex flex-row space-x-2" key={index}>
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
                          <div className="flex flex-col">

                            {review.title && <p className="text-[14px] font-[500]">{review.title}</p>

                            }
                            <p>{review.comment}</p>
                          </div>
                          <a href={`/profile/orders/orderreview/${item._id}?variantId=${review.variantId}`} className="w-4 h-4"><Edit2Icon className="w-4 h-4" /></a>

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
            <div className="flex gap-2 h-[20px]">
              <Image src={download} alt="" width={20} height={5}  />
              <a href="#" className="font-semibold text-[#0b827c] " onClick={() => fetchDownloadInvioce(item._id)} >
                Download Invoice
              </a>
            </div>
          </div>
          {expandedSubOrderIds.includes(item._id) && (
            <OrderTracking
              selectedSubOrder={item}  // Assuming 'item' contains the relevant suborder data
              steps={steps}
              getCurrentStep={getCurrentStep}
              getReturnedCurrentStep={getReturnedCurrentStep}
              returnSteps={returnSteps}
            />
          )}

        </div>
      ))}
    </div>
  );
};

export default OrderItem;
