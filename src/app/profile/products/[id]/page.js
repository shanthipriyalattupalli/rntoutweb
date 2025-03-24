"use client";
import React, { useState,useEffect } from "react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter, useSearchParams, useParams } from "next/navigation";
// import "@/styles/ProductInformation2.css";
// import '../../../../styles/ProductInformation.css'
import '../../../../styles/ProductInformation2.css'
import { FileX } from "lucide-react";
import axios from "axios";

const dummyimage = "/Assets/dummy-image-2.svg";
const sight1 = "/Assets/sight1.png";
const sight2 = "/Assets/sight2.png";
const star1 = "/Assets/star1.png";
const star2 = "/Assets/star2.png";
const star3 = "/Assets/star3.png";
const star4 = "/Assets/star4.png";
const star5 = "/Assets/star5.png";
const star6 = "/Assets/star6.png";
const star7 = "/Assets/star7.png";
const badge = "/Assets/badge.png";
const rouimg = "/Assets/rouimg.png";
const logo = "/Assets/Rntout_Logo.png";


export default function ProductInformation2() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [activeTab, setActiveTab] = useState("rents");
  const [activePage, setActivePage] = useState(1);
  const totalPages = 10;
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  const [product,setProduct]=useState({})
  const [images,setImages]=useState([])

