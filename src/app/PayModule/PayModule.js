
"use client";
import { useEffect, useRef } from 'react';
const loadScript = (src ) => new Promise((resolve) => {
  const script = document.createElement('script');
  script.src = src;
  script.onload = () => {
    console.log('razorpay loaded successfully');
    resolve(true);
  };
  script.onerror = () => {
    console.log('error in loading razorpay');
    resolve(false);
  };
  document.body.appendChild(script);
});
const RenderRazorpay = ({ orderId, keyId, keySecret, currency, amount, handlePayment ,name}) => {
  const paymentId = useRef(null);
  const paymentMethod = useRef(null);
  console.log(keyId,currency,amount,handlePayment,"payment")
  const options = {
    key: keyId,
    amount,
    currency,
     name,
    // order_id: orderId,
    handler: (response) => {
      console.log(response,"response in razorpay")
      const paymentId = response.razorpay_payment_id;
      if (response) {
        handlePayment('succeeded', {
        //   orderId,
          paymentId,
          signature: response.razorpay_signature,
        });
      } else {
        handlePayment('failed', {
        //   orderId,
          paymentId: response.razorpay_payment_id,
        });
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