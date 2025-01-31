'use client';
import React from "react";
// import "@/styles/Orderpage.css";
import '../../../../styles/Orderpage.css';
import { IoMdArrowRoundBack } from "react-icons/io";
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";
import OrderTrackingWithNavigate from "@/Components/OrderTrackingWithNavigate";
const OrderDetail = () => {
  const router = useRouter();
  const params = useParams();
  const orderId = params.orderId;
  console.log(orderId,"orderid")
  return (
    <div className="order-detail">
      <h2 className='item-header' onClick={() => router.back()}>
        <div className='back-product'><IoMdArrowRoundBack style={{ marginRight: "12px" }} /> Order detail
        </div></h2>
      <div className="Orders_page_section">
        <OrderTrackingWithNavigate orderId={orderId}/>
      </div>
    </div>
  );
};

export default OrderDetail;
