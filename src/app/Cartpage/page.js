'use client';
import React, { useState } from 'react';
import '@/styles/Cart.css';

import Sidebar from './Sidebar/page';
import AddressSidebar from './AddressSidebar/page';

const product = '/Assets/product.png';
const deleteicon = '/Assets/deleteicon.svg';
const stock = '/Assets/stock.svg';
const location = '/Assets/location.svg';
const payment = '/Assets/payment.svg';
const coupon = '/Assets/coupon.svg';
const insurance = '/Assets/insurance.svg';
const costbreakup = '/Assets/costbreakup.svg';
const delivery = '/Assets/delivery.svg';


const CartPage = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAddressSidebarOpen, setIsAddressSidebarOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const handleAddressToggle = () => {
        setIsAddressSidebarOpen(!isAddressSidebarOpen);
    };

    const [quantity, setQuantity] = useState(1); // Initialize quantity with 1

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    // Prevent quantity from going below 1
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };




    const cartProducts = [
        {
            name: 'DROGO Throne Ergonomic Gaming Chair with Foot Rest, Armrest & Adjustable Seat (Blue)',
            price: '₹2500',
            image: product,
        },
        {
            name: 'ZEBRONICS 81.28 cm (32 inch) Curved Full HD VA Panel Wall Mountable Monitor (ZEB -AC32FHD LED)',
            price: '₹2500',
            image: product,
        },
        {
            name: 'DROGO Throne Ergonomic Gaming Chair with Foot Rest, Armrest & Adjustable Seat (Blue)',
            price: '₹2500',
            image: product,
        },
        {
            name: 'DROGO Throne Ergonomic Gaming Chair with Foot Rest, Armrest & Adjustable Seat (Blue)',
            price: '₹2500',
            image: product,
        },
        {
            name: 'DROGO Throne Ergonomic Gaming Chair with Foot Rest, Armrest & Adjustable Seat (Blue)',
            price: '₹2500',
            image: product,
        },
        {
            name: 'DROGO Throne Ergonomic Gaming Chair with Foot Rest, Armrest & Adjustable Seat (Blue)',
            price: '₹2500',
            image: product,
        },
        {
            name: 'DROGO Throne Ergonomic Gaming Chair with Foot Rest, Armrest & Adjustable Seat (Blue)',
            price: '₹2500',
            image: product,
        },
        {
            name: 'DROGO Throne Ergonomic Gaming Chair with Foot Rest, Armrest & Adjustable Seat (Blue)',
            price: '₹2500',
            image: product,
        },
    ];

    return (
        <div className="cart-page">
            {/* Cart Items Section */}
            <div className="cart-items-section">
                <h2 className="cart-title">
                    My Cart <span className="cart-count">04</span>
                </h2>
                {cartProducts.map((item, index) => (
                    <div key={index} className="cart-item">
                        {/* Item Image */}
                        <img
                            src={item.image} // Replace with actual image URLs
                            alt="Product"
                            className="item-image"
                        />
                        {/* Item Details */}
                        <div className="item-details">
                            <h3 className="item-name">{item.name} </h3>
                            <p className="item-price">{item.price}/month</p>
                            <div className="quantity-controls">
                                <button className="quantity-btn" onClick={decreaseQuantity}>-</button>
                                <span className="quantity">{quantity}</span>
                                <button className="quantity-btn" onClick={increaseQuantity}>+</button>
                                <select className="duration-select">
                                    <option>Month</option>
                                    <option>Year</option>
                                </select>
                            </div>
                            <div className='product-right'>
                                <button className="delete-btn">
                                    <img src={deleteicon} />
                                    <p className="stock-info">1 stock avail.</p>
                                </button>
                                {/* <p className="stock-info">1 stock avail.</p> */}

                            </div>

                        </div>



                    </div>
                ))}
            </div>

            {/* Summary Section */}
            <div className="summary-section">
                <div>
                    <div className="summary-item address" onClick={handleAddressToggle}>
                        <div className='address-content'>
                            <img src={location} /><span>Select Address</span>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                        <div>
                            {selectedAddress && (
                                <>
                                    <div className="address-context">
                                        <h4>{selectedAddress.name}</h4><p>|</p>
                                        <p>{selectedAddress.mobile}</p>
                                    </div>
                                    <div>
                                        <p>{selectedAddress.address}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <AddressSidebar isOpen={isAddressSidebarOpen} onClose={handleAddressToggle} onAddressSelect={setSelectedAddress} />
                </div>
                <div className='summary-address'>
                    <div className="summary-item address">
                        <div className='address-content'>
                            <img src={payment} /><span>Payable Amount</span>
                        </div>
                        <div>  <span className="amount">₹4540</span></div>



                        <button className="pay-btn">Pay ₹4540</button>
                    </div>
                </div>
                <div className="summary-item address">
                    <div className='address-content'>
                        <img src={coupon} /><span>Promo Coupon</span>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div>
                    <div className="summary-item address" onClick={handleSidebarToggle}>
                        <div className="address-content">
                            <img src={insurance} alt="Insurance" />
                            <span>RntOut Insurance</span>
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                    <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} products={cartProducts} />
                </div>
                <div className="summary-item address">
                    <div className='address-content'>
                        <img src={costbreakup} /><span>Rent Cost Breakup</span>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div className="summary-item ">
                    <img src={delivery} /> <span>Delivery Estimate</span>
                    <span>27 Sep - 29 Sep to 500008</span>

                </div>
            </div>
        </div>
    );
};

export default CartPage;
