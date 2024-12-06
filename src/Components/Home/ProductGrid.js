
"use client";
import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link'; // Use Next.js Link
import Image from 'next/image'; // Use Next.js Image for optimized images

// Importing icons (assuming icons are stored in src/assets/icons)
// const AllIcon = '/Assets/Icons/classify_2_fill.png';
const ITInfrastructureIcon = '/Assets/Icons/braces_line.png';
// const FurnitureIcon = '/Assets/Icons/sofa_line.png';
// const MedicalEquipmentIcon = '/Assets/Icons/first_aid_kit_line.png';
// const VacationEquipmentIcon = '/Assets/Icons/umbrella_line.png';
// const VehiclesIcon = '/Assets/Icons/car_line.png';
// const PartyMaterialIcon = '/Assets/Icons/celebrate_line.png';
// const SportsGymIcon = '/Assets/Icons/football_line.png';
// const HouseholdKitchenIcon = '/Assets/Icons/fork_spoon_line.png';

// Category data for easy mapping
// const categories = [
//   { name: 'All', icon: AllIcon, path: '/' }, // Example path
//   { name: 'IT Infrastructure', icon: ITInfrastructureIcon, path: '/it-infrastructure' },
//   { name: 'Furniture', icon: FurnitureIcon, path: '/furniture' },
//   { name: 'Medical Equipment', icon: MedicalEquipmentIcon, path: '/medical-equipment' },
//   { name: 'Vacation Equipment', icon: VacationEquipmentIcon, path: '/vacation-equipment' },
//   { name: 'Vehicles', icon: VehiclesIcon, path: '/vehicles' },
//   { name: 'Party Material', icon: PartyMaterialIcon, path: '/party-material' },
//   { name: 'Sports & Gym', icon: SportsGymIcon, path: '/sports-gym' },
//   { name: 'Household & Kitchen', icon: HouseholdKitchenIcon, path: '/household-kitchen' },
// ];

const CategorySection = ({ onCategorySelect, categories}) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    onCategorySelect(categoryName);
  };

  return (
    <div className="bg-white pt-6">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Our Top Trending Products</h1>
        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>

      <div className="bg-white-100 py-4">
        <div className="container mx-auto flex flex-wrap justify-center gap-1">
          {categories.map((category) => (
            <Link key={category._id} href={`/Product-list/${category._id}`}>
              <button
                onClick={() => handleCategoryClick(category._id)}
                className={`flex items-center py-1 text-sm px-1 rounded-lg transition duration-300 ${
                  selectedCategory === category.name
                    ? 'bg-blue-200 text-blue-700' // Selected background
                    : 'bg-white text-gray-800 border border-slate-300 hover:bg-blue-100' 
                }`}
                style={{
                  boxShadow:
                    selectedCategory === category.categoryName ? '0px 1px 1px rgba(0, 0, 255, 0.1)' : 'none', 
                }}
              >
                <Image
                  src={ITInfrastructureIcon}
                  alt={`${category.categoryName} icon`}
                  className="h-4 w-4 mr-2"
                  width={16} // Define width explicitly
                  height={16} // Define height explicitly
                />
                {category.categoryName}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

CategorySection.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
};

export default CategorySection;
