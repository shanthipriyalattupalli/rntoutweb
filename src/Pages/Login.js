import React, { useState } from 'react';
import '@/styles/Login.css';
const Rntout =  "/Assets/Rntout_Logo.png";
import { useRouter } from "next/navigation";
const Login = () => {
    const [isPhoneSelected, setIsPhoneSelected] = useState(true);
    const [isForgetPassword, setIsForgetPassword] = useState(false);
    const router = useRouter();

    
    const handlenavigation = () => {
        localStorage.setItem('name','vishnu')
        router.push("/");
      }
    return (
        <div className="login-container">
            <div className="login-first">
                <img src={Rntout} alt="RentOut Logo" className="login-logo" />
                <h2 className="subtitle">Sign in to RntOut</h2>
            </div>

            <div className="login-card">
                {/* Conditional Rendering: Forgot Password Flow */}
                {isForgetPassword ? (
                    <div>
                        <h3 className="forgot-password-heading">Password Assistance</h3>
                        <p className="forgot-password-text mt-0">
                            Enter the email address or mobile phone number<br />associated with your RntOut account.
                        </p>
                        <p className="login-p1 m-0">Email or mobile phone number</p>
                        <input
                            type="email"
                            placeholder="Enter Email or phone number"
                            className="input"
                        />
                        <button className="button">Continue</button>
                        <p
                            className="back-to-login mb-0"
                            onClick={() => setIsForgetPassword(false)}
                        >
                            Back to Log In
                        </p>
                    </div>
                ) : (
                    <div>
                        {/* Tab Selection for Phone or Email */}
                        <div className="tab-container">
                            <button
                                className={`tab ${isPhoneSelected ? 'active' : 'inactive'}`}
                                onClick={() => setIsPhoneSelected(true)}
                            >
                                Phone
                            </button>
                            <button
                                className={`tab ${!isPhoneSelected ? 'active' : 'inactive'}`}
                                onClick={() => setIsPhoneSelected(false)}
                            >
                                Email
                            </button>
                        </div>

                        {/* Phone Login Form */}
                        {isPhoneSelected && (
                            <div>
                                <p className="login-p1 m-0">Mobile Number</p>
                                <input
                                    type="tel"
                                    placeholder="+91 1234567890"
                                    className="input"
                                />
                                <button className="button" onClick={() => router.push("/Otp")} >Get OTP</button>
                            </div>
                        )}

                        {/* Email Login Form */}
                        {!isPhoneSelected && (
                            <div>
                                <p className="login-p1 m-0">Email Address</p>
                                <input
                                    type="email"
                                    placeholder="Enter Email Address"
                                    className="input"
                                />
                                <div className="login-para">
                                    <p className="login-p1 m-0">Password</p>
                                    <p
                                        className="login-p2 m-0"
                                        onClick={() => setIsForgetPassword(true)}
                                    >
                                        Forgot Password
                                    </p>
                                </div>
                                <input
                                    type="password"
                                    placeholder="Enter Password"
                                    className="input"
                                />
                                 <button className="button" onClick={handlenavigation}>Login</button>
                            </div>
                        )}

                        <p className="or-text">or</p>

                        {/* Google Sign-In Button */}
                        <button className="google-button">
                            <img
                                src="https://img.icons8.com/color/48/000000/google-logo.png"
                                alt="Google"
                                className="google-icon"
                            />
                            Google
                        </button>

                        {/* Footer */}
                        <p className="footer-text mb-0">
                            Don't have any account? <span className="link" onClick={() => router.push("/Signup")} >Create account</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
