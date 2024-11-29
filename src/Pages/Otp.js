import React,{useState} from 'react';
const Rntout =  "/Assets/Rntout_Logo.png";
import "@/styles/Otp.css";
import { useRouter } from "next/navigation";

const Otp = () => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const phoneNumber = "+91 12345 67890";
    const handleChange = (index, value) => {
        if (/^\d*$/.test(value)) {
          const updatedOtp = [...otp];
          updatedOtp[index] = value;
          setOtp(updatedOtp);
    
          // Automatically focus on the next input if value is entered
          if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`).focus();
          }
        }
      };
    
      const handleBackspace = (index, value) => {
        if (!value && index > 0) {
          document.getElementById(`otp-${index - 1}`).focus();
        }
      };
     
      const router = useRouter();
      

      const handlenavigation = () => {
        localStorage.setItem('name','vishnu')
        router.push("/");
      }
  return (
    <div className="otp-container">
        <div className="login-first">
        <img src={Rntout } alt="RentOut Logo" className="login-logo" />
        <h2 className="subtitle">Sign in to RntOut</h2>
      </div>
      <div className='otp-card'>
      <h2 className="otp-heading">OTP Verification</h2>
      <p className="otp-subtext">
        We've sent a One Time Password (OTP) to the mobile<br/>number above. Please
        enter it to complete verification.
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

      <button className="button" onClick={handlenavigation}>continue</button>
      

      <p className="otp-resend">
        <span className="otp-resend-link">
          Resend OTP
        </span>
      </p>
      <p className="or-text">or</p>
      <button className="button1">Sign in with your password</button>
      </div>
    </div>
  )
}

export default Otp;