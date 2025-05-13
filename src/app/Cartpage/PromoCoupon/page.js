"use client";

import React, { useEffect, useState } from "react";
import "../../../styles/coupons.css";
import axios from "axios";
// import "@/styles/AddressSidebar.css";
// import '../../../styles/AddressSidebar.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const edit = "/Assets/editicon.svg";

const PromoCoupon = ({ isOpen, onClose, totalPrice, onDiscountedPrice }) => {
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [selected, setSelected] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [editingAddressId, setEditingAddressId] = useState(null);

  const token =
    Cookies.get("userToken");

  useEffect(() => {
    const fetchCoupons = async () => {

      try {
        const response = await axios.get(`${BASE_URL}/coupons`, {
          headers: { Authorization: `Bearer ${token}` },
        });
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


  const handleApply = async (
    couponId,
    couponcode,
    maxDiscountAmount,
    minRentAmount,
    discountValue
  ) => {
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

      console.log(response, "respone of coupon validate")
      if (response.data.success === true) {
        try {
          const response = await axios.post(
            `${BASE_URL}/coupons/apply`,
            { code: couponcode, rentAmount: totalPrice },
            { headers: { Authorization: `Bearer ${token}` } }
          );

          console.log(response, "response of applied coupon")
          onDiscountedPrice(response.data.data.finalAmount, couponcode, response.data.data.coupon.discountValue, response.data.data.discountAmount);

          Swal.fire({
            icon: "success",
            title: "Coupon Applied Successfully!",
            text: response.data.message || "Coupon has been applied to your order.",
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            didClose: () => {
              onClose();
            }
          });

        } catch (error) {
          console.log(error, "error while applying coupon");
          if (error.response && error.response.status === 401) {
            Swal.fire({
              icon: "error",
              title: "Login Required",
              text: "Please login to proceed with payment.",
            });
          }
        }
      }
    } catch (error) {
      console.error(
        "Error validating coupon:",
        error.response?.data?.message || error.message
      );
      toast.error(
        error.response?.data?.message ||
        "Coupon validation failed. Please try again."
      );
    }
  };

  const [selectedCouponId, setSelectedCouponId] = useState(null);

  const toggleTermsAndConditions = (couponId) => {
    // If clicking the same coupon, close it; otherwise, show the new one.
    setSelectedCouponId(selectedCouponId === couponId ? null : couponId);
  };

  return (
    <div>
      <ToastContainer />
      <div className="sidebar-overlay" onClick={onClose}>
        <div className="sidebar" onClick={(e) => e.stopPropagation()}>
          <div className="sidebar-header">
            <h2 className="text-[18px] font-semibold">Promo Coupon</h2>
            <button onClick={onClose} className="close-button">
              &times;
            </button>
          </div>

          {coupons.map((coupon, index) => {
            const remainingUsage = coupon.usageLimit - coupon.usedCount;
            const isUnavailable = remainingUsage === 0;
            const buttonText = isUnavailable
              ? "Inactive"
              : coupon.isActive
                ? "Apply"
                : "Inactive";
            const isTermsVisible = selectedCouponId === coupon._id; // Check if this coupon is selected

            return (
              <div
                className={`container coupons-card ${index === 0 ? "no-border" : ""
                  }`}
                key={coupon._id}
              >
                <div className="delivery-content">
                  <div className="coupons-context">
                    <span className="bg-gray-200 size-fit justify-center p-1 rounded-lg">
                      {coupon.code}
                    </span>
                    <p className="font-medium">
                      Get up to ₹{coupon.maxDiscountAmount} off
                      {/* with{" "}
                      {coupon.discountValue}% discount. */}
                    </p>
                    <p className="font-normal text-xs">
                      Valid on orders over ₹{coupon.minRentAmount}
                      {/* Usable{" "}
                      {remainingUsage} more{" "} */}

                    </p>

                    {/* Toggle Terms & Conditions */}
                    <button
                      className="text-blue-500 text-xs"
                      style={{ textAlign: "left" }}
                      onClick={() => toggleTermsAndConditions(coupon._id)}
                    >
                      {isTermsVisible
                        ? "- Hide Terms & Conditions"
                        : "+ View Terms & Conditions"}
                    </button>

                    {/* Show Terms & Conditions if selected */}
                    {isTermsVisible && (
                      <ul className="font-normal text-xs mt-2">
                        <li>Minimum order value: ₹{coupon.minRentAmount}</li>
                        <li>Valid until: {coupon.endDate}</li>
                        <li>Cashback credited to CRED Balance</li>
                        <li>Rewards powered by CRED</li>
                      </ul>
                    )}

                    <button
                      className={`px-4 py-1 border rounded-lg ${(isUnavailable || coupon.isActive === false)
                        ? "border-gray-400 text-gray-400"
                        : "border-red-500 text-red-500"
                        } whitespace-nowrap`}
                      disabled={isUnavailable}
                      onClick={() =>
                        handleApply(
                          coupon._id,
                          coupon.code,
                          coupon.maxDiscountAmount,
                          coupon.minRentAmount,
                          coupon.discountValue
                        )
                      }
                    >
                      {buttonText}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Modal for Terms & Conditions */}
        </div>
      </div>
    </div>
  );
};

export default PromoCoupon;
