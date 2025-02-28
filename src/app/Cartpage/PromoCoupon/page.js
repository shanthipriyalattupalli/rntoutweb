"use client";

import React, { useEffect, useState } from "react";
import '../../../styles/coupons.css'
import axios from "axios";
// import "@/styles/AddressSidebar.css";
// import '../../../styles/AddressSidebar.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const edit = "/Assets/editicon.svg";

const PromoCoupon = ({ isOpen, onClose, totalPrice,onDiscountedPrice  }) => {
  console.log(onClose,"onclose")
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [selected, setSelected] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [editingAddressId, setEditingAddressId] = useState(null);


  const token=(typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;


useEffect(() => {
  const fetchCoupons = async () => {
    console.log(token, "token");
    try {
      const response = await axios.get(`${BASE_URL}/coupons`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.data, "fetch coupons");
      setCoupons(response.data.data);

      // setAddresses(response.data.profile.addresses);
    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch addresses.");
    }
  };

  if (token) {
    fetchCoupons();
  }
}, [token]);

// const handleApply = async(couponId,couponcode ,maxDiscountAmount, minRentAmount, discountValue) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/coupons/validate`,{
//       params:{
//         code: couponcode,
//         rentAmount: totalPrice
//       },
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     console.log(response.data,"coupone validate");
    
//   } catch (error) {
//     console.log(error,"error validation")
    
//   }
// //   if (totalPrice > minRentAmount) {

// //     const calculatedDiscount = (totalPrice * discountValue) / 100;
    

// //     const discount = Math.min(calculatedDiscount, maxDiscountAmount);
    

// //     const discountedPrice = totalPrice - discount;
// // console.log(discountedPrice,"discountedPrice")
 
// //     toast.success(`Coupon applied successfully! You saved ₹${discount.toFixed(2)}.`);
// //     onDiscountedPrice(discountedPrice,couponcode,discountValue);
// //     console.log(`Final price after discount: ₹${discountedPrice.toFixed(2)}`);
// //   } else {

// //     toast.error(`Minimum rent amount of ₹${minRentAmount} is required to apply this coupon.`);
// //   }
// };

const handleApply = async (couponId, couponcode, maxDiscountAmount, minRentAmount, discountValue) => {
  try {
    if (!token) {
      console.error("Token is missing. Please log in again.");
      toast.error("Session expired. Please log in again.");
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/coupons/validate`,
      { code: couponcode, rentAmount: totalPrice }, 
      { headers: { Authorization: `Bearer ${token}` } } 
    );

    console.log(response.data, "coupon validated");
    if(response.data.success === true) {
      try {
        const response=await axios.post(`${BASE_URL}/coupons/apply`,
          { code: couponcode, rentAmount: totalPrice },
          { headers: { Authorization: `Bearer ${token}` } }
        
        );
        console.log(response.data, "coupon applied") ;
        onDiscountedPrice(response.data.data.finalAmount,couponcode)
        toast.success(response.data.message||"Coupon applied successfully!");
        
      } catch (error) {
        console.log(error,"error while applying coupon")
        
      }
    }
  } catch (error) {
    console.error("Error validating coupon:", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "Coupon validation failed. Please try again.");
  }
};

  

  return (
    <div>
    <div className='sidebar-overlay' onClick={onClose}>
      <div className='sidebar' onClick={(e) => e.stopPropagation()}>
        <div className='sidebar-header'>
          <h2 className="text-[18px] font-semibold">Promo Coupon</h2>
          <button onClick={onClose} className='close-button'>&times;</button>
        </div>
        {coupons.map((coupon,index) => (
          <div className={`container coupons-card ${index === 0 ? 'no-border' : ''}`} key={coupon._id}>
            <div className='delivery-content'>
              <div className='coupons-context'>
                <span className="bg-gray-200 size-fit justify-center p-1 rounded-lg">{coupon.code}</span>
                <p className="font-medium">Flat ₹100 cashback using NEWYEAR UPI</p>
                <p className="font-normal text-xs">Cashback will be credited to CRED Balance. Rewards powered by CRED</p>
                <p className="text-blue-500 text-xs">+ Terms & Conditions</p>
                <button
                  className="w-20 p-1 border border-red-500 text-red-500 rounded-lg"
                  onClick={() => handleApply(coupon._id, coupon.code, coupon.maxDiscountAmount, coupon.minRentAmount, coupon.discountValue)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  );
};

export default PromoCoupon;
