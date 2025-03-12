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

// const trackingSteps = [
//   {
//     label: "Order Confirmed",
//     date: "6th Nov 2024",
//     isActive: true,
//     path: "/order-confirmed",
//   },
//   {
//     label: "Order Packed",
//     date: "6th Nov 2024",
//     isActive: true,
//     path: "/order-packed",
//   },
//   {
//     label: "Out for Delivery",
//     date: "7th Nov 2024",
//     isActive: false,
//     path: "/out-for-delivery",
//   },
//   {
//     label: "Delivered",
//     date: "7th Nov 2024",
//     isActive: false,
//     path: "/delivered",
//   },
// ];



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
    { label: "Order Placed", date: "6th Nov 2024", icon: "✔" },
    { label: "Order Confirmed", date: "6th Nov 2024", icon: "📦" },
    { label: "Shipped", date: "7th Nov 2024", icon: "🚚" },
    { label: "Delivered", date: "7th Nov 2024", icon: "✅" },
    { label: "Canceled", date: "7th Nov 2024", icon: "❌" },
  ];

  const trackingSteps = ["Order Confirmed", "Order Packed", "Out for Delivery"];

  const getCurrentStep = (orderStatus) => {
    switch (orderStatus) {
      case "placed":
        return 0;
      case "confirmed":
        return 1;
      case "shipped":
        return 2;
      case "delivered":
        return 3;
      case "canceled":
        return 4; // Canceled step
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

          <OrderItem key={orders._id} orderData={orders} onShowTracking={handleShowTracking} selectedSubOrder={selectedSubOrder} steps={steps} getCurrentStep={getCurrentStep} />

        </div>

        <div className='order_trackinf_section'>
          {/* <div className="bg-white py-4 px-4">
          <h3 className="px-10 font-semibold text-lg">Order Tracking</h3>
          <h3 className="px-10 font-semibold text-md pt-5">{selectedSubOrder?.variantId?.title}</h3>
          <div className="w-full flex items-center justify-between  relative">
          <div>
          {selectedSubOrder ? (
  <div className="w-full flex items-center justify-between py-6 relative">
    <div className="flex items-center space-x-6">
      {steps.map((step, index) => {
        const currentStep = getCurrentStep(selectedSubOrder.orderStatus);
        const isCompleted = index <= currentStep;
        const isDelivered = selectedSubOrder.orderStatus === "delivered";
        const isCanceled = selectedSubOrder.orderStatus === "canceled";

        return (
          <div className="flex flex-col">
          <div key={index} className="flex flex-col items-center relative">
            <div
              className={`w-48 text-center ${
                isCanceled && index === currentStep
                  ? "text-red-500 font-bold"
                  : isDelivered && index === currentStep
                  ? "text-green-500 font-bold"
                  : isCompleted
                  ? "text-blue-500 font-bold"
                  : "text-gray-300"
              }`}
            >
              {step.label}
            </div>
            <div
              className={`w-14 h-14 flex items-center justify-center rounded-full border-2 z-10 ${
                isCanceled && index === currentStep
                  ? "border-red-500 bg-red-100"
                  : isDelivered && index === currentStep
                  ? "border-green-500 bg-green-100"
                  : isCompleted
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300 bg-gray-100"
              }`}
            >
              {step.icon}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`absolute top-[66%] left-[43%] transform -translate-y-1/2 w-[13rem] h-0.5 border-t-2 border-dashed ${
                  isCanceled
                    ? "border-red-500"
                    : isDelivered
                    ? "border-green-500"
                    : index < currentStep
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
              ></div>
            )}
          </div>
          </div>
        );
      })}
    </div>
  </div>
) : (
  <p className="text-gray-500 text-center">Select a suborder to view tracking</p>
)}
  </div>


</div>

        </div> */}
          {/* payment status */}
          <div class='payment-section'>
            <div class='payment-info'>
              <span class='icon'>
                {/* <MdDone /> */}
                <img src={payment_icon} alt='Icon' />
              </span>
              <div class='payment-details'>
                <div className='payment-details_completed'>
                  <h4>Payment {orders.paymentStatus}</h4>
                  <p>{formattedDate}</p>
                </div>
              </div>
            </div>
            <div class='payment-date'>{formattedDate}</div>
          </div>
          <div className='shipping_address_sec'>
            <span class='icon'>
              <img src={shipping} alt='Icon' className="w-[59px] sm:w-[59px] md:w-auto"/>
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
          <div class='rent-cost-breakup'>
            <h3 class='section-title'>Rent Cost Breakup</h3>
            <div class='grid-container'>
              <div class='label'>Total Rent</div>
              <div class='value'>₹ {orders.totalAmount}/-</div>

              <div class='label'>Discounts</div>
              {/* <div class='value discount'>- {orders.coupon.maxDiscountAmount}/mo</div> */}

              {/* <div class='label'>Other</div>
            <div class='value'>₹ {rentData.otherCharges}/mo</div> */}

              {/* <div class='label'>Total Costs</div>
            <div class='value'>₹ {calculateTotalCosts()}</div>

            <div class='label'>GST</div>
            <div class='value'>
              ₹ {calculateGST().toFixed(2)} ({rentData.gstRate}%)
            </div> */}


            </div>
            <div class='label value grand-total'>Rent Grand Total</div>
              <div class='value grand-total'>
                {/* ₹ {calculateGrandTotal().toFixed(2)} */}
                ₹ {orders.totalAmount}/-
              </div>  
          </div>

          {/* <div class='payment-info enterprice'>
          <span class='icon'>
            <AiFillShop />
          </span>
          <div class='payment-details'>
            <h4>RntOut Enterprise</h4>
            <p>
              <a
                href='#'
                onClick={() => {
                  router.push("/profile/orders/orderreview");
                }}
              >
                Click here to write seller feedback
              </a>
            </p>
          </div>
        </div> */}
          <div class='payment-info order_closer'>
            <span class='icon'>
              {/* <MdDone /> */}
              <PiClockClockwiseBold />
            </span>
            <div class='payment-details'>
              <h4>Order Closure</h4>
              <p>{95} Days Remaining</p>
            </div>
          </div>
        </div>
      </div>
    </>

  );
};

export default OrderTrackingWithNavigate;
