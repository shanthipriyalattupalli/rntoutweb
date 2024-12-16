// components/MenuItems.js
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import '@/styles/Adddetail.css';

const MenuItems = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
    const categoryId =localStorage.getItem('selectedcategoryId')
    const [subcategories,setSubcategories]=useState([])

    const fetchSubCategories=async()=>{
        try {
            const response= await axios.get(`${BASE_URL}/subcategories/categories/${categoryId}`)
            console.log(response.data,"subcategories by category");
            setSubcategories(response.data);
            
        } catch (error) {
            console.error('Error fetching subcategories:', error);   
        }
    }
    useEffect(()=>{
        fetchSubCategories();
    }, [categoryId])
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
                {subcategories.map((item) => (
                    <li
                        key={item._id}
                        className={`menu-item ${activeItem === item._id ? 'active' : ''}`}
                        onClick={() => handleItemClick(item._id)}
                    >
                        {item.subCategoryName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuItems;
