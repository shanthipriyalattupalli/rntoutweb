import React from "react";
import "@/styles/Orderpage.css";
import OrderTrackingWithNavigate from "@/Components/OrderTrackingWithNavigate";
const OrderDetail = () => {

  return (
    <div className="order-detail">
      <div className="Orders_page_section">
        <OrderTrackingWithNavigate />
      </div>
    </div>
  );
};

export default OrderDetail;