// const {id}=Params
  const handlePageClick = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const getPageNumbers = () => {
    const pages = [];
    if (activePage <= 3) {
      pages.push(1, 2, 3, "...", totalPages);
    } else if (activePage >= totalPages - 2) {
      pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        1,
        "...",
        activePage - 1,
        activePage,
        activePage + 1,
        "...",
        totalPages
      );
    }
    return pages;
  };

  const rents = [
    {
      id: 1,
      name: "Mohil Prajapati",
      phone: "+91 85552 86528",
      address:
        "C/14, Vijay Apts, Old Agra Road, Naupada, next To Aradhana, Thane (W), Mumbai, Maharashtra, India - 400602",
      duration: "3 months",
      amount: "₹35,000",
      status: "Paid",
      date: "05-11-2024",
    },
    {
      id: 1,
      name: "Mohil Prajapati",
      phone: "+91 85552 86528",
      address:
        "C/14, Vijay Apts, Old Agra Road, Naupada, next To Aradhana, Thane (W), Mumbai, Maharashtra, India - 400602",
      duration: "3 months",
      amount: "₹35,000",
      status: "Paid",
      date: "05-11-2024",
    },
    {
      id: 1,
      name: "Mohil Prajapati",
      phone: "+91 85552 86528",
      address:
        "C/14, Vijay Apts, Old Agra Road, Naupada, next To Aradhana, Thane (W), Mumbai, Maharashtra, India - 400602",
      duration: "3 months",
      amount: "₹35,000",
      status: "Paid",
      date: "05-11-2024",
    },
    {
      id: 1,
      name: "Mohil Prajapati",
      phone: "+91 85552 86528",
      address:
        "C/14, Vijay Apts, Old Agra Road, Naupada, next To Aradhana, Thane (W), Mumbai, Maharashtra, India - 400602",
      duration: "3 months",
      amount: "₹35,000",
      status: "Paid",
      date: "05-11-2024",
    },
    {
      id: 1,
      name: "Mohil Prajapati",
      phone: "+91 85552 86528",
      address:
        "C/14, Vijay Apts, Old Agra Road, Naupada, next To Aradhana, Thane (W), Mumbai, Maharashtra, India - 400602",
      duration: "3 months",
      amount: "₹35,000",
      status: "Paid",
      date: "05-11-2024",
    },
    {
      id: 1,
      name: "Mohil Prajapati",
      phone: "+91 85552 86528",
      address:
        "C/14, Vijay Apts, Old Agra Road, Naupada, next To Aradhana, Thane (W), Mumbai, Maharashtra, India - 400602",
      duration: "3 months",
      amount: "₹35,000",
      status: "Paid",
      date: "05-11-2024",
    },
    {
      id: 1,
      name: "Mohil Prajapati",
      phone: "+91 85552 86528",
      address:
        "C/14, Vijay Apts, Old Agra Road, Naupada, next To Aradhana, Thane (W), Mumbai, Maharashtra, India - 400602",
      duration: "3 months",
      amount: "₹35,000",
      status: "Paid",
      date: "05-11-2024",
    },
    {
      id: 1,
      name: "Mohil Prajapati",
      phone: "+91 85552 86528",
      address:
        "C/14, Vijay Apts, Old Agra Road, Naupada, next To Aradhana, Thane (W), Mumbai, Maharashtra, India - 400602",
      duration: "3 months",
      amount: "₹35,000",
      status: "Paid",
      date: "05-11-2024",
    },

    // Add other dummy data for rents as needed
  ];

  const fetchProductById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/variants/${productId}`);

      const data = response.data;
      console.log(data,"response in product")
      setProduct(data)
      setImages(response.data.images)

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchProductById();
  }, [productId]);

  return (
    <>
      <h2 className='item-header' onClick={() => router.back()}>
        <div className='back-product'>
          <IoMdArrowRoundBack style={{ marginRight: "12px" }} /> Products
        </div>
      </h2>
      <div className='rent-dashboard'>
        {/* Product Header Section */}
        <div className='product-info'>
          <img src={images[0]} alt='Product' className='product-image' />   
          <div className='product-details'>
            <h2 className="font-semibold">
              {/* Dell 24 inch P2425H Monitor | 100Hz | 5ms G-to-G (Fast Mode) | 99%
              sRGB */}
              {product.title}
            </h2>
            <p className="font-semibold">Available Stock: {product.stockQuantity}</p>
           {product.averageRating && <p>Rating & Reviews: ⭐{product.averageRating} </p>}
 {product?.isApproved === true &&           <a
              className='view-details-link'
              onClick={() => {
                router.push(`/Products/${productId}?id=${productId}`);
              }}
            >
              View all product details
            </a>}
          </div>
        </div>

        {/* Summary Header Section */}
        <div className='dashboard-top1'>
         
          <div className='logo'>
            <img src={logo} alt="RNT Out Logo" className="h-8 w-[10%] sm:h-10 border-none border-0" />
             
            </div>
   
              <div className='total-earning'>TOTAL EARNING:</div>
              <div className='joined-date'>Joined at Nov 05th 2024</div>
            

        </div>

        {/* Tab Navigation */}
        <div className='tabs'>
          <button
            className={`tab ${activeTab === "rents" ? "active" : ""}`}
            onClick={() => setActiveTab("rents")}
          >
            Rents
          </button>
          <button
            className={`tab ${activeTab === "ratingReviews" ? "active" : ""}`}
            onClick={() => setActiveTab("ratingReviews")}
          >
            Rating Reviews
          </button>
        </div>

        {/* Tab Content */}
        <div className='tab-content'>
          {activeTab === "rents" && (
            <div className='rent-list'>
              {rents?.map((rent) => (
                <div className='rent-item' key={rent.id}>
                  <div className='rent-header'>
                    <span className='rent-name'>{rent.name}</span>
                    <span className='rent-status'>
                      {rent.amount} {rent.status}
                    </span>
                  </div>
                  <div className='rent-details'>
                    <p>{rent.phone}</p>
                    <p>{rent.address}</p>
                    <span className='rent-date'>{rent.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "ratingReviews" && (
            <div className='rating-reviews'>
              <div>
                <div className='product-details-container'>
                  <div className='earning-and-ratings'>
                    <div className='rating-summary text-center justify-center'>
                      <div className='average-rating text-center justify-center ml-80'>
                        <p className='pro-p4'>4.7</p>
                        <div className='stars '>
                          <img src={star2} width='128px' height='24px' alt='' className="ml-8"/>
                        </div>
                        <p className='pro-p3 ml-5'>Customer Rating (934,516)</p>
                      </div>
{/* 
                      <div className='detailed-ratings'>
                        <div className='rating-bar'>
                          <img src={star3} width='88px' height='16px' alt='' />
                          <div className='progress-bar1'>
                            <div
                              className='progress1'
                              style={{ width: "20%" }}
                            ></div>
                          </div>
                          <span className='rating-count'>(94,532)</span>
                        </div>
                        <div className='rating-bar'>
                          <img src={star4} width='88px' height='16px' alt='' />
                          <div className='progress-bar1'>
                            <div
                              className='progress1'
                              style={{ width: "20%" }}
                            ></div>
                          </div>
                          <span className='rating-count'>(6,717)</span>
                        </div>
                        <div className='rating-bar'>
                          <img src={star5} width='88px' height='16px' alt='' />
                          <div className='progress-bar1'>
                            <div
                              className='progress1'
                              style={{ width: "20%" }}
                            ></div>
                          </div>
                          <span className='rating-count'>(714)</span>
                        </div>
                        <div className='rating-bar'>
                          <img src={star6} width='88px' height='16px' alt='' />
                          <div className='progress-bar1'>
                            <div
                              className='progress1'
                              style={{ width: "20%" }}
                            ></div>
                          </div>
                          <span className='rating-count'>(152)</span>
                        </div>
                        <div className='rating-bar'>
                          <img src={star7} width='88px' height='16px' alt='' />
                          <div className='progress-bar1'>
                            <div
                              className='progress1'
                              style={{ width: "20%" }}
                            ></div>
                          </div>
                          <span className='rating-count'>(643)</span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>

                <div className='app-container'>
                  <p className='pro-p5 m-0'>
                    Community Feedback On This Product
                  </p>
                  <div className='feedback-list'>
                    {/* Feedback Items */}
                    <div className='feedback-item'>
                      <div className='rating-badge'>
                        <img src={badge} width='69px' height='71px' alt='' />
                      </div>
                      <div className='feedback-content'>
                        <p className='feedback-message m-0'>
                          Thank you so much for answering all questions
                          patiently. You are superb and thanks for
                          communicating. Beautiful predictions and will
                          recommend my friends.
                        </p>
                      </div>
                    </div>
                    <div className='feedback-author'>
                      <img src={rouimg} width='24px' height='24px' alt='' />
                      <span className='author-name'>Bessie Cooper</span>
                      <span className='feedback-time'>• Just now</span>
                    </div>

                    <div className='feedback-item'>
                      <div className='rating-badge'>
                        <img src={badge} width='69px' height='71px' alt='' />
                      </div>
                      <div className='feedback-content'>
                        <p className='feedback-message m-0'>
                          Thank you so much ma'am for listening to my problems
                          with patience and for providing me your valuable
                          guidance. 🙏🌼
                        </p>
                      </div>
                    </div>
                    <div className='feedback-author'>
                      <img src={rouimg} width='24px' height='24px' alt='' />
                      <span className='author-name'>Bessie Cooper</span>
                      <span className='feedback-time'>• 2 mins ago</span>
                    </div>

                    <div className='feedback-item'>
                      <div className='rating-badge'>
                        <img src={badge} width='69px' height='71px' alt='' />
                      </div>
                      <div className='feedback-content'>
                        <p className='feedback-message m-0'>
                          Awesome 💯 percent
                        </p>
                      </div>
                    </div>
                    <div className='feedback-author'>
                      <img src={rouimg} width='24px' height='24px' alt='' />
                      <span className='author-name'>Bessie Cooper</span>
                      <span className='feedback-time'>• 2 mins ago</span>
                    </div>

                    <div className='feedback-item'>
                      <div className='rating-badge'>
                        <img src={badge} width='69px' height='71px' alt='' />
                      </div>
                      <div className='feedback-content'>
                        <p className='feedback-message m-0'>
                          Very accurate reading. It was very relaxing talking to
                          you.
                        </p>
                      </div>
                    </div>
                    <div className='feedback-author'>
                      <img src={rouimg} width='24px' height='24px' alt='' />
                      <span className='author-name'>Bessie Cooper</span>
                      <span className='feedback-time'>• 1 hour ago</span>
                    </div>

                    {/* Pagination */}
                    <div className='pagination'>
                      <button
                        disabled={activePage === 1}
                        onClick={() => handlePageClick(activePage - 1)}
                      >
                        {"<"}
                      </button>
                      {getPageNumbers()?.map((page, index) => (
                        <button
                          key={index}
                          className={activePage === page ? "active" : ""}
                          onClick={() =>
                            typeof page === "number" && handlePageClick(page)
                          }
                          disabled={page === "..."}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        disabled={activePage === totalPages}
                        onClick={() => handlePageClick(activePage + 1)}
                      >
                        {">"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
