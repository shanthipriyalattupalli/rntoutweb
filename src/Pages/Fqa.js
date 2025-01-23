"use client";
import React, { useState } from "react";
// import "@/styles/Fqa.css";
import '../styles/Fqa.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Lorem ipsum dolor sit amet",
      answer:
        "We are one of the world's largest vertically-integrated manufacturers of apparel, socks and hosiery, leading the way in ethical and sustainable manufacturing practices. Gildan uses cotton grown in the USA, which represents the best combination of quality and value for Gildan cotton and cotton blended products. Since 2009, Gildan has proudly displayed the cotton USA mark, licensed by cotton council international, on consumer’s product packaging and shipping materials. Gildan environmental program accomplishes two core objectives: reduce our environmental impact and preserve the natural resources being used in our manufacturing process. At all operating levels, Gildan is aware of the fact that we operate as a part of a greater unit: the environment in which we live and work.",
    },
    // Add more questions as needed
    {
      question: "Lorem ipsum dolor sit amet",
      answer:
        "We are one of the world's largest vertically-integrated manufacturers of apparel, socks and hosiery, leading the way in ethical and sustainable manufacturing practices. Gildan uses cotton grown in the USA, which represents the best combination of quality and value for Gildan cotton and cotton blended products. Since 2009, Gildan has proudly displayed the cotton USA mark, licensed by cotton council international, on consumer's product packaging and shipping materials. Gildan environmental program accomplishes two core objectives: reduce our environmental impact and preserve the natural Resources being used in our manufacturing process. At all operating levels, Gildan is aware of the fact that we operate as a part of a greater unit: the environment in which we live and work.",
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer:
        "We are one of the world's largest vertically-integrated manufacturers of apparel, socks and hosiery, leading the way in ethical and sustainable manufacturing practices. Gildan uses cotton grown in the USA, which represents the best combination of quality and value for Gildan cotton and cotton blended products. Since 2009, Gildan has proudly displayed the cotton USA mark, licensed by cotton council international, on consumer's product packaging and shipping materials. Gildan environmental program accomplishes two core objectives: reduce our environmental impact and preserve the natural Resources being used in our manufacturing process. At all operating levels, Gildan is aware of the fact that we operate as a part of a greater unit: the environment in which we live and work.",
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer:
        "We are one of the world's largest vertically-integrated manufacturers of apparel, socks and hosiery, leading the way in ethical and sustainable manufacturing practices. Gildan uses cotton grown in the USA, which represents the best combination of quality and value for Gildan cotton and cotton blended products. Since 2009, Gildan has proudly displayed the cotton USA mark, licensed by cotton council international, on consumer's product packaging and shipping materials. Gildan environmental program accomplishes two core objectives: reduce our environmental impact and preserve the natural Resources being used in our manufacturing process. At all operating levels, Gildan is aware of the fact that we operate as a part of a greater unit: the environment in which we live and work.",
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer:
        "We are one of the world's largest vertically-integrated manufacturers of apparel, socks and hosiery, leading the way in ethical and sustainable manufacturing practices. Gildan uses cotton grown in the USA, which represents the best combination of quality and value for Gildan cotton and cotton blended products. Since 2009, Gildan has proudly displayed the cotton USA mark, licensed by cotton council international, on consumer's product packaging and shipping materials. Gildan environmental program accomplishes two core objectives: reduce our environmental impact and preserve the natural Resources being used in our manufacturing process. At all operating levels, Gildan is aware of the fact that we operate as a part of a greater unit: the environment in which we live and work.",
    },
    {
      question: "Lorem ipsum dolor sit amet",
      answer:
        "We are one of the world's largest vertically-integrated manufacturers of apparel, socks and hosiery, leading the way in ethical and sustainable manufacturing practices. Gildan uses cotton grown in the USA, which represents the best combination of quality and value for Gildan cotton and cotton blended products. Since 2009, Gildan has proudly displayed the cotton USA mark, licensed by cotton council international, on consumer's product packaging and shipping materials. Gildan environmental program accomplishes two core objectives: reduce our environmental impact and preserve the natural Resources being used in our manufacturing process. At all operating levels, Gildan is aware of the fact that we operate as a part of a greater unit: the environment in which we live and work.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='faq-container'>
      <h2 className='faq-title'>FAQ</h2>
      {faqs?.map((faq, index) => (
        <div
          key={index}
          className={`faq-item ${openIndex === index ? "open" : ""}`}
          onClick={() => toggleFAQ(index)}
        >
          <div className='faq-question'>
            {faq.question}
            <span className='faq-icon'>
              <FontAwesomeIcon
                icon={openIndex === index ? faChevronUp : faChevronDown}
              />
            </span>
          </div>
          {openIndex === index && (
            <div className='faq-answer'>{faq.answer}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;
