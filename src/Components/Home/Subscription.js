
import React from 'react'
import {  FaRegCheckCircle } from "react-icons/fa";
const subscription='/Assets/subscription2.svg'

const Benefits=[
    "🚚 Get all your rented items delivered free",
    " ⚡ Faster Delivery ",
    "🎧 24/7 VIP Customer Support "
]


const Subscription = () => {
  return (
    <div className="flex flex-col gap-2 p-8">
      {/* Header Icon */}
      <div className="flex justify-center items-center mb-4">
        <div className="bg-orange-100 p-3 rounded-full">
          <img src={subscription} alt='subscription' className=''/>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl text-center font-bold">RntOut Subscription</h2>

      {/* Benefits List */}
      <div className="mt-4">
        <p className="text-gray-600 font-semibold">BENEFITS:</p>
        <ul className="mt-2 space-y-2">
          {Benefits
            .map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
          <FaRegCheckCircle className="text-green-700"/>                
                {benefit}
              </li>
            ))}
        </ul>
      </div>

      {/* Price Section */}
      <div className="text-center ">
        <span className="text-red-500 font-bold text-xl">₹500 </span>
        <span className="text-gray-500 font-sm text-md"> /month</span>

      </div>

      {/* Buy Now Button */}
      <button
        className="w-full mt-4  text-white text-lg font-semibold py-2 rounded-lg transition"
        style={{ backgroundColor: "rgba(255, 45, 85, 1)" }}
      >
        Buy Now
      </button>
    </div>
  )
}

export default Subscription