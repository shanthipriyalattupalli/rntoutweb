

import { FaPlus, FaMinus } from "react-icons/fa";
import axios from "axios"
import { IoIosArrowBack } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import FaqQandA from "@/Components/Faqs/FaqQandA";

const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL



const fetchFaqQandA = async (faqId) => {
    try {
        const response = await axios.get(`${BASE_URL}/faq/categories/${faqId}/questions`);
      console.log(response.data,"response of faq")
return response.data.data
    } catch (error) {
        console.error("Error fetching FAQ categories:", error);
    }
};

const FAQSection = async({params}) => {

const {faqId}=await params;
console.log(faqId,"faqid")
const faqQuestions=await fetchFaqQandA(faqId)





    return (
        <div className="max-w-5x2 mx-auto px-[6rem] py-10">
            <h2 className="text-2xl font-bold text-center">General Questions</h2>
            <p className="text-gray-600 text-center mt-2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
<FaqQandA faqQuestions ={faqQuestions}/>

        </div>
    );
};
export default FAQSection;