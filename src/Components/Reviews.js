"use client";
import React, { useState } from "react";
// import "@/styles/OrderTrackingWithNavigate.css";
import '../styles/OrderTrackingWithNavigate.css';
import OrderItem from "@/Components/OrderItem";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
//import "@/styles/orderReview.css";
import '../styles/orderReview.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
const laptop = '/Assets/laptop-1.jpg'

const HistoryImage = "/Assets/HistoryImage.png";

const orderData = [
  {
    id: "1234567890",
    date: "27/08/2024",
    name: "Dell 27 inch P2725H Monitor | Anti-Glare With 3H Hardness | 100Hz | 5ms gray-to-gray (Fast mode)",
    price: 1500,
    rentedDuration: "3 months",
    image: HistoryImage,
  },
];

const OrderReview = () => {
  const [imagePreview, setImagePreview] = useState([]);
  const [rating, setRating] = useState(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    const newPreviews = files?.map((file) => {
      return URL.createObjectURL(file);
    });

    setImagePreview((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRatingClick = (value) => {
    setRating(value);
  };

  const handleStepClick = (path) => {
    navigate(path); // Navigate to the corresponding path
  };

  const getDynamicBackground = () => {
    if (rating === null) {
      return "linear-gradient(to right, #f8f9fa, #f8f9fa)"; // Default gray gradient
    }

    const percentage = (rating / 10) * 100; // Convert rating to a percentage (1-10 scale)
    return `linear-gradient(to right, #ff4d4d ${100 - percentage
      }%, #4caf50 ${percentage}%)`;
  };

  const [isOpen, setIsOpen] = useState(false);
  // const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [headline, setHeadline] = useState("");
  const [review, setReview] = useState("");
  const product = {
    name: "Dell 27 inch P2725H Monitor | Anti-Glare | 100Hz | 5ms",
    image: laptop,
  };
  const handleRating = (rate) => {
    setRating(rate);
  };
  const handleSubmit = () => {
    console.log({ rating, headline, review });
    setIsOpen(false); // Close modal after submission
  };
  
  const router = useRouter();

  return (
    <div className='flex flex-col px-10 pb-10'>
      {/* <h2 className='item-header' onClick={() => router.back()}>
        <div className='back-product'>
          <IoMdArrowRoundBack style={{ marginRight: "12px" }} /> Writing Review
        </div>
        <a
          href='#'
          onClick={() => {
            router.push("/profile/orders/orderReviewSubmited");
          }}
        >
          Submit
        </a>
      </h2> */}
      <h2 className="justify-center mt-8 text-center font-semibold text-lg">Ratings and Reviews</h2>
      <div className="flex items-center gap-4 border-b pb-4">
              <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
              <p className="text-sm text-gray-700">{product.name}</p>
            </div>
            {/* Rating Section */}
            <div className=" my-4">
              <p className="font-poppins text-[14px] font-semibold leading-[18px] text-left"
              >Overall Rating</p>
              <div className="flex items-center  border-b p-4">
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
              <p className="text-sm text-gray-500 ml-auto">{rating === 0 ? "Not Given Rating" : `You rated ${rating} stars`}</p>
              </div>
            </div>
            {/* Feedback Section */}
            <div>
            <p className="font-poppins text-[14px] font-semibold leading-[18px] text-left mb-3"
            >Write Feedback</p>
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
              <button className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-100" onClick={() => setIsOpen(false)}>
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
