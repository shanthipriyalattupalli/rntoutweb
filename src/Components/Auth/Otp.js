"use client";
import React, { useState, useEffect, Suspense } from "react";
// import "@/styles/Otp.css";
import "../../styles/Otp.css";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const profile_avatar = "/Assets/profile_avatar.png";
import Signup from "./Signup";
import Cookies from "js-cookie";


const Rntout = "/Assets/Rntout_Logo.png";

const Otp = ({mobileNumber,setIsOtpOpen,setIsLoginOpen}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
    const [isregisterOpen, setIsRegisterOpen] = useState(false);
    const [profile,setProfile]=useState(null);
    const [otpError, setOtpError] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [timer,setTimer]=useState(60)
//   const mobileNumber = searchParams.get("mobileNumber");
const userName = (typeof window !== 'undefined') ? localStorage.getItem("userName") : null;
const token = typeof window !== 'undefined' ? localStorage.getItem("userToken") : null;
const fcmToken = typeof window !== 'undefined' ? localStorage.getItem("FCMToken") : null;

const profilepic = typeof window !== 'undefined'? localStorage.getItem("profilePic"):null;


useEffect(() => {
  if (timer > 0) {
    const countdown = setTimeout(() => setTimer(timer - 1), 1000);
    return () => clearTimeout(countdown);
  } else {
    setIsOtpOpen(true); 
  }
}, [timer]);


  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      setOtp(updatedOtp);

      if (value && index < otp.length - 1) {
        setTimeout(() => {
          document.getElementById(`otp-${index + 1}`).focus();
        }, 0);
      }
    }
  };







  const handleBackspace = (index, value) => {
    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleOtpVerify = async () => {
    const otpCode = otp.join(""); 
    if (otpCode.length < 4) {
      setErrorMessage("Please enter a valid 4-digit OTP.");
      setOtpError(true); // Apply red border
      return;
    }

    if(timer === 0){
      return;
    }
  
    setErrorMessage("");
    setIsLoading(true);
    setOtpError(false); // Reset error state
  
    try {
      const response = await axios.post(`${BASE_URL}/users/verify-otp`, {
        otp: String(otpCode),
        phoneNumber: mobileNumber,
      });
  
      setIsLoading(false);
      let user = response.data.user;
      toast.success(response.data.message || "OTP verified successfully!");
  
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("role", user.role);

      
      Cookies.set("userId", user.id, { expires: 7, secure: true, sameSite: "Strict" });
      Cookies.set("userName", user.name, { expires: 7, secure: true, sameSite: "Strict" });
      Cookies.set("userEmail", user.email, { expires: 7, secure: true, sameSite: "Strict" });
      Cookies.set("userToken", response.data.token, { expires: 7, secure: true, sameSite: "Strict" });
      
      
      if (!profilepic) {
        localStorage.setItem("profilePic", profile_avatar);
      } else {
        localStorage.setItem("profilePic", profilepic);
      }
  
      if (fcmToken) {
        await saveFcmToken(fcmToken);
      }
  
      if (!user.name || user.name === "undefined" || user.name === "null") {
        setIsRegisterOpen(true);
      } else {
        if(!otpError){
        setIsRegisterOpen(false);
        router.push("/");
        window.location.reload();
        }
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Invalid OTP");
      setOtpError(true); // Apply red border
    }
  };
  


  const saveFcmToken = async () => {
    try {

     const response= await axios.post(
        `${BASE_URL}/users/save-fcm-token`,
        { fcmToken },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error saving FCM token:", error);
    }
  };

  const handleSendOtp = async () => {
    if (!mobileNumber || !/^\+?[0-9]{10,13}$/.test(mobileNumber)) {
      toast.error("Please enter a valid mobile number.");
      return;
    }

    setIsLoading(true);
    setOtp(["", "", "", ""]);
    setTimer(60);

    try {
      const response = await axios.post(`${BASE_URL}/users/send-otp`, {
        phoneNumber: mobileNumber,
      });
      setIsLoading(false);

      if (response.status === 200) {
        toast.success(response.data.message || "OTP sent successfully!");

      } else {
        toast.error(response.data.error || "Failed to send OTP. Try again.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="otp-container">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* <div className='login-first'>
        <img src={Rntout} alt='RentOut Logo' className='login-logo' />
        <h2 className='subtitle'>Sign in to RntOut</h2>
      </div> */}
      <div className="otp-card">
      <div className='login-first'>
        <img src={Rntout} alt='RentOut Logo' className='login-logo' />
        <h2 className='subtitle'>Sign in to rntout</h2>
      </div>
        <h2 className="otp-heading">OTP Verification</h2>
        <p className="otp-subtext">
          We've sent a One Time Password (OTP) to the mobile
          <br />
          number above. Please enter it to complete verification.
        </p>
        <p className="otp-number">
       +91 {mobileNumber}<span className="otp-change">  Change</span>
        </p>

        <div className="otp-inputs">
      {otp.map((digit, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Backspace") handleBackspace(index, e.target.value);
          }}
          className={`otp-input ${otpError ? "otp-error" : ""}`} // Apply red border class on error
        />
      ))}
    </div>

    {errorMessage && <p className={`error-message ${errorMessage && "text-red"}`}>{errorMessage}</p>}

    <button className="button" onClick={handleOtpVerify}   disabled={isLoading || otp.some((digit) => digit === "" || timer === 0)}>
      {isLoading ? "Verifying..." : "Continue"}
    </button>

    {isregisterOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={() => setIsRegisterOpen(false)}>✕</button>
          <Signup setIsRegisterOpen={setIsRegisterOpen} />
        </div>
      </div>
    )}
        <p className="otp-resend" onClick={handleSendOtp}>
          <span className="otp-resend-link">Resend OTP  <span className="otp-timer">{timer}s</span></span>
        </p>


         


      </div>
    </div>
  );
};



export default Otp;
