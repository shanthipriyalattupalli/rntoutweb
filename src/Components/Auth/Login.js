"use client";

import React, { useState } from "react";
// import "@/styles/Login.css";
import '../../styles/Login.css';
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Rntout = "/Assets/Rntout_Logo.png";
import { useRouter } from "next/navigation";
import Otp from "./Otp";
import Signup from "./Signup";

const Login = ({setIsLoginOpen}) => {
  const [isPhoneSelected, setIsPhoneSelected] = useState(true);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState(""); // For phone login
  const [email, setEmail] = useState(""); // For email login
  const [password, setPassword] = useState(""); // For email login
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [errorMessage, setErrorMessage] = useState(""); // Error messages
  const [userData, setUserData] = useState(""); // User data
  const [loginError, setLoginError] = useState(""); //
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  // const [isregisterOpen, setIsRegisterOpen] = useState(false);
  // Handle OTP API integration
  const handleSendOtp = async () => {
    if (!mobileNumber || !/^\+?[0-9]{10,13}$/.test(mobileNumber)) {
      toast.error("Please enter a valid mobile number.");
      return;
    }
    setIsLoading(true);

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
        setIsOtpOpen(true)
        // router.push(`/Otp?mobileNumber=${encodeURIComponent(mobileNumber)}`);
      } else {
        toast.error(response.data.error || "Failed to send OTP. Try again.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  // Handle Email and Password Login
  const handleEmailLogin = async () => {
    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/users/login`, {
        email,
        password,
      });
      console.log(response.data);

      setIsLoading(false);

      if (response.status === 200) {
        const { user, message } = response.data;

        toast.success(message || "Login successful!");

        localStorage.setItem("userId", user.id);
        localStorage.setItem("userName", user.name);
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userToken", response.data.token);

        console.log(user, "User details logged.");

        router.push("/"); // Redirect to home page
      } else {
        toast.error(response.data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error.response?.data?.message || error.message, "Error");

      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }

      const detailsMessage =
        error.response?.data?.message?.details?.[0]?.message;
      if (detailsMessage) {
        toast.error(detailsMessage);
      }

      setIsLoading(false);
    }
  };
  return (
    <div className='login-container'>
      <ToastContainer position='top-right' autoClose={3000} />
      {/* <div className='login-first'>
        <img src={Rntout} alt='RentOut Logo' className='login-logo' />
        <h2 className='subtitle'>Sign in to RntOut</h2>
      </div> */}

      <div className='login-card'>
        {isForgetPassword ? (
          <div>
            <h3 className='forgot-password-heading'>Password Assistance</h3>
            <p className='forgot-password-text mt-0'>
              Enter the email address or mobile phone number
              <br />
              associated with your RntOut account.
            </p>
            <input
              type='email'
              placeholder='Enter Email or Phone Number'
              className='input'
            />
            <button className='button'>Continue</button>
            <p
              className='back-to-login mb-0'
              onClick={() => setIsForgetPassword(false)}
            >
              Back to Log In
            </p>
          </div>
        ) : (
          <div>
                  <div className='login-first'>
        <img src={Rntout} alt='RentOut Logo' className='login-logo' />
        <h2 className='subtitle'>Sign in to RntOut</h2>
      </div>
            {/* <div className='tab-container'>
              <button
                className={`tab ${isPhoneSelected ? "active" : "inactive"}`}
                onClick={() => setIsPhoneSelected(true)}
              >
                Phone
              </button>
              <button
                className={`tab ${!isPhoneSelected ? "active" : "inactive"}`}
                onClick={() => setIsPhoneSelected(false)}
              >
                Email
              </button>
            </div> */}

            {isPhoneSelected && (
              <div>
                <p className='login-p1 m-0'>Mobile Number    <span style={{ color: 'red' }}>*</span></p>
             
                <input
                  type='tel'
                  placeholder='+91 1234567890'
                  className='input'
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <button
                  className='button'
                  onClick={handleSendOtp}
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Get OTP"}
                </button>
        {isOtpOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <button className="close-button" onClick={() => setIsOtpOpen(false)}>
                    ✕
                  </button>
                  <Otp mobileNumber={mobileNumber} setIsOtpOpen={setIsOtpOpen}/>
                </div>
              </div>
            )}
              </div>
            )}

            {!isPhoneSelected && (
              <div>
                <p className='login-p1 m-0'>Email Address</p>
                <input
                  type='email'
                  placeholder='Enter Email Address'
                  className='input'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <p className='login-p1 m-0'>Password</p>
                <input
                  type='password'
                  placeholder='Enter Password'
                  className='input'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className='button'
                  onClick={handleEmailLogin}
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </div>
            )}
            <p className='or-text'>or</p>
            <button className='google-button'>
              <img
                src='https://img.icons8.com/color/48/000000/google-logo.png'
                alt='Google'
                className='google-icon'
              />
              Google
            </button>
            <p className='footer-text mb-0'>
              Don't have any account?{" "}
              <span className='link'   >
                Create account
              </span>
            </p>
                        {/* {isregisterOpen && (
                          <div className="modal-overlay">
                            <div className="modal-content">
                              <button className="close-button" onClick={() => setIsRegisterOpen(false)}>
                                ✕
                              </button>
                              <Signup />
                            </div>
                          </div>
                        )} */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
