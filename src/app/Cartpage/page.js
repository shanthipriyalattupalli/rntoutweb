
"use client"
import React, { useState, useEffect } from 'react';
import '@/styles/Cart.css';
import axios from 'axios';
import Sidebar from './Sidebar/page';
import AddressSidebar from './AddressSidebar/page';
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import RenderRazorpay from '../PayModule/PayModule';
import "react-toastify/dist/ReactToastify.css";

const cube = '/Assets/cube_fill.png';
const deleteicon = '/Assets/deleteicon.svg';
const stock = '/Assets/stock.svg';
const location = '/Assets/location.svg';
const payment = '/Assets/payment.svg';
const coupon = '/Assets/coupon.svg';
const insurance = '/Assets/insurance.svg';
const costbreakup = '/Assets/costbreakup.svg';
const delivery = '/Assets/delivery.svg';

const CartPage = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
    const userId = localStorage.getItem('userId');
    const [cartItems, setCartItems] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAddressSidebarOpen, setIsAddressSidebarOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [quantities, setQuantities] = useState({});
    const [displayRazorpay, setDisplayRazorpay] = useState(false);
    const token = localStorage.getItem('userToken');

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleAddressToggle = () => {
        setIsAddressSidebarOpen(!isAddressSidebarOpen);
    };

    const increaseQuantity = async (variantId, currentQuantity) => {
        const newQuantity = (currentQuantity || 1) + 1;
        try {
            await handleAddToCart(variantId, newQuantity); 
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [variantId]: newQuantity,
            }));
            toast.success("Updated successfully");
        } catch (error) {
            console.error("Error increasing quantity:", error);
            toast.error("Failed to update quantity. Please try again.");
        }
    };

    const decreaseQuantity = async (variantId, currentQuantity) => {
        const newQuantity = Math.max((currentQuantity || 1) - 1, 1); 
        try {
            await handleAddToCart(variantId, newQuantity); 
            setQuantities((prevQuantities) => ({
                ...prevQuantities,
                [variantId]: newQuantity,
            }));
            toast.success("Updated successfully");
        } catch (error) {
            console.error("Error decreasing quantity:", error);
            toast.error("Failed to update quantity. Please try again.");
        }
    };

    const handleAddToCart = async (variantId, quantity) => {
        try {
            const payload = {
                user_id: userId,
                variant_id: variantId,
                quantity, 
                rentalPeriod: "monthly", 
            };
            const response = await axios.post(`${BASE_URL}/cart/add`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            toast.success(response.data.message || "Quantity updated successfully.");
        } catch (error) {
            console.error("Error adding product to cart:", error);
            toast.error(
                error.response?.data?.message || "Something went wrong. Please try again."
            );
            throw error; 
        }
    };

    const fetchCartDetails = async () => {
    console.log("out fetching cart")
        try {
            const response = await axios.get(`${BASE_URL}/cart/${userId}`);
            setCartItems(response.data.cartItems,"cartItems");
            console.log(response.data.cartItems,"cartItems")

            const initialQuantities = response.data.cartItems.reduce((acc, item) => {
                acc[item.variant_id._id] = item.quantity || 1;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        } catch (error) {
            console.error('Error fetching cart details:', error);
        }
    };

    useEffect(() => {
        fetchCartDetails();
    }, [userId]);

    const handleRemove = async (variantId) => {
    console.log(variantId,"removeid")
        try {
            console.log(variantId,"variantId remove")
            const response = await axios.delete(`${BASE_URL}/cart/remove/${userId}/${variantId}`);
            toast.success(response.data || "Removed successfully");
            fetchCartDetails();
        } catch (error) {
            toast.error(error.message);
            console.error('Error removing item from cart:', error);
        }
    };

    const createPayment = () => {
        if (!userId) {
            toast.error("Please login to proceed with payment.");
            return;
        }
        setDisplayRazorpay(true);
    };

    const handlePayment = (status, orderDetails) => {
        if (status === "succeeded") {
            setDisplayRazorpay(false);
        } else if (status === "cancelled") {
            setDisplayRazorpay(false);
        }
    };

    const apiKey = 'rzp_test_4rrCmYtqWUOUvT';

    // Calculate total price
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.lineTotal || 0), 0);

    return (
        <div className="cart-page">
            <ToastContainer />
            <div className="cart-items-section">
                <h2 className="cart-title">
                    My Cart <span className="cart-count">{cartItems.length}</span>
                </h2>
                {cartItems.map((item, index) => (
                    <div key={index} className="cart-item cursor-pointer">
                        <Link href={{ pathname: `/Products/${item.variant_id.title}`, query: { id: item.variant_id._id } }} key={item._id}>
                            <img
                                src={item.variant_id.images[0]}
                                alt="Product"
                                className="item-image"
                            />
                        </Link>               
                        <div className="item-details">
                            <h3 className="item-name">{item.variant_id.title}</h3>
                            <p className="item-price">{item.variant_id.rentalPrice.monthly}/{item.rentalPeriod}</p>
                            <div className="quantity-controls">
                                <button className="quantity-btn" onClick={() => decreaseQuantity(item.variant_id._id, item.quantity)}>-</button>
                                <span className="quantity">{item.quantity || 1}</span>
                                <button className="quantity-btn" onClick={() => increaseQuantity(item.variant_id._id, item.quantity)}>+</button>
                                <select className="duration-select">
                                    <option>Month</option>
                                    <option>Year</option>
                                </select>
                                <p>Total: {item.lineTotal}</p>
                            </div>
                            <div className='product-right'>
                                <button className="delete-btn">
                                    <img src={deleteicon} onClick={()=>{handleRemove(item.variant_id._id)}} className='flex justify-center ml-20'/>
                                    <div className='flex gap-2'>
                                        <img src={cube}/>
                                        <p className="stock-info">{item.variant_id.stockQuantity} stock avail.</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="summary-section">
                <div className="summary-item address" onClick={handleAddressToggle}>
                    <div className='address-content'>
                        <img src={location} /><span>Select Address</span>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                    {selectedAddress && (
                        <>
                            <div className="address-context">
                                <h4>{selectedAddress.name}</h4><p>|</p>
                                <p>{selectedAddress.mobile}</p>
                            </div>
                            <p>{selectedAddress.address}</p>
                        </>
                    )}
                </div>
                <AddressSidebar isOpen={isAddressSidebarOpen} onClose={handleAddressToggle} onAddressSelect={setSelectedAddress} />

                <div className="summary-address">
                    <div className="summary-item address">
                        <div className='address-content'>
                            <img src={payment} /><span>Payable Amount</span>
                        </div>
                        <div>  <span className="amount">₹{totalPrice}</span></div>
                        <button className="pay-btn" onClick={createPayment}>Pay ₹{totalPrice}</button>
                        {displayRazorpay && (
                            <RenderRazorpay
                                amount={totalPrice * 100}
                                currency={"INR"}
                                keyId={apiKey}
                                handlePayment={handlePayment}
                                name={localStorage.getItem('userName')}
                            />
                        )}
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
                    <Sidebar isOpen={isSidebarOpen} onClose={handleSidebarToggle} products={cartItems} />
                </div>
                <div className="summary-item address">
                    <div className='address-content'>
                        <img src={costbreakup} /><span>Rent Cost Breakup</span>
                        <i className="fas fa-chevron-right"></i>
                    </div>
                </div>
                <div className="summary-item">
                    <img src={delivery} /> <span>Delivery Estimate</span>
                    <span>27 Sep - 29 Sep to 500008</span>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
