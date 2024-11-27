'use client';
import React from "react";
import "@/styles/Orders.css";
import { FaTruck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
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

const OrderItemWithStatus = ({ status }) => {
  const statusClass = status === "Completed" ? "completed" : "in-progress";

  const router = useRouter();
  return (
    
    <div class="order-item">
      <div className="order-header">
        <span>ID: #{`1234567890`}</span>
        <span>Date: {`27/08/2024`}</span>
      </div>
      <div class="order-product">
        <img
          src={orderHistoryImage}
          alt="Dell 27 inch Monitor"
          class="product-image"
        />
        <div class="product-info">
          <h4>
            Dell 27 inch P2725H Monitor | Anti-Glare With 3H Hardness | 100Hz |
            5ms gray-to-gray (Fast mode)
          </h4>
          <p>
            <span>₹1,500</span> /month | Rented for: <span>3 months</span>
          </p>
        </div>
      </div>

      <div class="order-actions">
        <a href="#" class="track-order" onClick={() => {router.push('/profile/orders/orderdetailss')}}>
          Track & View Order
        </a>
        <a href="#" class="cancel-order">
          Cancel Order
        </a>
        <a href="#" class="download-invoice">
          Download Invoice
        </a>
      </div>
      <div class="order-actions-price-status">
        <p class="download-invoice">
          Total Amount: <span>₹10,500</span>
        </p>
        <p className={`download-invoice progress ${statusClass}`}>
          <span>
            <FaTruck />
          </span>{" "}
          {status}
        </p>
        <p class="download-invoice">
          Delivered on: <span>27/08/2024</span>
        </p>
      </div>
    </div>
  );
};

const OrderItem = () => {
  return (
    <div className="order-item">
      <div className="order-header">
        <span>ID: #{`1234567890`}</span>
        <span>Date: {`27/08/2024`}</span>
      </div>
      <div class="order-product">
        <img
          src={orderHistoryImage}
          alt="Dell 27 inch Monitor"
          class="product-image"
        />
        <div class="product-info">
          <h4>
            Dell 27 inch P2725H Monitor | Anti-Glare With 3H Hardness | 100Hz |
            5ms gray-to-gray (Fast mode)
          </h4>
          <p>
            <span>₹1,500</span> /month | Rented for: <span>3 months</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default function Orders ()  {
  return (


    
    <div className="profile-settings Orders_page_section">
      <div className="item-header">
        <h2>Order History</h2>
        <a href="#" className="edit-btn" onClick={null}>
          Cancelled Orders
        </a>
      </div>
      {/* product ordering detais */}
      <div className="order_item-frame">
        <OrderItemWithStatus status={"Progress"} />
        <OrderItemWithStatus status={"Completed"} />
      </div>
      <OrderItem />
      <OrderItem />
    </div>
  );
};


