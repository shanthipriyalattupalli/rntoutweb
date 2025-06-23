"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../../styles/Notifications.css";
import { FaEllipsisV, FaBell, FaEdit, FaTrash } from "react-icons/fa";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Notifications = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const token = Cookies.get("userToken");
  const [notifications, setNotifications] = useState([]);
  const [selectedNotificationId, setSelectedNotificationId] = useState(null);
  const userId = Cookies.get("userId");

  const [isRead, setIsRead] = useState(false);
  // Fetch notifications from API
  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/notifications/user/${userId}`);

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

    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };


  const handleMarkAsRead = async (id) => {
    console.log("Marking notification as read:", token);
    try {
      const response = await axios.patch(`${BASE_URL}/notifications/read/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Notification marked as read:", response.data);
      if (response.data.success === true) {
        setIsRead(true);
        setSelectedNotificationId(null);
        fetchNotifications();

      }



    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };


  // Toggle delete menu
  const toggleOptions = (id) => {
    setSelectedNotificationId(selectedNotificationId === id ? null : id);
  };
  console.log("Notifications:", notifications);

  return (
    <>
      <h2 className="item-header">Notifications</h2>
      <div className="notifications-container">
        {notifications.length > 0 ? (
          notifications.map((notification, index) => (
            <div
              key={notification._id}
              className={`notification-item ${notification?.isRead ? "" : "highlight"}`}
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
                    <button onClick={() => {
                      if (!notification.isread) {
                        handleMarkAsRead(notification._id);
                      }
                    }} className="option-content"><FaEdit />{notification.isRead ? "Read" : "Mark as Read"}</button>

                    <button onClick={() => handleDelete(notification._id)} className="option-content"><FaTrash />Delete</button>
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
