"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/Notifications.css";
import { FaEllipsisV, FaBell } from "react-icons/fa";

const Notifications = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [notifications, setNotifications] = useState([]);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notifications/user/${userId}`);
      console.log(response.data,"response of notifications")
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (userId) fetchNotifications();
  }, [userId]);

  // Delete a notification using API
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/notifications/${id}`);
      setNotifications(notifications.filter((notification) => notification._id !== id));
      setSelectedNotificationId(null);
      console.log("Notification deleted successfully!");
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Toggle delete menu
  const toggleOptions = (id) => {
    setSelectedNotificationId(selectedNotificationId === id ? null : id);
  };

  return (
    <>
      <h2 className="item-header">Notifications</h2>
      <div className="notifications-container">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={notification._id}
              className={`notification-item ${index % 2 === 0 ? "highlight" : ""}`}
            >
              <div className="notification-icon">
                <img src={notification.icon} alt="" />
              </div>
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
              </div>
              <div className="notification-meta">
                <span className="time">{new Date(notification.sentAt).toLocaleString()}</span>
                <FaEllipsisV className="options-icon" onClick={() => toggleOptions(notification._id)} />
                {selectedNotificationId === notification._id && (
                  <div className="delete-option">
                    <button onClick={() => handleDelete(notification._id)}>Delete</button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-notifications">
            <FaBell className="no-notifications-icon" />
            <p className="no-notifications-text">No notifications found</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Notifications;
