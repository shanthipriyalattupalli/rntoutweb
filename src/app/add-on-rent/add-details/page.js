// components/MainContent.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "@/styles/Adddetail.css";
import { FaUpload, FaRegCalendarAlt } from "react-icons/fa";
import { FiPlus, FiTrash } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const upload = "/Assets/upload.png";

const MainContent = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  console.log(subCategoryId, "ghbnm,lpoiuyghvb nmkiuyghvb");
  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState("");
  const [productQuality, setProductQuality] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [productDetails, setProductDetails] = useState([
    {
      id: Date.now(),
      title: "",
      details: [{ id: Date.now() + 1, key: "", value: "" }],
    },
  ]);

  let userId, categoryId, subCategoryId, token;

  useEffect(() => {
    userId = localStorage.getItem("userId");
    categoryId = localStorage.getItem("selectedcategoryId");
    subCategoryId = localStorage.getItem("selectedSubCategoryId");
    token = localStorage.getItem("userToken");
  }, []);

  const handleAddSection = () => {
    setProductDetails([
      ...productDetails,
      {
        id: Date.now(),
        title: "",
        details: [{ id: Date.now() + 1, key: "", value: "" }],
      },
    ]);
  };

  const handleAddDetail = (sectionId) => {
    setProductDetails((prevDetails) =>
      prevDetails.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              details: [
                ...section.details,
                { id: Date.now(), key: "", value: "" },
              ],
            }
          : section
      )
    );
  };

  const handleDeleteDetail = (sectionId, detailId) => {
    setProductDetails((prevDetails) =>
      prevDetails.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              details: section.details.filter((d) => d.id !== detailId),
            }
          : section
      )
    );
  };

  const handleDeleteSection = (sectionId) => {
    setProductDetails((prevDetails) =>
      prevDetails.filter((section) => section.id !== sectionId)
    );
  };

  console.log(selectedOption, "selectedoption");

  // const handleInputChange = (sectionId, detailId, field, value) => {
  //     setProductDetails((prevDetails) =>
  //         prevDetails.map((section) =>
  //             section.id === sectionId
  //                 ? {
  //                     ...section,
  //                     details: section.details.map((detail) =>
  //                         detail.id === detailId ? { ...detail, [field]: value } : detail
  //                     ),
  //                 }
  //                 : section
  //         )
  //     );
  // };

  const handleTitleChange = (sectionId, value) => {
    setProductDetails((prevDetails) =>
      prevDetails.map((section) =>
        section.id === sectionId ? { ...section, title: value } : section
      )
    );
  };

  const [prices, setPrices] = useState({
    perDay: 0,
    perWeek: 0,
    perMonth: 0,
    perQuarter: 0,
    perSixMonths: 0,
  });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    // Map timeframe to the rentalPrice index
    const mapping = {
      perDay: "daily",
      perWeek: "weekly",
      perMonth: "monthly",
      perQuarter: "quarterly",
      perSixMonths: "semiannual",
    };

    const mappedPeriod = mapping[name];

    // Update state with the correct index
    setFormData((prevData) => ({
      ...prevData,
      rentalPrice: prevData.rentalPrice.map((item) =>
        item.period === mappedPeriod
          ? { ...item, price: parseFloat(value) || 0 }
          : item
      ),
    }));

    console.log(formData.rentalPrice);
  };

  const [previewImages, setPreviewImages] = useState([]); // To store the preview images
  const fileInputRef = useRef();

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

  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (categoryId && subCategoryId) {
          const response = await axios.get(
            `${BASE_URL}/products/categoryProducts/?categoryId=${categoryId}&subCategoryId=${subCategoryId}`
          );
          console.log(response.data, "Fetched Products by subCategoryId");
          setProducts(response.data); // Update the products state
        }
      } catch (error) {
        console.error("Error fetching products by subCategoryId:", error);
      }
    };

    fetchProducts();
  }, [categoryId, subCategoryId]);
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setFormData({
      ...formData,
      productId: option,
    });
  };

  const initialFormData = {
    owner: userId,
    title: "",
    description: "",
    images: ["", "", "", "", ""],
    categoryId: categoryId,
    subCategoryId: subCategoryId,
    productId: selectedOption,
    available: true,
    rentalPrice: [
      { period: "daily", price: 0 },
      { period: "weekly", price: 0 },
      { period: "monthly", price: 0 },
      { period: "quarterly", price: 0 },
      { period: "semiannual", price: 0 },
      { period: "annual", price: 0 },
    ],
    rentalAvailability: {
      startDate: null,
      endDate: null,
    },
    seoTags: ["", "", "", ""],
    isForSale: true,
    salePrice: 0,
    stockQuantity: 0,
    location: {
      city: "",
      state: "",
      country: "",
    },
    pickupAvailable: true,
    itemDetails: {},
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      rentalAvailability: {
        ...prevData.rentalAvailability,
        startDate: date, // Update only the startDate
      },
    }));
  };

  const handleChange = (sectionId, detailId, fieldType, value) => {
    setProductDetails((prevDetails) =>
      prevDetails.map((section) => {
        if (section.id === sectionId) {
          const updatedDetails = section.details.map((detail) =>
            detail.id === detailId ? { ...detail, [fieldType]: value } : detail
          );
          return { ...section, details: updatedDetails };
        }
        return section;
      })
    );
  };

  useEffect(() => {
    mapDetailsToFormData();
  }, [productDetails]);
  const mapDetailsToFormData = () => {
    const mappedDetails = productDetails.flatMap((section) =>
      section.details?.map((detail) => ({
        key: detail.key,
        value: detail.value,
      }))
    );

    console.log("Mapped itemDetails: ", mappedDetails);
    setFormData((prev) => ({
      ...prev,
      itemDetails: mappedDetails,
    }));
  };

  const handlePublishProduct = async () => {
    try {
      const payload = {
        owner: userId,
        title: formData.title,
        description: formData.description,
        images: formData.images,
        categoryId: formData.categoryId,
        subCategoryId: formData.subCategoryId,
        productId: formData.productId,
        available: formData.available,
        rentalPrice: formData.rentalPrice,
        rentalAvailability: {
          startDate: formData.rentalAvailability.startDate,
          endDate: formData.rentalAvailability.endDate,
        },
        seoTags: formData.seoTags,
        isForSale: formData.isForSale,
        salePrice: formData.salePrice,
        stockQuantity: formData.stockQuantity,
        location: {
          city: formData.location.city,
          state: formData.location.state,
          country: formData.location.country,
        },
        pickupAvailable: formData.pickupAvailable,
        itemDetails: formData.itemDetails,
      };
      console.log(payload, "payload");
      const response = await axios.post(`${BASE_URL}/variants`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response, "created product");
      toast.success("Product created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error publishing product:", error);
    }
  };

  console.log(productDetails, "productDetails");
  console.log(formData.itemDetails, "formdata itemDetails");

  console.log({ categoryId, subCategoryId }, "ouytrtdfgcvb");

  console.log(formData, "formData");

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className='main-content'>
      <ToastContainer />
      <div className='radio-button-group'>
        {products?.length > 0 ? (
          products?.map((option) => (
            <label key={option._id} className='radio-option'>
              <input
                type='radio'
                name='productId'
                value={option._id}
                checked={selectedOption === option._id}
                onChange={() => handleOptionChange(option._id)}
              />
              <span className='custom-radio'></span>
              {option.productName}
            </label>
          ))
        ) : (
          <p>No products found for the selected subcategory.</p>
        )}
      </div>

      <div className='product-form'>
        <h2 className='ba-in'>BASICS INFO</h2>
        <div className='basic-details'>
          <div className='form-section1'>
            <label>
              Product Name{" "}
              <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>
            </label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              placeholder='Enter name'
            />
          </div>

          <div className='form-section2'>
            <label>
              Product Quality{" "}
              <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>
            </label>
            <select
              name='description'
              value={formData.description}
              onChange={handleInputChange}
            >
              <option value=''>Select product quality</option>
              <option value='New'>New</option>
              <option value='Used - Like New'>Used - Like New</option>
              <option value='Used - Good'>Used - Good</option>
              <option value='Used - Acceptable'>Used - Acceptable</option>
            </select>
          </div>

          <div className='form-section3'>
            <label>
              Available Stock{" "}
              <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>
            </label>
            <input
              type='number'
              name='stockQuantity'
              value={formData.stockQuantity}
              onChange={handleInputChange}
              placeholder='Enter number'
            />
          </div>
        </div>

        <div className='form-section file-upload'>
          <h2 className='ba-in'>
            Product Image{" "}
            <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>
          </h2>
          <div className='file-upload-box'>
            <input
              type='file'
              ref={fileInputRef}
              multiple
              accept='.jpeg, .png, .jpg'
              style={{ display: "none" }}
              onChange={handleFileChange} // Add onChange handler
            />
            <div className='upload-icon' onClick={handleIconClick}>
              <img src={upload} />
            </div>
            <p>
              Drag your file(s) or <span onClick={handleIconClick}>browse</span>
            </p>
            <p className='file-note'>Image format will be a JPEG, PNG, JPG</p>
          </div>

          {/* Render Preview Images */}
          <div className='image-preview-container'>
            {previewImages.map((src, index) => (
              <div key={index} className='image-preview-box'>
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className='preview-image'
                />
              </div>
            ))}
          </div>
        </div>

        <div className='date-picker-container'>
          <label className='ba-in'>
            Product Availability{" "}
            <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>
          </label>
          <div className='date-picker-wrapper'>
            <DatePicker
              selected={formData.rentalAvailability.startDate}
              name='startDate'
              value={formData.rentalAvailability.startDate}
              onChange={(date) => handleDateChange(date)}
              placeholderText='Select date'
              className='date-picker-input'
              dateFormat='MMMM d, yyyy'
            />
            <FaRegCalendarAlt className='calendar-icon' />
          </div>
        </div>

        <div className='form-section4'>
          <h2 className='ba-in'>
            PRICING INFO{" "}
            <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>
          </h2>
          <div className='pricing-section'>
            {[
              "perDay",
              "perWeek",
              "perMonth",
              "perQuarter",
              "perSixMonths",
              "perYear",
            ].map((timeframe) => (
              <div key={timeframe} className='form-section5'>
                <label>
                  {timeframe.replace("per", "Per ").replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type='number'
                  name={timeframe}
                  onChange={handlePriceChange}
                  placeholder='₹ 0.00'
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='details-section'>
        <h2 className='ba-in'>
          Product Details{" "}
          <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>
        </h2>
        {productDetails?.map((section) => (
          <div key={section.id} className='product-details-card'>
            Title
            {section.details?.map((detail) => (
              <div key={detail.id} className='detail-row'>
                <input
                  type='text'
                  placeholder='Enter title'
                  value={detail.key}
                  onChange={(e) =>
                    handleChange(section.id, detail.id, "key", e.target.value)
                  }
                />
                <input
                  type='text'
                  placeholder='Enter description'
                  value={detail.value}
                  onChange={(e) =>
                    handleChange(section.id, detail.id, "value", e.target.value)
                  }
                />
                <button
                  onClick={() => handleDeleteDetail(section.id, detail.id)}
                  className='delete-btn'
                >
                  <FiTrash />
                </button>
              </div>
            ))}
            <div className='btn-add-del'>
              <button
                onClick={() => handleAddDetail(section.id)}
                className='add-row-btn1'
              >
                <FiPlus /> Add Row
              </button>
              <button
                onClick={() => handleDeleteSection(section.id)}
                className='delete-card-btn1'
              >
                <FiTrash /> Delete Card
              </button>
            </div>
          </div>
        ))}

        <button onClick={handleAddSection} className='add-section-btn'>
          <FiPlus /> Add New Product Description
        </button>
      </div>
      <button onClick={handlePublishProduct} className='publish-button'>
        Publish Product
      </button>
    </div>
  );
};

export default MainContent;
