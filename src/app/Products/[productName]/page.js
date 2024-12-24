"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";
const productimg = "/Assets/pi-1.png";
const AvailIcon = "/Assets/Icons/ava-stock.png";
const AvailtyIcon = "/Assets/Icons/availability.png";

const ProductPage = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [quantity, setQuantity] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState("monthly");
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [product, setProduct] = useState([]);
  const [rentalPrice, setRentalPrice] = useState([]);
  const [rentalAvailability, setRentalAvailability] = useState({});
  const [otherDetail, setOtherDetails] = useState({});
  const [owner, setOwner] = useState({});
  const [images, setImages] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");
  let userId;
  let token;

  useEffect(() => {
    userId = localStorage.getItem("userId");
    token = localStorage.getItem("userToken");
  }, []);
  console.log(productId, "productIdurdfcvbjhhgc");

  const fetchProductById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/variants/${productId}`);

      const data = response.data;
      console.log(data, "fetch product by id");
      setProduct(data);
      setRentalPrice(data.rentalPrice);
      setRentalAvailability(data.rentalAvailability);
      setOtherDetails(data.itemDetails);
      setImages(data.images);
      setOwner(data.owner);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  useEffect(() => {
    fetchProductById();
  }, [productId]);

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
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the label
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
  const formattedEndDate = formatDate(rentalAvailability.endDate);

  const services = [
    { icon: <Truck className='w-6 h-6' />, label: "Finest-Quality" },
    { icon: <ArrowUpDown className='w-6 h-6' />, label: "Free relocation" },
    { icon: <Settings className='w-6 h-6' />, label: "Free maintenance" },
    { icon: <Smartphone className='w-6 h-6' />, label: "Keep upgrading" },
  ];

  const productImages = [
    productimg,
    productimg,
    productimg,
    productimg,
    productimg,
    productimg,
  ];

  const otherDetails = Object.entries(otherDetail).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the key
    value,
  }));
  const productDetails = Object.entries(otherDetail).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize the key
    value,
  }));
  const faqItems = [
    {
      question: "Can I return before 2 months?",
      answer:
        "Yes, you can return the product within 2 months if you are not satisfied with it.",
    },
    {
      question: "How do I extend after 6 months?",
      answer:
        "You can extend your rental period by contacting our customer support team.",
    },
  ];

  const handleAddToCart = async (productId) => {
    console.log(productId, "variant id");
    try {
      const payload = {
        user_id: userId,
        variant_id: productId,
        quantity: 1,
        rentalPeriod: selectedDuration,
      };
      const response = await axios.post(`${BASE_URL}/cart/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
        },
      });
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  const handleAddCart = () => {
    console.log(product._id, "productidijnfmjm");
    if (userId) {
      handleAddToCart(product._id);
    } else {
      toast.error("You must be logged in to add items to cart.");
    }
  };

  const handleSellerclick = () => {
    if (owner && owner._id) {
      router.push(`/SellerProfile?id=${owner._id}`);
    } else {
      toast.error("Seller information is missing.");
    }
  };
  console.log(selectedDuration, "selectedDuration");
  return (
    <div className='max-w-7xl mx-auto px-4'>
      <ToastContainer />
      {/* Top Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8 py-6'>
        {/* Product Images */}
        <div className='space-y-4'>
          {/* Main Image */}
          <div className='relative'>
            <span className='absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-md text-sm'>
              NEW ARRIVALS
            </span>
            <img
              src={images[selectedImage]} // Dynamically bind the selected image
              alt={`Product Image ${selectedImage + 1}`}
              className='w-full rounded-lg shadow-lg'
            />
          </div>

          {/* Thumbnails */}
          <div className='grid grid-cols-6 gap-2'>
            {images.map((image, index) => (
              <button
                key={index}
                className={`border-2 rounded-lg overflow-hidden ${
                  selectedImage === index ? "border-red-500" : "border-gray-200"
                }`}
                onClick={() => setSelectedImage(index)} // Update the selected image
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className='w-full h-full object-cover'
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className='space-y-6'>
          <div className='space-y-2'>
            <nav className='text-sm text-gray-500'>
              Home/ Furniture/ DROGO Throne Ergonomic Gaming Chair
            </nav>
            <h1 className='text-2xl font-bold'>{product.title}</h1>

            {/* Ratings */}
            <div className='flex items-center space-x-2 cursor-pointer'>
              <img
                src='/api/placeholder/24/24'
                alt='Seller'
                className='w-6 h-6 rounded-full'
              />
              {owner && (
                <span
                  className='text-xs'
                  onClick={handleSellerclick}
                  key={owner._id}
                >
                  {owner.name}
                </span>
              )}
              <div className='flex items-center'>
                <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                <span className='ml-1 text-xs'>4.6</span>
                <span className='text-gray-500 text-xs ml-1'>(41 reviews)</span>
              </div>
            </div>
          </div>

          {/* Duration Selection */}
          <div>
            <h3 className='font-medium mb-3 text-sm'>SELECT DURATION</h3>
            <div className='grid grid-cols-5 gap-3 bg-white'>
              {rentalPrice.map((price) => (
                <button
                  key={price._id}
                  className={`p-3 rounded-lg border text-center ${
                    selectedDuration === price.period
                      ? "border-[#F48003] bg-[#FFF5EB]"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedDuration(price.period)}
                >
                  <div className='text-xs'>{price.period}</div>
                  <div className='font-bold'>₹{price.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}

          {/* Availability */}

          <div className='flex items-center space-x-4 text-sm'>
            <div className='flex items-center text-blue-600 bg-[#2F6FED1A] rounded-full p-1.5 text-xs font-normal'>
              <img src={AvailIcon} alt='Available' className='mr-2 w-4 h-4' />
              Available Stock: {product.stockQuantity}
            </div>
            <div className='text-orange-500 bg-blue-100 rounded-md p-1 text-xs   font-[400] text-xs'>
              <img
                src={AvailtyIcon}
                alt='Availability'
                className='mr-2 w-4 h-4 inline'
              />
              Availability: {formattedStartDate} -{formattedEndDate}
            </div>
          </div>
          <div className='flex items-center space-x-4'>
            <div className='flex items-center border border-red-500 text-white font-[600] rounded-lg bg-[#FF2D55]'>
              <button className='p-2 w-64' onClick={() => handleAddCart()}>
                Add to cart
              </button>
            </div>
            {/* <div className="flex items-center border border-red-500 rounded-full bg-red-50">
              <button
                className="p-2"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-12">{quantity}</span>
              <button
                className="p-2"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div> */}
          </div>

          {/* Delivery Info */}
          <div className='flex items-center justify-around bg-white p-3 border border-slate-200 rounded-xl'>
            <div className='flex items-center text-center  justify-center'>
              <Truck className='w-5 h-5 mr-2' />
              <span className=' text-sm text-[#070707CC] font-[600]'>
                27 Sep - 29 Sep to 500008
              </span>
            </div>
            <span>|</span>
            <div className='flex items-center text-blue-600 text-[#070707CC] font-[600] text-sm'>
              <span className='mr-2 '>✓</span>
              As good as new
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className='font-medium mb-3 text-sm'>SERVICES</h3>
            <div className='grid grid-cols-4 gap-4'>
              {services.map((service, index) => (
                <div key={index} className='text-center border rounded-md py-4'>
                  <div className='flex justify-center text-blue-600 mb-2'>
                    {service.icon}
                  </div>
                  <div className='text-xs'>{service.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='grid md:grid-cols-2 gap-8 py-6'>
        {/* Left Side - Product Details and Other Details */}
        <div className='space-y-6'>
          {/* Product Details */}
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

          {/* Other Details */}
          <div>
            <table className='flex flex-col w-full border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4'>
              <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                Other Details
              </h2>
              <tbody>
                {otherDetails.map((detail, index) => (
                  <tr key={index} className=''>
                    <td className='p-2 font-semibold'>{detail.label}</td>
                    <td className='p-2 text-gray-600'>{detail.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side - FAQ Section */}
        <div>
          <h2 className='text-lg font-semibold mb-3'>FAQ ABOUT THIS PRODUCT</h2>
          <div className='border bg-white rounded-lg border-slate-200'>
            {faqItems.map((faq, index) => (
              <div key={index} className='border-b'>
                <button
                  className='flex items-center justify-between w-full p-2'
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                >
                  <span className='text-sm font-medium'>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      expandedFaq === index ? "transform rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === index && (
                  <div className='text-sm text-gray-600 px-3 py-2'>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
