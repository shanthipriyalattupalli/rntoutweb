"use client";

import React, { useState, useEffect } from "react";
// import "@/styles/Signup.css";
import '../../styles/Signup.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Rntout = "/Assets/Rntout_Logo.svg";
const profile_avatar = "/Assets/profile_avatar.png";

const Signup = ({ setIsRegisterOpen }) => {
  const [profile, setProfile] = useState({
    user: {
      name: "",
      email: ""
    },
    dateOfBirth: "",
    gender: "",
    profilePic: ""
  });

  console.log(profile, "profileformdata")
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const router = useRouter();

  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const token = typeof window !== 'undefined' ? localStorage.getItem("userToken") : null;
  const [errors, setErrors] = useState({ name: null, email: null, dateOfBirth: null });



  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    setProfile((prev) => {
      let updatedProfile = { ...prev };
      let temp = updatedProfile;
      while (keys.length > 1) {
        temp = temp[keys.shift()];
      }
      temp[keys[0]] = value;
      return updatedProfile;
    });
  };


  const fetchProfile = async () => {

    try {
      const response = await axios.get(`${BASE_URL}/profile/view-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data, "profile data");
      const profileData = response.data.profile;

      const formattedDate = profileData.dateOfBirth
        ? profileData.dateOfBirth.split("T")[0]
        : "";

      setProfile({
        ...profileData,
        dateOfBirth: formattedDate,
      });


    } catch (error) {
      console.error(error);

    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);


  const handleSubmitProfile = async () => {

    let validationErrors = {};

    if (!profile.user.name.trim()) {
      validationErrors.name = "Name is required.";
    }
    if (!profile.dateOfBirth.trim()) {
      validationErrors.dateOfBirth = "Date of Birth is required.";
    }
    if (!profile.user.email.trim()) {
      validationErrors.email = "Email is required.";
    } else if (!validateEmail(profile.user.email)) {
      validationErrors.email = "Invalid email format.";
    }
  
    console.log(validationErrors); // Check what errors are collected
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error("Please fix validation errors.");
      return;
    }



    try {
      const response = await axios.post(`${BASE_URL}/profile/add-or-update-user-profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const user = response.data.user
      const profiles = response.data.profile
      toast.success("Profile updated successfully!");
      localStorage.setItem("gender", profiles.gender);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userEmail", user.email);
      localStorage.setItem("profilePic", profile.profilePic || profile_avatar);

      Cookies.set("gender", profiles.gender, { expires: 7, secure: true, sameSite: "Strict" });
      Cookies.set("userName", user.name, { expires: 7, secure: true, sameSite: "Strict" });
      Cookies.set("userEmail", user.email, { expires: 7, secure: true, sameSite: "Strict" });
      Cookies.set("profilePic", profile.profilePic || profile_avatar, { expires: 7, secure: true, sameSite: "Strict" });

      router.push("/");
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  }


  const   handleSkip = () => {
    router.push("/");
    window.location.reload();
  }


console.log(errors,"errors in")
  return (
    
      <div className='signup-container'>
      <ToastContainer position='top-right' autoClose={3000} />

        <div className='signup-card'>
          <div className='login-first'>
            <img src={Rntout} alt='RentOut Logo' className='login-logo' />
            <h2 className='subtitle'>Basic Information</h2>
          </div>
<div className="flex flex-col gap-6">
          <div className="flex text-left flex-col gap-2">
            <p className='login-p1 m-0'>Name
            <span className="text-red-500">*</span>
            </p>
            {errors?.name && <p className="text-red-500 text-sm mt-1">{errors?.name}</p>}

            <input
              type='text'
              placeholder='Enter First Name'
              className='input-signup'
              name='user.name'
              value={profile.user.name}
              onChange={handleChange}
            />
          </div>
          <div className="flex text-left flex-col gap-2">
            <p className='login-p1 m-0'>Email Address
            <span className="text-red-500">*</span>
            </p>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            <input
              type='email'
              placeholder='Enter Email Address'
              className='input-signup'
              name='user.email'
              value={profile.user.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex text-left flex-col gap-2" >
            <p className='login-p1 m-0'>Gender</p>
            <select
              name='gender'
              className='input-signup'
              value={profile.gender}
              onChange={handleChange}
            >
              <option value='' disabled>Select Gender</option>
              <option value='Male' name="gender">Male</option>
              <option value='Female' name="gender">Female</option>
              <option value='Other' name="gender">Other</option>
            </select>
          </div>
          <div className="flex text-left flex-col gap-2">
            <p className='login-p1 m-0'>Date Of Birth
            <span className="text-red-500">*</span>
            </p>
            {errors.dateOfBirth && <p className="text-red-500 text-left text-sm mt-1">{errors.dateOfBirth}</p>}

            <input
              type="date"
              className="input-signup"
              name="dateOfBirth"
              value={profile.dateOfBirth}
              onChange={handleChange}
              max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
                .toISOString()
                .split("T")[0]}
            />
          </div>
          </div>

          <button
            className='button'
            onClick={handleSubmitProfile}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Continue"}
          </button>
          <button className="font-medium text-semibold text-md text-blue-300" onClick={() => handleSkip()}>Skip</button>
        </div>
      </div>
  
  );
};

export default Signup;
