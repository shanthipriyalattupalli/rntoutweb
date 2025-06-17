"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { HiLocationMarker } from "react-icons/hi";
// import "@/styles/OrderTrackingWithNavigate.css";
import '../styles/OrderTrackingWithNavigate.css';
import OrderItem from "@/Components/OrderItem";
import { PiClockClockwiseBold } from "react-icons/pi";
import { AiFillShop } from "react-icons/ai";
import OrderTracking from "./OrderTracking";
const payment_icon = "/Assets/payment_icon.png";
const HistoryImage = "/Assets/HistoryImage.png";
const shipping = "/Assets/shipping.svg";
import { IoMdArrowRoundBack } from "react-icons/io";

const checkIcon = "/Assets/check_circle_fill.svg"
const packed = "/Assets/packed.svg"
const truck_line = "/Assets/truck_line.svg"
const delivered = "/Assets/delivered.svg"
const packedblue = "/Assets/packedblue.svg"
const truck_fillblue = "/Assets/truck_fillblue.svg"
const deliveredblue = "/Assets/deliveredblue.svg"
const Cancledicon = "/Assets/check_circle_fill.svg"




const OrderTrackingWithNavigate = ({ orderId }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
  const [orders, setOrders] = useState([]);
  const [subOrders, setSubOrders] = useState([]);
  const [selectedSubOrder, setSelectedSubOrder] = useState(null);
  const handleStepClick = (path) => {
    navigate(path); // Navigate to the corresponding path
  };

  const calculateTotalPrice = (orders) => {
    return orders.reduce((total, item) => total + item.price, 0);
  };
  // const totalPrice = calculateTotalPrice(orderData);

  const [rentData, setRentData] = useState({
    totalRent: 3818.0, // ₹/mo
    discounts: 916.32, // ₹/mo
    otherCharges: 419.98, // ₹/mo
    gstRate: 18, // GST percentage
  });

  // Calculate costs dynamically
  const calculateTotalCosts = () => {
    const { totalRent, discounts, otherCharges } = rentData;
    return totalRent - discounts + otherCharges;
  };

  const calculateGST = () => {
    const totalCosts = calculateTotalCosts();
    return (totalCosts * rentData.gstRate) / 100;
  };

  const calculateGrandTotal = () => {
    return calculateTotalCosts() + calculateGST();
  };




  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data)
      setSubOrders(response.data.subOrders)


    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrderHistory();
    }

  }, [token]);

  const formattedDate = new Date(orders.createdAt).toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });



  const steps = [
    { label: "Order Placed", date: "6th Nov 2024", icon: checkIcon, blueIcon: checkIcon },
    { label: "Order Confirmed", date: "6th Nov 2024", icon: packed, blueIcon: packedblue },
    { label: "Shipped", date: "7th Nov 2024", icon: truck_line, blueIcon: truck_fillblue },
    { label: "Delivered", date: "7th Nov 2024", icon: delivered, blueIcon: deliveredblue },
    { label: "Cancelled", date: "7th Nov 2024", icon: checkIcon, blueIcon: packedblue },
  ];


  const returnSteps = [
    { label: "return Placed", date: "6th Nov 2024", icon: checkIcon, blueIcon: checkIcon },
    { label: "return Confirmed", date: "6th Nov 2024", icon: packed, blueIcon: packedblue },
    { label: "Shipped", date: "7th Nov 2024", icon: truck_line, blueIcon: truck_fillblue },
    { label: "Returned", date: "7th Nov 2024", icon: delivered, blueIcon: deliveredblue },

  ];



  const trackingSteps = ["Order Confirmed", "Order Packed", "Out for Delivery"];

  const getCurrentStep = (orderStatus) => {
    if (orderStatus === "cancelled") {
      return 4;
    }

    switch (orderStatus) {
      case "placed":
        return 0;
      case "confirmed":
        return 1;
      case "shipped":
        return 2;
      case "delivered":
        return 3;
      default:
        return 0;
    }



  };


  const getReturnedCurrentStep = (orderStatus) => {
    if (orderStatus === "returned") {
      return 3;
    }

    switch (orderStatus) {
      case "return-approved":
        return 0;
      case "pickup-scheduled":
        return 1;
      case "return-in-transit":
        return 2;
      case "returned":
        return 3;
      default:
        return 0;
    }



  };



  const router = useRouter();

  const handleShowTracking = (subOrder) => {
    setSelectedSubOrder(subOrder);
  };
  return (
    <>
      <h2 className='item-header' onClick={() => router.back()}>
        <div className='back-product'><IoMdArrowRoundBack style={{ marginRight: "12px" }} /> Order detail
        </div>
        {/* <a href="#" className="download-invoice" onClick={null}>
          Download Invoice
        </a> */}
      </h2>

      <div className='order-tracking-container'>
        <div className='order_item-frame'>

          <OrderItem key={orders._id} orderData={orders} onShowTracking={handleShowTracking} selectedSubOrder={selectedSubOrder} steps={steps} getCurrentStep={getCurrentStep} getReturnedCurrentStep={getReturnedCurrentStep} returnSteps={returnSteps} />

        </div>

        <div className='order_trackinf_section'>

          <div class='payment-section'>
            <div class='payment-info'>
              <span className='icon'>
                {/* <MdDone /> */}
                <img src={payment_icon} alt='Icon' />
              </span>
              <div class='payment-details'>
                <div className='payment-details_completed'>
                  <h4>Payment {orders.paymentStatus}</h4>
                  {/* <p>{formattedDate}</p> */}
                </div>
              </div>
            </div>
            <div class='payment-date'>{formattedDate}</div>
          </div>
          <div className='shipping_address_sec'>
            <span class='icon'>
              <img src={shipping} alt='Icon' className="w-[59px] sm:w-[59px] md:w-auto" />
            </span>

            <div class='payment-details'>
              <div className='payment-details_completed'>
                <h4 className="font-semibold text-lg">Shipping Address</h4>
                {/* {subOrders.map((suborder)=>( */}
                <div className="flex items-center gap-2">
                  <span>{subOrders?.[0]?.deliveryDetails?.deliveryAddress?.name}</span>
                  <span className="text-gray-500">•</span>
                  <span>{subOrders?.[0]?.deliveryDetails?.deliveryAddress?.mobile}</span>
                </div>

                <span>{subOrders?.[0]?.deliveryDetails?.deliveryAddress?.full}</span>
                {/* ))} */}
              </div>
            </div>
          </div>
          <div className="p-4 bg-white ">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Rent Cost Breakup</h3>

            <div className="flex flex-col text-sm">
              <div className="flex justify-between items-center mb-2">
                <div className="text-gray-600">Total Rent</div>
                <div className="text-gray-800 font-medium">
                  ₹ {subOrders.reduce((total, suborder) => total + suborder.price, 0)}/-
                </div>

              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-gray-600">Gst({orders?.gstDetails?.gstPercentage}%)</div>
                <div className="text-gray-800 font-medium">+  ₹{orders?.taxDetails?.totalTax}/-</div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div className="text-gray-600">Delivery charges</div>
                <div className="text-gray-800 font-medium">+ ₹{orders?.deliveryCharge}/-</div>
              </div>
              <div className="flex justify-between items-center mb-2">
              <div className="text-gray-600">Discount</div>
              <div className="text-gray-800 font-medium">-  ₹{orders?.couponDiscount}/-</div> 
              </div>
            </div>

            <div className="flex justify-between  pt-3  font-semibold text-base">
              <div className="text-gray-900">Rent Grand Total</div>
              <div className="text-blue-600">
                {/* ₹ {calculateGrandTotal().toFixed(2)} */}
                ₹ {orders.totalAmount}/-
              </div>
            </div>
          </div>


          {/* <div class='payment-info order_closer'>
            <span class='icon'>
             
              <PiClockClockwiseBold />
            </span>
            <div class='payment-details'>
              <h4>Order Closure</h4>
              <p>{95} Days Remaining</p>
            </div>
          </div> */}
        </div>
      </div>
    </>

  );
};

export default OrderTrackingWithNavigate;
