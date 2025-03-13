'use client';
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaCloudUploadAlt, FaCheckCircle, FaTimes } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from "react-icons/io";
import '../../styles/BusinessInformation2.css'
import { IoArrowBackOutline } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const KYCVerification = ({ setIsKyc }) => {
    const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
    const [aadharImage, setAadharImage] = useState("");
    const [Preview, setIsPreview] = useState(null)
    const [panImage, setPanImage] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isKycSuccess, setIsKycSuccess] = useState(false)
    const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
    const fileInputRef = useRef(null); // Reference to file input
    // Function to handle file upload
    const handleFileChange = (event, setImage, setPreview) => {
        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // Set preview URL
            setImage(file); // Store file directly
        }
    };

    // Function to remove uploaded image
    const removeImage = () => {
        setIsPreview(null);
        setAadharImage(null);

        // Reset the file input field without triggering file selection
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleUploadKyc = async () => {
        if (!aadharImage) {
            toast.error("Aadhaar image is required");
            return;
        }

        setIsVerifying(true);
        const formData = new FormData();
        formData.append("aadhaarPhoto", aadharImage);

        try {
            const response = await axios.post(`${BASE_URL}/kyc/aadhaar/verify`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response,"kyc verification")
            setIsKycSuccess(response.data.success)
            toast.success("KYC Verified Successfully!");
        } catch (error) {

            toast.error(error.response?.data?.message || "Verification failed");
        } finally {
            setIsVerifying(false);
        }
    };


const fetchAadharKyc=async()=>{
    try {
        const response=await axios.get(`${BASE_URL}/kyc/aadhaar/details`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data.data,"response in aadhar")
        setIsPreview(response.data.data.aadhaarPhoto);
        setIsKycSuccess(response.data.data.status)
        
    } catch (error) {
    console.log(error,"error")
        
    }
}

useEffect(()=>{
    fetchAadharKyc();
},[])



    const router = useRouter();
    return (
        <>
            <h2 className='item-header'>
                <ToastContainer />
                <div
                    className="flex items-center gap-2 mr-auto text-left text-gray-700 hover:text-gray-900 cursor-pointer"
                    onClick={() => setIsKyc(false)}
                >
                    <IoMdArrowRoundBack className="w-5 h-5 text-gray-600" />
                    <span className="text-lg font-bold">KYC Verification</span>
                </div>

                {/* <h3 className="cursor-pointer" >Edit</h3> */}
            </h2>
            <div className="  bg-white  rounded-lg p-6">
                {/* Upload Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                    {/* Aadhar Card Upload */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Aadhar Card
                        </h3>
                        <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer relative">
                            {Preview ? (
                                <>
                                    <img
                                        src={Preview}
                                        alt="Aadhar Preview"
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                  { !isKycSuccess === "VERIFIED"        &&          <button
                                        onClick={removeImage}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                    >
                                        <FaTimes />
                                    </button>}
                                </>
                            ) : (
                                <>
                                    <FaCloudUploadAlt className="text-blue-500 text-3xl mb-2" />
                                    <p className="text-gray-600 text-sm">
                                        Drag your file(s) or{" "}
                                        <span className="text-blue-600">browse</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Image format: JPEG, PNG, JPG
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, setAadharImage, setIsPreview)}
                                    />

                                </>
                            )}
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                            Image size should be less than 2MB
                        </p>
                    </div>
                    {/* PAN Card Upload */}
                    {/* <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">PAN Card</h3>
                        <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer relative">
                            {panImage ? (
                                <>
                                    <img
                                        src={panImage}
                                        alt="PAN Preview"
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                    <button
                                        onClick={() => removeImage(setPanImage)}
                                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                    >
                                        <FaTimes />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <FaCloudUploadAlt className="text-blue-500 text-3xl mb-2" />
                                    <p className="text-gray-600 text-sm">
                                        Drag your file(s) or{" "}
                                        <span className="text-blue-600">browse</span>
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Image format: JPEG, PNG, JPG
                                    </p>
                                    <input
                                        type="file"
                                        accept="image/png, image/jpeg, image/jpg"
                                        className="hidden"
                                        onChange={(e) => handleFileChange(e, setPanImage)}
                                    />
                                </>
                            )}
                        </label>
                        <p className="text-xs text-gray-500 mt-1">
                            Image size should be less than 2MB
                        </p>
                    </div> */}
                </div>
                {/* Verified Badge */}
                {isVerifying && (
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-blue-500 font-medium">Verifying Aadhaar...</p>
                    </div>)}
                {isKycSuccess === "VERIFIED" ? <div className="mt-4 flex justify-center">
                    <span className="flex items-center gap-1 text-green-600 font-medium bg-green-100 px-3 py-1 rounded-md">
                        <FaCheckCircle /> Verified
                    </span>
                </div>:<div className="mt-4 flex justify-center">
                    <span className="flex items-center gap-1 text-green-600 font-medium bg-green-100 px-3 py-1 rounded-md">
                        <FaCheckCircle /> {isKycSuccess}
                    </span>
                </div>}
                {/* Submit Button */}
{ !isKycSuccess === "VERIFIED"      &&         <div className="mt-6 flex justify-center" onClick={() => handleUploadKyc()}>
                    <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
                        Submit
                    </button>
                </div>}
            </div>
        </>
    );
};
export default KYCVerification;