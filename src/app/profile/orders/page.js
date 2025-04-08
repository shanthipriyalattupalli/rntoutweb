'use client';
import React, { useState, useEffect } from "react";
import Switch from "react-switch";

// import "@/styles/Orders.css";
import '../../../styles/Orders.css';
import axios from "axios";
import { FaTruck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { MdPayments } from "react-icons/md";
import CancelOrder from "../../../Components/Orders/CancelOrder";
const emptycart = "/Assets/emptycart.svg";


import OrderItem from "@/Components/OrderItem";

const orderHistoryImage = "/Assets/orderHistoryImage.png";

const orders = [
  {
    id: "1234567890",
    product: "Dell 27 inch P2725H Monitor",
    price: "₹1,500",
    duration: "3 months",
    totalAmount: "₹10,500",
    status: "On Progress",
    statusIcon: "🚚",
    deliveryDate: "27/08/2024",
  },
  {
    id: "1234567890",
    product: "Dell 27 inch P2725H Monitor",
    price: "₹1,500",
    duration: "3 months",
    totalAmount: "₹10,500",
    status: "Completed",
    statusIcon: "✅",
    deliveryDate: "26/08/2024",
  },
  // Add more orders here as needed
];






export default function Orders() {

  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const statusClass = "Completed" ? "completed" : "in-progress";
  const [trackingStatuses, setTrackingStatuses] = useState([]);
const [selectedSubOrder, setSelectedSubOrder] = useState(null);
const [isOn, setIsOn] = useState(false);
  const router = useRouter();
    const [isCanceled, setIsCanceled] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);
  


  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/userOrders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response,"order history")
      setOrders(response.data);
      const filteredOrders = response?.data
      .map(order => {
        const canceledSubOrders = order.subOrders?.filter(subOrder => {
          return subOrder.orderStatus.toLowerCase().trim() === "canceled"; 
        }) || [];

        return {
          ...order,
          subOrders: canceledSubOrders, // Keep only canceled suborders
        };
      })
      .filter(order => order.subOrders.length > 0); // Remove orders with no canceled suborders
    setOrderItems(filteredOrders)
    

    } catch (error) {
      console.error('Error:', error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchOrderHistory();
    }

  }, [token]);



  useEffect(() => {
    if (orders.length > 0) {
      setTrackingStatuses(getTrackingStatus());
    }
  }, [orders]);
  


 
  
  const getTrackingStatus = () => {
    return orders.map(order => {
      const statuses = order.subOrders.map(subOrder => subOrder.deliveryStatus);
    
      if (statuses.includes("pending")) return "pending";
      if (statuses.includes("accepted")) return "accepted";
      if (statuses.includes("in-transit")) return "in-transit";
      if (statuses.every(status => status === "delivered")) return "delivered";
      if (statuses.includes("canceled")) return "canceled";
      
      return "pending"; // Default case
    });
  };


  return (



    <div className="profile-settings Orders_page_section">
      <div className="item-header">
        <h2>Order History</h2>

        <label className="edit-btn flex items-center gap-2">
  <Switch 
    checked={isOn} 
    onChange={setIsOn}  
    onColor="#22c55e" 
    offColor="#ccc"
    uncheckedIcon={false} 
    checkedIcon={false} 
    // height={window.innerWidth < 640 ? 24 : 20}
  />
  Cancelled Orders
</label>


      </div>

      <div className="order_item-frame">

      </div>

{isOn ?
orderItems.length > 0 ? orderItems.map((orderItem,index) => (
        <div class="order-item" key={orderItem._id}>
          <div className="order-header">
            <span>ID: {orderItem._id}</span>
            <span>
              Date: {new Date(orderItem.createdAt).toLocaleDateString('en-GB')}
            </span>

          </div>
          <div className="order-item-container">
          {Array.isArray(orderItem.subOrders) && orderItem.subOrders.map((item) => (

              <div class="order-product" key={item._id} onClick={()=>  router.push(`/Products/${item.variantId._id}?id=${item.variantId._id}`)}>
                <div>
                <img
                  src={item.variantId.images?.[0]}
                  alt="Dell 27 inch Monitor"
                  class="product-image"
                />
</div>
                <div class="product-info">
                  <h4>
                 {item.variantId.title}
                  </h4>
                  <p>
                    <span>{item.price}</span> /{item.rentalPeriod} | Rented for: <span>3 months</span>
                  </p>
                </div>

              </div>

            ))}
          </div>

          <div class="order-actions">
            <a class="track-order cursor-pointer" onClick={() => { router.push(`/profile/orders/${orderItem._id}`) }}>
              Track & View Order
            </a>
            {/* <a href="#" class="cancel-order">
              Cancel Order
            </a> */}
            {trackingStatuses[index]==="delivered" &&
                 <a href="#" class="download-invoice">
                 Download Invoice seeing {trackingStatuses[index]}
                </a>
              }

          </div>
          <div class="order-actions-price-status">
            <p class="download-invoice">
              Total Amount: <span>₹ {orderItem.totalAmount}</span>
            </p>
            {Array.isArray(orderItem.subOrders) && orderItem.subOrders.length > 0 && (
      <div className="suborders-status">
        <p className={`download-invoice progress d-flex gap-5 ${trackingStatuses[index]}`}>
          <span>
            <FaTruck />
          </span>{" "}
          {trackingStatuses[index]}
        </p>
      </div>
    )}


      {orderItem.paymentStatus === "pending" ?<p className={`download-invoice progress ${orderItem.paymentStatus}`}>
              <span>
         <MdPayments/>
              </span>{" "}
              {orderItem.paymentStatus}
            </p>
            :
            <p class={`download-invoice progress ${orderItem.paymentStatus}`}>
                        <span>
         <MdPayments/>
              </span>{" "}
              {orderItem.paymentStatus}
            </p>}
          </div>
        </div>
      )):     
             <div className="flex flex-col justify-center items-center h-screen">
      <img src={emptycart} className="w-1/3 h-1/3" />
      <h1 className="text-lg font-semibold">Empty Orders</h1>
      <span className="px-6 py-4 text-center">
        You haven’t placed any item in your cart. To add items, click 
        <a href="/" className="text-md font-semibold text-blue-600">  Browse Products</a>.
      </span>
    </div>:     
      
      orders.length > 0 ?     orders.map((order,index) => (
        <div class="order-item" key={order._id}>
          <div className="order-header">
            <span>ID: {order._id}</span>
            <span>
              Date: {new Date(order.createdAt).toLocaleDateString('en-GB')}
            </span>

          </div>
          <div className="order-item-container">
          {Array.isArray(order.subOrders) && order.subOrders.map((item) => (

              <div class="order-product" key={item._id} onClick={()=>  router.push(`/Products/${item.variantId._id}?id=${item.variantId._id}`)}>
                <div>
                <img
                  src={item.variantId?.images?.[0]}
                  alt="Dell 27 inch Monitor"
                  className="product-image"
                />
</div>
                <div class="product-info">
                  <h4>
                 {item.variantId?.title}
                  </h4>
                  <p>
                    <span>{item.price}</span> /{item.rentalPeriod} 
                  </p>
                </div>

              </div>

            ))}
          </div>

          <div class="order-actions">
            <a class="track-order cursor-pointer" onClick={() => { router.push(`/profile/orders/${order._id}`) }}>
              Track & View Order
            </a>
            {/* <a href="#" class="cancel-order">
              Cancel Order
            </a> */}
            {trackingStatuses[index]==="delivered" &&
                 <a href="#" class="download-invoice">
                 Download Invoice
                </a>
              }
            {(order.orderStatus === "placed") && (
                  <a
  className="inline-flex w-full sm:w-auto items-center gap-1.5 justify-start no-underline text-red-500 font-medium cursor-pointer text-left"
  onClick={() => {
    console.log("Clicked order ID:", order._id); 
    setSelectedOrderId(order._id); 
    setIsCanceled(true);
  }}
>
  Cancel Order
</a>

                )}
                {isCanceled && (
                  <div className="modal-overlays" onClick={() => setIsCanceled(false)}>
                    <div className="modal-contents" onClick={(e)=>e.stopPropagation()}>

                      <CancelOrder setIsCanceled={setIsCanceled} OrderId={selectedOrderId} order={order} />
                    </div>
                  </div>
                )}

          </div>
          <div class="order-actions-price-status">
            <p class="download-invoice">
              Total Amount: <span>₹ {order.totalAmount}</span>
            </p>
            {Array.isArray(order.subOrders) && order.subOrders.length > 0 && (
      <div className="suborders-status">
        <p className={`download-invoice progress d-flex gap-5 ${trackingStatuses[index]}`}>
          <span>
            <FaTruck />
          </span>{" "}
          {trackingStatuses[index]}
        </p>
      </div>
    )}


      {order.paymentStatus === "pending" ?<p className={`download-invoice progress ${order.paymentStatus}`}>
              <span>
         <MdPayments/>
              </span>{" "}
              {order.paymentStatus}
            </p>
            :
            <p class={`download-invoice progress ${order.paymentStatus}`}>
                        <span>
         <MdPayments/>
              </span>{" "}
              {order.paymentStatus}
            </p>}
          </div>
        </div>
      )) : <div className="flex flex-col justify-center items-center h-screen">
  <img src={emptycart} className="w-1/3 h-1/3" />
  <h1 className="text-lg font-semibold">Empty Orders</h1>
  <span className="px-6 py-4 text-center">
    You haven’t placed any item in your cart. To add items, click 
    <a href="/" className="text-md font-semibold text-blue-600">  Browse Products</a>.
  </span>
</div>


}


    </div>
  );
};


