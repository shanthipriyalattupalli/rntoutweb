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

const Rntout = "/Assets/Rntout_Logo.png";

const Otp = ({mobileNumber,setIsOtpOpen}) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
    const [isregisterOpen, setIsRegisterOpen] = useState(false);
    const [profile,setProfile]=useState(null)
  const router = useRouter();
  const searchParams = useSearchParams();
//   const mobileNumber = searchParams.get("mobileNumber");
const userName = (typeof window !== 'undefined') ? localStorage.getItem("userName") : null;
const token = typeof window !== 'undefined' ? localStorage.getItem("userToken") : null;
const fcmToken = typeof window !== 'undefined' ? localStorage.getItem("FCMToken") : null;
const profilepic = typeof window !== 'undefined'? localStorage.getItem("profilePic"):null;

  console.log(mobileNumber, "mobile num in otp");

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

  useEffect(() => {
    console.log(otp, "Updated otp state");
  }, [otp]);





  const handleBackspace = (index, value) => {
    if (!value && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus();
    }
  };

  const handleOtpVerify = async () => {
    const otpCode = otp.join("");
    console.log(otpCode, "otpcode");
    if (otpCode.length < 4) {
      setErrorMessage("Please enter a valid 4-digit OTP.");
      return;
    }
  
    setErrorMessage("");
    setIsLoading(true);
  
    try {
      const response = await axios.post(`${BASE_URL}/users/verify-otp`, {
        otp: String(otpCode),
        phoneNumber: mobileNumber,
      });
  
      console.log(response.data, "data in otp");
      setIsLoading(false);
      let user = response.data.user;
      toast.success(response.data.message || "OTP verified successfully!");
  
      localStorage.setItem("userToken", response.data.token);
      localStorage.setItem("userId", user.id);
      localStorage.setItem("userName", user.name || "");  // Ensuring it's never null
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("role", user.role);
      if(!profilepic){
      localStorage.setItem("profilePic", profile_avatar);
      }else{
        localStorage.setItem("profilePic", profilepic);
      }
      if (fcmToken) {
        await saveFcmToken(fcmToken);
      }  
      if (!user.name || user.name === "undefined" || user.name === "null") {
        setIsRegisterOpen(true);
      } else {
        setIsRegisterOpen(false);
        router.push("/");
        window.location.reload();
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage("Something went wrong. Please try again later.");
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
      console.log("FCM Token saved successfully",response);
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
    setOtp(["", "", "", ""])

    try {
      const response = await axios.post(`${BASE_URL}/users/send-otp`, {
        phoneNumber: mobileNumber,
      });
      console.log(response);
      setIsLoading(false);

      if (response.status === 200) {
        toast.success(response.data.message || "OTP sent successfully!");
        console.log(mobileNumber, "mobilenum in login page");
        // router.push({
        //   pathname: "/Otp",
        //   query: { mobileNumber: mobileNumber },
        // });
        // setIsLoginOpen(false)
        // setIsOtpOpen(true)
        // router.push(`/Otp?mobileNumber=${encodeURIComponent(mobileNumber)}`);
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
        <h2 className='subtitle'>Sign in to RntOut</h2>
      </div>
        <h2 className="otp-heading">OTP Verification</h2>
        <p className="otp-subtext">
          We've sent a One Time Password (OTP) to the mobile
          <br />
          number above. Please enter it to complete verification.
        </p>
        <p className="otp-number">
          {phoneNumber} <span className="otp-change">Change</span>
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
                if (e.key === "Backspace")
                  handleBackspace(index, e.target.value);
              }}
              className="otp-input"
            />
          ))}
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <button
          className="button"
          onClick={handleOtpVerify}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Continue"}
        </button>
        {isregisterOpen &&(
                          <div className="modal-overlay">
                            <div className="modal-content">
                              <button className="close-button" onClick={() => setIsRegisterOpen(false)}>
                                ✕
                              </button>
                            <Signup setIsRegisterOpen={setIsRegisterOpen}/>
                            </div>
                          </div>
                        )}
        <p className="otp-resend" onClick={handleSendOtp}>
          <span className="otp-resend-link">Resend OTP</span>
        </p>
        <p className="or-text">or</p>
        <button className="button1">Sign in with your password</button>
      </div>
    </div>
  );
};

// const Otp = () => (
//   <Suspense fallback={<div>Loading...</div>}>
//     <OtpComponent />
//   </Suspense>
// );

export default Otp;
