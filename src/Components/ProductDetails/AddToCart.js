"use client"

import React, {useState} from 'react'
import Cookies from 'js-cookie'
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 const AddToCart = ({product}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

    const rentalPrice=product.rentalPrice
const userId =Cookies.get("userId");

const token =Cookies.get("userToken");



    const [selectedDuration, setSelectedDuration] = useState("Daily");
    const handleselectedDuration = (period) => {
        setSelectedDuration(period)
        // setselectedcustomDuration(null)
      }


      
  const handleAddToCart = async (productId) => {

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

      toast.success(response.data.message);
      window.dispatchEvent(new CustomEvent("cartUpdated",));

    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error(
        error.response?.data?.message ||
        "Something went wrong. Please try again."
      );
    }
  };

  const handleAddCart = () => {

    if (userId) {
      handleAddToCart(product._id);
    } else {
      toast.error("You must be logged in to add items to cart.");
    }
  };
  const periodMapping = {
    quarterly: "3 Months",
    semiannual: "6 Months",
    annual: "Year",
  };


  return (
    <>
         <div>   
         <ToastContainer />  
              <h3 className='font-medium mb-3 text-sm'>Select Duration</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 bg-white">
                {rentalPrice.map((price) => (
                  <button
                    key={price._id}
                    className={`flex flex-col items-center justify-center px-3 py-2 sm:px-2 sm:py-2 rounded-lg border text-center w-full sm:w-auto 
   ${selectedDuration === price.period ? "border-[#F48003] bg-[#FFF5EB]" : "border-gray-200"}`}
                    onClick={() => handleselectedDuration(price.period)}
                  >
                    <div className="text-[10px] sm:text-xs md:text-sm">
                    {periodMapping[price.period] || price.period.charAt(0).toUpperCase() + price.period?.slice(1)}
                    </div>
                    <div className="font-bold text-sm sm:text-base md:text-lg">₹{price.price}</div>
                  </button>
                ))}
              </div>
            </div> 
            
            <div className='flex items-center space-x-4'>
              <div className='flex items-center border border-red-500 text-white font-[600] rounded-lg bg-[#FF2D55]'>
                <button className='p-2 w-64' onClick={() => handleAddCart()}>
                  Add to cart
                </button>
              </div>
            </div> 
            </>
  )
}
export default AddToCart;
