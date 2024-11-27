'use client';

import React, { useState } from "react";
import "@/styles/ProfileSettings.css";
const profile_avatar = "/Assets/profile_avatar.png";

export default function ProfileSettings() {
  const [isEditable, setIsEditable] = useState(false);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };
  
  return (
    <div className="profile-settings">
      <div className="item-header">
        <h2>Profile Settings</h2>        
          <a href="#" className="edit-btn" onClick={toggleEdit}>
            {isEditable ? 'Save' : 'Edit'}
          </a>
      </div>
      <div className="form">
        <div className="avatar-section">
          <img src={profile_avatar} alt="Profile Avatar" />
          <button className="edit-image">Edit Image</button>
        </div>
        <div className="avatar-section_frame">
          <div className="input_group_column">
            <div className="input-group">
              <label>First Name</label>
              <input type="text" placeholder="Mohil" />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input type="text" placeholder="Prajapati" />
            </div>
          </div>
          <div className="input_group_column">
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" placeholder="mohilprajapati99@gmail.com" />
            </div>
            <div className="input-group">
              <label>Mobile Number</label>
              <input type="tel" placeholder="+91 12345 67890" />
            </div>
          </div>
          <div className="gender-section">
            <label>Gender</label>
            <div className="gender_frame_line">
              <div><input type="radio" name="gender" value="male" checked /> Male</div>
              <div><input type="radio" name="gender" value="female" /> Female</div>
              <div><input type="radio" name="gender" value="other" /> Other</div>
            </div>
          </div>
          <div className="input-group">
            <label>Date of Birth</label>
            <input type="date" />
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
}

