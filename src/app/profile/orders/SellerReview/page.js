'use client';
import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import "@/styles/SellerReview.css";
const prop = "/Assets/user-prop.png";


const SellerReview = () => {
  const [imagePreview, setImagePreview] = useState([]);
  const [rating, setRating] = useState(null);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);

    const newPreviews = files.map((file) => {
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
      return "linear-gradient(to right, #f8f9fa, #fff)"; // Default gray gradient
    }

    // Calculate the percentage for the gradient based on rating
    const percentage = (rating / 10) * 100; // Convert rating to a percentage (1-10 scale)
    return `linear-gradient(to right, #ff4d4d ${100 - percentage}%, #4caf50 ${percentage}%)`;
  };

  const router = useRouter();
  return (
    <div className="order-detail">
        {/* Draft submit button */}
      <a href="#"onClick={() => {router.push('/profile/orders/orderReviewSubmited')}}>Submit</a>
      <div className="Orders_page_section">
        <div className="order-tracking-container">
          <div>
            <div className="user_feed_profile">
                <div className="profile_left">
                    <img src={prop} alt="User Profile" />
                    <p className="user_title">Mohil Prajapati</p>
                </div>
                <a href="#" className="view_profile_cta">View Seller Profile</a>
            </div>
            <div className="order_overall_rating">
              <h6>Overall Rating</h6>
              <div className="rating_frame">
                <div className="rating_scale"
                style={{ background: getDynamicBackground(), transition: "background 0.3s ease-in-out",}}
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
                        <a href="#">{value}</a>
                      </span>
                    );
                  })}
                </div>
                <span className="rating-status">
                  {rating ? `You selected: ${rating}` : "Not Given Rating"}
                </span>
              </div>
            </div>
            {/* feedback */}
            <div className="feedback-form">
              <h2>Write Feedback</h2>
              <form>
                {/* <!-- Headline input --> */}
                <div className="form-group">
                  <label htmlFor="headline">Headline</label>
                  <input
                    type="text"
                    id="headline"
                    placeholder="What's most important to know?"
                  />
                </div>

                {/* <!-- Review textarea --> */}
                <div className="form-group">
                  <label htmlFor="headline">Review</label>
                  <textarea
                    id="review"
                    rows="4"
                    placeholder="What did you like or dislike? What did you use this product for?"
                  ></textarea>
                </div>

                {/* <!-- File upload --> */}
                <div className="feedback-form">
                  {/* <form> */}
                    {/* File upload */}
                    <div className="form-group">
                      <label htmlFor="photo">Add a photo</label>
                      <div className="file-upload">
                        <input
                          type="file"
                          id="photo"
                          accept=".jpg, .jpeg, .png"
                          onChange={handleFileChange}
                        />
                        <span className="upload-text">
                          <span>
                            Drag your file(s) or{" "}
                            <span className="browse">browse</span>
                          </span>
                          <small>Image format will be JPEG, PNG, JPG</small>
                        </span>
                        {/* Image previews */}
                        <div className="image-previews">
                          {imagePreview.map((preview, index) => (
                            <div key={index} className="image-preview">
                              <img
                                src={preview}
                                alt={`Uploaded Preview ${index + 1}`}
                              />
                              <button
                                type="button"
                                className="remove-btn"
                                onClick={() => removeImage(index)}
                              >
                                <RiCloseLine />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  {/* </form> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerReview;
