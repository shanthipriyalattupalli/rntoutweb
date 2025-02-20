"use client";

import React, { useState } from "react";
// import "@/styles/Signup.css";
import '../../styles/Signup.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";

const Rntout = "/Assets/Rntout_Logo.png";
const profile_avatar = "/Assets/profile_avatar.png";

const Signup = ({setIsRegisterOpen}) => {
  const [profile, setProfile] = useState({
    user: {
      name: "",
      email: ""
    },
    dateOfBirth: "",
    gender: "",
    profilePic: ""
  });
  console.log(profile,"profile")
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const token = typeof window !== 'undefined' ? localStorage.getItem("userToken") : null;


  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split("."); // Split keys by dot notation
    setProfile((prev) => {
      let updatedProfile = { ...prev };
      let temp = updatedProfile;
      while (keys.length > 1) {
        temp = temp[keys.shift()];
      }
      temp[keys[0]] = value; // Update the final key
      return updatedProfile;
    });
  };

  // Handle form submission
  // const handleCreateAccount = async () => {


  //   const { name, role, email, mobile, password, confirmPassword } = formData;
  //   console.log(role, "role")
  //   // Validation
  //   if (!name || !role || !email || !mobile || !password || !confirmPassword) {
  //     toast.error("All fields are required.");
  //     return;
  //   }

  //   if (password !== confirmPassword) {
  //     toast.error("Passwords do not match.");
  //     return;
  //   }

  //   setIsLoading(true);
  //   try {
  //     console.log(role, "role123")
  //     const response = await axios.post(`${BASE_URL}/users`, {
  //       name,
  //       role,
  //       email,
  //       mobile,
  //       password,
  //     });
  //     console.log(response);
  //     setIsLoading(false);

  //     if (response.status === 201) {
  //       toast.success(response.data.message || "Account created successfully!");
  //       router.push("/Login");
  //     } else {
  //       toast.error(
  //         response.data.error || "Failed to create account. Try again."
  //       );
  //     }
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.log(error, "error")
  //     toast.error(
  //       error.response?.data?.error ||
  //       "Something went wrong. Please try again later."
  //     );
  //   }
  // };


  const handleSubmitProfile=async()=>{
    try {
      const response = await axios.post(`${BASE_URL}/profile/add-or-update-user-profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response, "profile updated");
      const user=response.data.user
      const profiles=response.data.profile
      toast.success("Profile updated successfully!");
      localStorage.setItem("gender", profiles.gender);
      localStorage.setItem("userName", user.name );
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("profilePic", profile_avatar);

  
          router.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  }


  const handleSkip=()=>{
    router.push("/");
    // window.location.reload();
  }

  return (
    <div>
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='signup-container'>

        <div className='signup-card'>
          <div className='login-first'>
            <img src={Rntout} alt='RentOut Logo' className='login-logo' />
            <h2 className='subtitle'>Sign up for RntOut</h2>
          </div>
          <p className='login-p1 m-0'>Name</p>
          <input
            type='text'
            placeholder='Enter First Name'
            className='input'
            name='user.name'
            value={profile.user.name}
            onChange={handleChange}
          />
          {/* <p className='login-p1 m-0'>Role</p>
          <input
            type='text'
            placeholder='Enter role'
            className='input'
            name='role'
            value={formData.role}
            onChange={handleInputChange}
          /> */}
          <p className='login-p1 m-0'>Email Address</p>
          <input
            type='email'
            placeholder='Enter Email Address'
            className='input'
            name='user.email'
            value={profile.user.email}
            onChange={handleChange}
          />
          {/* <p className='login-p1 m-0'>Mobile Number</p>
          <input
            type='tel'
            placeholder='Enter Mobile Number'
            className='input'
            name='mobile'
            value={profile.mobile}
            onChange={handleChange}
          /> */}
          <p className='login-p1 m-0'>Gender</p>
          <select
            name='gender'
            className='input'
            value={profile.gender}
            onChange={handleChange}
          >
            <option value='' disabled>Select Gender</option>
            <option value='Male' name="gender">Male</option>
            <option value='Female' name="gender">Female</option>
            <option value='Other' name="gender">Other</option>
          </select>

          <p className='login-p1 m-0'>Date Of Birth</p>
          <input
            type='date'
            placeholder='Confirm Password'
            className='input'
            name='dateOfBirth'
            value={profile.dateOfBirth}
            onChange={handleChange}
          />
          <button
            className='button'
            onClick={handleSubmitProfile}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Continue"}
          </button>
          <button className="font-medium text-semibold text-md text-blue-300" onClick={()=>handleSkip()}>Skip</button>
          {/* <p className='or-text'>or</p> */}
          {/* <button className='google-button'>
            <img
              src='https://img.icons8.com/color/48/000000/google-logo.png'
              alt='Google'
              className='google-icon'
            />
            Google
          </button>
          <p className='footer-text mb-0'>
            Already have an account?{" "}
            <span className='link' >
              Log In
            </span>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Signup;
