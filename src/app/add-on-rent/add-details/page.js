// components/MainContent.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
// import "@/styles/Adddetail.css";
import '../../../styles/Adddetail.css';
import { FaUpload, FaRegCalendarAlt } from "react-icons/fa";
import { FiPlus, FiTrash } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MAP_API } from '../../../services/GMap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const upload = "/Assets/upload.png";

const MainContent = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  //console.log(subCategoryId, "ghbnm,lpoiuyghvb nmkiuyghvb");
  const [products, setProducts] = useState([]);

  const [productName, setProductName] = useState("");
  const [productQuality, setProductQuality] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [productDetails, setProductDetails] = useState([
    {
      // id: Date.now(),
      // title: "",
      details: [{ key: "", value: "" }],
    },
  ]);


  const userId = (typeof window !== 'undefined') ? localStorage.getItem("userId") : null;
  const categoryId = (typeof window !== 'undefined') ? localStorage.getItem("selectedcategoryId") : null;
  const subCategoryId = (typeof window !== 'undefined') ? localStorage.getItem("selectedSubCategoryId") : null;
  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;


  useEffect(() => {
    const handleStorageChange = () => {
      setFormData({
        ...formData,
        categoryId: categoryId,
        subCategoryId: subCategoryId
      });
    }



    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);

  }, []);

  console.log(categoryId, subCategoryId, "fetchProducts ")




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
  const [prices, setPrices] = useState({
    perDay: 0,
    perWeek: 0,
    perMonth: 0,
    perQuarter: 0,
    perSixMonths: 0,
  });

  const handlePriceChange = (e) => {
    const { name, value } = e.target;

    // Map timeframe to the rentalPrice period
    const mapping = {
      perDay: "daily",
      perWeek: "weekly",
      perMonth: "monthly",
      perQuarter: "quarterly",
      perSixMonths: "semiannual",
      perYear: "annual",
    };

    const mappedPeriod = mapping[name];

    // Update state with the correct price
    setFormData((prevData) => {
      // Check if the period already exists
      const existingItem = prevData.rentalPrice.find(
        (item) => item.period === mappedPeriod
      );

      let updatedRentalPrice;

      if (existingItem) {
        // Update the price for the existing period
        updatedRentalPrice = prevData.rentalPrice.map((item) =>
          item.period === mappedPeriod
            ? { ...item, price: parseFloat(value) || 0 }
            : item
        );
      } else {
        // Add a new period with the entered price
        updatedRentalPrice = [
          ...prevData.rentalPrice,
          { period: mappedPeriod, price: parseFloat(value) || 0 },
        ];
      }

      // Filter out empty price values
      const filteredRentalPrice = updatedRentalPrice.filter(
        (item) => item.price > 0
      );

      // Return updated formData
      return {
        ...prevData,
        rentalPrice: filteredRentalPrice,
      };
    });

    console.log(formData.rentalPrice)// Ensure state update reflects
  };


  const [previewImages, setPreviewImages] = useState([]); // To store the preview images
  const fileInputRef = useRef();

  const handleFileChange = (event) => {
    const files = event.target.files; // Get selected files
    const previews = [];

    // Generate previews for display
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        previews.push(reader.result);
        if (previews.length === files.length) {
          setPreviewImages(previews);
        }
      };
      reader.readAsDataURL(file);
    });


    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };


  const handleIconClick = () => {
    fileInputRef.current.click();
  };



  useEffect(() => {
    const fetchProducts = async () => {
      // console.log(categoryId,subCategoryId,"fetchProducts")
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
    images: [],
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
    seoTags: [],
    isForSale: true,
    salePrice: 0,
    stockQuantity: 0,
    location: {
      type: "Point",
      coordinates: [0,0]
    },
    pickupAvailable: true,
    itemDetails: {},
  };

  const [formData, setFormData] = useState(initialFormData);
  const [mapCenter, setMapCenter] = useState({ lat: 17.4065, lng: 78.4772 });

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
    const mappedDetails = productDetails.reduce((acc, section) => {
      section.details?.forEach((detail) => {
        if (detail.key && detail.value) {
          acc[detail.key] = detail.value; // Grouping key-value pairs into a single object
        }
      });
      return acc;
    }, {});

    console.log("Mapped itemDetails: ", mappedDetails);
    setFormData((prev) => ({
      ...prev,
      itemDetails: mappedDetails,
    }));
  };


  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();

    setFormData((prevData) => ({
      ...prevData,
      location: {
        type: "Point", // Add default type if missing
        coordinates: [lng, lat], // Correct order: [longitude, latitude]
      },
    }));

    // Reverse geocode to get the address
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAP_API}`
      );
      console.log(response.data, "google maps");
      if (response.data.results[0]) {
        setFormData((prevData) => ({
          ...prevData,
          address: response.data.results[0].formatted_address,
        }));
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };


  console.log(formData.images)
  const handlePublishProduct = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('owner', userId);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);

      // Append images
      Array.from(formData.images).forEach((file) => {
        formDataToSend.append('images', file);
      });

      formDataToSend.append('categoryId', formData.categoryId);
      formDataToSend.append('subCategoryId', formData.subCategoryId);
      formDataToSend.append('productId', formData.productId);
      formDataToSend.append('available', formData.available);

      // Append rentalPrice (assuming it's an array of objects)
      formData.rentalPrice.forEach((item, index) => {
        formDataToSend.append(`rentalPrice[${index}][period]`, item.period);
        formDataToSend.append(`rentalPrice[${index}][price]`, item.price);
      });

      formDataToSend.append('rentalAvailability[startDate]', formData.rentalAvailability.startDate);
      // formDataToSend.append('rentalAvailability[endDate]', formData.rentalAvailability.endDate);
      formDataToSend.append('seoTags', formData.seoTags);
      formDataToSend.append('isForSale', formData.isForSale);
      formDataToSend.append('salePrice', formData.salePrice);
      formDataToSend.append('stockQuantity', formData.stockQuantity);
      
      const coordinates = formData.location.coordinates;
      const validCoordinates = Array.isArray(coordinates) && 
        coordinates.length === 2 &&
        !isNaN(coordinates[0]) && !isNaN(coordinates[1]);
  
      formDataToSend.append(
        "location",
        JSON.stringify({
          type: formData.location.type || "Point",
          coordinates: validCoordinates ? coordinates : [0, 0], // Default to [0, 0] if invalid
        })
      );
  
      
      formDataToSend.append('pickupAvailable', formData.pickupAvailable);
      for (const key in formData.itemDetails) {
        if (formData.itemDetails.hasOwnProperty(key)) {
          formDataToSend.append(`itemDetails[${key}]`, formData.itemDetails[key]);
        }
      }


      console.log("Payload to be sent:", formDataToSend);

      const response = await axios.post(`${BASE_URL}/variants`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response,"response of variant")

      if (response.data.success) {
        toast.success("Product published successfully!");
        setFormData(initialFormData); // Clear form
        setPreviewImages([]); // Clear preview images
      } else {
        toast.error("Failed to publish the product. Please try again.");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        // Redirect to login page
        setTimeout(() => {
          window.location.href = "/login"; // Adjust the path as per your routing setup
        }, 2000); // Delay to let the toast message display
      } else {
        console.error("Error while publishing product:", error);
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      }
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
              // style={{ display: "none" }}
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
              placeholderText='Select start date'
              className='date-picker-input'
              dateFormat='MMMM d, yyyy'
            />
            <FaRegCalendarAlt className='calendar-icon' />
          </div>
          <div className='date-picker-wrapper'>
            <DatePicker
              selected={formData.rentalAvailability.endDate}
              name='startDate'
              value={formData.rentalAvailability.endDate}
              onChange={(date) => handleDateChange(date)}
              placeholderText='Select End date'
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
          <div className='product-details-card'>
            Title
            {section.details?.map((detail) => (
              <div key={detail._id} className='detail-row'>
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
      <div className="mt-2">
        <LoadScript googleMapsApiKey={MAP_API}>
          <GoogleMap
            mapContainerStyle={{
              height: "300px",
              width: "100%",
              borderRadius: "16px",
            }}
            center={mapCenter}
            zoom={10}
            onClick={handleMapClick}
          >
            {formData.location.coordinates && formData.location.coordinates.length === 2 && (
              <Marker
                position={{
                  lat: formData.location.coordinates[1], // latitude
                  lng: formData.location.coordinates[0], // longitude
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>



      <div
        className="location-info"
        style={{ marginTop: "20px", padding: "16px 30px" }}
      >
        {/* <p>
                    <strong>Latitude:</strong> {formData.latitude}
                  </p>
                  <p>
                    <strong>Longitude:</strong> {formData.longitude}
                  </p> */}
        <p>
          <strong>Address:</strong> {formData.address}
          {/* {errors.address && <p style={{ color: "red" }}>{errors.address}</p>} */}

        </p>
      </div>
      <button onClick={handlePublishProduct} className='publish-button'>
        Publish Product
      </button>
    </div>
  );
};

export default MainContent;
