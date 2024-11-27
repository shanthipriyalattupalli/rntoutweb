"use client";

import React, { useState } from 'react';

const InfrastructureIcon = '/Assets/Icons/braces_line.png';
const FurnitureIcon = '/Assets/Icons/sofa_line.png';
const MedicalIcon = '/Assets/Icons/first_aid_kit_line.png';
const VacationIcon = '/Assets/Icons/umbrella_line.png';
const VehiclesIcon = '/Assets/Icons/car_line.png';
const PartyIcon = '/Assets/Icons/celebrate_line.png';
const SportIcon = '/Assets/Icons/football_line.png';
const KitchenIcon = '/Assets/Icons/fork_spoon_line.png';

const Submenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  const menuItems = [
    { label: 'IT Infrastructure', icon: InfrastructureIcon },
    { label: 'Furniture', icon: FurnitureIcon },
    { label: 'Medical Equipment', icon: MedicalIcon },
    { label: 'Vacation Equipment', icon: VacationIcon },
    { label: 'Vehicles', icon: VehiclesIcon },
    { label: 'Party Material', icon: PartyIcon },
    { label: 'Sport & Gym', icon: SportIcon },
    { label: 'Household & Kitchen', icon: KitchenIcon },
  ];

  return (
    <div className="container mx-auto flex mt-4 pt-4">
      <nav className="flex flex-row gap-4 overflow-x-auto">
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleMenuClick(item.label)}
            className={`flex items-center gap-1 px-1 py-1 border-t border-l border-r rounded-t-lg ${
              activeMenu === item.label ? 'bg-white text-red-500' : 'bg-slate-200'
            } hover:bg-white transition-colors duration-300`}
          >
            <img
              src={item.icon}
              alt={item.label}
              className={`h-5 w-5 transition-transform duration-300 ${
                activeMenu === item.label ? 'filter invert-[40%] sepia saturate-[400%] hue-rotate-[330deg] brightness-[80%] contrast-[110%]' : 'hover:filter hover:invert-[40%] hover:sepia hover:saturate-[400%] hover:hue-rotate-[330deg] hover:brightness-[80%] hover:contrast-[110%]'
              }`}
            />
            <span className="text-sm font-xs">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Submenu;
