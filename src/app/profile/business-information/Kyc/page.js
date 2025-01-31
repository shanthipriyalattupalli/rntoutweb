'use client';
import { useState } from "react";
import { FaCloudUploadAlt, FaCheckCircle, FaTimes } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { IoMdArrowRoundBack } from "react-icons/io";
import '../../../../styles/BusinessInformation2.css'
import { IoArrowBackOutline } from "react-icons/io5";
const KYCVerification = () => {
    const [aadharImage, setAadharImage] = useState(null);
    const [panImage, setPanImage] = useState(null);
    // Function to handle file upload
    const handleFileChange = (event, setImage) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImage(imageUrl);
        }
    };
    // Function to remove uploaded image
    const removeImage = (setImage) => {
        setImage(null);
    };
    const router = useRouter();
    return (
        <>
        <h2 className='item-header'>
        <div className='back-business' onClick={() => router.back()}>
          <IoMdArrowRoundBack style={{ marginRight: "12px" }} />
          KYC Verification
        </div>
        <h3 className="cursor-pointer" >Edit</h3>
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
                        {aadharImage ? (
                            <>
                                <img
                                    src={aadharImage}
                                    alt="Aadhar Preview"
                                    className="w-full h-40 object-cover rounded-lg"
                                />
                                <button
                                    onClick={() => removeImage(setAadharImage)}
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
                                    onChange={(e) => handleFileChange(e, setAadharImage)}
                                />
                            </>
                        )}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                        Image size should be less than 2MB
                    </p>
                </div>
                {/* PAN Card Upload */}
                <div>
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
                </div>
            </div>
            {/* Verified Badge */}
            <div className="mt-4 flex justify-center">
                <span className="flex items-center gap-1 text-green-600 font-medium bg-green-100 px-3 py-1 rounded-md">
                    <FaCheckCircle /> Verified
                </span>
            </div>
            {/* Submit Button */}
            <div className="mt-6 flex justify-center">
                <button className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition">
                    Submit
                </button>
            </div>
        </div>
        </>
    );
};
export default KYCVerification;