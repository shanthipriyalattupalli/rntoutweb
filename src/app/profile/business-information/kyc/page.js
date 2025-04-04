"use client";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { IoMdArrowRoundBack } from "react-icons/io";

const KYCVerification = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const token = Cookies.get("userToken");

  const [formData, setFormData] = useState({
    gstin: "",
  });

  const [gstDetails, setGstDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGstVerify = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/kyc/verify/gstin`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "response of gst");

      if (response.data && response.data.success) {
        setGstDetails(response.data.data);
        setErrorMessage("");
        toast.success("GST Verified Successfully!");
      } else {
        setGstDetails(null);
        setErrorMessage("Invalid GST Number. Please try again.");
        toast.error("Invalid GST Number!");
      }
    } catch (error) {
      console.error(error, "error in gst");
      setGstDetails(null);
      setErrorMessage("Something went wrong. Please try again.");
      toast.error("Please Enter Proper GST Number!");
    }
  };

  return (
    <>
            <ToastContainer />

      <div className="item-header">
        <div className='flex flex-row gap-1'>Business KYC </div>

      </div>

      <div className="max-w-md mx-auto p-6 text-center justify-center h-screen">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          GST Verification
        </h2>

        <input
          type="text"
          placeholder="22AAAAA0000A1Z5"
          name="gstin"
          value={formData.gstin}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleGstVerify}
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 transition"
        >
          Verify GST
        </button>

        {/* Success Message */}
        <div className="mt-4 p-4 bg-green-100 rounded-md">
        <h3 className="text-lg font-semibold text-green-700">GST Details</h3>
        <p className="text-gray-700"><strong>Business Name:</strong> ABC Pvt Ltd</p>
        <p className="text-gray-700"><strong>State:</strong> Maharashtra</p>
        <p className="text-gray-700"><strong>Registration Date:</strong> 01-Jan-2023</p>
        <p className="text-gray-700"><strong>Status:</strong> Active</p>
      </div>

      {/* Error Message */}
      <p className="text-red-500 text-sm mt-2 hidden">
        Invalid GST Number. Please try again.
      </p>


        {/* Error Message */}
        {/* {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>} */}
      </div>
    </>
  );
};

export default KYCVerification;
