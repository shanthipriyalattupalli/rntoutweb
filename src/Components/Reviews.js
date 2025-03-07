"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const laptop = "/Assets/laptop-1.jpg";

const OrderReview = ({ product }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [headline, setHeadline] = useState("");
  const [review, setReview] = useState("");

  const userId = (typeof window !== 'undefined') ? localStorage.getItem("userId") : null;
  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleSubmit = async () => {
    if (!rating || !review) {
      toast.error("Please provide both rating and review!");
      return;
    }

    try {
      const payload = {
        variantId: product._id,
        userId,
        rating,
        comment: review,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // Add the token if required by the API
          "Content-Type": "application/json",
        },
      };

      const response = await axios.post(`${BASE_URL}/reviews`, payload, config);

      if (response.status === 201 || response.status === 200) {
        toast.success("Review submitted successfully!");
        setHeadline("");
        setReview("");
        setRating(0);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized! Please log in again.");
      } else {
        toast.error("Error submitting review. Please try again.");
      }
    }
  };



  return (
    <div className="flex flex-col px-10 pb-10">
      <ToastContainer position="top-right" autoClose={3000} />

      <h2 className="justify-center mt-8 text-center font-semibold text-lg">Ratings and Reviews</h2>

      <div className="flex items-center gap-4 border-b pb-4">
        <img src={product.images[0]} alt={product.title} className="w-12 h-12 rounded-lg object-cover" />
        <p className="text-sm text-gray-700">{product.title}</p>
      </div>

      {/* Rating Section */}
      <div className="my-4">
        <p className="font-poppins text-[14px] font-semibold leading-[18px] text-left">Overall Rating</p>
        <div className="flex items-center border-b p-4">
          <div className="flex justify-center space-x-2 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => handleRating(star)}
              >
                {star <= (hover || rating) ? (
                  <AiFillStar className="text-yellow-500 text-2xl" />
                ) : (
                  <AiOutlineStar className="text-gray-400 text-2xl" />
                )}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 ml-auto">
            {rating === 0 ? "Not Given Rating" : `You rated ${rating} stars`}
          </p>
        </div>
      </div>

      {/* Feedback Section */}
      <div>
        <p className="font-poppins text-[14px] font-semibold leading-[18px] text-left mb-3">Write Feedback</p>
        <label className="block text-sm text-gray-600 mb-1">Headline</label>
        <input
          type="text"
          placeholder="What's most important to know?"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
        />

        <label className="block text-sm text-gray-600 mt-3 mb-1">Review</label>
        <textarea
          rows="3"
          placeholder="What did you like or dislike? What did you use this product for?"
          className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100"
          onClick={() => {
            setHeadline("");
            setReview("");
            setRating(0);
          }}
        >
          Cancel
        </button>

        <button
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OrderReview;
