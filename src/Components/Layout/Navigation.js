'use client';
import React, { useState,useEffect} from 'react';
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
.nav-font{font-size:14px; !important}
`;

const DropdownItem = ({ label, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 py-2">
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

const Navigation = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

    // Fetch Categories
    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/categories`);
            setCategories(response.data.categories || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch Subcategories by Category ID

    const fetchSubCategories = async (categoryId) => {
        try {
            const response = await axios.get(`${BASE_URL}/subcategories/categories/${categoryId}`);
            setSubcategories(response.data || []);
        } catch (error) {
            console.error('Error fetching subcategories:', error);
        }
    };

    // Initialize Categories on Mount
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <nav className="bg-white border border-slate-200 relative z-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center space-x-4 h-12">
                    {categories.map((category) => (
                        <DropdownItem
                            key={category._id}
                            label={category.categoryName}
                        >
                            <div
                                onMouseEnter={() => fetchSubCategories(category._id)}
                            >
                                {/* {subcategories.map((subcategory) => (
                                        <a
                                            key={subcategory._id}
                                            href="#"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            {subcategory.subCategoryName}
                                        </a>
                                    ))} */}
                            </div>
                        </DropdownItem>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
