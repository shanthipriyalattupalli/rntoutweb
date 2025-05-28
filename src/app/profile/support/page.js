"use client";

import React, { useState } from "react";
import { FaPaperPlane, FaMicrophone, FaImage } from "react-icons/fa";

// import "@/styles/Support.css";
import '../../../styles/Support.css';

const HelpCenter = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleSend = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, message]);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className='help-center'>
      <h2 className='item-header'>Help & Support</h2>
      <div className='chat-window'>
        <div className='welcome-section'>
          <img src='/Assets/help.png' alt='Help Bot' className='bot-icon' />
          <h3>Welcome to the RntOut help center</h3>
          <p>
            Use the power of AI to find answers from the web, create written
            content, and more.
          </p>

          <div className="help-content">
            <div className="support-content">
              <div>
            <span>Email: </span>
              <span> rntouthyd@gmail.com</span>
              </div>
              <div>
            <span>Contact Us: </span>
            <span> +91 8886500060</span>
            </div>
            </div>

            </div>

        </div>

      </div>
    </div>
  );
};

export default HelpCenter;
