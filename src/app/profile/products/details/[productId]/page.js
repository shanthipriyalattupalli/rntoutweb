// components/MainContent.js
"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { X } from "lucide-react";
import { format } from "date-fns";
// import "@/styles/Adddetail.css";
import '../../../../../styles/Adddetail.css';
import { FaUpload, FaRegCalendarAlt } from "react-icons/fa";
import { FiPlus, FiTrash } from "react-icons/fi";
import DatePicker from "react-datepicker";
import { useParams } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { MAP_API } from '../../../../../services/GMap'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GrLocation } from "react-icons/gr";
const upload = "/Assets/upload.png";
import { useRouter } from "next/navigation";

const MainContent = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const params = useParams();
  const productId = params.productId;

  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [productQuality, setProductQuality] = useState("");
  const [availableStock, setAvailableStock] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [productDetails, setProductDetails] = useState([
    {

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

  // const handleFileChange = (event) => {
  //   const files = event.target.files; // Get selected files
  //   const previews = [];

  //   // Generate previews for display
  //   Array.from(files).forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       previews.push(reader.result);
  //       if (previews.length === files.length) {
  //         setPreviewImages(previews);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //   });
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     images: files,
  //   }));
  // };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) {
      toast.error("No files selected");
      return;
    }
    const previews = [];

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
    if (!files.length) {
      toast.error("No files selected");
      return;
    }
    // Clear previous images in formData
    setFormData((prev) => ({ ...prev, images: [] }));
    // Add the selected files to formData
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
    // Show toast notification for successful upload
    toast.success("Files added successfully!");
  };

  const handleRemoveImage = (indexToRemove) => {
    setPreviewImages((prev) => prev.filter((_, index) => index !== indexToRemove));

    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));

    toast.info("Image removed!");
  };


  const handleIconClick = () => {
    fileInputRef.current.click();
  };


  const initialFormData = {
    owner: userId,
    title: "",
    description: "",
    images: [],
    categoryId: "",
    subCategoryId: "",
    productId: "",
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
      coordinates: [0, 0]
    },
    pickupAvailable: true,
    itemDetails: {},
  };

  const [formData, setFormData] = useState(initialFormData);


    const [errors, setErrors] = useState({
      title: "",
      description: "",
      images: "",
      productId: "",
      rentalAvailability: "",
      stockQuantity: "",
      pickupAddress: "",
    });

  const fetchProducts = async () => {

    try {
      const response = await axios.get(`${BASE_URL}/variants/${productId}`);

      setFormData(response.data);
      setFormData(
        (prevData) => ({
          ...prevData,
          categoryId: response.data.categoryId?._id,
          subCategoryId: response.data.subCategoryId?._id,
          productId: response.data.productId?._id
        })
      )
      // Map fetched itemDetails to productDetails format
      const fetchedItemDetails = response.data.itemDetails || {};
      const formattedDetails = Object.entries(fetchedItemDetails).map(
        ([key, value]) => ({
          id: Date.now() + Math.random(), // Unique ID
          key,
          value,
        })
      );

      // Set state with formatted data
      setProductDetails([
        {
          id: Date.now(),
          details: formattedDetails.length
            ? formattedDetails
            : [{ id: Date.now(), key: "", value: "" }],
        },
      ]);

    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);



  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setFormData({
      ...formData,
      productId: option,
    });
  };

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
  const handleEndDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      rentalAvailability: {
        ...prevData.rentalAvailability,
        endDate: date,

      },
    }));
  };

  const formattedStartDate = formData.rentalAvailability.startDate
    ? format(new Date(formData.rentalAvailability.startDate), "MMMM d, yyyy")
    : "";

  const formattedEndDate = formData.rentalAvailability.endDate
    ? format(new Date(formData.rentalAvailability.endDate), "MMMM d, yyyy")
    : "";

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


   const fetchAddress = async (lat, lng) => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${MAP_API}`
        );

  
        if (response.data.results[0]) {
          setFormData((prev) => ({
            ...prev,
            pickupAddress: response.data.results[0].formatted_address,
          }));
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    };

    const handleMapClick = async (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
  
      setFormData((prev) => ({
        ...prev,
        location: { type: "Point", coordinates: [lng, lat] },
      }));
  
      fetchAddress(lat, lng);
    };



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
    let missingFields = [];
        // Validate Required Fields
        if (!formData.title.trim()) {
          newErrors.title = "This field is required";
          missingFields.push("Title");
        }
        if (!formData.description.trim()) {
          newErrors.description = "This field is required";
          missingFields.push("Description");
        }
        if (!formData.images || formData.images.length === 0) {
          newErrors.images = "This field is required";
          missingFields.push("Images");
        }
        if (!formData.productId.trim()) {
          newErrors.productId = "This field is required";
          missingFields.push("Product ID");
        }
        if (!formData.rentalAvailability?.startDate || !formData.rentalAvailability?.endDate) {
          newErrors.rentalAvailability = "Start date and end date are required";
          missingFields.push("Rental Availability");
        }
        if (!formData.stockQuantity || isNaN(formData.stockQuantity)) {
          newErrors.stockQuantity = "This field is required";
          missingFields.push("Stock Quantity");
        }
        if (!formData.pickupAddress.trim()) {
          newErrors.pickupAddress = "This field is required";
          missingFields.push("Pickup Address");
        }
    
        // Check if errors exist
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
    
          if (missingFields.length === Object.keys(newErrors).length) {
            // Show only one toast if everything is empty
            toast.error("Please fill all required fields.", { autoClose: 3000 });
          } else {
            // Show specific missing field errors
            missingFields.forEach((field) => {
              toast.error(`${field} is required.`, { autoClose: 3000 });
            });
          }
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

      formDataToSend.append("rentalPrice", JSON.stringify(formData.rentalPrice));

      formDataToSend.append(
        "rentalAvailability",
        JSON.stringify(formData.rentalAvailability)
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
      formDataToSend.append("itemDetails", JSON.stringify(formData.itemDetails));

      const response = await axios.put(`${BASE_URL}/variants/${productId}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });



      if (response.data.success) {
        toast.success("Product published successfully!");
        fetchProducts();
        router.push('/profile/products')
        setPreviewImages([]);
      } else {
        toast.error("Failed to publish the product. Please try again.");
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please log in again.");
        setTimeout(() => {
          window.location.href = "/login"; 
        }, 2000); 
      } else {
        console.error("Error while publishing product:", error);
        toast.error(`Error: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  useEffect(() => {
    if (formData.images?.length) {
      setPreviewImages(formData.images);
    }
  }, [formData.images]);


  return (
    <div className='main-content'>
      <ToastContainer />
      <div className='radio-button-group bg-blue-100'>
        <div className='item-header2' onClick={() => router.back()}>
          <div className='back-product22 flex gap-2 h-6'>
            <IoMdArrowRoundBack className="mt-1 ml-3" />
            <p>
          {formData.title}
            </p>
            {/* <h1>Save Details</h1> */}
          </div>
        </div>
      </div>
      <div className='product-form'>
        <h2 className='ba-in'>BASICS INFO</h2>
        <div className='basic-details'>
          <div className='form-section1'>
            <label>
              Product Name{" "}
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
                      </label>
          <div className="date-picker-container flex flex-col md:flex-row justify-between gap-4">
            {/* Start Date */}
            <div className="w-full md:w-1/2 flex flex-col">
              <label className="text-gray-700 font-medium">
                Product Availability <span className="text-gray-400">(Start)</span>
              </label>
              <div className="relative flex items-center justify-between border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-500">
                <DatePicker
                  selected={formData.rentalAvailability.startDate}
                  name="startDate"
                  value={formattedStartDate} 
                  onChange={(date) => handleDateChange(date)}
                  placeholderText="Select start date"
                  className="w-full outline-none bg-transparent"
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                />
                <FaRegCalendarAlt
                  className="text-gray-500 cursor-pointer"
                  onClick={(e) => {
                    const container = e.currentTarget.parentElement;
                    const input = container.querySelector("input");
                    if (input) input.click();
                  }}
                />
              </div>
            </div>

            {/* End Date */}
            <div className="w-full md:w-1/2 flex flex-col">
              <label className="text-gray-700 font-medium">
                Product Availability <span className="text-gray-400">(End)</span>
              </label>
              <div className="relative flex items-center justify-between border border-gray-300 rounded-lg px-3 py-3 focus-within:border-blue-500">
                <DatePicker
                  selected={formData.rentalAvailability.endDate}
                  name="endDate"
                  value={formattedEndDate}
                  onChange={(date) => handleEndDateChange(date)}
                  placeholderText="Select end date"
                  className="w-full outline-none bg-transparent"
                  dateFormat="MMMM d, yyyy"
                  minDate={new Date()}
                />
                <FaRegCalendarAlt
                  className="text-gray-500 cursor-pointer"
                  onClick={(e) => {
                    const container = e.currentTarget.parentElement;
                    const input = container.querySelector("input");
                    if (input) input.click();
                  }}
                />
              </div>
            </div>
          </div>



          <span> {errors.rentalAvailability && <p className="text-red-500 text-sm mt-10">{errors.rentalAvailability}</p>}</span>
        </div>
        <div className="mt-12">
          <label>Location</label>
          <div className="relative">
            <input
              type="search"
              placeholder="Select a location"
              className="location-input pl-8"
            />

            <GrLocation className="absolute left-96 ml-20 top-1/2 transform -translate-y-1/2 h-1/2" />
          </div>
        </div>

        <div className="mt-4 mb-4 flex flex-col gap-3">
          <label className="text-[14px] font-semibold">Select Pick up address</label>
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
                      lat: formData.location.coordinates[1], // latitude
                      lng: formData.location.coordinates[0], // longitude
                    }}
                  />
                )}
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        <p>
          <strong>Address:</strong> {formData.pickupAddress}
          {errors.pickupAddress && <p className="text-red-500 text-sm">{errors.pickupAddress}</p>}


        </p>
        <div className="pt-6 flex flex-col">
          <label>Description</label>
          <textarea type="text" placeholder="Enter product details" className="border p-4 rounded-2xl h-min"
            name='description'
            value={formData.description}
            onChange={handleInputChange} />
          {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

        </div>

        <div className='form-section4'>
          <h2 className='ba-in'>
            PRICING INFO{" "}
                      </h2>
          <div className='pricing-section'>
            {[
              "perDay",
              "perWeek",
              "perMonth",
              "perQuarter",
              "perSixMonths",
              "perYear",
            ].map((timeframe) => {
              // Map timeframe to match the period in fetched data
              const mapping = {
                perDay: "daily",
                perWeek: "weekly",
                perMonth: "monthly",
                perQuarter: "quarterly",
                perSixMonths: "semiannual",
                perYear: "annual",
              };

              const period = mapping[timeframe];

              // Get the price from fetched rentalPrice
              const price =
                formData?.rentalPrice?.find((item) => item.period === period)?.price ||
                "";

              return (
                <div key={timeframe} className='form-section5'>
                  <label>
                    {timeframe.replace("per", "Per ").replace(/([A-Z])/g, " $1")}
                  </label>
                  <input
                    type='number'
                    name={timeframe}
                    value={price} // Set value from fetched data
                    onChange={handlePriceChange}
                    placeholder='₹ 0.00'
                  />
                </div>
              );
            })}
          </div>
        </div>

      </div>
      <div className='details-section'>
        <h2 className='ba-in'>
          Product Details{" "}
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
        Update Product
      </button>
    </div>
  );
};

export default MainContent;
