
import React, { useEffect, useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import { FaRegCheckCircle } from "react-icons/fa";
import Razorpay from '../RazorPay/RazorPay';
const subscription = '/Assets/subscription2.svg'

const Benefits = [
  "🚚 Get all your rented items delivered free",
  " ⚡ Faster Delivery ",
  "🎧 24/7 VIP Customer Support "
]

const Subscription = ({ plans,setIsSubscription }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const userId = Cookies.get("userId");
  const token = Cookies.get("userToken")
  const [orderId, setOrderId] = useState(null)
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [subscriptionPlanId, setSubscriptionPlanId] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const apiKey = "rzp_test_a4GiGqcTxFZlKT";

  const handleSubscriptionCheckout = async (planId) => {
    const payload = {
      planId: planId
    }
    try {
      const response = await axios.post(`${BASE_URL}/user-subscription/create-order`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      if (response.data.order.id) {
        setOrderId(response.data.order.id);
        setSelectedPlanId(planId);
        
        setDisplayRazorpay(true);
      }
    } catch (error) {
      console.log(error, "error in plans")

    }
  }

  const createPayment = async (planId) => {
    setSubscriptionPlanId(planId)
    if (!userId) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please login to proceed with payment.",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
      return;
    }
    await handleSubscriptionCheckout(planId);
  
  };

  const handlePayment = async (status, orderDetails) => {
    if (status === "succeeded") {
      setDisplayRazorpay(false);
      // router.push("/profile/orders")
      // await handleContinueClick(orderDetails);

    } else if (status === "cancelled") {
      setDisplayRazorpay(false);
    }
  };
  return (
    plans.map((plan, index) => (
      <div className="flex flex-col gap-2 p-8" key={plan._id}>

        <div className="flex justify-center items-center mb-4">
          <div className="bg-orange-100 p-3 rounded-full">
            <img src={subscription} alt='subscription' className='' />
          </div>
        </div>
        <h2 className="text-xl text-center font-bold">RntOut Subscription</h2>
        <span className='text-center'>{plan.description}</span>
        <div className="mt-4">
          <p className="text-gray-600 font-semibold">BENEFITS:</p>
          <ul className="mt-2 space-y-2">
            {plan.benefits
              .map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <FaRegCheckCircle className="text-green-700" />
                  {benefit}
                </li>
              ))}
          </ul>
        </div>
        <div className="text-center ">
          <span className="text-red-500 font-bold text-xl">₹{plan.price} </span>
          <span className="text-gray-500 font-sm text-md"> /{plan.name}</span>
        </div>
        <button
          className="w-full mt-4  text-white text-lg font-semibold py-2 rounded-lg transition"
          style={{ backgroundColor: "rgba(255, 45, 85, 1)" }}
          onClick={() => createPayment(plan._id)}
        >
          Buy Now
        </button>
        {displayRazorpay && (
          <Razorpay
            orderId={orderId}
            planId={selectedPlanId}
            setIsSubscription={setIsSubscription}
            amount={plan.price}
            currency={"INR"}
            keyId={apiKey}
            handlePayment={handlePayment}
            name={(typeof window !== 'undefined') ? localStorage.getItem("userName") : null} />
        )}
      </div>
    ))

  )
}

export default Subscription