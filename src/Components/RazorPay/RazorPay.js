
"use client";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
import { useEffect, useRef } from 'react';
import Swal from "sweetalert2";
import Cookies from "js-cookie";

const loadScript = (src) => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => {
    resolve(true);
  };
  script.onerror = () => {
    resolve(false);
  };
  document.body.appendChild(script);
});
const Razorpay = ({ orderId, planId, keyId, currency,setIsSubscription, amount, handlePayment, name,urlToken }) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);

  const options = {
    key: keyId,
    amount: amount * 100,
    currency,
    name,
    order_id: orderId,
    handler: async (response) => {
      1
      if (response.razorpay_payment_id) {

        try {
          const token = localStorage.getItem('userToken');
  const authToken = urlToken ? urlToken : token;

          const result = await axios.post(`${BASE_URL}/user-subscription/verify-payment`, {
            razorpay_order_id: orderId,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            planId,
           ...(urlToken && { source: "app" }) 
          }, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            }
          });
          console.log(result, "result in razorpay payment verification");
     
if (result.data.redirectUrl) {
  const redirectUrl = result.data.redirectUrl;

  if (redirectUrl.startsWith('rntout://')) {
    window.location.href = redirectUrl;
    setTimeout(() => {
      window.location.href = 'https://rntout.com'; 
    }, 2000);
  } else {
    window.location.href = redirectUrl;
  }
}


          setIsSubscription(false);
          Swal.fire({
            icon: "success",
            title: "Payment Completed!",
            text: "Payment is Successfull.",
            confirmButtonColor: "#d33", 
          });  


          if (result.data.success  === true) {
            handlePayment('succeeded', {
              razorpay_order_id: orderId,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: planId
            });

            Cookies.set("hasSubscription",result.data.success , { expires: 7, secure: true, sameSite: "Strict" });
            Cookies.set("SubscriptionId",result.data.subscription.planId , { expires: 7, secure: true, sameSite: "Strict" });

          // window.location.reload();
                        

        
          } else {
            handlePayment('failed', {
              razorpay_order_id: orderId,
              razorpay_payment_id: response.razorpay_payment_id,
            });
            // alert(" payment failed ---- ")
            // window.location.href = '/payment-failed';
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          handlePayment('failed', {
            orderId,
            error: error.response?.data?.message || 'Payment verification failed'
          });

        }
      }
    },
    modal: {
      confirm_close: true,
      ondismiss: async (reason) => {
        const { reason: paymentReason, field, step, code } = reason && reason.error ? reason.error : {};
        if (reason === undefined) {
          handlePayment('cancelled');
        }
        else if (reason === 'timeout') {
          handlePayment('timedout');
        }
        else {
          handlePayment('failed', {
            paymentReason, field, step, code,
          });
        }
      },
    },
    retry: {
      enabled: false,
    },
    timeout: 900,
    theme: {
      color: '',
    },
  };
  const displayRazorpay = async (options) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      console.error('Error in loading Razorpay script');
      alert('Failed to load payment gateway. Please try again later.');
      return;
    }
    const rzp1 = new (window).Razorpay(options);
    rzp1.on('payment.submit', (response) => { paymentMethod.current = response.method });
    rzp1.on('payment.failed', (response) => { paymentId.current = response.error.metadata.payment_id });
    rzp1.open();
  };
  useEffect(() => {
    displayRazorpay(options);
  }, [])
  return null;
};
export default Razorpay;