"use client";

import React, { useEffect, useState, useRef } from "react";
import '../../styles/productslist.css';
import Reviews from '../../Components/Reviews'
import axios from "axios";
// import { useRouter } from "next/router";
import {
    Star,
    Minus,
    Plus,
    Truck,
    ArrowUpDown,
    Settings,
    Smartphone,
    ChevronDown,
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { useRouter, useSearchParams, useParams } from "next/navigation";
import { formatDistanceToNow } from 'date-fns';
import Link from "next/link";
import ProductItem from "@/Components/Home/ProductItems";
const productimg = "/Assets/pi-1.png";
const AvailIcon = "/Assets/Icons/ava-stock.png";
const AvailtyIcon = "/Assets/Icons/availability.png";
const truck = "/Assets/truck.svg"
const estimation = "/Assets/estimation.svg"
const stars = "/Assets/stars.svg";
const reviewimage = '/Assets/reviewimage.svg'
const userProfile = '/Assets/userProfile.svg'
const stock = '/Assets/stock.svg';
const favorite = "/Assets/favorite.svg"
const favorited = '/Assets/favoritedicon.svg'
const star2 = "/Assets/star2.png";
const star3 = "/Assets/star3.png";
const star4 = "/Assets/star4.png";
const star5 = "/Assets/star5.png";
const star6 = "/Assets/star6.png";
const star7 = "/Assets/star7.png";
const left = '/Assets/leftarrow.svg';
const startfill = '/Assets/star_fill.svg'
const quality = '/Assets/quality.svg';
const relocation = '/Assets/relocation.svg';
const maintenance = '/Assets/maintenance.svg';
const upgrading = '/Assets/upgrading.svg';
const sample = '/Assets/Sample.png';


const ProductPage = ({ setIsModelOpen, productId,product,rentalPrice,rentalAvailability,otherDetail,images }) => {
    const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
    const [quantity, setQuantity] = useState(1);
    const [selectedDuration, setSelectedDuration] = useState("monthly");
    const [selectedcustomDuration, setselectedcustomDuration] = useState(null)
    const [selectedImage, setSelectedImage] = useState(0);
    const [expandedFaq, setExpandedFaq] = useState(null);
    const [owner, setOwner] = useState({});
    const [relatedItems, setRelatedItems] = useState([])
    const [isFavorite, setIsFavorite] = useState(false)
    const [userRatings, setUserRatings] = useState([]);
    const [isReview, setIsReview] = useState(false)
    const router = useRouter();
    const userId = (typeof window !== 'undefined') ? localStorage.getItem("userId") : null;
    const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;








    let daily = rentalPrice.daily;
    let weekly = rentalPrice.weekly;
    let monthly = rentalPrice.monthly;
    let threeMonths = rentalPrice.threeMonths;
    let sixMonths = rentalPrice.sixMonths;
    let oneYear = rentalPrice.oneYear;

    const rentalPrices = [
        { label: "Per Day", price: daily },
        { label: "Per Week", price: weekly },
        { label: "Per Month", price: monthly },
        { label: "Per Quarter", price: threeMonths },
        { label: "Per 6 Months", price: sixMonths },
        { label: "Per year", price: oneYear },
    ];

    const durations = Object.entries(rentalPrice).map(([key, value]) => ({
        name: key,
        label: key.charAt(0).toUpperCase() + key.slice(1),
        price: `$${parseFloat(value).toFixed(2)}`, // Convert to number and format price
    }));

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString("en-US", { month: "short" }); // Get short month name
        const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
        return `${day} ${month} ‘${year}`;
    };
    const formattedStartDate = formatDate(rentalAvailability.startDate);
    const formattedEndDate = formatDate(rentalAvailability?.endDate);




    const otherDetails = otherDetail
        ? Object.entries(otherDetail).map(([key, value]) => ({
            label: key.charAt(0).toUpperCase() + key.slice(1),
            value,
        }))
        : [];

    const productDetails = otherDetail
        ? Object.entries(otherDetail).map(([key, value]) => ({
            label: key.charAt(0).toUpperCase() + key.slice(1),
            value,
        }))
        : [];



    return (
        <>
            <div className='flex gap-4 px-4'>

                <div className='relative'>
                    <img
                        src={images[selectedImage]} // Dynamically bind the selected image
                        alt={`Product Image ${selectedImage + 1}`}
                        className='w-full h-[250px] rounded-lg shadow-lg'
                    />

                    <div className='grid grid-cols-4 gap-2'>
                        {images.map((image, index) => (
                            <button
                                key={index}
                                className={`border-2 rounded-lg overflow-hidden ${selectedImage === index ? "border-red-500" : "border-gray-200"
                                    }`}
                                onClick={() => setSelectedImage(index)} // Update the selected image
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className='w-full h-20 object-cover'
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div className='space-y-2 w-full'>
                    <h1 className='text-2xl font-bold'>{product.title}</h1>
                    <div>
                        <h3 className='font-medium mb-3 text-sm'>SELECT DURATION</h3>
                        <div className='grid grid-cols-2 md:grid-cols-3  gap-3 bg-white'>
                            {rentalPrice.map((price) => (
                                <button
                                    key={price._id}
                                    className={`flex flex-col items-center justify-center px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 rounded-lg border text-center w-full sm:w-auto "`}
                                >
                                    <div className='text-[10px] sm:text-xs md:text-sm'>{price.period}</div>
                                    <div className='font-bold text-sm sm:text-md md:text-sm'>₹{price.price}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                    {productDetails.length > 0 && <div className='flex flex-col gap-8 py-6'>
                        <div className='space-y-6'>
                            <div className=''>
                                <table className='flex flex-col w-full text-sm border bg-white rounded-3xl p-4'>
                                    <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                                        Product Details
                                    </h2>
                                    <tbody>
                                        {productDetails.map((detail, index) => (
                                            <tr key={index} className=''>
                                                <td className='p-2 font-semibold'>{detail.label}</td>
                                                <td className='p-2 text-gray-600'>{detail.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table className='flex flex-col w-full border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4'>
                                    <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                                        Other Details
                                    </h2>
                                    <tbody>
                                        {otherDetails?.map((detail, index) => (
                                            <tr key={index} className=''>
                                                <td className='p-2 font-semibold'>{detail.label}</td>
                                                <td className='p-2 text-gray-600'>{detail.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table className='flex flex-col w-full border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4'>
                                    <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                                        Product Description
                                    </h2>
                                    <tbody>
                                        <p className="font-sm text-md text-gray-700 leading-relaxed text-justify">{product.description}</p>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>}
                </div>



            </div>




        </>
    );
};

export default ProductPage;
