"use client";

import React, { useEffect, useState } from "react";
import axios from "axios"
import { useParams } from "next/navigation";
import {
    FaQuestionCircle, FaClipboardList, FaTruck, FaUserCircle, FaShieldAlt, FaCreditCard, FaFileContract, FaLock, FaEdit, FaMoneyBillWave, FaShoppingCart, FaFileInvoiceDollar,
    FaBoxes, FaIdCard, FaEllipsisH, FaReceipt, FaGift, FaSyncAlt, FaUndoAlt
} from "react-icons/fa";

const categories = [
    {
        category: "General",
        questionsCount: 4,
        trendingQuestions: ["What is RntOut?", "How does RntOut work?"],
        icon: <FaQuestionCircle className="text-green-500 text-2xl" />
    },
    {
        category: "Renting Process",
        questionsCount: 4,
        trendingQuestions: ["How do I book an item for rent?", "What payment methods do you accept?"],
        icon: <FaClipboardList className="text-blue-500 text-2xl" />
    },
    {
        category: "Delivery and Returns",
        questionsCount: 3,
        trendingQuestions: ["How is the item delivered?", "What if the item is damaged or faulty?"],
        icon: <FaTruck className="text-red-500 text-2xl" />
    },
    {
        category: "Account and Support",
        questionsCount: 5,
        trendingQuestions: ["How do I create an account on RntOut?", "How can I contact customer support?"],
        icon: <FaUserCircle className="text-purple-500 text-2xl" />
    },
    {
        category: "Risk and Security",
        questionsCount: 4,
        trendingQuestions: ["What measures does RntOut take to ensure security?", "What happens if the rented item is stolen or damaged?"],
        icon: <FaShieldAlt className="text-yellow-500 text-2xl" />
    },
    {
        category: "Payments and Refunds",
        questionsCount: 4,
        trendingQuestions: ["What payment methods are accepted on RntOut?", "When is payment charged for a rental?"],
        icon: <FaCreditCard className="text-indigo-500 text-2xl" />
    },
    {
        category: "Insurance and Liability",
        questionsCount: 3,
        trendingQuestions: ["Is insurance provided for rented items?", "Who is liable for damages or losses during the rental period?"],
        icon: <FaFileContract className="text-teal-500 text-2xl" />
    },
    {
        category: "Account Security",
        questionsCount: 2,
        trendingQuestions: ["How do I secure my RntOut account?", "What should I do if I suspect unauthorized access?"],
        icon: <FaLock className="text-pink-500 text-2xl" />
    },
    {
        category: "Delivery and Returns",
        questionsCount: 3,
        trendingQuestions: [
            "What are the delivery times for my order?",
            "How can I track my shipment?",
            "What is the return policy?"
        ],
        icon: <FaTruck className='text-blue-500 text-2xl' />
    },
    {
        category: "Modifying and Canceling Orders",
        questionsCount: 3,
        trendingQuestions: ["Can I change my order after it has been placed?", "What is the process for canceling an order?"],
        icon: <FaEdit className="text-orange-500 text-2xl" />
    },
    {
        category: "Fees and Services",
        questionsCount: 4,
        trendingQuestions: ["Is there a delivery fee for rental items?", "Do you offer installation services for the rental items?"],
        icon: <FaMoneyBillWave className="text-green-400 text-2xl" />
    },
    {
        category: "Placing an Order",
        questionsCount: 4,
        trendingQuestions: ["What types of items are available for rent?", "Can I rent items from different categories together?"],
        icon: <FaShoppingCart className="text-blue-400 text-2xl" />
    },
    {
        category: "Billing, Refund, and Collection",
        questionsCount: 20,
        trendingQuestions: ["How will I be billed for my rental furniture or appliances?", "What is the billing frequency for rental items?"],
        icon: <FaFileInvoiceDollar className="text-red-400 text-2xl" />
    },
    {
        category: "Order Fulfillment",
        questionsCount: 19,
        trendingQuestions: ["How can I provide an update on the status of my order?", "When can I expect my furniture or appliance to be delivered?"],
        icon: <FaBoxes className="text-purple-400 text-2xl" />
    },
    {
        category: "KYC (Know Your Customer)",
        questionsCount: 15,
        trendingQuestions: ["Why do I need to complete the KYC process?", "How long does the KYC process usually take?"],
        icon: <FaIdCard className="text-yellow-400 text-2xl" />
    },
    {
        category: "Miscellaneous",
        questionsCount: 6,
        trendingQuestions: ["Is there a deposit required for rental items?", "Can I purchase the rental items at the end of my rental period?"],
        icon: <FaEllipsisH className="text-indigo-400 text-2xl" />
    },
    {
        category: "Fees",
        questionsCount: 4,
        trendingQuestions: ["What are the fees associated with renting from RntOut?"],
        icon: <FaReceipt className="text-teal-400 text-2xl" />
    },
    {
        category: "Value-Added Services (VAS)",
        questionsCount: 2,
        trendingQuestions: ["Is it possible to change the items that I’m renting?", "Are there any restrictions on how I can use the rental items?"],
        icon: <FaGift className="text-pink-400 text-2xl" />
    },
    {
        category: "Renewal",
        questionsCount: 2,
        trendingQuestions: ["What is the process for renewing my rental subscription?", "Can I pause or suspend my rental subscription temporarily?"],
        icon: <FaSyncAlt className="text-orange-400 text-2xl" />
    },
    {
        category: "Return",
        questionsCount: 19,
        trendingQuestions: ["What is the process for requesting a pickup of rental items?", "How far in advance do I need to request a pickup?"],
        icon: <FaUndoAlt className="text-green-300 text-2xl" />
    }
];






