'use client';
import React, { useState } from 'react';
import Link from 'next/link';
const InfrastructureIcon = '/Assets/Icons/braces_line.png';
const FurnitureIcon = '/Assets/Icons/sofa_line.png';
const MedicalIcon = '/Assets/Icons/first_aid_kit_line.png';
const VacationIcon = '/Assets/Icons/umbrella_line.png';
const VehiclesIcon = '/Assets/Icons/car_line.png';
const PartyIcon = '/Assets/Icons/celebrate_line.png';
const SportIcon = '/Assets/Icons/football_line.png';
const KitchenIcon = '/Assets/Icons/fork_spoon_line.png';

const customStyles = `
.nav-font{font-size:13px;}
`;

const DropdownItem = ({ label, icon, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div 
            className="relative group space-x-2"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 py-2 px-1">
                <img src={icon} alt={label} className="h-5 w-5" /> {/* Replace SVG with PNG image */}
                <span className="nav-font">{label}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 top-full w-48 bg-white rounded-md shadow-lg z-10">
                    {children}
                </div>
            )}
        </div>
    );
};

const NestedDropdownItem = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative nested-group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                {label}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-full top-0 w-48 bg-white rounded-md shadow-lg z-20">
                    {children}
                </div>
            )}
        </div>
    );
};

const Navigation = () => {
    return (
        <nav className="bg-white border border-slate-200 relative z-20">
            <div className="max-w-7xl mx-auto px-0">
                <div className="flex items-center space-x-0 h-12">

                    {/* IT Infrastructure */}
                    <DropdownItem label="IT Infrastructure" icon={InfrastructureIcon}>
                        <NestedDropdownItem label="Hardware">
                        <Link to="/product-list" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Servers</Link>
                        <Link to="/product-details/1" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Workstations</Link>
                        <Link to="/my-cart" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Networking</Link>
                        </NestedDropdownItem>
                        <NestedDropdownItem label="Software">
                        <Link to="/rental-categories" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Operating Systems</Link>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Development Tools</a>
                        </NestedDropdownItem>
                    </DropdownItem>

                    {/* Furniture */}
                    <DropdownItem label="Furniture" icon={FurnitureIcon}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Office Furniture</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Home Furniture</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Outdoor Furniture</a>
                    </DropdownItem>

                    {/* Medical Equipment */}
                    <DropdownItem label="Medical Equipment" icon={MedicalIcon}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Diagnostic Equipment</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Surgical Equipment</a>
                    </DropdownItem>

                    {/* Vacation Equipment */}
                    <DropdownItem label="Vacation Equipment" icon={VacationIcon}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Camping Gear</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Beach Equipment</a>
                    </DropdownItem>

                    {/* Vehicles */}
                    <DropdownItem label="Vehicles" icon={VehiclesIcon}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cars</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Bikes</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Commercial Vehicles</a>
                    </DropdownItem>

                    {/* Party Material */}
                    <DropdownItem label="Party Material" icon={PartyIcon}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Decorations</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Entertainment</a>
                    </DropdownItem>

                    {/* Sport & Gym */}
                    <DropdownItem label="Sport & Gym" icon={SportIcon}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Exercise Equipment</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sports Gear</a>
                    </DropdownItem>

                    {/* Household & Kitchen */}
                    <DropdownItem label="Household & Kitchen" icon={KitchenIcon}>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Appliances</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Cookware</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Storage Solutions</a>
                    </DropdownItem>



                </div>
            </div>
        </nav>
    );
};

export default Navigation;
