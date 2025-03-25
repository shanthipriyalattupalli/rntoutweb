"use client"

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from 'next/link'
import Image from "next/image";
import '../../styles/ProfileSettings.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const profile_avatar = "/Assets/profile_avatar.png";
const Photo = "/Assets/Photo.png";
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from "react-icons/io";
import KYCVerification from "@/Components/Kyc/Kyc";
const verified ='/Assets/verified.svg';
import Cookies from "js-cookie";



export default function ProfileSettings() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [avatar, setAvatar] = useState(profile_avatar);
  const fileInputRef = useRef(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isKyc,setIsKyc]=useState(false);
  const [profile, setProfile] = useState({
    user: {
      name: "",
      email: ""
    },
    dateOfBirth: "",
    gender: "",
    profilePic: ""
  });

  const [errors, setErrors] = useState({ name: "", dateOfBirth: "" });

  const [selectedFile, setSelectedFile] = useState(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem("userToken") : null;


  const fetchProfile = async () => {

    try {
      const response = await axios.get(`${BASE_URL}/profile/view-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
console.log(response.data,"profile")
      const profileData = response.data.profile;


      const formattedDate = profileData.dateOfBirth
        ? profileData.dateOfBirth.split("T")[0]  
        : "";

      setProfile({
        ...profileData,
        dateOfBirth: formattedDate, // Store in the correct format
      });

      setAvatar(profileData.profilePic || profile_avatar);
      localStorage.setItem("gender", profileData.gender);
      localStorage.setItem("userName", profileData.user.name);
      localStorage.setItem("userEmail", profileData.user.email);
      localStorage.setItem("profilePic", profileData.profilePic || profile_avatar);

            Cookies.set("gender", profileData.gender, { expires: 7, secure: true, sameSite: "Strict" });
            Cookies.set("userName", profileData.user.name, { expires: 7, secure: true, sameSite: "Strict" });
            Cookies.set("userEmail", profileData.user.email, { expires: 7, secure: true, sameSite: "Strict" });
            Cookies.set("profilePic", profileData.profilePic || profile_avatar, { expires: 7, secure: true, sameSite: "Strict" });

    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch profile.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);




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
  
    let newErrors = { ...errors };
  
    // Name Validation
    if (name === "user.name") {
      const namePattern = /^[A-Za-z\s]+$/;
      if (!namePattern.test(value) && value !== "") {
        newErrors.name = "Only letters and spaces are allowed.";
      } else {
        delete newErrors.name;
      }
    }
  
    // Email Validation
    if (name === "user.email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        newErrors.email = "Invalid email format.";
      } else {
        delete newErrors.email;
      }
    }
  
    setErrors(newErrors);
  };
  

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];


      const newAvatarUrl = URL.createObjectURL(file);
      setAvatar(newAvatarUrl);


      setProfile((prev) => ({
        ...prev,
        profilePic: file,
      }));

      // toast.success("Profile picture updated successfully!");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };




  const handleSubmitProfile = async () => {

    let validationErrors = {};

    if (!profile.user.name.trim()) {
      validationErrors.name = "Name is required.";
      
    }
    if (!profile.dateOfBirth.trim()) {
      validationErrors.dateOfBirth = "Date of Birth is required.";
    }

    
  
    // If there are errors, update state and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", profile.profilePic);
    formData.append("name", profile.user.name);
    formData.append("email", profile.user.email);
    formData.append("dateOfBirth", profile.dateOfBirth);
    formData.append("gender", profile.gender);

    try {
      const response = await axios.post(`${BASE_URL}/profile/add-or-update-user-profile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setIsEditable(false);
      fetchProfile();
      toast.success("Profile updated successfully!");
      window.dispatchEvent(new CustomEvent("profileUpdated", {
        detail: { profilePic: response.data.profile.profilePic }
      }));


    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  const router = useRouter();
  console.log(profile,"profile")

  return (
  <div className="profile-settings bg-white ">
      <ToastContainer />

      <div className="item-header">
   <Link href='/' className='flex flex-row gap-1'> Profile Settings</Link>

        <div className="flex items-center space-x-4">
          <a href = "/profile/kyc" className="text-green-600 font-medium text-sm cursor-pointer" >
            Personal KYC ?
          </a>

          <a className="text-blue-600 font-medium text-sm cursor-pointer" onClick={() => {
            if (isEditable) {
              handleSubmitProfile();
            }
            toggleEdit();
          }}>
            {isEditable ? "Save" : "Edit"}
          </a>
        </div>
      </div>
      {/* <div className="w-max-screen flex justify-between p-1 px-2 bg-green-100 rounded ">
        <span className="flex gap-2 text-green-700 font-semibold"><Image src={verified} width={20} height={20}/>  Kyc Verified</span>
        <span className="text-green-700 font-sm">Your account is KYC Verified, Now you can take things on rent</span>
      </div> */}

      <div className="flex flex-col space-y-6  p-4 md:p-6 lg:p-8">
        {/* Avatar Section */}
        <div className="flex items-center space-x-6">
          <img src={avatar} alt="Profile Avatar" className="w-20 h-20 rounded-full border-2" />

          <div>
            <button className={` px-4 py-2 rounded-md text-sm font-md ${isEditable ? "bg-blue-400":"bg-gray-200"}`} onClick={handleButtonClick}  disabled={!isEditable}>
              Edit Image
            </button>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        </div>

        {/* Profile Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name Input */}
<div className="flex flex-col">
  <label className="text-sm font-semibold">Name <span className="text-red-500">*</span></label>
  <input
    type="text"
    name="user.name"
    value={profile.user.name}
    onChange={handleChange}
    placeholder="Enter your name"
    disabled={!isEditable}
    className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
  />
  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
</div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold">Email Address</label>
            <input
              type="email"
              name="user.email"
              value={profile.user.email}
              onChange={handleChange}
              placeholder="Enter your email"
              disabled={!isEditable}
              className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

          </div>
        </div>

        {/* Gender Section */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold">Gender</label>
          <div className="flex space-x-4">
            {["Male", "Female", "Other"].map((gender) => (
              <label key={gender} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="gender"
                  value={gender}
                  checked={profile.gender === gender}
                  onChange={handleChange}
                  disabled={!isEditable}
                  className="cursor-pointer"
                />
                <span>{gender}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date of Birth */}
        <div className="flex flex-col">
  <label className="text-sm font-semibold">Date of Birth <span className="text-red-500">*</span></label>
  <input
    type="date"
    name="dateOfBirth"
    value={profile.dateOfBirth}
    onChange={handleChange}
    disabled={!isEditable}
    className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
    max={new Date(new Date().setFullYear(new Date().getFullYear() - 18))
      .toISOString()
      .split("T")[0]}
  />
  {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
</div>
      </div>
    </div>

  );
}
