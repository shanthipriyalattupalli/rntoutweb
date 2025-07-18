'use client';
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FaCloudUploadAlt, FaCheckCircle, FaTimes } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from "react-icons/io";
import '../../../styles/BusinessInformation2.css'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const KYCVerification = () => {
    const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
    const [aadharImage, setAadharImage] = useState("");
    const [Preview, setIsPreview] = useState(null);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isKycSuccess, setIsKycSuccess] = useState();
    const [aadhardetails, setAadharDetails] = useState(null);
    const token = Cookies.get("userToken");
    const fileInputRef = useRef(null);

    // Function to handle file upload
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsPreview(URL.createObjectURL(file));
            setAadharImage(file);
        }
    };

    // Function to remove uploaded image
    const removeImage = () => {
        setIsPreview(null);
        setAadharImage(null);
    };

    // Function to handle KYC upload
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
            setIsKycSuccess(response.data.success);
            fetchAadharKyc();
            toast.success("KYC Verified Successfully!");
            window.location.reload();
        } catch (error) {
            toast.error(error.response?.data?.message || "Verification failed");
            fetchAadharKyc();
        } finally {
            setIsVerifying(false);
        }
    };

    // Function to fetch KYC details
    const fetchAadharKyc = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/kyc/aadhaar/details`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });



            setAadharDetails(response?.data?.data?.verificationResponse?.data?.ocr_data);
            setIsPreview(response.data.data.aadhaarPhoto);
            setIsKycSuccess(response.data.data.status);
            if (response?.data?.data?.status) {
                Cookies.set("kycstatus", response?.data?.data?.status, { expires: 7, secure: true, sameSite: "Strict" });

            }
        } catch (error) {
            console.log(error, "error");
            if (error.response && error.response.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Login Required",
                    text: "Please login to proceed with payment.",
                });
            }
        }
    };

    useEffect(() => {
        fetchAadharKyc();
    }, []);

    return (
        <>
            <ToastContainer />

            <div className='item-header'>
                <div className='flex flex-row gap-1'>KYC Verification</div>
            </div>

            <div className="bg-white rounded-lg p-6">
                {/* Upload Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
                    {/* Aadhar Card Upload */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">
                            Aadhar Card
                        </h3>
                        <span className="text-red font-semibold mb-2">{isKycSuccess === "VERIFIED" ? "" : "Note: user can have only 3 chances to upload"}</span>
                        <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer relative">
                            {Preview ? (
                                <>
                                    <img
                                        src={Preview}
                                        alt="Aadhar Preview"
                                        className="w-full h-40 object-cover rounded-lg"
                                    />
                                    {/* Show Remove Button only if status is PENDING */}
                                    {isKycSuccess !== "VERIFIED" && (
                                        <button
                                            onClick={removeImage}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                                        >
                                            <FaTimes />
                                        </button>
                                    )}
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
                                        onChange={handleFileChange}
                                    />
                                </>
                            )}
                        </label>
                        {/* <p className="text-xs text-gray-500 mt-1">
                            Image size should be less than 2MB
                        </p> */}

                    </div>
                    {isKycSuccess === "VERIFIED" && (
                        <div className="mt-4 p-6 border border-gray-200 shadow-lg rounded-lg bg-white max-w-md mx-auto">
                            <div className="grid grid-cols-2 gap-y-4 text-sm font-medium text-gray-700">
                                {aadhardetails?.document_id &&
                                    <> <div className="text-right pr-4">Document ID:</div>
                                        <div className="text-left">{aadhardetails?.document_id}</div>
                                    </>
                                }

                                {aadhardetails?.name &&
                                    <><div className="text-right pr-4">Name:</div>
                                        <div className="text-left">{aadhardetails?.name}</div>
                                    </>}

                                {aadhardetails?.guardian_name &&
                                    <><div className="text-right pr-4">Guardian Name:</div>
                                        <div className="text-left">{aadhardetails?.guardian_name}</div>
                                    </>}
                                {aadhardetails?.gender &&
                                    <>
                                        <div className="text-right pr-4">Gender:</div>
                                        <div className="text-left">{aadhardetails?.gender}</div>
                                    </>
                                }
                                {aadhardetails?.date_of_birth &&
                                    <>  <div className="text-right pr-4">Date Of Birth:</div>
                                        <div className="text-left">{aadhardetails?.date_of_birth}</div>
                                    </>}

                                {aadhardetails?.address &&
                                    <> <div className="text-right pr-4">Address:</div>
                                        <div className="text-left">{aadhardetails?.address}</div>
                                    </>
                                }
                            </div>
                        </div>

                    )}
                </div>

                {/* Verification Status */}
                {isVerifying && (
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <p className="text-blue-500 font-medium">Verifying Aadhaar...</p>
                    </div>
                )}

                {isKycSuccess === "VERIFIED" && (
                    <div className="mt-14 flex justify-center">
                        <span className="flex items-center gap-1 text-green-600 font-medium bg-green-100 px-3 py-1 rounded-md">
                            <FaCheckCircle /> Verified
                        </span>
                    </div>
                )}
                {/* {isKycSuccess === "VERIFIED" && (
                    <div className="mt-4 p-6 border border-gray-200 shadow-lg rounded-lg bg-white max-w-md mx-auto">
                        <div className="grid grid-cols-2 gap-y-4 text-sm font-medium text-gray-700">
                            <div className="text-right pr-4">Document ID:</div>
                            <div className="text-left">433432891244</div>

                            <div className="text-right pr-4">Name:</div>
                            <div className="text-left">John Doe</div>

                            <div className="text-right pr-4">Guardian Name:</div>
                            <div className="text-left">Jane Doe</div>

                            <div className="text-right pr-4">Gender:</div>
                            <div className="text-left">Male</div>

                            <div className="text-right pr-4">Date Of Birth:</div>
                            <div className="text-left">1990-01-01</div>

                            <div className="text-right pr-4">Address:</div>
                            <div className="text-left">1234 Main Street, City, Country</div>
                        </div>
                    </div>

                )} */}

                {isKycSuccess === "PENDING" && (
                    <div className="mt-4 flex justify-center">
                        <span className="flex items-center gap-1 text-yellow-600 font-medium bg-yellow-100 px-3 py-1 rounded-md">
                            <FaCheckCircle /> Pending
                        </span>
                    </div>
                )}

                {/* Show Submit Button only if status is PENDING */}
                {isKycSuccess !== "VERIFIED" && (
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleUploadKyc}
                            className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition"
                        >
                            Submit
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default KYCVerification;
