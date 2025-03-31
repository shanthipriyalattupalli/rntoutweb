// components/MainContent.js
"use client";
import React, { useState, useRef, useEffect } from "react";
// import ReactQuill from "react-quill";
import axios from "axios";
import { X } from "lucide-react";
// import "@/styles/Adddetail.css";
import Image from "next/image";
import '../../../styles/Adddetail.css';
import { useRouter } from "next/navigation";
import { FaUpload, FaRegCalendarAlt } from "react-icons/fa";
import { FiPlus, FiTrash } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MAP_API } from '../../../services/GMap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { IoIosInformationCircleOutline } from "react-icons/io";



import { GrLocation } from "react-icons/gr";
import LocationSearch from "@/Components/Location/LocationSearch";
const upload = "/Assets/upload.png";

const MainContent = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const router = useRouter();
  const [products, setProducts] = useState([]);


  const [productName, setProductName] = useState("");
  const [productQuality, setProductQuality] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [productDetails, setProductDetails] = useState([
    {

      details: [{ key: "", value: "" }],
    },
  ]);
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    images: "",
    productId: "",
    rentalAvailability: "",
    stockQuantity: "",
    pickupAddress: "",
  });


  const userId = (typeof window !== 'undefined') ? localStorage.getItem("userId") : null;
  const categoryId = (typeof window !== 'undefined') ? localStorage.getItem("selectedcategoryId") : null;
  const subCategoryId = (typeof window !== 'undefined') ? localStorage.getItem("selectedSubCategoryId") : null;
  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
  const latitude = (typeof window !== 'undefined') ? parseFloat(localStorage.getItem("latitude") || "0") : null;
  const longitude = (typeof window !== 'undefined') ? parseFloat(localStorage.getItem("longitude") || "0") : null;


  useEffect(() => {
    const handleStorageChange = () => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        categoryId: localStorage.getItem("selectedcategoryId"), // Fetch latest value
        subCategoryId: localStorage.getItem("selectedSubCategoryId"), // Fetch latest value
      }));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
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


  };


  const [previewImages, setPreviewImages] = useState([]); // To store the preview images
  const fileInputRef = useRef();

 

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const previews = [];
    if (!files.length) {
      toast.error("No files selected");
      return;
    }
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
    // Clear previous images in formData
    setFormData((prev) => ({ ...prev, images: [] }));
    // Add the selected files to formData
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    // Show toast notification for successful upload
    // toast.success("Files added successfully!");
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedPreviews = previewImages.filter((_, index) => index !== indexToRemove);
    setPreviewImages(updatedPreviews);
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));

    // toast.info("Image removed!");
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

          setProducts(response.data);
          if (response.data.length > 0) {
            setSelectedOption(response.data[0]._id);
            setFormData((prevFormData) => ({
              ...prevFormData,
              productId: response.data[0]._id,
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching products by subCategoryId:", error);
      }
    };

    fetchProducts();
  }, [categoryId, subCategoryId]);



  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setFormData((prevFormData) => ({
      ...prevFormData,
      productId: option,
    }));
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
    pickupAddress: "",
    location: {
      type: "Point",
      coordinates: [0, 0]
    },
    pickupAvailable: true,
    itemDetails: {},
  };

  const [formData, setFormData] = useState(initialFormData);
  const [mapCenter, setMapCenter] = useState({ lat: latitude, lng: longitude });

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
        startDate: date,

      },
    }));
  };
  const handleEndDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      rentalAvailability: {
        ...prevData.rentalAvailability,
        endDate: date,

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

      if (response.data.results[0]) {
        setFormData((prevData) => ({
          ...prevData,
          pickupAddress: response.data.results[0].formatted_address,
        }));
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };



console.log(formData,"formdata");

  const handlePublishProduct = async () => {

    setErrors({
      title: "",
      description: "",
      images: "",
      productId: "",
      rentalAvailability: "",
      stockQuantity: "",
      pickupAddress: "",
    });
    let newErrors = {};

    if (!formData.title.trim()) newErrors.title = "This field is required";
    if (!formData.description.trim()) newErrors.description = "This field is required";
    if (formData.images.length === 0) newErrors.images = "This field is required";
    if (!formData.productId.trim()) newErrors.productId = "This field is required";
    if (!formData.rentalAvailability.startDate || !formData.rentalAvailability.endDate) {
      newErrors.rentalAvailability = "Start date and end date are required";
    }
    if (!formData.stockQuantity) newErrors.stockQuantity = "This field is required";
    if (!formData.pickupAddress.trim()) newErrors.pickupAddress = "This field is required";

    // If there are errors, update the state and stop the function
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('owner', userId);
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);

      if (formData.images.length > 0) {
        formData.images.forEach((file) => {
          formDataToSend.append("images", file);
        });
      }

      formDataToSend.append('categoryId', formData.categoryId);
      formDataToSend.append('subCategoryId', formData.subCategoryId);
      formDataToSend.append('productId', formData.productId);
      formDataToSend.append('available', formData.available);

      formData.rentalPrice.forEach((item, index) => {
        formDataToSend.append(`rentalPrice[${index}][period]`, item.period);
        formDataToSend.append(`rentalPrice[${index}][price]`, item.price);
      });

      formDataToSend.append(
        'rentalAvailability',
        JSON.stringify(formData.rentalAvailability),
      );
      formDataToSend.append('seoTags', formData.seoTags);
      formDataToSend.append('isForSale', formData.isForSale);
      formDataToSend.append('salePrice', formData.salePrice);
      formDataToSend.append('stockQuantity', formData.stockQuantity);
      formDataToSend.append('pickupAddress', formData.pickupAddress);

      const coordinates = formData.location.coordinates;
      const validCoordinates = Array.isArray(coordinates) &&
        coordinates.length === 2 &&
        !isNaN(coordinates[0]) && !isNaN(coordinates[1]);

      formDataToSend.append(
        "location",
        JSON.stringify({
          type: formData.location.type || "Point",
          coordinates: validCoordinates ? coordinates : [0, 0],
        })
      );


      formDataToSend.append('pickupAvailable', formData.pickupAvailable);
      for (const key in formData.itemDetails) {
        if (formData.itemDetails.hasOwnProperty(key)) {
          formDataToSend.append(`itemDetails[${key}]`, formData.itemDetails[key]);
        }
      }

      const response = await axios.post(`${BASE_URL}/variants`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setFormData(initialFormData);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product published successfully!",
          confirmButtonColor: "#3085d6",
        }).then(() => {
          router.push("/profile/products");
          setPreviewImages([]);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to publish the product. Please try again.",
        });
      }
    } catch (error) {
      if (error.response?.status === 401) {
        Swal.fire({
          icon: "warning",
          title: "Session Expired",
          text: "Please log in again.",
          confirmButtonColor: "#d33",
        }).then(() => {
          setIsLoginOpen(true);
        });
      } else {
        console.error("Error while publishing product:", error);
        const errorMessage =
          error.response?.data?.error || error.response?.data?.message || "An unexpected error occurred.";
      
        Swal.fire({
          icon: "warning",
          title: "Note!",
          html: `<p>${errorMessage}</p>`,
          showCancelButton: true,
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          customClass: {
            confirmButton: "swal-confirm-button",
          },
          didOpen: () => {
            const confirmButton = Swal.getConfirmButton();
            if (confirmButton) confirmButton.style.backgroundColor = "red";
          },
        }).then((result) => {
          if (result.isConfirmed) {
            if (errorMessage === "KYC verification is required before checkout.") {
              router.push("/profile/kyc");
            } else if (errorMessage === "You must have a profile to place a product for rent.") {
              router.push("/profile/Renter-information");
            }
          }
        });
      }
      
    }
  };



  const [selectedDate, setSelectedDate] = useState(null); 

  return (
    <div className='main-content'>
      <ToastContainer />

      {isLoginOpen && (
  <div className="modal-overlay">
    <div className="modal-content">
      <button className="close-button" onClick={() => setIsLoginOpen(false)}>
        ✕
      </button>
      <Login setIsLoginOpen={setIsLoginOpen} />
    </div>
  </div>
)}

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
      {errors.productId && <p className="text-red-500 text-sm">{errors.productId}</p>}
      
      <div className='product-form'>
        <h2 className='ba-in'>BASICS INFO</h2>
        <div className='basic-details '>
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
            {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
          </div>

          <div className='form-section2'>
            <label>
              Product Quality{" "}
              <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>
            </label>
            <select
            // name='description'
            // value={formData.description}
            // onChange={handleInputChange}
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
            {errors.stockQuantity && <p className="text-red-500 text-sm">{errors.stockQuantity}</p>}

          </div>
        </div>

        <div className='form-section file-upload'>
          <h2 className='ba-in'>
            Product Image{" "}
            <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>
          </h2>
          <div className='file-upload-box' tabIndex={0} >
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
            <p className="text-sm font-normal leading-5 text-center decoration-none">
              Drag your file(s) or <span onClick={handleIconClick}>browse</span>
            </p>
            <p className='file-note'>Image format will be a JPEG, PNG, JPG</p>
          </div>
          <p className="p-2 text-xs font-normal leading-5 text-left decoration-none">Kindly make sure to upload a minimum of 4 images. 📸</p>
          {errors.images && <p className="text-red-500 text-sm">{errors.images}</p>}
          {/* Render Preview Images */}
          <div className='image-preview-container'>
            {previewImages.map((src, index) => (
              <div key={index} className='image-preview-box relative'>
                <img
                  src={src}
                  alt={`Preview ${index + 1}`}
                  className='preview-image'
                />
                {/* Remove button with cross icon */}
                <button
                  onClick={() => handleRemoveImage(index)}
                  className='absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-700'
                >
                  <X size={14} /> {/* Icon from lucide-react */}
                </button>
              </div>
            ))}
          </div>



        </div>
        <div className="flex flex-col">
          <label className='ba-in'>
            Product Availability{" "}
            <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>
          </label>
          <div className='date-picker-container'>

            <div className="w-full flex flex-col">
              <label>Product Availability  <span className="text-gray-400">(Start)</span></label>
              <DatePicker
                selected={formData.rentalAvailability.startDate}
                name='startDate'
                value={formData.rentalAvailability.startDate}
                onChange={(date) => handleDateChange(date)}
                placeholderText='Select start date'
                className='date-picker-wrapper'
                dateFormat='MMMM d, yyyy'
                minDate={new Date()}
              />
              <FaRegCalendarAlt className='calendar-icon' />
            </div>
            <div className="w-full flex flex-col">
              <label>Product Availability <span className="text-gray-400">(end)</span></label>
              <DatePicker
                selected={formData.rentalAvailability.endDate}
                name='endDate'
                value={formData.rentalAvailability.endDate}
                onChange={(date) => handleEndDateChange(date)}
                placeholderText='Select End date'
                className='date-picker-wrapper'
                dateFormat='MMMM d, yyyy'
                minDate={new Date()} // Restricts past dates
              />
              <FaRegCalendarAlt className='calendar-icon' />
            </div>
          </div>
          <span> {errors.rentalAvailability && <p className="text-red-500 text-sm mt-10">{errors.rentalAvailability}</p>}</span>
        </div>


        <div className="mt-10 flex flex-col gap-3">
          <label className="text-[14px] font-semibold">Select Pick up address 
          <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>
          </label>
          <div className="google-content">
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
                      lat: parseFloat(formData.location.coordinates[1]), // latitude
                      lng: parseFloat(formData.location.coordinates[0]), // longitude
                    }}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        <p name='pickupAddress'
          value={formData.pickupAddress}
          onChange={handleInputChange}>
          <strong>Address:</strong> {formData.pickupAddress}
    
        {/* <LocationSearch /> */}

          {errors.pickupAddress && <p className="text-red-500 text-sm">{errors.pickupAddress}</p>}
          {/* {errors.address && <p style={{ color: "red" }}>{errors.address}</p>} */}

        </p>
        <div className="mt-3 flex flex-col relative">
          <label className="left-3 text-gray-500 text-sm bg-white">Description 
          <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

          </label>
          <textarea
            placeholder="Enter product details"
            className="border rounded-2xl h-40 p-3 pt-6 focus:border-red-500 focus:ring-blue-500 focus:outline-none"
            name="description"
            value={formData.description}
            onChange={handleInputChange}

          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
        </div>






        <div className='form-section4'>
          <h2 className='ba-in'>
            PRICING INFO{" "}
            {/* <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span> */}
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
          {/* <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span> */}
        </h2>
        {productDetails?.map((section,index) => (
          <div className='product-details-card' key={index}>
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

      </div>
      <button onClick={handlePublishProduct} className='publish-button'>
        Publish Product
      </button>
    </div>
  );
};

export default MainContent;
