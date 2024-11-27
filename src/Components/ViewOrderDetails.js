import React from "react";
import { useParams } from "react-router-dom";
import OrderDetail from "./OrderDetail";

const ViewOrderDetails = () => {
  const { id } = useParams(); // Get the order ID from the URL

  // You would usually fetch the order details from an API using the order id
//   const order = orders.find((order) => order.id === id); // This is just a placeholder, assuming orders is a list of orders in scope

//   if (!order) {
//     return <div>Order not found</div>;
//   }

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <OrderDetail />
      {/* <p><strong>Product:</strong> {order.product}</p>
      <p><strong>Price:</strong> {order.price}</p>
      <p><strong>Total Amount:</strong> {order.totalAmount}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Delivery Date:</strong> {order.deliveryDate}</p> */}
      {/* Add more details as needed */}
    </div>
  );
};

export default ViewOrderDetails;
