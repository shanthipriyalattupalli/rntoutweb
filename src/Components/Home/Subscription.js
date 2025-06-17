
import React, { useEffect, useState } from 'react'
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from 'js-cookie';
import { FaRegCheckCircle } from "react-icons/fa";
import Razorpay from '../RazorPay/RazorPay';
import { CrossIcon } from 'lucide-react';
import { TiCancelOutline } from 'react-icons/ti';
import { MdCancel, MdOutlineCancel } from 'react-icons/md';

const Benefits = [
  "🚚 Get all your rented items delivered free",
  " ⚡ Faster Delivery ",
  "🎧 24/7 VIP Customer Support "
]

const Subscription = ({ plans, setIsSubscription, userPlans }) => {


  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const userId = Cookies.get("userId");
  const token = Cookies.get("userToken");
  const userName = Cookies.get("userName");
  const isSubscription = Cookies.get("hasSubscription");
  const subscriptionId = Cookies.get("SubscriptionId");
  const [orderId, setOrderId] = useState(null)
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [subscriptionPlanId, setSubscriptionPlanId] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [subscriptions, setSubscription] = useState(null);
  const planId = Cookies.get("planId")
  const apiKey = "rzp_test_a4GiGqcTxFZlKT";

  const fetchUserSubscriptionPlans = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subscription-plans/plan/${planId}`, {
        headers: { Authorization: `Bearer ${token}` },

      });
      setSubscription(response.data?.data)

    } catch (error) {
      console.log(error, "error in subscription")
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Required",
          text: "Please login to proceed with payment.",
        });
      }

    }
  }

  useEffect(() => {
    fetchUserSubscriptionPlans()

  }, [planId])


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
      console.log(error, "error in plans");
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Required",
          text: "Please login to proceed with payment.",
        });
      }

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
    <>
      {isSubscription === "true" ?
        <div className="flex flex-col gap-[24px] p-6 sm:p-[20px]" key={subscriptions?._id}>

          <div className="flex justify-center items-center mb-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <img src='/Assets/subscription2.svg' alt='subscription' className='' />
            </div>
          </div>
          <h2 className="text-xl text-center font-bold">RntOut Subscription</h2>
          <div className='flex-flex-col gap-[4px]'>
            <span className='text-left'>Next invoice issue date</span>
            <div className='flex justify-between'>
              <span>{new Date(userPlans?.endDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              <div className="text-center ">
                <span className="text-red-500 font-bold text-xl">₹{subscriptions?.price} </span>
                <span className="text-gray-500 font-sm text-md"> /{subscriptions?.name}</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-gray-600 font-semibold">BENEFITS:</p>
            <ul className="mt-2 space-y-2">
              {subscriptions?.benefits?.map((benefit, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <FaRegCheckCircle className="text-green-700" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>



          {/* <button
            className="flex gap-2 text-center justify-center text-[12px] font-[500] py-2 rounded-lg "
            style={{ color: "rgba(255, 45, 85, 1)" }}
          >
            <MdCancel className='w-4 h-4' />
            Cancel Subscription
          </button> */}

        </div> :
   <>
          {plans.map((plan, index) => (
            <div className="flex flex-col gap-2 p-8" key={plan._id}>

              <div className="flex justify-center items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <img src='/Assets/subscription2.svg' alt='subscription' className='' />
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
                  name={userName} />
              )}
            </div>
          ))}
          </>

    
      }

    </>

  )
}

export default Subscription