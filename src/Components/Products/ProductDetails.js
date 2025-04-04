"use client";

import React, {useState } from "react";
import '../../styles/productslist.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductPage = ({ setIsModelOpen, productId, product, rentalPrice, rentalAvailability, otherDetail, images }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const otherDetails = otherDetail
        ? Object.entries(otherDetail).map(([key, value]) => ({
            label: key.charAt(0).toUpperCase() + key?.slice(1),
            value,
        }))
        : [];

    const productDetails = otherDetail
        ? Object.entries(otherDetail).map(([key, value]) => ({
            label: key.charAt(0).toUpperCase() + key?.slice(1),
            value,
        }))
        : [];


    const periodMapping = {
        quarterly: "3 Months",
        semiannual: "6 Months",
        annual: "Year",
    };

    return (
        <>
            <div className='flex gap-4 px-4'>

                <div className='relative'>
                    <img
                        src={images[selectedImage]} // Dynamically bind the selected image
                        alt={`Product Image ${selectedImage + 1}`}
                        className='w-full h-[250px] rounded-lg shadow-lg'
                    />

                    <div className='grid grid-cols-4 gap-2'>
                        {images.map((image, index) => (
                            <button
                                key={index}
                                className={`border-2 rounded-lg overflow-hidden ${selectedImage === index ? "border-red-500" : "border-gray-200"
                                    }`}
                                onClick={() => setSelectedImage(index)} // Update the selected image
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1}`}
                                    className='w-full h-20 object-cover'
                                />
                            </button>
                        ))}
                    </div>
                </div>
                <div className='space-y-2 w-full'>
                    <h1 className='text-2xl font-bold'>{product.title}</h1>
                    <div>
                        {/* <h3 className='font-medium mb-3 text-sm'>SELECT DURATION</h3> */}
                        <div className='grid grid-cols-2 md:grid-cols-3  gap-3 bg-white'>
                            {rentalPrice.map((price) => (
                                <button
                                    key={price._id}
                                    className={`flex flex-col items-center justify-center px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 rounded-lg border text-center w-full sm:w-auto "`}
                                >
                                    {periodMapping[price.period] || price.period.charAt(0).toUpperCase() + price.period?.slice(1)}

                                    <div className='font-bold text-sm sm:text-md md:text-sm'>₹{price.price}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                    {productDetails.length > 0 && <div className='flex flex-col gap-8 py-6'>
                        <div className='space-y-6'>
                            <div className=''>
                                <table className='flex flex-col w-full text-sm border bg-white rounded-3xl p-4'>
                                    <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                                        Product Details
                                    </h2>
                                    <tbody>
                                        {productDetails.map((detail, index) => (
                                            <tr key={index} className=''>
                                                <td className='p-2 font-semibold'>{detail.label}</td>
                                                <td className='p-2 text-gray-600'>{detail.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <table className='flex flex-col w-full border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4'>
                                    <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                                        Other Details
                                    </h2>
                                    <tbody>
                                        {otherDetails?.map((detail, index) => (
                                            <tr key={index} className=''>
                                                <td className='p-2 font-semibold'>{detail.label}</td>
                                                <td className='p-2 text-gray-600'>{detail.value}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
  
                        </div>


                    </div>}
                    <div>
                                <table className='flex flex-col w-full border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4'>
                                    <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                                        Product Description
                                    </h2>
                                    <tbody>
                                        <p className="font-sm text-md text-gray-700 leading-relaxed text-left">{product.description}</p>
                                    </tbody>
                                </table>
                            </div>
                </div>



            </div>




        </>
    );
};

export default ProductPage;
