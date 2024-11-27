'use client';
import React, { useState } from "react";
import { PiClockClockwiseBold } from "react-icons/pi";
import { AiFillShop } from "react-icons/ai";
import "@/styles/OrderReviewSubmited.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import OrderItem from "@/Components/OrderItem";
import { HiLocationMarker } from "react-icons/hi";
import { useRouter } from "next/navigation";

const payment_icon = "/Assets/payment_icon.png";
const HistoryImage = "/Assets/HistoryImage.png"

const trackingSteps = [
    {
        label: "Order Confirmed",
        date: "6th Nov 2024",
        isActive: true,
        path: "/order-confirmed",
    },
    {
        label: "Order Packed",
        date: "6th Nov 2024",
        isActive: true,
        path: "/order-packed",
    },
    {
        label: "Out for Delivery",
        date: "7th Nov 2024",
        isActive: true,
        path: "/out-for-delivery",
    },
    {
        label: "Delivered",
        date: "7th Nov 2024",
        isActive: true,
        path: "/delivered",
    },
];

const orderData = [
    {
        id: "1234567890",
        date: "27/08/2024",
        name: "Dell 27 inch P2725H Monitor | Anti-Glare With 3H Hardness | 100Hz | 5ms gray-to-gray (Fast mode)",
        price: 1500,
        rentedDuration: "3 months",
        image: HistoryImage,
        status: "progress",
    },
    {
        id: "1234567890",
        date: "27/08/2024",
        name: "Dell 27 inch P2725H Monitor ",
        price: 1500,
        rentedDuration: "3 months",
        image: HistoryImage,
        status: "completed",
        review: {
            title: "Dell 27 inch P2725H Monitor",
            feedback: "You can blindly trust Dell products but make sure you are buying them from a LEGIT seller.",
            images: [
                HistoryImage,
                HistoryImage,
                HistoryImage,
            ],
        }
    },
];

const OrderReviewSubmited = () => {

    const handleStepClick = (path) => {
        navigate(path); // Navigate to the corresponding path
    };

    const [rentData, setRentData] = useState({
        totalRent: 3818.0, // ₹/mo
        discounts: 916.32, // ₹/mo
        otherCharges: 419.98, // ₹/mo
        gstRate: 18, // GST percentage
    });

    const calculateTotalPrice = (orders) => {
        return orders.reduce((total, item) => total + item.price, 0);
    };
    const totalPrice = calculateTotalPrice(orderData);

    // Calculate costs dynamically
    const calculateTotalCosts = () => {
        const { totalRent, discounts, otherCharges } = rentData;
        return totalRent - discounts + otherCharges;
    };

    const calculateGST = () => {
        const totalCosts = calculateTotalCosts();
        return (totalCosts * rentData.gstRate) / 100;
    };

    const calculateGrandTotal = () => {
        return calculateTotalCosts() + calculateGST();
    };
    const router = useRouter();

    return (
        <div className="order-detail">
             <h2 className='item-header' onClick={() => router.back()}>
        <div className='back-product'><IoMdArrowRoundBack style={{ marginRight: "12px" }} /> Order detail
        </div></h2>
            <div className="Orders_page_section">
                <div className="order-tracking-container">
                    <div className="order_item-frame">
                        {orderData.map((e) => (
                            <OrderItem key={e.id} hideHeader={true} orderData={e} />
                        ))}
                    </div>

                    <div className="order_trackinf_section">
                        <h3>Order Tracking</h3>
                        <div className="tracking-steps">
                            {trackingSteps.map((step, index) => (
                                <div
                                    key={index}
                                    className="tracking-step"
                                    onClick={() => handleStepClick(step.path)}
                                    style={{ cursor: step.isActive ? "pointer" : "default" }} // Only allow navigation for active steps
                                >
                                    <div className="tracking_steps_main">
                                        {/* Step Information */}
                                        <div className="step-info">
                                            <p
                                                className={`step-label ${step.isActive ? "active" : ""
                                                    }`}
                                            >
                                                {step.label}
                                            </p>
                                            {/* Step Indicator */}
                                            <div
                                                className={`step-indicator ${step.isActive ? "active" : ""
                                                    }`}
                                            >
                                                {step.isActive ? (
                                                    <span className="step-circle filled"></span>
                                                ) : (
                                                    <span className="step-circle"></span>
                                                )}
                                            </div>
                                            <p
                                                className={`step-date ${step.isActive ? "active" : ""}`}
                                            >
                                                {step.date}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Step Divider */}
                                    {index < trackingSteps.length - 1 && (
                                        <div
                                            className={`step-divider ${trackingSteps[index + 1].isActive ? "active" : ""
                                                }`}
                                        ></div>
                                    )}
                                </div>
                            ))}
                        </div>
                        {/* payment status */}
                        <div class="payment-section">
                            <div class="payment-info">
                                <span class="icon">
                                    {/* <MdDone /> */}
                                    <img src={payment_icon} alt="Icon" />
                                </span>
                                <div class="payment-details">
                                    <div className="payment-details_completed">
                                        <h4>Payment completed</h4>
                                        <p>25 Sep 2024, 12:10 PM</p>
                                    </div>
                                </div>
                            </div>
                            <div class="payment-date">25 Sep 2024, 12:10 PM</div>
                        </div>
                        <div className="shipping_address_sec">
                            <span>
                                <HiLocationMarker />
                            </span>
                            <div className="address_detail">
                                <h6>Shipping Address</h6>
                                <p>Mohil Prajapati - <span>+91 12345 67890</span></p>
                                <p>225, Sky Zone Business Hub Nr Shyamdham Mandir, Sarthana Jakatnaka, Surat, Gujarat 395006</p>
                            </div>
                        </div>
                        <div class="rent-cost-breakup">
                            <h3 class="section-title">Rent Cost Breakup</h3>
                            <div class="grid-container">
                                <div class="label">Total Rent</div>
                                <div class="value">₹ {rentData.totalRent}/mo</div>

                                <div class="label">Discounts</div>
                                <div class="value discount">- {rentData.discounts}/mo</div>

                                <div class="label">Other</div>
                                <div class="value">₹ {rentData.otherCharges}/mo</div>

                                <div class="label">Total Costs</div>
                                <div class="value">₹ {calculateTotalCosts()}</div>

                                <div class="label">GST</div>
                                <div class="value">
                                    ₹ {calculateGST().toFixed(2)} ({rentData.gstRate}%)
                                </div>

                                <div class="label grand-total">Rent Grand Total</div>
                                <div class="value grand-total">
                                    ₹ {calculateGrandTotal().toFixed(2)}
                                </div>
                            </div>
                        </div>
                        <div class="payment-info enterprice">
                            <span class="icon">
                                {/* <MdDone /> */}
                                <AiFillShop />
                            </span>
                            <div class="payment-details">
                                <h4>RntOut Enterprise</h4>
                                <p>
                                    <a href="#" onClick={() => {router.push('/profile/orders/SellerReview')}}>
                                        Click here to write seller feedback
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div class="payment-info order_closer">
                            <span class="icon">
                                {/* <MdDone /> */}
                                <PiClockClockwiseBold />
                            </span>
                            <div class="payment-details">
                                <h4>Order Closure</h4>
                                <p>{95} Days Remaining</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderReviewSubmited;