const FaqPage = () => {

    const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL
    const [categories, setCategories] = useState([]);
      const params = useParams();
    const FaqId=params.FaqId
    console.log(FaqId,"faqId")
    // const fetchFaqCategories = async () => {
    //     try {
    //         const response = await axios.get(`${BASE_URL}/faq/categories`);
    //         console.log(response, "response")
    //         setCategories(response?.data?.data);

    //     } catch (error) {
    //         console.error("Error fetching FAQ categories:", error.response?.data || error.message);
    //     }
    // };



    // useEffect(() => {
    //     fetchFaqCategories();
    // }, []);

    const fetchFaqQuestions = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/faq/questions`);
            console.log(response, "response")
            setCategories(response?.data?.data);

        } catch (error) {
            console.error("Error fetching FAQ categories:", error.response?.data || error.message);
        }
    };



    useEffect(() => {
        fetchFaqQuestions();
    }, []);



    return (
        <div className="max-w-7xl mx-auto p-4">
            <div className="text-center m-8">
                <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
                <p className="text-gray-500 mt-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition duration-300 cursor-pointer"
                    >
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-green-600 p-2 rounded-lg flex justify-center items-center">
                                <img src={category.category.icon} className="w-6 h-6 object-cover" />
                            </div>

                            <div className="flex flex-col">
                                <h2
                                    className="font-[Poppins] text-[14px] font-semibold text-left text-[#070707] truncate max-w-[200px] overflow-hidden whitespace-nowrap"
                                    title={category.category.name}
                                >
                                    {category.category.name}
                                </h2>


                                <p className="text-sm text-gray-500 mb-2">No. of questions: {category.numberOfQuestions}</p>
                            </div>
                        </div>
                        <h3 className="text-xs font-semibold text-gray-500">  {category.isTrending ? "TRENDING QUESTION" : ""}</h3>
                        <ul className="list-disc  text-xs text-blue-500">
                            <li
                                className="truncate w-full overflow-hidden whitespace-nowrap"
                                title={category.question}
                            >
                                {category.question}
                            </li>
                        </ul>

                    </div>
                ))}
            </div>
        </div>
    );
};

export default FaqPage;
