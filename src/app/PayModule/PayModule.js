
"use client";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
import { useEffect, useRef } from 'react';
import Swal from "sweetalert2";

const loadScript = (src ) => new Promise((resolve) => {
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
const RenderRazorpay = ({ orderId,razorpayOrderId, keyId, currency, amount, handlePayment ,name}) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);

  const options = {
    key: keyId,
    amount,
    currency,
     name,
     order_id: razorpayOrderId,
    handler: async (response) => {1
      if (response.razorpay_payment_id) {
        try {
          const token = localStorage.getItem('userToken'); 
          const result = await axios.post(`${BASE_URL}/payments/status`, {
            orderId,
            razorpayOrderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature
          }, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          if (result.data.transactionStatus === 'completed') {
            handlePayment('succeeded', {
              orderId,
              razorpayOrderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            });
            // alert("successfully payment completed ")
            Swal.fire({
              icon: "success",
              title: "Payment Completed!",
              text: "Your payment was successfully processed.",
              confirmButtonColor: "#d33", // Optional: Customize button color
            });            // window.location.href = '/payment-success';
          } else {
            handlePayment('failed', {
              razorpayOrderId,
              paymentId: response.razorpay_payment_id
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
          // alert("Payment verification error ---- ")
          // window.location.href = '/payment-failed';
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
  const displayRazorpay = async (options ) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      console.error('Error in loading Razorpay script');
      alert('Failed to load payment gateway. Please try again later.');
      return;
    }
    const rzp1 = new (window  ).Razorpay(options);
    rzp1.on('payment.submit', (response ) => { paymentMethod.current = response.method });
    rzp1.on('payment.failed', (response) => { paymentId.current = response.error.metadata.payment_id });
    rzp1.open();
  };
  useEffect(() => {
    displayRazorpay(options);
  }, [])
  return null;
};
export default RenderRazorpay;