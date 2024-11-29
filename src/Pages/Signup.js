import React from 'react'
import "@/styles/Signup.css";
const Rntout =  "/Assets/Rntout_Logo.png";
const Signup = () => {
  return (
    <div>
    <div className='signup-container'>
        <div className="login-first">
        <img src={Rntout } alt="RentOut Logo" className="login-logo" />
        <h2 className="subtitle">Sign in to RntOut</h2>
      </div>
      <div className='signup-card'>
     <div className='signup-input'>
        <div className='signup-group'>
     <p className="login-p1 m-0">First Name</p>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="input"
                />
                </div>
            <div className='signup-group'>
    <p className="login-p1 m-0">Last Name</p>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="input"
                />
                </div>
     </div>
      <p className="login-p1 m-0">Email Address</p>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="input"
                />
    <p className="login-p1 m-0">Mobile Number</p>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="input"
                />
                <p className="login-p1 m-0">Password</p>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="input"
                />
                <p className="login-p1 m-0">Confirm Password</p>
                <input
                  type="email"
                  placeholder="Enter Email Address"
                  className="input"
                />
                 <button className="button">create account</button>
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

<p className="footer-text mb-0">
              Already have any account? <span className="link"  >Log In</span>
            </p>
      </div>
      
    </div>
    </div>
  )
}

export default Signup;