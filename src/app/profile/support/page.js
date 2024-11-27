'use client';

import React, { useState } from 'react';
import { FaPaperPlane, FaMicrophone, FaImage } from 'react-icons/fa';

import "@/styles/Support.css";

const HelpCenter = () => {
  const [message, setMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

  const handleSend = () => {
    if (message.trim()) {
      setChatMessages([...chatMessages, message]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="help-center">
      <h2 className='item-header'>Help & Support</h2>
      <div className='chat-window'>
      <div className="welcome-section">
        <img src='/Assets/help.png' alt="Help Bot" className="bot-icon" />
        <h3>Welcome to the RntOut help center</h3>
        <p>Use the power of AI to find answers from the web, create written content, and more.</p>
        <div className="instant-answers">
          <button>Track my order</button>
          <button>What is your contact info?</button>
          <button>What is your return policy?</button>
          <button>What time do you open?</button>
          <button>Purchase Limit</button>
          <button>Do you offer discounts for large orders?</button>
          <button>Can I order a specific brand or type of computer?</button>
        </div>
      </div>
      <div className="chat-section">
        <div className="chat-box">
          {chatMessages.map((msg, index) => (
            <div key={index} className="chat-message">
              {msg}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSend}><FaPaperPlane /></button>
          <button className="image-upload1"><FaImage /></button>
          <button className="voice-message"><FaMicrophone /></button>
        </div>
      </div>
      </div>
    </div>
  );
};

export default HelpCenter;
