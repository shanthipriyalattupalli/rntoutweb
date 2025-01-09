'use client';
import React from "react";
// import "@/styles/Orderpage.css";
import '../../../../styles/orderpage.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import OrderTrackingWithNavigate from "@/Components/OrderTrackingWithNavigate";
const OrderDetail = () => {
  const router = useRouter();


  return (
    <div className="order-detail">
      <h2 className='item-header' onClick={() => router.back()}>
        <div className='back-product'><IoMdArrowRoundBack style={{ marginRight: "12px" }} /> Order detail
        </div></h2>
      <div className="Orders_page_section">
        <OrderTrackingWithNavigate />
      </div>
    </div>
  );
};

export default OrderDetail;
