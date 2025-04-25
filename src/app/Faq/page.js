"use client";

import React, { useEffect, useState } from "react";
import axios from "axios"
import {
    FaQuestionCircle, FaClipboardList, FaTruck, FaUserCircle, FaShieldAlt, FaCreditCard, FaFileContract, FaLock, FaEdit, FaMoneyBillWave, FaShoppingCart, FaFileInvoiceDollar,
    FaBoxes, FaIdCard, FaEllipsisH, FaReceipt, FaGift, FaSyncAlt, FaUndoAlt
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { fetchFaq } from "@/services/faq.service";








const FaqPage = () => {
    const router = useRouter();
    const [categories, setCategories] = useState([])
    const fetchFaqQuestions = async () => {
        try {
            const response = await fetchFaq()
            console.log();
            setCategories(response?.data);
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
                        onClick={() => router.push(`/Faq/${category._id}?name=${encodeURIComponent(category.name)}`)}

                    >
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="bg-green-600 p-2 rounded-lg flex justify-center items-center">
                                <img src={category.icon} className="w-6 h-6 object-cover" />
                            </div>

                            <div className="flex flex-col">
                                <h2
                                    className="font-[Poppins] text-[14px] font-semibold text-left text-[#070707] truncate max-w-[200px] overflow-hidden whitespace-nowrap"
                                    title={category.name}
                                >
                                    {category.name}
                                </h2>


                                {category.numberOfQuestions != 0 && <p className="text-sm text-gray-500 mb-2">No. of questions: {category.numberOfQuestions}</p>}
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
