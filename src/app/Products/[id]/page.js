"use client";

import React, { useState } from 'react';
import { Star, Minus, Plus, Truck, ArrowUpDown, Settings, Smartphone, ChevronDown } from 'lucide-react';
const productimg = '/Assets/pi-1.png';
const AvailIcon = '/Assets/Icons/ava-stock.png';
const AvailtyIcon = '/Assets/Icons/availability.png';

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedDuration, setSelectedDuration] = useState('Per Day');
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const durations = [
    { label: 'Per Day', price: '₹500' },
    { label: 'Per Week', price: '₹2,500' },
    { label: 'Per Month', price: '₹7,500' },
    { label: 'Per Quarter', price: '₹20,000' },
    { label: 'Per 6 Months', price: 'Not Avail.' }
  ];

  const services = [
    { icon: <Truck className="w-6 h-6" />, label: 'Finest-Quality' },
    { icon: <ArrowUpDown className="w-6 h-6" />, label: 'Free relocation' },
    { icon: <Settings className="w-6 h-6" />, label: 'Free maintenance' },
    { icon: <Smartphone className="w-6 h-6" />, label: 'Keep upgrading' }
  ];

  const productImages = [productimg, productimg, productimg, productimg, productimg, productimg];

  const productDetails = [
    { label: 'Brand', value: 'DROGO' },
    { label: 'Colour', value: 'Throne Dark Blue' },
    { label: 'Material', value: 'Fabric' },
    { label: 'Product Dimensions', value: '70D x 70W x 125H Centimeters' },
    { label: 'Size', value: 'Single Seat' },
    { label: 'Back Style', value: 'Wing Back' },
    { label: 'Special Feature', value: 'Adjustable Lumbar, Adjustable Height, Ergonomic, Cushion Arm Rest, Fabric' },
    { label: 'Product Care Instructions', value: 'Wipe Clean' },
    { label: 'Net Quantity', value: '1.00 count' },
    { label: 'Seat Material Type', value: 'Seat Material Type' }
  ];

  const otherDetails = [
    { label: 'Item Weight', value: '18 Kilograms' },
    { label: 'Maximum Weight Recommendation', value: '136 Kilograms' },
    { label: 'Frame Material', value: 'Metal' },
    { label: 'Style', value: 'Casual' }
  ];

  const faqItems = [
    { 
      question: 'Can I return before 2 months?',
      answer: 'Yes, you can return the product within 2 months if you are not satisfied with it.'
    },
    {
      question: 'How do I extend after 6 months?',
      answer: 'You can extend your rental period by contacting our customer support team.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative">
            <span className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
              NEW ARRIVALS
            </span>
            <img 
              src={productImages[selectedImage]}
              alt="DROGO Gaming Chair"
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="grid grid-cols-6 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                className={`border-2 rounded-lg overflow-hidden ${
                  selectedImage === index ? 'border-red-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div className="space-y-2">
            <nav className="text-sm text-gray-500">
              Home/ Furniture/ DROGO Throne Ergonomic Gaming Chair
            </nav>
            <h1 className="text-2xl font-bold">
              DROGO Throne Ergonomic Gaming Chair with Foot Rest, Armrest & Adjustable Seat (Blue)
            </h1>
            
            {/* Ratings */}
            <div className="flex items-center space-x-2">
              <img 
                src="/api/placeholder/24/24"
                alt="Seller"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-xs">Mohil Prajapati</span>
              <div className="flex items-center">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 text-xs">4.6</span>
                <span className="text-gray-500 text-xs ml-1">(41 reviews)</span>
              </div>
            </div>
          </div>

          {/* Duration Selection */}
          <div>
            <h3 className="font-medium mb-3 text-sm">SELECT DURATION</h3>
            <div className="grid grid-cols-5 gap-3 bg-white">
              {durations.map((duration) => (
                <button
                  key={duration.label}
                  className={`p-3 rounded-lg border text-center ${
                    selectedDuration === duration.label
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200'
                  }`}
                  onClick={() => setSelectedDuration(duration.label)}
                >
                  <div className="text-xs">{duration.label}</div>
                  <div className="font-bold">{duration.price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-red-500 rounded-full bg-red-50">
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
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-blue-600 bg-gray-100 rounded-md p-1 text-xs">
              <img src={AvailIcon} alt="Available" className="mr-2 w-4 h-4" />
              Available Stock: 1
            </div>
            <div className="text-orange-500 bg-blue-100 rounded-md p-1 text-xs">
              <img src={AvailtyIcon} alt="Availability" className="mr-2 w-4 h-4 inline" />
              Availability: 26 Sep '24 - 31 Jun '25
            </div>
          </div>

          {/* Delivery Info */}
          <div className="flex items-center justify-between bg-white p-3 border border-slate-200 rounded-lg">
            <div className="flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              <span className="text-xs">27 Sep - 29 Sep to 500008</span>
            </div>
            <div className="flex items-center text-blue-600 text-xs">
              <span className="mr-2">✓</span>
              As good as new
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-medium mb-3 text-sm">SERVICES</h3>
            <div className="grid grid-cols-4 gap-4">
              {services.map((service, index) => (
                <div key={index} className="text-center border rounded-md py-4">
                  <div className="flex justify-center text-blue-600 mb-2">
                    {service.icon}
                  </div>
                  <div className="text-xs">{service.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid md:grid-cols-2 gap-8 py-6">
        {/* Left Side - Product Details and Other Details */}
        <div className="space-y-6">
          {/* Product Details */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Product Details</h2>
            <table className="w-full text-sm border rounded-lg bg-white ">
              <tbody>
                {productDetails.map((detail, index) => (
                  <tr key={index} className="">
                    <td className="p-2 font-semibold">{detail.label}</td>
                    <td className="p-2 text-gray-600">{detail.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Other Details */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Other Details</h2>
            <table className="w-full border bg-white rounded-lg border-slate-200 text-sm">
              <tbody>
                {otherDetails.map((detail, index) => (
                  <tr key={index} className="">
                    <td className="p-2 font-semibold">{detail.label}</td>
                    <td className="p-2 text-gray-600">{detail.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side - FAQ Section */}
        <div>
          <h2 className="text-lg font-semibold mb-3">FAQ ABOUT THIS PRODUCT</h2>
          <div className='border bg-white rounded-lg border-slate-200'>
          {faqItems.map((faq, index) => (
            
            <div key={index} className="border-b">
              <button
                className="flex items-center justify-between w-full p-2"
                onClick={() =>
                  setExpandedFaq(expandedFaq === index ? null : index)
                }
              >
                <span className="text-sm font-medium">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-200 ${
                    expandedFaq === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {expandedFaq === index && (
                <div className="text-sm text-gray-600 px-3 py-2">
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
