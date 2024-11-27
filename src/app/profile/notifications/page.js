'use client';
import React, { useState } from 'react';
import "@/styles/Notifications.css";
const chair = "/Assets/chair.png";
import { FaEllipsisV } from 'react-icons/fa';

const initialNotifications = [
    { id: 1, title: 'New Feature Alert!', message: "We're pleased to introduce the latest enhancements in our templating experience.", time: '15h', icon: chair },
    { id: 2, title: 'New Feature Alert!', message: "We're pleased to introduce the latest enhancements in our templating experience.", time: '15h', icon: chair },
    { id: 3, title: 'New Feature Alert!', message: "We're pleased to introduce the latest enhancements in our templating experience.", time: '15h', icon: chair },
    { id: 4, title: 'New Feature Alert!', message: "We're pleased to introduce the latest enhancements in our templating experience.", time: '15h', icon: chair },
    { id: 5, title: 'New Feature Alert!', message: "We're pleased to introduce the latest enhancements in our templating experience.", time: '15h', icon: chair },
    { id: 6, title: 'New Feature Alert!', message: "We're pleased to introduce the latest enhancements in our templating experience.", time: '15h', icon: chair },
    { id: 7, title: 'New Feature Alert!', message: "We're pleased to introduce the latest enhancements in our templating experience.", time: '15h', icon: chair },
    { id: 8, title: 'New Feature Alert!', message: "We're pleased to introduce the latest enhancements in our templating experience.", time: '15h', icon: chair },

    // Add more notifications as needed
];

const Notifications = () => {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [selectedNotificationId, setSelectedNotificationId] = useState(null);

    // Function to delete a notification by ID
    const handleDelete = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
        setSelectedNotificationId(null); // Close the menu after deletion
    };

    // Function to toggle the delete option menu
    const toggleOptions = (id) => {
        setSelectedNotificationId(selectedNotificationId === id ? null : id);
    };

    return (
        <>
        <h2 className='item-header'> Notifications</h2>
        <div className="notifications-container">
            {notifications.map((notification, index) => (
                <div key={notification.id} className={`notification-item ${index % 2 === 0 ? 'highlight' : ''}`}>
                    <div className="notification-icon">
                        <img src={notification.icon} alt="Notification Icon" />
                    </div>
                    <div className="notification-content">
                        <h3>{notification.title}</h3>
                        <p>{notification.message}</p>
                    </div>
                    <div className="notification-meta">
                        <span className="time">{notification.time}</span>
                        <FaEllipsisV className="options-icon" onClick={() => toggleOptions(notification.id)} />
                        {selectedNotificationId === notification.id && (
                            <div className="delete-option">
                                <button onClick={() => handleDelete(notification.id)}>Delete</button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};

export default Notifications;
