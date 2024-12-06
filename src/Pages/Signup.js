import React, { useState } from "react";
import "@/styles/Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const Rntout = "/Assets/Rntout_Logo.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    role:"",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const router = useRouter();

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleCreateAccount = async () => {
    const { name,role, email, mobile, password, confirmPassword } = formData;

    // Validation
    if (!name || !role || !email || !mobile || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:6001/api/users", {
       name,
       role,
        email,
        mobile,
        password,
      });
      console.log(response);
      setIsLoading(false);

      if (response.status === 201) {
        toast.success(response.data.message || "Account created successfully!");
        router.push("/Login");
      } else {
        toast.error(response.data.error || "Failed to create account. Try again.");
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(
        error.response?.data?.error || "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="signup-container">
        <div className="login-first">
          <img src={Rntout} alt="RentOut Logo" className="login-logo" />
          <h2 className="subtitle">Sign up for RntOut</h2>
        </div>
        <div className="signup-card">
          <p className="login-p1 m-0">Name</p>
          <input
            type="text"
            placeholder="Enter First Name"
            className="input"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <p className="login-p1 m-0">Role</p>
          <input
            type="text"
            placeholder="Enter role"
            className="input"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          />
          <p className="login-p1 m-0">Email Address</p>
          <input
            type="email"
            placeholder="Enter Email Address"
            className="input"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <p className="login-p1 m-0">Mobile Number</p>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            className="input"
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
          />
          <p className="login-p1 m-0">Password</p>
          <input
            type="password"
            placeholder="Enter Password"
            className="input"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <p className="login-p1 m-0">Confirm Password</p>
          <input
            type="password"
            placeholder="Confirm Password"
            className="input"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <button
            className="button"
            onClick={handleCreateAccount}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
          <p className="or-text">or</p>
          <button className="google-button">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google"
              className="google-icon"
            />
            Google
          </button>
          <p className="footer-text mb-0">
            Already have an account?{" "}
            <span className="link" onClick={() => router.push("/Login")}>
              Log In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
