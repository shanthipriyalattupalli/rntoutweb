"use client"

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import '../../styles/ProfileSettings.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const profile_avatar = "/Assets/profile_avatar.png";

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
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const newAvatarUrl = URL.createObjectURL(file);
      setAvatar(newAvatarUrl);
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
    try {
      const response = await axios.post(`${BASE_URL}/profile/add-or-update-user-profile`, profile, {
        headers: { Authorization: `Bearer ${token}` },
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


  return (
    <div className="profile-settings">
      <ToastContainer/>
      <div className="item-header">
        <h2>Profile Settings</h2>
        <a href="#" className="edit-btn"   onClick={() => {
    if (isEditable) {
      handleSubmitProfile(); 
    }
    toggleEdit(); 
  }}>
          {isEditable ? 'Save' : 'Edit'}
        </a>
      </div>
      <div className="form">
        <div className="avatar-section">
          {/* Display the current or selected avatar */}
          <img src={avatar} alt="Profile Avatar" />
          <button className="edit-image" onChange={handleFileChange}>
            Edit Image
          </button>
          {/* Hidden file input */}
          {/* <input
            type="file"
            ref={fileInputRef}
            // style={{ display: "none" }}
            accept="image/*"
            onChange={handleFileChange}
            className="input-group"
          /> */}
        </div>
        <div className="avatar-section_frame">
          <div className="input_group_column">
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="user.name"
                value={profile.user.name}
                onChange={handleChange}
                placeholder="Enter your name"
                disabled={!isEditable}
              />
            </div>
          </div>
          <div className="input_group_column">
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="user.email"
                value={profile.user.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={!isEditable}
              />
            </div>
          </div>
          <div className="gender-section">
            <label>Gender</label>
            <div className="gender_frame_line">
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={profile.gender === "Male"}
                  onChange={handleChange}
                  disabled={!isEditable}
                /> Male
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={profile.gender === "Female"}
                  onChange={handleChange}
                  disabled={!isEditable}
                /> Female
              </div>
              <div>
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={profile.gender === "Other"}
                  onChange={handleChange}
                  disabled={!isEditable}
                /> Other
              </div>
            </div>
          </div>

          <div className="input-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={profile.dateOfBirth}
              onChange={handleChange}
              disabled={!isEditable}
            />
          </div>

        </div>
      </div>
      {/* <button onClick={handleUploadProfile}>Upload Profile Picture</button> */}
    </div>
  );
}
