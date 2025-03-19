"use client";

import React, { useState, useEffect } from "react";
// import "@/styles/Signup.css";
import '../../styles/Signup.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Rntout = "/Assets/Rntout_Logo.png";
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
  const [isLoading, setIsLoading] = useState(false); // For loading state
  const router = useRouter();
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const token = typeof window !== 'undefined' ? localStorage.getItem("userToken") : null;


  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split("."); 
    let isValid = true;
  
    if (name === "user.name") {
      const nameRegex = /^[A-Za-z\s]*$/; 
      isValid = nameRegex.test(value);
    }
  
    if (name === "user.email") {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; 
      isValid = emailRegex.test(value);
    }
  
    if (!isValid) return; 
  
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
  

  const fetchProfile = async () => {

    try {
      const response = await axios.get(`${BASE_URL}/profile/view-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

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


  const handleSkip = () => {
    router.push("/");
    window.location.reload();
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

          <p className='login-p1 m-0'>Email Address</p>
          <input
            type='email'
            placeholder='Enter Email Address'
            className='input'
            name='user.email'
            value={profile.user.email}
            onChange={handleChange}
          />

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
            type="date"
            className="input"
            name="dateOfBirth"
            value={profile.dateOfBirth}
            onChange={handleChange}
            max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
              .toISOString()
              .split("T")[0]}
          />

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
    </div>
  );
};

export default Signup;
