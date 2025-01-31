"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
// import "@/styles/OrderTrackingWithNavigate.css";
import '../styles/OrderTrackingWithNavigate.css';
import OrderItem from "@/Components/OrderItem";
import { PiClockClockwiseBold } from "react-icons/pi";
import { AiFillShop } from "react-icons/ai";
const payment_icon = "/Assets/payment_icon.png";
const HistoryImage = "/Assets/HistoryImage.png";

const trackingSteps = [
  {
    label: "Order Confirmed",
    date: "6th Nov 2024",
    isActive: true,
    path: "/order-confirmed",
  },
  {
    label: "Order Packed",
    date: "6th Nov 2024",
    isActive: true,
    path: "/order-packed",
  },
  {
    label: "Out for Delivery",
    date: "7th Nov 2024",
    isActive: false,
    path: "/out-for-delivery",
  },
  {
    label: "Delivered",
    date: "7th Nov 2024",
    isActive: false,
    path: "/delivered",
  },
];



const OrderTrackingWithNavigate = ({orderId}) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
  const [orders, setOrders] = useState([]);

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
      console.log(response.data, "fetch order history")
      setOrders(response.data)



    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrderHistory();
    }

  }, [token]);

  const router = useRouter();
  return (
    <div className='order-tracking-container'>
      <div className='order_item-frame'>
      
          <OrderItem key={orders._id} orderData={orders}/>
   
      </div>

      <div className='order_trackinf_section'>
        <h3>Order Tracking</h3>
        <div className='tracking-steps'>
          {trackingSteps?.map((step, index) => (
            <div
              key={index}
              className='tracking-step'
              onClick={() => handleStepClick(step.path)}
              style={{ cursor: step.isActive ? "pointer" : "default" }} // Only allow navigation for active steps
            >
              <div className='tracking_steps_main'>
                {/* Step Information */}
                <div className='step-info'>
                  <p className={`step-label ${step.isActive ? "active" : ""}`}>
                    {step.label}
                  </p>
                  {/* Step Indicator */}
                  <div
                    className={`step-indicator ${
                      step.isActive ? "active" : ""
                    }`}
                  >
                    {step.isActive ? (
                      <span className='step-circle filled'></span>
                    ) : (
                      <span className='step-circle'></span>
                    )}
                  </div>
                  <p className={`step-date ${step.isActive ? "active" : ""}`}>
                    {step.date}
                  </p>
                </div>
              </div>
              {/* Step Divider */}
              {index < trackingSteps.length - 1 && (
                <div
                  className={`step-divider ${
                    trackingSteps[index + 1].isActive ? "active" : ""
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
        {/* payment status */}
        <div class='payment-section'>
          <div class='payment-info'>
            <span class='icon'>
              {/* <MdDone /> */}
              <img src={payment_icon} alt='Icon' />
            </span>
            <div class='payment-details'>
              <div className='payment-details_completed'>
                <h4>Payment completed</h4>
                <p>25 Sep 2024, 12:10 PM</p>
              </div>
            </div>
          </div>
          <div class='payment-date'>25 Sep 2024, 12:10 PM</div>
        </div>
        <div class='rent-cost-breakup'>
          <h3 class='section-title'>Rent Cost Breakup</h3>
          <div class='grid-container'>
            <div class='label'>Total Rent</div>
            <div class='value'>₹ {rentData.totalRent}/mo</div>

            <div class='label'>Discounts</div>
            <div class='value discount'>- {rentData.discounts}/mo</div>

            <div class='label'>Other</div>
            <div class='value'>₹ {rentData.otherCharges}/mo</div>

            <div class='label'>Total Costs</div>
            <div class='value'>₹ {calculateTotalCosts()}</div>

            <div class='label'>GST</div>
            <div class='value'>
              ₹ {calculateGST().toFixed(2)} ({rentData.gstRate}%)
            </div>

            <div class='label grand-total'>Rent Grand Total</div>
            <div class='value grand-total'>
              ₹ {calculateGrandTotal().toFixed(2)}
            </div>
          </div>
        </div>
        <div class='payment-info enterprice'>
          <span class='icon'>
            {/* <MdDone /> */}
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
        </div>
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
  );
};

export default OrderTrackingWithNavigate;
