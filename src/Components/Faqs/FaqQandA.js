"use client"

import { useRef,useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { IoIosArrowBack } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
const left = '/Assets/leftarrow.svg';


const FaqQandA = ({faqQuestions}) => {
      const swiperRef = useRef(null);
    const [openIndex, setOpenIndex] = useState(null);
      const [activeIndex, setActiveIndex] = useState(0);
    

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

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


  return (
    <>
    <div className="mt-6 space-y-4">
    {faqQuestions.map((faq, index) => (
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
<h3 className="text-xl font-bold mt-10 text-center">Other Questions</h3>
<div className="relative">

      <div className="absolute left-2 sm:left-[5rem] md:left-[5rem] lg:left-[0rem] top-1/2 transform -translate-y-1/2 z-10">
        <button
          className={` ${activeIndex === 0 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          onClick={() => swiperRef.current?.slidePrev()}
          disabled={activeIndex === 0}
        >
          <img src={left} alt="Previous" className="rotate-360" />
        </button>
      </div>


      <div className="absolute right-2 sm:right-[5rem] md:right-[5rem] lg:right-[0rem] top-1/2 transform -translate-y-1/2 z-20">
        <button onClick={() => swiperRef.current?.slideNext()}>
          <img src={left} alt="Next" className="rotate-180" />
        </button>
      </div>

   
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        modules={[Navigation]}
        navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
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
            <div
              className="p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition h-30 min-h-[160px] flex flex-col"
              alt={`Slide ${index + 1}`}
            >
              <h4 className="font-semibold">{item.title}</h4>
              <p className="text-sm text-gray-500">No. of questions: {item.count}</p>
              <p className="text-blue-500 mt-2 text-sm">{item.trending}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
</>
  )
}

export default FaqQandA