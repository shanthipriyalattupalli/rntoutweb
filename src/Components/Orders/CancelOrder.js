"use client";

import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CancelOrder = ({ setIsCanceled, subOrderId,suborder }) => {
  console.log(suborder,"suborder")
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
      toast.error("Please select a reason for cancellation.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.patch(
        `${BASE_URL}/orders/cancel/${subOrderId}`,
        { cancelReason: selectedReason }, // Pass selected reason
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(response.data.message || "Order successfully canceled!");
      setIsCanceled(false); // Close modal after success
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order.");
      console.error(error.response?.data || error, "error cancelling order");
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
        <p className="text-sm text-gray-500 text-center">{suborder.variantId.title}</p>
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
