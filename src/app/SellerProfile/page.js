"use client";

import React, { useEffect, useState, Suspense, lazy } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
//import "@/styles/SellerProfile.css";
import { useRouter } from "next/navigation";

// Lazy load components
const Aboutus = lazy(() => import("@/Pages/Aboutus"));
const Fqa = lazy(() => import("@/Pages/Fqa"));
const Products = lazy(() => import("@/app/Products/page"));

const SellerCarouselProfile = () => {
  /* const searchParams = useSearchParams();
  const sellerId = searchParams.get("id"); */
  const params = useParams();
  const sellerId = params.id;

  const slides = [
    { id: 1, image: "/Assets/sofa.svg" },
    { id: 2, image: "/Assets/sofa.svg" },
    { id: 3, image: "/Assets/sofa.svg" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState("products");

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <Suspense fallback={<div>Loading Products...</div>}>
            <div className='seller-tab-content'>
              <Products />
            </div>
          </Suspense>
        );
      case "about":
        return (
          <Suspense fallback={<div>Loading About Us...</div>}>
            <div>
              <Aboutus />
            </div>
          </Suspense>
        );
      case "reviews":
        return (
          <div className='seller-tab-content'>
            <h2>Ratings & Reviews</h2>
            <p>Overall Rating: 4.4/5</p>
            <ul>
              <li>"Great product quality!" - User 1</li>
              <li>"Fast shipping and excellent service." - User 2</li>
              <li>"Will definitely buy again!" - User 3</li>
            </ul>
          </div>
        );
      case "faq":
        return (
          <Suspense fallback={<div>Loading FAQ...</div>}>
            <div>
              <Fqa />
            </div>
          </Suspense>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className='seller-carousel-container'>
        <div className='seller-carousel-slide'>
          <img
            src={slides[currentSlide].image}
            alt={`Slide ${currentSlide + 1}`}
            className='seller-carousel-image'
          />
        </div>
        <button className='seller-carousel-prev-button' onClick={handlePrev}>
          &#x276E;
        </button>
        <button className='seller-carousel-next-button' onClick={handleNext}>
          &#x276F;
        </button>
        <div className='seller-carousel-indicators'>
          {slides?.map((_, index) => (
            <span
              key={index}
              className={`seller-carousel-indicator ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className='seller-profile-container'>
        {/* Header Section */}
        <div className='seller-profile-header'>
          <div className='seller-company-info'>
            <h1>
              RntOut Enterprise{" "}
              <span className='seller-verified'>&#x2714;</span>
            </h1>
            <p>
              <span className='seller-contact-item'>📞 +91 12345 67890</span> |{" "}
              <span className='seller-contact-item'>
                ✉️ rntout.enterprise@gmail.com
              </span>{" "}
              |{" "}
              <span className='seller-contact-item'>
                📍 3-6-288/3, Sri Siva Rama Towers, King Koti, Hyderabad,
                Telangana, India 500029
              </span>
            </p>
          </div>
        </div>

        {/* About Us Section */}
        <div className='seller-about-us'>
          <h2>About Us</h2>
          <p>
            Fantaslook focusing on garment production and sales, vigorously
            develop cross-border e-commerce platform to sell clothing, the
            company mainly sells all kinds of women's clothing, the annual sales
            are on the rise, the variety of clothing is more and more, women's
            shirts, tops, dresses, miniskirts, home wear, sportswear, etc.
            Fantaslook was founded in.{" "}
            <a href='#' className='seller-read-more'>
              read more...
            </a>
          </p>
          <p className='seller-business-name'>
            <strong>Business Name:</strong> Yueyang Guangzhou Import and Export
            Co Ltd
          </p>
        </div>

        {/* Reviews Section */}
        <div className='seller-store-reviews'>
          <p>
            <strong>Store Reviews:</strong>{" "}
            <span className='seller-rating'>4.4 out of 5</span>{" "}
            <span className='seller-review-stats'>
              (19,997 ratings and 1,273 reviews)
            </span>
          </p>
        </div>

        {/* Tab Navigation */}
        <div className='seller-tabs'>
          <button
            className={`seller-tab ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
          <button
            className={`seller-tab ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            Rating & Reviews
          </button>
          <button
            className={`seller-tab ${activeTab === "about" ? "active" : ""}`}
            onClick={() => setActiveTab("about")}
          >
            About Us
          </button>
          <button
            className={`seller-tab ${activeTab === "faq" ? "active" : ""}`}
            onClick={() => setActiveTab("faq")}
          >
            FAQ
          </button>
        </div>

        {/* Dynamic Tab Content */}
        {renderContent()}
      </div>
    </>
  );
};

export default SellerCarouselProfile;
