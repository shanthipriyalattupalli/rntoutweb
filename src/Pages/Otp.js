
"use client"
import React, { useState,useEffect } from "react";
import "@/styles/Otp.css";
import axios from "axios"; // Import axios for API requests
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Rntout = "/Assets/Rntout_Logo.png";

const Otp = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    
   
    const [errorMessage, setErrorMessage] = useState(""); // For error feedback
    const [isLoading, setIsLoading] = useState(false); // For loading state
const [phoneNumber,setPhoneNumber] = useState("")
const router = useRouter();
const {mobileNumber}=router.query

console.log(mobileNumber,"mobile num in otp")

    // Handle OTP input changes
// Handle OTP input changes
const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) { // Allow only digits
        const updatedOtp = [...otp];
        updatedOtp[index] = value; // Update the current index with the new value
        setOtp(updatedOtp); // Update the state
        console.log(otp.length,"otplength");


        // Automatically move focus to the next input if the current value is valid
        if (value && index < otp.length - 1) {
            setTimeout(() => {
                document.getElementById(`otp-${index + 1}`).focus();
            }, 0); // Timeout ensures DOM updates before the focus change
        }
    }
};


useEffect(() => {
    console.log(otp, "Updated otp state");
}, [otp]);

    // Handle backspace navigation
    const handleBackspace = (index, value) => {
        if (!value && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    // API call for OTP verification
    const handleOtpVerify = async () => {
        const otpCode = otp.join(""); // Combine the OTP array into a single string
        console.log(otpCode,"otpcode");
        if (otpCode.length < 4) {
            setErrorMessage("Please enter a valid 4-digit OTP.");
            return;
        }

        setErrorMessage(""); // Clear previous errors
        setIsLoading(true);
        

        try {
            const response = await axios.post("http://localhost:6001/api/users/verify-otp", {
                otp: String(otpCode),
                phoneNumber: mobileNumber,
               
            });
console.log(response.data,"data in otp")
            setIsLoading(false);
let user=response.data.user
console.log(user.id,"user")
            if (response.status === 200) {
                // OTP verified successfully
                toast.success(response.data.message || "OTP verified successfully!");
localStorage.setItem("userToken",response.data.token)
localStorage.setItem("userId",user.id)
                localStorage.setItem("userName",user.name)
                localStorage.setItem("userEmail",user.email)
                localStorage.setItem("role",user.role)

                router.push("/"); // Navigate to the home page
            } else {
                // Handle server-side errors
                setErrorMessage(response.data.error || "Invalid OTP. Please try again.");
            }
        } catch (error) {
            setIsLoading(false);
            // Handle other errors (e.g., network or server issues)
            setErrorMessage("Something went wrong. Please try again later.");
        }
    };

    return (
        <div className="otp-container">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="login-first">
                <img src={Rntout} alt="RentOut Logo" className="login-logo" />
                <h2 className="subtitle">Sign in to RntOut</h2>
            </div>
            <div className="otp-card">
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
                                if (e.key === "Backspace") handleBackspace(index, e.target.value);
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

                <p className="otp-resend">
                    <span className="otp-resend-link">Resend OTP</span>
                </p>
                <p className="or-text">or</p>
                <button className="button1">Sign in with your password</button>
            </div>
        </div>
    );
};

export default Otp;
