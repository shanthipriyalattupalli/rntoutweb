"use client";
import React, { useState, useEffect } from "react";

import axios from "axios";

// import "@/styles/OrderTrackingWithNavigate.css";
// import '../../../../../styles/OrderTrackingWithNavigate.css';
import OrderItem from "@/Components/OrderItem";
//import "@/styles/orderReview.css";
import '../../../../../styles/orderReview.css';
import '../../../../../styles/Orderpage.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const userId = (typeof window !== 'undefined') ? localStorage.getItem("userId") : null;
  const token=(typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
  const [imagePreview, setImagePreview] = useState([]);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);
  const [orderData, setOrderData] = useState({});
  const router = useRouter();
  const params = useParams();
  const productId = params.productId;


  const fetchProductById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/suborder/${productId}`);

      const data = response.data.variantId;
      setOrderData(response.data.order)

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchProductById();
  }, [productId]);


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

    if (rating >= 1 && rating <= 2) {
      return "linear-gradient(to right, #ff4d4d,rgb(64, 183, 48))"; // Red gradient for ratings 1-2
    } else if (rating > 2 && rating <= 3.5) {
      return "linear-gradient(to right, #ff4d4d, #ffff66)"; // Orange to yellow gradient for 2-3.5
    } else if (rating > 3.5 && rating <= 5) {
      return "linear-gradient(to right, #a8e063,rgb(13, 134, 17))"; // Green gradient for 3.6-5
    }

    return "linear-gradient(to right, #f8f9fa, #f8f9fa)"; // Default fallback
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };


  const handleSubmit = async (orderId) => {
    if (!rating || !review) {
      toast.error("Please provide both rating and review!");
      return;
    }

    try {
      const payload = {
        variantId: orderData.variantId._id,
        subOrderId:orderId,
        rating: rating,
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
        // router.push("/profile/orders/orderReviewSubmited");

      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
toast.error(error?.response?.data?.message)
  };
}



  return (
    <div className='order-detail'>
      <ToastContainer/>
      <h2 className='item-header' onClick={() => router.back()}>
        <div className='back-product'>
          <IoMdArrowRoundBack style={{ marginRight: "12px" }} /> Writing Review
        </div>
        <div
          
          onClick={() => handleSubmit(orderData._id)}
        >
          Submit
        </div>
      </h2>
      <div className='Orders_page_section'>
        <div className='order_item-frame'>

          {/* <OrderItem  orderData={orderData} hideHeader={true}/> */}
          {<div className="order-item" key={orderData._id}>




            <div className="order-product">
              <img
                src={

                  orderData?.variantId?.images?.[0] ||
                  "/static/media/orderHistoryImage.f6b21b67034c337ac59b.png"
                }
                alt={orderData?.variantId?.title || "Product Image"}
                className="product-image"
              />
              <div className="product-info">
                <h4>{orderData?.variantId?.title}</h4>
                <div className="product_info_detail_name">
                  <p>
                    <span>₹{orderData.price}</span> / {orderData.rentalPeriod}
                    <span>{orderData.quantity} item(s)</span>
                  </p>
                </div>

                {/* Conditionally render feedback if available */}
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


          </div>}
        </div>

        <div className="order_overall">
          <div className="bg-white p-4">
            <h6>Overall Rating</h6>
            <div className='rating_frame'>
              <div
                className='rating_scale'
                style={{
                  background: getDynamicBackground(),
                  transition: "background 0.3s ease-in-out",
                }}
              >
                {[...Array(5)].map((_, index) => {
                  const value = index + 1;
                  return (
                    <span
                      key={value}
                      className={`rating-btn ${rating === value ? "selected" : ""
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
              <div className="form-group">
                <label htmlFor="review">Review</label>
                <textarea
                  id="review"
                  rows="4"
                  placeholder="What did you like or dislike? What did you use this product for?"
                  value={review}
                  onChange={handleReviewChange} 
                ></textarea>
                {/* <button onClick={handleSubmit}>Submit Review</button> */}
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

  );
};

export default OrderReview;
