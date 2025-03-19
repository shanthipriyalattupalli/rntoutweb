"use client";

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
const CancelOrder = ({ setIsCanceled, OrderId, order }) => {
  console.log(OrderId,"suborderId")
  const [selectedReason, setSelectedReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

  const reasons = [
    "Changed my mind",
    "Found a better price elsewhere",
    "Shipping is taking too long",
    "Ordered by mistake",
    "Other",
  ];


  const handleCancelOrder = async () => {
    if (!selectedReason) {
      Swal.fire({
        icon: "warning",
        title: "Cancellation Required",
        text: "Please select a reason for cancellation.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.patch(
        `${BASE_URL}/orders/cancel/${OrderId}`,
        { cancelReason: selectedReason }, // Pass selected reason
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
console.log(response,"repsonse of order")
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

      // Show error message
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
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/4">
        <div className="flex justify-center">
          <div className="bg-red-100 px-4 py-4 rounded-full">
            <div className="bg-red-500 px-4 py-2 rounded-full">
              <span className="text-white text-2xl cursor-pointer" onClick={() => setIsCanceled(false)}>✕</span>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold text-center mt-2">Cancel Order</h2>
        {/* <p className="text-sm text-gray-500 text-center">{suborder.variantId.title}</p> */}
        <hr className="my-4" />

        <p className="text-sm font-medium mb-2">Select Reason</p>
        <div className="space-y-2">
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
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 w-1/2 mr-2"
            onClick={() => setIsCanceled(false)}
          >
            Cancel
          </button>
          <button
            className={`px-4 py-2 bg-red-500 text-white rounded-lg w-1/2 ml-2 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!selectedReason || isSubmitting}
            onClick={handleCancelOrder}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelOrder;
