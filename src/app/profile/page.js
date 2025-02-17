"use client"

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import '../../styles/ProfileSettings.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const profile_avatar = "/Assets/profile_avatar.png";
import { useRouter } from 'next/navigation';

export default function ProfileSettings() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [avatar, setAvatar] = useState(profile_avatar); // default avatar
  const fileInputRef = useRef(null);
  const [isEditable, setIsEditable] = useState(false);
  const [profile, setProfile] = useState({
    user: {
      name: "",
      email: ""
    },
    dateOfBirth: "",
    gender: "",
    profilePic: ""
  });
  

  console.log(profile,"profile");
  const [selectedFile, setSelectedFile] = useState(null); // to store selected image file

  const token = typeof window !== 'undefined' ? localStorage.getItem("userToken") : null;


    const fetchProfile = async () => {
      console.log(token, "token");
      try {
        const response = await axios.get(`${BASE_URL}/profile/view-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data, "profiledata");
        // setProfile(response.data.profile.user);
        setProfile(response.data.profile)
        setAvatar(response.data.profile.profilePic)
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch profile.");
      }
    };
    useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);




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

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
  
    if (files && files.length > 0) {
      const file = files[0]; // Get the first file
  
      // Show preview
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatar(newAvatarUrl);
  
      // Store the file object in profilePic
      setProfile((prev) => ({
        ...prev,
        profilePic: file, // Store the File object directly
      }));
  
      toast.success("Profile picture updated successfully!");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUploadProfile = async () => {
    if (!selectedFile) {
      toast.error("Please select a profile image first.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const response = await axios.post(`${BASE_URL}/profile/upload-picture`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data, "profile picture uploaded");
      toast.success("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to upload profile picture.");
    }
  };


  const handleSubmitProfile=async()=>{
    const formData = new FormData();
    formData.append("profilePic", profile.profilePic); // Attach file
    formData.append("name", profile.user.name);
    formData.append("email", profile.user.email);
    formData.append("dateOfBirth", profile.dateOfBirth);
    formData.append("gender", profile.gender);
    try {
      const response = await axios.post(`${BASE_URL}/profile/add-or-update-user-profile`, formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}` },
      });
      console.log(response.data, "profile updated");
      setIsEditable(false);
      fetchProfile()
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }
  }
  const router = useRouter();

  return (
  //   <div className="profile-settings">
  //     <ToastContainer/>
  //     <div className="item-header">
  //       <h2>Profile Settings</h2>
  //   <a className="kyc-btn" onClick={() => router.push("/profile/business-information/Kyc")} >Personal KYC</a>

  //       <a href="#" className="edit-btn"   onClick={() => {
  //   if (isEditable) {
  //     handleSubmitProfile(); 
  //   }
  //   toggleEdit(); 
  // }}>
  //         {isEditable ? 'Save' : 'Edit'}
  //       </a>
  //     </div>
  //     <div className="form">
  //       <div className="avatar-section">
  //         {/* Display the current or selected avatar */}
  //         <img src={avatar} alt="Profile Avatar" className="w-20 h-20 rounded-full border b-2" />
  //         <button className="edit-image" onClick={handleButtonClick} >
  //           Edit Image
  //         </button>
  //         {/* Hidden file input */}
  //         <input
  //           type="file"
  //           ref={fileInputRef}
  //           style={{ display: "none" }}
  //           accept="image/*"
  //           onChange={handleFileChange}
  //           className="input-group"
  //         />
  //       </div>
  //       <div className="avatar-section_frame">
  //         <div className="input_group_column">
  //           <div className="input-group">
  //             <label>Name</label>
  //             <input
  //               type="text"
  //               name="user.name"
  //               value={profile.user.name}
  //               onChange={handleChange}
  //               placeholder="Enter your name"
  //               disabled={!isEditable}
  //             />
  //           </div>
  //         </div>
  //         <div className="input_group_column">
  //           <div className="input-group">
  //             <label>Email Address</label>
  //             <input
  //               type="email"
  //               name="user.email"
  //               value={profile.user.email}
  //               onChange={handleChange}
  //               placeholder="Enter your email"
  //               disabled={!isEditable}
  //             />
  //           </div>
  //         </div>
  //         <div className="gender-section">
  //           <label>Gender</label>
  //           <div className="gender_frame_line">
  //             <div>
  //               <input
  //                 type="radio"
  //                 name="gender"
  //                 value="Male"
  //                 checked={profile.gender === "Male"}
  //                 onChange={handleChange}
  //                 disabled={!isEditable}
  //               /> Male
  //             </div>
  //             <div>
  //               <input
  //                 type="radio"
  //                 name="gender"
  //                 value="Female"
  //                 checked={profile.gender === "Female"}
  //                 onChange={handleChange}
  //                 disabled={!isEditable}
  //               /> Female
  //             </div>
  //             <div>
  //               <input
  //                 type="radio"
  //                 name="gender"
  //                 value="Other"
  //                 checked={profile.gender === "Other"}
  //                 onChange={handleChange}
  //                 disabled={!isEditable}
  //               /> Other
  //             </div>
  //           </div>
  //         </div>

  //         <div className="input-group">
  //           <label>Date of Birth</label>
  //           <input
  //             type="date"
  //             name="dateOfBirth"
  //             value={profile.dateOfBirth}
  //             onChange={handleChange}
  //             disabled={!isEditable}
  //           />
  //         </div>

  //       </div>
  //     </div>
  //     {/* <button onClick={handleUploadProfile}>Upload Profile Picture</button> */}
  //   </div>

  <div className="profile-settings w-full max-w-5xl mx-auto bg-white ">
  <ToastContainer />
  
  <div className="item-header">
    <h2>Profile Settings</h2>
    
    <div className="flex items-center space-x-4">
      <a className="text-green-600 font-medium text-sm cursor-pointer" onClick={() => router.push("/profile/business-information/Kyc")}>
        Personal KYC
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

  <div className="flex flex-col space-y-6  p-4 md:p-6 lg:p-8">
    {/* Avatar Section */}
    <div className="flex items-center space-x-6">
      <img src={avatar} alt="Profile Avatar" className="w-20 h-20 rounded-full border-2" />
      
      <div>
        <button className="bg-gray-200 px-4 py-2 rounded-md text-sm hover:bg-gray-300" onClick={handleButtonClick}>
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
        <label className="text-sm font-semibold">Name</label>
        <input
          type="text"
          name="user.name"
          value={profile.user.name}
          onChange={handleChange}
          placeholder="Enter your name"
          disabled={!isEditable}
          className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
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
      <label className="text-sm font-semibold">Date of Birth</label>
      <input
        type="date"
        name="dateOfBirth"
        value={profile.dateOfBirth}
        onChange={handleChange}
        disabled={!isEditable}
        className="w-full border rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </div>
  </div>
</div>

  );
}
