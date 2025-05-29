

import React from 'react';
import '../../styles/Aboutus.css';


export const metadata = {
  title: "About RNT Out: Your Trusted Source for Quality Rentals in Hyderabad",
  description: "Explore the mission and values behind RNT Out. We’re committed to delivering quality rental products and exceptional customer service for all your adventures!",
};

export default function Aboutus() {
    return (
        <div className="about-container">
            <h2 className="about-header">About Us</h2>

            <div className="about-section">
                <h3 className="about-subtitle">Welcome to rentout</h3>
                <p className="about-text">
                    Your one-stop destination for renting high-quality products with ease and affordability!
                    Whether you need furniture, laptops, gym gear, household essentials, vehicles, or party supplies — we’ve got you covered.
                </p>
            </div>

            <div className="about-section">
                <h3 className="about-subtitle">Who We Are</h3>
                <p className="about-text">
                    At rentout, we believe in making life more convenient by offering a seamless rental experience.
                    Our mission is to help individuals and businesses access premium products without the burden of ownership.
                </p>
            </div>

            <div className="about-section">
                <h3 className="about-subtitle">What We Offer</h3>
                <ul className="about-list">
                    <li>✔  Furniture – Sofas, beds, tables, office setups</li>
                    <li>✔  Laptops & Gadgets – Projectors, cameras, accessories</li>
                    <li>✔  Sports & Gym – Treadmills, dumbbells, cycles</li>
                    <li>✔  Household Essentials – Appliances and kitchenware</li>
                    <li>✔  Vehicles – Cars, bikes, two-wheelers</li>
                    <li>✔  Vacation Gear – Camping & adventure equipment</li>
                    <li>✔  Party Materials – Speakers, décor, furniture</li>
                    <li>✔  Medical Equipment – Wheelchairs, oxygen kits, hospital beds</li>
                </ul>
            </div>

            <div className="about-section">
                <h3 className="about-subtitle">Why Choose Us?</h3>
                <ul className="about-list">
                    <li>✅ Affordable & Flexible Rentals</li>
                    <li>✅ Wide Selection of High-Quality Products</li>
                    <li>✅ Easy Booking & Doorstep Delivery</li>
                    <li>✅ Sanitized & Well-Maintained Items</li>
                    <li>✅ 24/7 Customer Support</li>
                </ul>
            </div>
        </div>
    )
}
