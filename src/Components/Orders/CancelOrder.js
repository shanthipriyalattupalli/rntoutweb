"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const CancelOrder = ({ setIsCanceled, OrderId, order, subOrderId, item, isSubOrder = false }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [eligibilityInfo, setEligibilityInfo] = useState(null);
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

  const reasons = [
    "Changed my mind",
    "Found a better price elsewhere", 
    "Product not as expected",
    "No longer needed",
    "Better deal found elsewhere",
    "Other",
  ];

  // Check eligibility when component mounts (for sub-orders)
  useEffect(() => {
    if (isSubOrder && subOrderId) {
      checkEligibility();
    }
  }, [isSubOrder, subOrderId]);

  const checkEligibility = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/suborder/${subOrderId}/cancel-eligibility`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEligibilityInfo(response.data);
    } catch (error) {
      console.error("Error checking eligibility:", error);
    }
  };

  const handleCancelOrder = async () => {
    if (!selectedReason) {
      Swal.fire({
        icon: "warning",
        title: "Reason Required",
        text: "Please select a reason for cancellation.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.put(
        `${BASE_URL}/orders/suborder/${subOrderId}/cancel`,
        { cancelReason: selectedReason }, // Pass selected reason
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // Show success message
      if(response.data.success === true){
      Swal.fire({
        icon: "success",
        title: "Order Canceled",
        text: response.data.message || "Your order has been canceled successfully.",
        confirmButtonColor: "#d33",
      });
    }

      setIsCanceled(false); // Close modal after success
      window.location.reload()
    } catch (error) {
      let errorMessage = "Failed to cancel order. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }

      Swal.fire({
        icon: "error",
        title: "Cancellation Failed",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });

      console.error(error.response?.data || error, "Error canceling order");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-md mx-4">
        <div className="flex justify-center">
          <div className="bg-red-100 px-4 py-4 rounded-full">
            <div className="bg-red-500 px-4 py-2 rounded-full">
              <span className="text-white text-2xl cursor-pointer" onClick={() => setIsCanceled(false)}>✕</span>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-center mt-2">
          {isSubOrder ? "Cancel Sub-Order" : "Cancel Order"}
        </h2>
        
        {/* PRODUCT INFO FOR SUB-ORDERS */}
        {isSubOrder && item && (
          <div className="text-center mt-2">
            <p className="text-sm text-gray-600">{item.variantId?.title}</p>
            <p className="text-xs text-gray-500">₹{item.price} / {item.rentalPeriod}</p>
          </div>
        )}

        {/* ELIGIBILITY INFO */}
        {isSubOrder && eligibilityInfo && (
          <div className={`mt-3 p-3 rounded text-sm ${
            eligibilityInfo.canCancel ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}>
            <p><strong>Status:</strong> {eligibilityInfo.reason}</p>
            {eligibilityInfo.data?.timeRemaining && (
              <p><strong>Time Remaining:</strong> {eligibilityInfo.data.timeRemaining.exact}</p>
            )}
          </div>
        )}

        <hr className="my-4" />

        <p className="text-sm font-medium mb-2">Select Reason</p>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {reasons.map((reason, index) => (
            <label key={index} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="cancelReason"
                value={reason}
                checked={selectedReason === reason}
                onChange={() => setSelectedReason(reason)}
                className="accent-red-500"
              />
              <span className="text-sm text-gray-700">{reason}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 w-1/2 mr-2 hover:bg-gray-50"
            onClick={() => setIsCanceled(false)}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 bg-red-500 text-white rounded-lg w-1/2 ml-2 hover:bg-red-600 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!selectedReason || isSubmitting}
            onClick={handleCancelOrder}
          >
            {isSubmitting ? "Processing..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;