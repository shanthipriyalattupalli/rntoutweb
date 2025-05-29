'use client';
import React, { useState, useEffect } from "react";
import Switch from "react-switch";
import { Nav, NavItem, NavLink } from "reactstrap"

// import "@/styles/Orders.css";
import '../../../styles/Orders.css';
import axios from "axios";
import { FaTruck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { MdPayments } from "react-icons/md";
import CancelOrder from "../../../Components/Orders/CancelOrder";
const emptycart = "/Assets/emptycart.svg";
import OrderItem from "@/Components/OrderItem";
import Cookies from "js-cookie";
import { stringify } from "postcss";

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
  const token = Cookies.get("userToken");
  const [orders, setOrders] = useState([]);
  const [orderItems, setOrderItems] = useState([]);

  const statusClass = "Completed" ? "completed" : "in-progress";
  const [trackingStatuses, setTrackingStatuses] = useState([]);
  const [isOn, setIsOn] = useState(false);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('placed');


  console.log(activeTab, "activetab")

  const fetchOrderHistory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/orders/userOrders`, {
        params: {
          orderStatus: String(activeTab)
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data);
      const filteredOrders = response?.data
        .map(order => {
          const canceledSubOrders = order.subOrders?.filter(subOrder => {
            return subOrder.orderStatus.toLowerCase().trim() === "cancelled";
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

  }, [token, activeTab]);



  useEffect(() => {
    if (orders.length > 0) {
      setTrackingStatuses(getTrackingStatus());
    }
  }, [orders]);


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };



  const getTrackingStatus = () => {
    return orders.map(order => {
      const statuses = order.subOrders.map(subOrder => subOrder.deliveryStatus);

      if (statuses.includes("pending")) return "pending";
      if (statuses.includes("accepted")) return "accepted";
      if (statuses.includes("in-transit")) return "in-transit";
      if (statuses.every(status => status === "delivered")) return "delivered";
      if (statuses.includes("cancelled")) return "cancelled";

      return "pending"; // Default case
    });
  };

  console.log(orderItems, "orderitems")

  return (



    <div className="profile-settings Orders_page_section">
      <div className="item-header">
        <h2>Order History</h2>

        {/* <label className="edit-btn flex items-center gap-2">
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
        </label> */}

        <Nav tabs className='flex gap-3  rounded-xl font-xs text-[12px] bg-[#0707070D] py-2 px-2'>
          <NavItem>
            <NavLink className={activeTab === 'placed' ? 'active' : ''} onClick={() => handleTabClick('placed')}>
              Placed
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={activeTab === 'confirmed' ? 'active' : ''} onClick={() => handleTabClick('confirmed')}>
              Confirmed
            </NavLink>
          </NavItem>
          {/* <NavItem>
                                <NavLink className={activeTab === 'processing' ? 'active' : ''} onClick={() => handleTabClick('processing')}>
                                    Processing
                                </NavLink>
                            </NavItem> */}
          <NavItem>
            <NavLink className={activeTab === 'shipped' ? 'active' : ''} onClick={() => handleTabClick('shipped')}>
              Shipped
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={activeTab === 'delivered' ? 'active' : ''} onClick={() => handleTabClick('delivered')}>
              Delivered
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={activeTab === 'cancelled' ? 'active' : ''} onClick={() => handleTabClick('cancelled')}>
              Cancelled
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink className={activeTab === 'returned' ? 'active' : ''} onClick={() => handleTabClick('returned')}>
              Returned
            </NavLink>
          </NavItem>
        </Nav>



      </div>

      <div className="order_item-frame">

      </div>

      {isOn ?
        orderItems.length > 0 ? orderItems.map((orderItem, index) => (
          <div class="order-item" key={orderItem._id}>
            <div className="order-header">
              <span>ID: {orderItem._id}</span>
              <span>
                Date: {new Date(orderItem.createdAt).toLocaleDateString('en-GB')}
              </span>

            </div>
            <div className="order-item-container">
              {Array.isArray(orderItem.subOrders) && orderItem.subOrders.map((item) => (

                <div class="order-product" key={item._id} onClick={() => router.push(`/Products/${item.variantId._id}?id=${item.variantId._id}`)}>
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
              {/* {trackingStatuses[index]==="delivered" &&
                 <a href="#" class="download-invoice">
                 Download Invoice seeing {trackingStatuses[index]}
                </a>
              } */}

            </div>
            <div class="order-actions-price-status">
              <p class="download-invoice">
                Total Amount: <span>₹ {orderItem.totalAmount}</span>
              </p>
              {/* {Array.isArray(orderItem.subOrders) && orderItem.subOrders.length > 0 && (
                <div className="suborders-status">
                  <p className={`flex gap-2 download-invoice progress d-flex gap-5 ${trackingStatuses[index]}`}>
                    <span>
                      <FaTruck />
                    </span>{" "}
                    <p className="text-[14px] font-[600]">Delivery status :</p>
                    {trackingStatuses[index]}
                  </p>
                </div>
              )} */}


              {orderItem.paymentStatus === "pending" ? <p className={`flex gap-2 download-invoice progress ${orderItem.paymentStatus}`}>
                <span>
                  <MdPayments />
                </span>{" "}
                <p className="text-[14px] font-[600]">  Payment status :</p>
                {orderItem.paymentStatus}
              </p>
                :
                <p class={`flex gap-2 download-invoice progress ${orderItem.paymentStatus}`}>
                  <span>
                    <MdPayments />
                  </span>{" "}
                  <p className="text-[14px] font-[600]">  Payment status :</p>
                  {orderItem.paymentStatus}
                </p>}
            </div>
          </div>
        )) :
          <div className="flex flex-col justify-center items-center h-screen">
            <img src={emptycart} className="w-1/3 h-1/3" />
            <h1 className="text-lg font-semibold">Empty Orders</h1>
            <span className="px-6 py-4 text-center">
              You haven’t placed any orders . To place orders, click
              <a href="/" className="text-md font-semibold text-blue-600">  Browse Products</a>.
            </span>
          </div> :

        orders.length > 0 ? orders.map((order, index) => (
          <div class="order-item" key={order._id}>
            <div className="order-header">
              <span>ID: {order._id}</span>
              <span>
                Date: {new Date(order.createdAt).toLocaleDateString('en-GB')}
              </span>

            </div>
            <div className="order-item-container">
              {Array.isArray(order.subOrders) && order.subOrders.map((item) => (

                <div className="order-product" key={item._id} onClick={() => router.push(`/Products/${item.variantId._id}?id=${item.variantId._id}`)}>
                  <div>
                    <img
                      src={item.variantId?.images?.[0]}
                      alt="Dell 27 inch Monitor"
                      className="product-image"
                    />
                  </div>
                  <div className="product-info">
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

            <div className="order-actions">
              <a className="track-order cursor-pointer" onClick={() => { router.push(`/profile/orders/${order._id}`) }}>
                Track & View Order
              </a>
              {/* <a href="#" class="cancel-order">
              Cancel Order
            </a> */}
              {/* {trackingStatuses[index]==="delivered" &&
                 <a href="#" class="download-invoice">
                 Download Invoice
                </a>
              } */}
              {/* {order.subOrders.every(subOrder => subOrder.orderStatus === "placed") && (
                <a
                  className="inline-flex w-full sm:w-auto items-center gap-1.5 justify-start no-underline text-red-500 font-medium cursor-pointer text-left"
                  onClick={() => {
                    setSelectedOrderId(order._id);
                    setIsCanceled(true);
                  }}
                >
                  Cancel Order
                </a>
              )} */}

              {/* {isCanceled && (
                <div className="modal-overlays" onClick={() => setIsCanceled(false)}>
                  <div className="modal-contents" onClick={(e) => e.stopPropagation()}>

                    <CancelOrder setIsCanceled={setIsCanceled} OrderId={selectedOrderId} order={order} />
                  </div>
                </div>
              )} */}

            </div>
            <div class="order-actions-price-status">
              <p class="download-invoice">
                Total Amount: <span>₹ {order.totalAmount}</span>
              </p>
              {Array.isArray(order.subOrders) && order.subOrders.length > 0 && (
                <div className="suborders-status">


                  <div className={`flex gap-2 download-invoice progress  ${trackingStatuses[index]}`}>
                    <span>
                      <FaTruck />
                    </span>{" "}
                    <p className="text-[14px] font-[600]">Delivery status :</p>

                    {trackingStatuses[index]}
                  </div>
                </div>
              )}

              <div className="">

                {order.paymentStatus === "pending" ?
                  <p className={`flex gap-2 download-invoice progress ${order.paymentStatus}`} >
                    <span>
                      <MdPayments />
                    </span>{" "}
                    <p className="text-[14px] font-[600]">  Payment status :</p>

                    {order.paymentStatus}
                  </p>

                  :
                  <div class={`flex gap-2 download-invoice progress ${order.paymentStatus}`}>

                    <span>
                      <MdPayments />
                    </span>{" "}
                    <p className="text-[14px] font-[600]">  Payment status :</p>

                    {order.paymentStatus}
                  </div>}
              </div>
            </div>
          </div>
        )) : <div className="flex flex-col justify-center items-center h-screen">
          <img src={emptycart} className="w-1/3 h-1/3" />
          <h1 className="text-lg font-semibold">Empty Orders</h1>
          <span className="px-6 py-4 text-center">
              You haven’t placed any orders . To place orders, click
            <a href="/" className="text-md font-semibold text-blue-600"> Browse Products</a>
          </span>
        </div>
      }


    </div>
  );
};


