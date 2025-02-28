'use client';
import React, { useState, useEffect } from "react";
import Switch from "react-switch";
// import "@/styles/Orders.css";
import '../../../styles/Orders.css';
import axios from "axios";
import { FaTruck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { MdPayments } from "react-icons/md";
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




// const OrderItem = () => {
//   return (
//     <div className="order-item">
//       <div className="order-header">
//         <span>ID: #{`1234567890`}</span>
//         <span>Date: {`27/08/2024`}</span>
//       </div>
//       <div class="order-product">
//         <img
//           src={orderHistoryImage}
//           alt="Dell 27 inch Monitor"
//           class="product-image"
//         />
//         <div class="product-info">
//           <h4>
//             Dell 27 inch P2725H Monitor | Anti-Glare With 3H Hardness | 100Hz |
//             5ms gray-to-gray (Fast mode)
//           </h4>
//           <p>
//             <span>₹1,500</span> /month | Rented for: <span>3 months</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

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


  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/userOrders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data, "fetch order history")
      setOrders(response.data);
      const filteredOrders = response.data
      .map(order => {
        const canceledSubOrders = order.subOrders?.filter(subOrder => {
          console.log(subOrder.orderStatus, "Checking orderStatus"); // Debugging
          return subOrder.orderStatus.toLowerCase().trim() === "canceled"; 
        }) || [];

        return {
          ...order,
          subOrders: canceledSubOrders, // Keep only canceled suborders
        };
      })
      .filter(order => order.subOrders.length > 0); // Remove orders with no canceled suborders

    console.log(filteredOrders, "Filtered Canceled Order History");
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
  <Switch checked={isOn} onChange={setIsOn}  onColor="#22c55e" 
    offColor="#ccc"  />
  Cancelled Orders
</label>


      </div>

      <div className="order_item-frame">

      </div>

{isOn ?      
      
      orders.map((order,index) => (
        <div class="order-item" key={order._id}>
          <div className="order-header">
            <span>ID: #{`1234567890`}</span>
            <span>
              Date: {new Date(order.createdAt).toLocaleDateString('en-GB')}
            </span>

          </div>
          <div className="order-item-container">
          {Array.isArray(order.subOrders) && order.subOrders.map((item) => (

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
            <a class="track-order cursor-pointer" onClick={() => { router.push(`/profile/orders/${order._id}`) }}>
              Track & View Order
            </a>
            {/* <a href="#" class="cancel-order">
              Cancel Order
            </a> */}
            <a href="#" class="download-invoice">
              Download Invoice
            </a>
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
      )):

orderItems.map((orderItem,index) => (
        <div class="order-item" key={orderItem._id}>
          <div className="order-header">
            <span>ID: #{`1234567890`}</span>
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
            <a href="#" class="download-invoice">
              Download Invoice
            </a>
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
      ))}


    </div>
  );
};


