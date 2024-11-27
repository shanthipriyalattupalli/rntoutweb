// components/MenuItems.js
import React, { useState } from 'react';
import '@/styles/Adddetail.css';

const MenuItems = () => {
    // Array containing all menu items
    const menuItems = [
        "Camping Gear", "Outdoor Gear", "Beach Equipment", "Sports Equipment", 
        "Cameras", "Lenses", "Lighting Equipment", "Drones", 
        "Gimbals and Stabilizers", "Tripods and Monopods", "Microphones", 
        "Audio Mixers", "PA Systems and Speakers", "DJ Equipment", 
        "Studio Monitors", "Headphones and IEMs (In-Ear Monitors)", 
        "Projectors", "LED Screens/Display Panels", "Sound Systems", 
        "Video Conferencing Equipment", "Lighting Systems", "AV Control Systems", 
        "Recording Devices", "LED Par Cans and Uplighting", "Moving Head Lights", 
        "Stage Lighting and Spotlights", "Laser Lights and Effects", 
        "Fog Machines and Special Effects", "DMX Controllers and Lighting Consoles"
    ];

    // State to track the active menu item
    const [activeItem, setActiveItem] = useState(menuItems[0]);

    // Handle click event to set active item
    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div className="sidebar-menu">
            <div className="menu-header">
                <span className="category-title">VACATION EQUIPMENTS</span>
                <button className="change-button">Change</button>
            </div>
            <ul className="menu-list">
                {menuItems.map((item, index) => (
                    <li
                        key={index}
                        className={`menu-item ${activeItem === item ? 'active' : ''}`}
                        onClick={() => handleItemClick(item)}
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuItems;
