"use client";
import React, { useState } from "react";
import "@/styles/OrderTrackingWithNavigate.css";
import OrderItem from "@/Components/OrderItem";
import "@/styles/orderReview.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";

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
    return `linear-gradient(to right, #ff4d4d ${
      100 - percentage
    }%, #4caf50 ${percentage}%)`;
  };

  const router = useRouter();

  return (
    <div className='order-detail'>
      <h2 className='item-header' onClick={() => router.back()}>
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
      </h2>
      <div className='Orders_page_section'>
        <div className='order-tracking-container'>
          <div className='order_item-frame'>
            {orderData.map((e) => (
              <OrderItem key={e.id} hideHeader={true} orderData={e} />
            ))}
          </div>

          <div>
            <div className='order_overall_rating'>
              <h6>Overall Rating</h6>
              <div className='rating_frame'>
                <div
                  className='rating_scale'
                  style={{
                    background: getDynamicBackground(),
                    transition: "background 0.3s ease-in-out",
                  }}
                >
                  {[...Array(10)].map((_, index) => {
                    const value = index + 1;
                    return (
                      <span
                        key={value}
                        className={`rating-btn ${
                          rating === value ? "selected" : ""
                        }`}
                        onClick={() => handleRatingClick(value)}
                      >
                        <a href='#'>{value}</a>
                      </span>
                    );
                  })}
                </div>
                <span className='rating-status'>
                  {rating ? `You selected: ${rating}` : "Not Given Rating"}
                </span>
              </div>
            </div>

            {/* Feedback Form */}
            <div className='feedback-form'>
              <h2>Write Feedback</h2>
              <form>
                <div className='form-group'>
                  <label htmlFor='headline'>Headline</label>
                  <input
                    type='text'
                    id='headline'
                    placeholder="What's most important to know?"
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='review'>Review</label>
                  <textarea
                    id='review'
                    rows='4'
                    placeholder='What did you like or dislike? What did you use this product for?'
                  ></textarea>
                </div>
                <div className='form-group'>
                  <label htmlFor='photo'>Add a photo</label>
                  <div className='file-upload'>
                    <input
                      type='file'
                      multiple
                      id='photo'
                      accept='.jpg, .jpeg, .png'
                      onChange={handleFileChange}
                    />
                    <span className='upload-text'>
                      <span>
                        Drag your file(s) or{" "}
                        <span className='browse'>browse</span>
                      </span>
                      <small>Image format will be JPEG, PNG, JPG</small>
                    </span>
                    <div className='image-previews'>
                      {imagePreview?.map((preview, index) => (
                        <div key={index} className='image-preview'>
                          <img
                            src={preview}
                            alt={`Uploaded Preview ${index + 1}`}
                          />
                          <button
                            type='button'
                            className='remove-btn'
                            onClick={() => removeImage(index)}
                          >
                            <RiCloseLine />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReview;
