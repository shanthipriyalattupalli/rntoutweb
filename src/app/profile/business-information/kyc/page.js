"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { IoMdArrowRoundBack } from "react-icons/io";

const KYCVerification = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const token = Cookies.get("userToken");
    const maxAttempts = 3;
  const [remainingAttempts,setRemainingAttempts] = useState(maxAttempts);

  const [formData, setFormData] = useState({
    gstin: "",
  });

  const [gstDetails, setGstDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };




  const fecthGst = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/kyc/gstin-kyc`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );


      if (response.data && response.data.success) {
        setGstDetails(response?.data?.data);
        setRemainingAttempts(maxAttempts-response?.data?.data[0]?.failedAttempts || maxAttempts);
      } else {
        setGstDetails(null);
        // setErrorMessage(response.data.message);

      }
    } catch (error) {
      console.error(error, "error in gst");

    }
  };

  useEffect(() => {
    fecthGst();
  }, []);


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
      toast.success("GST Verification in Progress...");
      fecthGst();


      if (response.data && response.data.success) {
        // setGstDetails(response.data.data);
        setErrorMessage("");
        toast.success("GST Verified Successfully!");
      } else {
        // setGstDetails(null);
        setErrorMessage(response.data.message);

      }
    } catch (error) {
      console.error(error, "error in gst");
      setGstDetails(null);
      setErrorMessage("Something went wrong. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error?.response?.data?.message,
        timer:2000,
        showConfirmButton:false
      })
            fecthGst();

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


        {gstDetails?.[0]?.status !== "VERIFIED" &&
          (<>  <input
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
          </>)}



        {/* Success Message */}
        {gstDetails?.map((gst, index) => (
          gst.status === "VERIFIED" && (
            <div className="mt-4 p-4 bg-green-100 rounded-md" key={gst._id}>
              <h3 className="text-lg font-semibold text-green-700">GST Details</h3>
              <p className="text-gray-700"><strong>DocumentId:</strong> {gst?.gstinData?.gstin_data?.document_id}</p>
              <p className="text-gray-700"><strong>Document Type:</strong> {gst?.gstinData?.gstin_data?.document_type}</p>
              <p className="text-gray-700"><strong>Legal Name:</strong> {gst?.gstinData?.gstin_data?.legal_name}</p>
              <p className="text-gray-700"><strong>Pan:</strong> {gst?.gstinData?.gstin_data?.pan}</p>
              <p className="text-gray-700"><strong>Address:</strong> {gst?.gstinData?.gstin_data.principal_address?.address}</p>
            </div>)
        ))}

        {/* Error Message */}
        <p className="text-red-500 text-sm mt-2 hidden">
          Invalid GST Number. Please try again.
        </p>
        <span className="w-full flex mt-4 justify-center">
          Note: User can upload only 3 times. You have {remainingAttempts && remainingAttempts} attempt{remainingAttempts !== 1 ? 's' : ''} left.
        </span>



        {/* Error Message */}
        {/* {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>} */}
      </div>
    </>
  );
};

export default KYCVerification;
