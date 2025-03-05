"use client"

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const faqs = [
        {
            question: "What is RNTOUT?",
            answer:
                "RNTOUT is a comprehensive rental platform offering a wide range of items for rent, including vehicles, event equipment, sports gear, electronics, medical equipment, and more.",
        },
        {
            question: "How does RNTOUT work?",
            answer:
                "RNTOUT connects individuals and businesses to rent and lend items, providing a convenient and sustainable alternative to ownership.",
        },
        {
            question: "Where is RNTOUT available?",
            answer: "RNTOUT services are available in multiple locations. Check our website for more details.",
        },
        {
            question: "What items can I rent from RNTOUT?",
            answer:
                "You can rent vehicles, sports gear, medical equipment, event supplies, and much more.",
        },
    ];
    const otherQuestions = [
        { title: "Delivery and Returns", count: 3, trending: "Can I schedule a specific delivery date and time?" },
        { title: "Modifying and Canceling Orders", count: 2, trending: "Can I change my order after it has been placed?" },
        { title: "Fees and Services", count: 4, trending: "Is there a delivery fee for rental items?" },
        { title: "Placing an Order", count: 4, trending: "What types of items are available for rent?" },
        { title: "Delivery and Returns", count: 3, trending: "Can I schedule a specific delivery date and time?" },
        { title: "Modifying and Canceling Orders", count: 2, trending: "Can I change my order after it has been placed?" },
        { title: "Fees and Services", count: 4, trending: "Is there a delivery fee for rental items?" },
        { title: "Placing an Order", count: 4, trending: "What types of items are available for rent?" },
    ];
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };
    return (
        <div className="max-w-5x2 mx-auto px-4 py-10">
            {/* General Questions */}
            <h2 className="text-2xl font-bold text-center">General Questions</h2>
            <p className="text-gray-600 text-center mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <div className="mt-6 space-y-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4 shadow-sm bg-white">
                        <button
                            className="w-full flex justify-between items-center text-left text-lg font-medium"
                            onClick={() => toggleFAQ(index)}
                        >
                            <span>{faq.question}</span>
                            {openIndex === index ? (
                                <FaMinus className="text-gray-500" />
                            ) : (
                                <FaPlus className="text-gray-500" />
                            )}
                        </button>
                        {openIndex === index && <p className="text-gray-600 pt-3">{faq.answer}</p>}
                    </div>
                ))}
            </div>
            {/* Other Questions with Swiper Slider */}
            <h3 className="text-xl font-bold mt-10 text-center">Other Questions</h3>
            <div className="relative">
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    spaceBetween={10}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 4 },
                    }}
                    className="mt-4"
                >
                    {otherQuestions.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition h-30 min-h-[160px] flex flex-col">
                                <h4 className="font-semibold">{item.title}</h4>
                                <p className="text-sm text-gray-500">No. of questions: {item.count}</p>
                                <p className="text-blue-500 mt-2 text-sm">{item.trending}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Custom Navigation Buttons */}
                <button className="swiper-button-prev absolute top-1/2 left-0 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full text-gray-400 hover:text-gray-600 ">
                    < IoIosArrowBack   />
                </button>
                <button className="swiper-button-next absolute top-1/2 right-0 transform -translate-y-1/2 bg-white shadow-md p-2 rounded-full text-gray-400 hover:text-gray-600">
                    <FaAngleRight  />
                </button>
            </div>
        </div>
    );
};
export default FAQSection;