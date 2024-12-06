// components/MainContent.js
'use client';
import React, { useState, useRef } from 'react';
import '@/styles/Adddetail.css'
import { FaUpload, FaRegCalendarAlt } from 'react-icons/fa';
import { FiPlus, FiTrash } from 'react-icons/fi';
import DatePicker from 'react-datepicker';
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


    const[previewImages, setPreviewImages] = useState([]); // To store the preview images
    const fileInputRef = useRef();

    // Handle file selection
    const handleFileChange = (event) => {
        const files = event.target.files;
        const previews = [];

        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                previews.push(reader.result);
                if (previews.length === files.length) {
                    setPreviewImages(previews); // Update preview images after reading all files
                }
            };
            reader.readAsDataURL(file);
        });
    };

    // Handle click to open the file dialog
    const handleIconClick = () => {
        fileInputRef.current.click();
    };



    const [selectedOption, setSelectedOption] = useState('Hiking Backpacks with Hydration System');
    const options = [
        'Hiking Backpacks with Hydration System',
        'Portable Camping Chairs and Tables',
        'Coolers and Portable Fridges'
    ];

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };
    const [selectedDate, setSelectedDate] = useState(null);

    return (
        <div className="main-content">
            <ToastContainer />
            <div className="radio-button-group">
                {options.map((option, index) => (
                    <label key={index} className="radio-option">
                        <input
                            type="radio"
                            name="productCategory"
                            value={option}
                            checked={selectedOption === option}
                            onChange={() => handleOptionChange(option)}
                        />
                        <span className="custom-radio"></span>
                        {option}
                    </label>
                ))}
            </div>
            <div className="product-form">
                <h2 className='ba-in'>BASICS INFO</h2>
                <div className='basic-details'>
                    <div className="form-section1">
                        <label>Product Name</label>
                        <input
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            placeholder="Enter name"
                        />
                    </div>

                    <div className="form-section2">
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

                    <div className="form-section3">
                        <label>Available Stock</label>
                        <input
                            type="number"
                            value={availableStock}
                            onChange={(e) => setAvailableStock(e.target.value)}
                            placeholder="Enter number"
                        />
                    </div>
                </div>

                <div className="form-section file-upload">
                    <h2 className="ba-in">Product Image</h2>
                    <div className="file-upload-box">
                        <input
                            type="file"
                            ref={fileInputRef}
                            multiple
                            accept=".jpeg, .png, .jpg"
                            style={{ display: 'none' }}
                            onChange={handleFileChange} // Add onChange handler
                        />
                        <div className="upload-icon" onClick={handleIconClick}>
                            <FaUpload />
                        </div>
                        <p>
                            Drag your file(s) or <span onClick={handleIconClick}>browse</span>
                        </p>
                        <p className="file-note">Image format will be a JPEG, PNG, JPG</p>
                       
                    </div>

                    {/* Render Preview Images */}
                    <div className="image-preview-container">
                        {previewImages.map((src, index) => (
                            <div key={index} className="image-preview-box">
                                <img src={src} alt={`Preview ${index + 1}`} className="preview-image" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="date-picker-container">
                    <label className='ba-in'>Product Availability</label>
                    <div className="date-picker-wrapper">
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => setSelectedDate(date)}
                            placeholderText="Select date"
                            className="date-picker-input"
                            dateFormat="MMMM d, yyyy"

                        />
                        <FaRegCalendarAlt className="calendar-icon" />
                    </div>
                </div>


                <div className='form-section4'>
                    <h2 className='ba-in'>PRICING INFO</h2>
                    <div className="pricing-section">
                        {["perDay", "perWeek", "perMonth", "perQuarter", "perSixMonths"].map((timeframe) => (
                            <div key={timeframe} className="form-section5">
                                <label>{timeframe.replace("per", "Per ").replace(/([A-Z])/g, ' $1')}</label>
                                <input
                                    type="number"
                                    name={timeframe}
                                    // value={prices[timeframe]}
                                    onChange={handlePriceChange}
                                    placeholder="₹ 0.00"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="details-section">
                <h2 className='ba-in'>Product Details</h2>
                {productDetails.map((section) => (
                    <div key={section.id} className="product-details-card">
                        Title
                        <input
                            type="text"
                            className="title-input"
                            placeholder="Enter title name"
                            value={section.title}
                            onChange={(e) => handleTitleChange(section.id, e.target.value)}
                        />

                        {section.details.map((detail) => (
                            <div key={detail.id} className="detail-row">
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
                                    className="delete-btn"
                                >
                                    <FiTrash />
                                </button>
                            </div>
                        ))}
                        <div className='btn-add-del'>
                            <button onClick={() => handleAddDetail(section.id)} className="add-row-btn1">
                                <FiPlus /> Add Row
                            </button>
                            <button onClick={() => handleDeleteSection(section.id)} className="delete-card-btn1">
                                <FiTrash /> Delete Card
                            </button>
                        </div>
                    </div>
                ))}

                <button onClick={handleAddSection} className="add-section-btn">
                    <FiPlus />   Add New Product Description
                </button>

            </div>

        </div>
    );
};

export default MainContent;
