"use client";
import React, { useState, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from "axios";

// import "@/styles/OrderTrackingWithNavigate.css";
// import '../../../../../styles/OrderTrackingWithNavigate.css';
import OrderItem from "@/Components/OrderItem";
//import "@/styles/orderReview.css";
import '../../../../../styles/orderReview.css';
import '../../../../../styles/Orderpage.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiCloseLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useRouter, useSearchParams } from "next/navigation";
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
  const [formData, setFormData] = useState({
    rating: 0,
    title: "",
    comment: "",
  });

  console.log(formData,"formdata")
  const [hover, setHover] = useState(0);
  const [orderData, setOrderData] = useState({});
  const router = useRouter();
  const params = useParams();
  const productId = params.productId;
  const searchParams = useSearchParams();
  console.log(searchParams,"params")
  const variantId = searchParams.get("variantId")
  console.log(variantId,"variantId")


  const fetchProductById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/suborder/${productId}`);

      const data = response.data.variantId;
      setOrderData(response.data)
      console.log(response.data.reviews[0]._id,"suborderby id")

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchProductById();
  }, [productId]);



  const fetchReviewById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/reviews/variant/${variantId}`);

console.log(response.data,"responseof review")
setFormData(response.data.data[0])

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchReviewById();
  }, [variantId]);

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
  const handleRating = (rate) => {
    setFormData((prev) => ({ ...prev, rating: rate }));
  };

  const handleStepClick = (path) => {
    navigate(path); // Navigate to the corresponding path
  };

  const getDynamicBackground = () => {
    if (formData.rating === null) {
      return "linear-gradient(to right, #f8f9fa, #f8f9fa)"; // Default gray gradient
    }

    if (formData.rating >= 1 && formData.rating <= 2) {
      return "linear-gradient(to right, #ff4d4d,rgb(64, 183, 48))"; // Red gradient for ratings 1-2
    } else if (formData.rating > 2 && formData.rating <= 3.5) {
      return "linear-gradient(to right, #ff4d4d, #ffff66)"; // Orange to yellow gradient for 2-3.5
    } else if (formData.rating > 3.5 && formData.rating <= 5) {
      return "linear-gradient(to right, #a8e063,rgb(13, 134, 17))"; // Green gradient for 3.6-5
    }

    return "linear-gradient(to right, #f8f9fa, #f8f9fa)"; // Default fallback
  };


  const handleSubmit = async (variantId,reviewId) => {
    const { rating, title, comment } = formData;

    if (!rating || !review) {
      toast.error("Please provide both rating and review!");
      return;
    }

    try {
      const payload = {
        variantId: variantId,
        userId,
        subOrderId:productId,
        rating,
        comment: comment,
        title: title,
      };

      console.log(payload,"formData")

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      let response;

      // If variantId exists and you're editing an existing review
      if (variantId && reviewId) {
        response = await axios.put(`${BASE_URL}/reviews/${reviewId}`, payload, config);
      } else {
        response = await axios.post(`${BASE_URL}/reviews`, payload, config);
      }

      console.log(response)
      if (response.status === 201 || response.status === 200) {
        console.log(response,"response of review")
        toast.success("Review submitted successfully!");
        setFormData({ rating: 0, title: "", comment: "" });
        router.back()
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      if (error.response && error.response.status === 401) {
             Swal.fire({
               icon: "error",
               title: "Login Required",
               text: "Please login to proceed with payment.",
             });
      } else {
              Swal.fire({
                icon: "warning",
                title: "Note",
                text: error.response.data.message,
                confirmButtonText: "OK",

              });
      }
    }
  };



  return (
    <div className='order-detail'>
      <ToastContainer/>
      <h2 className='item-header' >
        <div className='back-product' onClick={() => router.back()}>
          <IoMdArrowRoundBack style={{ marginRight: "12px" }} /> Writing Review
        </div>
        <div
          
          onClick={() => handleSubmit(orderData.order?.variantId?._id,orderData?.reviews[0]?._id)}
        >
          Submit
        </div>
      </h2>
      <div className='Orders_page_section'>
        <div className='order_item-frame'>

          {/* <OrderItem  orderData={orderData} hideHeader={true}/> */}
          {<div className="order-item" key={orderData.order?._id}>




            <div className="order-product">
              <img
                src={

                  orderData?.order?.variantId?.images?.[0] ||
                  "/static/media/orderHistoryImage.f6b21b67034c337ac59b.png"
                }
                alt={orderData?.order?.variantId?.title || "Product Image"}
                className="product-image"
              />
              <div className="product-info">
                <h4>{orderData?.order?.variantId?.title}</h4>
                <div className="product_info_detail_name">
                  <p>
                    <span>₹{orderData.order?.price}</span> / {orderData.order?.rentalPeriod}
                    <span>{orderData?.order?.quantity} item(s)</span>
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
        <div className="flex items-center border-b p-4">
          <div className="flex justify-center space-x-2 my-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => handleRating(star)}
              >
                {star <= (hover || formData.rating) ? (
                  <AiFillStar className="text-yellow-500 text-2xl" />
                ) : (
                  <AiOutlineStar className="text-gray-400 text-2xl" />
                )}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 ml-auto">
            {formData.rating === 0 ? "Not Given Rating" : `You rated ${formData.rating} stars`}
          </p>
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
                  id='tilte'
                  placeholder="What's most important to know?"
                  value={formData.title}
                  onChange={e => setFormData((prev) => ({ ...prev, title: e.target.value }))} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="review">Review</label>
                <textarea
                  id="review"
                  rows="4"
                  placeholder="What did you like or dislike? What did you use this product for?"
                  value={formData.comment}
                  onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                ></textarea>
                {/* <button onClick={handleSubmit}>Submit Review</button> */}
              </div>
              {/* <div className='form-group'>
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
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </div>

  );
};

export default OrderReview;
