'use client';

import React, { useState, useRef } from 'react';
import '@/styles/details.css';
import { useRouter } from 'next/navigation';
import { FaUpload, FaRegCalendarAlt } from 'react-icons/fa';
import { FiPlus, FiTrash } from 'react-icons/fi';
import { IoMdArrowRoundBack } from "react-icons/io";
import 'react-datepicker/dist/react-datepicker.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainContent = () => {
    const [productDetails, setProductDetails] = useState([
        { id: Date.now(), title: '', details: [{ id: Date.now() + 1, key: '', value: '' }] },
    ]);

    const handleAddSection = () => {
        setProductDetails([
            ...productDetails,
            { id: Date.now(), title: '', details: [{ id: Date.now() + 1, key: '', value: '' }] },
        ]);
    };

    const handleAddDetail = (sectionId) => {
        setProductDetails((prevDetails) =>
            prevDetails.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        details: [...section.details, { id: Date.now(), key: '', value: '' }],
                    }
                    : section
            )
        );
    };

    const handleDeleteDetail = (sectionId, detailId) => {
        setProductDetails((prevDetails) =>
            prevDetails.map((section) =>
                section.id === sectionId
                    ? { ...section, details: section.details.filter((d) => d.id !== detailId) }
                    : section
            )
        );
    };

    const handleDeleteSection = (sectionId) => {
        setProductDetails((prevDetails) => prevDetails.filter((section) => section.id !== sectionId));
    };

    const handleInputChange = (sectionId, detailId, field, value) => {
        setProductDetails((prevDetails) =>
            prevDetails.map((section) =>
                section.id === sectionId
                    ? {
                        ...section,
                        details: section.details.map((detail) =>
                            detail.id === detailId ? { ...detail, [field]: value } : detail
                        ),
                    }
                    : section
            )
        );
    };

    const handleTitleChange = (sectionId, value) => {
        setProductDetails((prevDetails) =>
            prevDetails.map((section) =>
                section.id === sectionId ? { ...section, title: value } : section
            )
        );
    };

    const [productName, setProductName] = useState('');
    const [productQuality, setProductQuality] = useState('');
    const [availableStock, setAvailableStock] = useState('');
    const [prices, setPrices] = useState({
        perDay: 0,
        perWeek: 0,
        perMonth: 0,
        perQuarter: 0,
        perSixMonths: 0,
    });

    const handlePriceChange = (e) => {
        setPrices({
            ...prices,
            [e.target.name]: e.target.value,
        });
    };

    const fileInputRef = useRef(null);

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    
   

    const router = useRouter();

    return (
        <>
        <div className='item-header1' onClick={() => router.back()}>
        <div className='back-product22'><IoMdArrowRoundBack style={{ marginRight: "12px" }} />
        <p>DROGO Throne Ergonomic Gaming Chair with Foot Rest, Armrest & Adjustable Seat (Blue)</p>
         <h1>Save Details</h1>
        </div>
        </div>
        <div className="main-content-container-pg">
            <ToastContainer />
            <div className="product-form-container-dd">
                <h2 className='section-header-pd'>Basic Information</h2>
                <div className='basic-info-section-pd'>
                    <div className="input-group-pd">
                        <label>Product Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Enter name"
                        />
                    </div>

                    <div className="input-group-pd">
                        <label>Product Quality</label>
                        <select
                            value={productQuality}
                            onChange={(e) => setProductQuality(e.target.value)}
                        >
                            <option value="">Select product quality</option>
                            <option value="New">New</option>
                            <option value="Used - Like New">Used - Like New</option>
                            <option value="Used - Good">Used - Good</option>
                            <option value="Used - Acceptable">Used - Acceptable</option>
                        </select>
                    </div>

                    <div className="input-group-pd">
                        <label>Available Stock</label>
                        <input
                            type="number"
                            value={availableStock}
                            onChange={(e) => setAvailableStock(e.target.value)}
                            placeholder="Enter number"
                        />
                    </div>
                </div>

                <div className="file-upload-section-pd">
                    <label>Product Image</label>
                    <div className="file-upload-box-pd">
                        <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            accept=".jpeg, .png, .jpg"
                            style={{ display: 'none' }}
                        />
                        <div className="upload-icon-wrapper-pd" onClick={handleIconClick}>
                            <FaUpload />
                        </div>
                        <p>Drag your file(s) or <span onClick={handleIconClick}>browse</span></p>
                        <p className="file-note">Image format will be a JPEG, PNG, JPG</p>
                    </div>
                </div>

               

                <div className='pricing-section-pd'>
                    <h2 className="section-header-pd">Pricing Information</h2>
                    <div className="pricing-inputs-pd">
                        {["perDay", "perWeek", "perMonth", "perQuarter", "perSixMonths"].map((timeframe) => (
                            <div key={timeframe} className="input-group-pd">
                                <label>{timeframe.replace("per", "Per ").replace(/([A-Z])/g, ' $1')}</label>
                                <input
                                    type="number"
                                    name={timeframe}
                                    onChange={handlePriceChange}
                                    placeholder="₹ 0.00"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="details-section-pd">
                <h2 className="section-header-pd">Product Details</h2>
                {productDetails.map((section) => (
                    <div key={section.id} className="product-details-card-pd">
                        <label>Title</label>
                        <input
                            type="text"
                            className="title-input-pd"
                            placeholder="Enter title name"
                            value={section.title}
                            onChange={(e) => handleTitleChange(section.id, e.target.value)}
                        />

                        {section.details.map((detail) => (
                            <div key={detail.id} className="detail-row-pd">
                                <input
                                    type="text"
                                    placeholder="Enter title"
                                    value={detail.key}
                                    onChange={(e) => handleInputChange(section.id, detail.id, 'key', e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Enter description"
                                    value={detail.value}
                                    onChange={(e) => handleInputChange(section.id, detail.id, 'value', e.target.value)}
                                />
                                <button
                                    onClick={() => handleDeleteDetail(section.id, detail.id)}
                                    className="delete-detail-btnn"
                                >
                                    <FiTrash />
                                </button>
                            </div>
                        ))}
                        <div className='section-actions-pd'>
                            <button onClick={() => handleAddDetail(section.id)} className="add-detail-btn">
                                <FiPlus /> Add Row
                            </button>
                            <button onClick={() => handleDeleteSection(section.id)} className="delete-section-btn">
                                <FiTrash /> Delete Card
                            </button>
                        </div>
                    </div>
                ))}

                <button onClick={handleAddSection} className="add-section-btn">
                    <FiPlus /> Add New Product Description
                </button>
            </div>
        </div>
        </>
    );
};

export default MainContent;
