'use client';


import { React, useState, useRef, useEffect } from 'react';
// import '@/styles/BusinessInformation1.css';
import '../../../../styles/BusinessInformation1.css'
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
// import '@/styles/BusinessInformation2.css';
import '../../../../styles/BusinessInformation2.css';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const owner = '/Assets/owner.svg'
const Userprofile = "../../Assets/User-icon.svg";
const card = "../../Assets/card-img1.svg";
const card1 = "../../Assets/card-img2.svg";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaCreditCard } from "react-icons/fa";
export default function BusinessInformation2() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  //  const [userId, setUserId] = useState("");
  //   const [token, setToken] = useState("");
  const [isBuisness, setIsBuisness] = useState(false);
  const [businessInfo, setBusinessInfo] = useState(false)
  const [businessId, setBusinessId] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [previewProfileImage, setPreviewProfileImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");
  //   const token = localStorage.getItem("userToken");
  //   setUserId(userId);
  //   setToken(token);
  // }, []);


  const userId = (typeof window !== 'undefined') ? localStorage.getItem("userId") : null;
  const userName = (typeof window !== 'undefined') ? localStorage.getItem("userName") : null;
  const userEmail = (typeof window !== 'undefined') ? localStorage.getItem("userEmail") : null;
  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;

  const [previewImages, setPreviewImages] = useState([]);

  const toggleEdit = () => {
    // setIsBuisness(true)
    setBusinessId(null)
    setIsEditable(true)
  };


  const handleIconClick = () => {
    fileInputRef.current.click();
  };
  const fileInputRef = useRef();

  const initialFormData = {
    businessName: "",
    storeName: "",
    businessAddress: {
      no: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      full: ""
    },
    taxId: "",
    contactEmail: "",
    contactPhone: "",
    storeDescription: "",
    bankName: "priya",
    accountNumber: "",
    ifsc: "",
    bankBranchAddress: {
      no: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      full: ""
    },
    profileImage: "",
    bannerImages: [],// Array to hold image URLs
    walletBalance: 0,
  }
  const [formData, setFormData] = useState(initialFormData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (name === "contactPhone" && value.length > 10) return;
    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };
      let temp = updatedFormData;
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;

      return updatedFormData;
    });
  };

  useEffect(() => {
    if (formData.bannerImages?.length) {
      // Map existing images from API response
      const existingImages = formData.bannerImages.map((img) => img.imageUrl);
      setPreviewImages(existingImages);
    }
  }, [formData.bannerImages]);

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
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
    setFormData((prev) => ({ ...prev, bannerImages: [] }));
    setFormData((prev) => ({
      ...prev,
      bannerImages: [...prev.bannerImages, ...files],
    }));

  };


  const handleBusinessInformation = async () => {
    // if (!formData.businessName ||!formData.storeName ||!formData.businessAddress.full ||!formData.taxId ||!formData.contactEmail ||!formData.contactPhone ||!formData.storeDescription ||!formData.bankName ||!formData.accountNumber ||!formData.ifsc ||!formData.bankBranchAddress.full) {
    //   toast.error("This fields are required");
    //   return;
    // }
    if (!formData.contactPhone  || formData.contactPhone.length !== 10) {
      setErrorMessage("Mobile number must be 10 digits.");
      return;
    }
    try {
      const formDataToSend = new FormData();

      // Append business information
      formDataToSend.append("businessName", formData.businessName);
      formDataToSend.append("storeName", formData.storeName);
      formDataToSend.append("businessAddress[no]", formData.businessAddress.no);
      formDataToSend.append("businessAddress[street]", formData.businessAddress.street);
      formDataToSend.append("businessAddress[city]", formData.businessAddress.city);
      formDataToSend.append("businessAddress[state]", formData.businessAddress.state);
      formDataToSend.append("businessAddress[postalCode]", formData.businessAddress.postalCode);
      formDataToSend.append("businessAddress[country]", formData.businessAddress.country);
      formDataToSend.append("businessAddress[full]", formData.businessAddress.full);
      formDataToSend.append("taxId", formData.taxId);
      formDataToSend.append("contactEmail", formData.contactEmail);
      formDataToSend.append("contactPhone", formData.contactPhone);
      formDataToSend.append("storeDescription", formData.storeDescription);
      formDataToSend.append("bankName", formData.bankName);
      formDataToSend.append("accountNumber", formData.accountNumber || "");
      formDataToSend.append("ifsc", formData.ifsc);
      formDataToSend.append("bankBranchAddress[no]", formData.bankBranchAddress.no);
      formDataToSend.append("bankBranchAddress[street]", formData.bankBranchAddress.street);
      formDataToSend.append("bankBranchAddress[city]", formData.bankBranchAddress.city);
      formDataToSend.append("bankBranchAddress[state]", formData.bankBranchAddress.state);
      formDataToSend.append("bankBranchAddress[postalCode]", formData.bankBranchAddress.postalCode);
      formDataToSend.append("bankBranchAddress[country]", formData.bankBranchAddress.country);
      formDataToSend.append("bankBranchAddress[full]", formData.bankBranchAddress.full);
      formDataToSend.append("profileImage", formData.profileImage);
      if (formData.bannerImages.length > 0) {
        formData.bannerImages.forEach((file) => {
          formDataToSend.append("bannerImages", file);
        })
      }
      // formData.walletTransactions.forEach((transaction, index) => {
      //   if (transaction.orderId) {
      //     formDataToSend.append(`walletTransactions[${index}][orderId]`, transaction.orderId);
      //   }
      //   if (transaction.amount) {
      //     formDataToSend.append(`walletTransactions[${index}][amount]`, transaction.amount);
      //   }
      //   if (transaction.productId) {
      //     formDataToSend.append(`walletTransactions[${index}][productId]`, transaction.productId);
      //   }
      // });

      formDataToSend.append("walletBalance", formData.walletBalance);

      const response = await axios.post(`${BASE_URL}/business-info/add-or-update`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setIsEditable(false);
      toast.success("Business information updated successfully");
      handlefetchBusinessInfo();
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error submitting business information:", error);
    }
  };


  const router = useRouter();
  const handlefetchBusinessInfo = async () => {
    try {

      const response = await axios.get(`${BASE_URL}/business-info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setBusinessId(response.data.data._id)
      setFormData(response.data.data)
      // if(response.data.data._id){

      //   setBusinessInfo(true)
      // }
    } catch (error) {
      console.error(error)

    }
  }

  useEffect(() => {
    handlefetchBusinessInfo()
  }, [token])



  return (
    <>
      {businessId ?


        (<div>
          <div>
            <h2 className='item-header'>
              <div className='back-business' onClick={() => router.back()}>
                {/* <IoMdArrowRoundBack style={{ marginRight: "12px" }} /> */}
                Business Information
              </div>
              <a className="kyc-btn" onClick={() => router.push("/profile/business-information/Kyc")} >Business KYC ?</a>
              <h3 className="cursor-pointer" onClick={toggleEdit}>Edit Details</h3>
            </h2>
            <div className=" flex justify-center">
              <div className="w-full bg-white p-6 rounded-lg shadow-md">
                {/* Owner Info */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold text-yellow-600">OWNER INFO</h3>
                  <div className="p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <p className="flex flex-col">
                        <div className="flex gap-2">
                          <FaUser className="text-gray-500" /> <strong>Owner Name</strong>
                        </div>
                        <div className="text-[14px] font-normal leading-[20px] text-left">
                          {userName}
                        </div>
                      </p>

                      <p className="flex flex-col">
                        <div className="flex gap-2"><FaEnvelope className="text-gray-500" /> <strong>Email:</strong>
                        </div> <div>{userEmail}</div></p>
                      <p className="flex flex-col"><div className="flex gap-2"><FaPhone className="text-gray-500" /> <strong>Mobile:</strong>  </div><div className="text-[14px] font-normal leading-[20px] text-left">8374801954</div></p>
                    </div>
                  </div>
                </div>
                {/* Bank Details */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold text-yellow-600">BANK DETAILS</h3>
                  <div className=" p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <p className="flex flex-col"><div className="flex gap-2"><FaBuilding className="text-gray-500" /> <strong className="text-[14px] font-medium leading-[18px] text-left text-gray-500">Bank Name:</strong></div><div className="text-[14px] font-normal leading-[20px] text-left">{formData.bankName}</div></p>
                      <p className="flex flex-col"><div className="flex gap-2"><FaCreditCard className="text-gray-500" /> <strong className="text-[14px] font-medium leading-[18px] text-left text-gray-500">IFSC Code:</strong> </div><div className="text-[14px] font-normal leading-[20px] text-left">{formData.ifsc}</div></p>
                      <p className="flex flex-col"><div className="flex gap-2"><FaPhone className="text-gray-500" /> <strong className="text-[14px] font-medium leading-[18px] text-left text-gray-500">Account Number:</strong></div><div className="text-[14px] font-normal leading-[20px] text-left"> {formData.accountNumber}</div></p>
                    </div>
                    <p className="flex items-center gap-2 mt-2"><FaMapMarkerAlt className="text-gray-500" /> {formData.bankBranchAddress.full}</p>
                  </div>
                </div>
                {/* Business Info */}
                <div className="mb-6">
                  <h3 className="text-md font-semibold text-yellow-600">BASIC INFO</h3>
                  <div className=" p-4 rounded-md">
                    <div className="flex flex-col gap-4 mb-4">
                      <img src={formData.profileImage} alt="Profile" className="w-16 h-16 rounded-full" />
                      <div className="flex gap-8">
                        <p className="flex flex-col"><div className="flex gap-2"><FaBuilding className="text-gray-500 h-6" /> <strong className="text-[14px] font-medium leading-[18px] text-left text-gray-500">Business Name:</strong> </div><div className="text-[14px] font-normal leading-[20px] text-left">{formData.businessName}</div></p>
                        <p className="flex flex-col"><div className="flex gap-2"><FaBuilding className="text-gray-500 h-6" /> <strong className="text-[14px] font-medium leading-[18px] text-left text-gray-500">Store Name:</strong> </div><div className="text-[14px] font-normal leading-[20px] text-left">Codefacts Furniss Shop</div></p>
                        <p className="flex flex-col"><div className="flex gap-2"><FaPhone className="text-gray-500" /> <strong className="text-[14px] font-medium leading-[18px] text-left text-gray-500">Mobile:</strong></div><div className="text-[14px] font-normal leading-[20px] text-left">{formData.contactPhone}</div></p>
                        <p className="flex flex-col"><div className="flex gap-2"><FaEnvelope className="text-gray-500" /> <strong className="text-[14px] font-medium leading-[18px] text-left text-gray-500">Email:</strong></div><div className="text-[14px] font-normal leading-[20px] text-left">{formData.contactEmail}</div></p>
                      </div>
                    </div>
                    <p className="text-gray-700 text-[14px] font-normal leading-[20px] text-left">
                      {formData.storeDescription}
                    </p>
                  </div>
                </div>
                {/* Advertisement Banner */}
                <div>
                  <h3 className="text-md font-semibold text-yellow-600">ADVERTISEMENT BANNER</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {formData.bannerImages
                      .map((src, index) => (
                        <img key={index} src={src.imageUrl} alt={`Ad ${index + 1}`} className="rounded-md shadow-md w-full h-40" />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>) : isEditable ? (<div>
          <ToastContainer />
          <h2 className='item-header'>
            <div className='back-business' onClick={() => router.back()}>
              <IoMdArrowRoundBack style={{ marginRight: "12px" }} />
              Business Information
            </div>
            {/* <h3 className="cursor-pointer" onClick={toggleEdit}>edit</h3> */}
          </h2>
          <div className="bi2-main-div">

            {/* Owner Info Section */}
            {/* <div className="section">
 
      <h3 className="section-title">Owner Info</h3>
      <div className="input-group">
<div className="input-item">
  <label htmlFor="owner-name">Owner Name</label>
  <input id="owner-name" 
  type="text" 
  placeholder="Enter name"  
  name='title'
  value={formData.title}
  onChange={handleInputChange}/>
</div>
<div className="input-item">
  <label htmlFor="owner-email">Owner Email Address</label>
  <input id="owner-email" 
  type="email" 
  placeholder="Enter email address" 
  name='title'
  value={formData.title}
  onChange={handleInputChange}/>
</div>
<div className="input-item">
  <label htmlFor="owner-mobile">Owner Mobile Number</label>
  <input id="owner-mobile" 
  type="text" 
  placeholder="Enter mobile number" 
  name='title'
  value={formData.title}
  onChange={handleInputChange}/>
</div>
</div>
<div className='address-bar'>
<div className="input-item">
      <label htmlFor="Address">Address</label>
      <input type="text" 
      placeholder="Address" 
      className="full-width"
      name='title'
      value={formData.title}
      onChange={handleInputChange} />
      </div>
      </div>
      <label className="checkbox-label">
        <input type="checkbox" />
        Same address as the store
      </label>
    </div> */}


            {/* Business Details Section */}
            <div className="section">
              <div className='address-bar'>
                <div className="input-item">
                  <label htmlFor="business-name">Business Name</label>
                  <input id="business-name"
                    type="text"
                    placeholder="Enter name"
                    className='full-width'
                    name='businessName'
                    value={formData.businessName}
                    onChange={handleInputChange}
                    disabled={!isEditable} />

                </div>
              </div>
              <div className="input-group">
                <div className="input-item">
                  <label htmlFor="store-name">Store Name</label>
                  <input id="store-name"
                    type="text"
                    placeholder="Enter name"
                    name='storeName'
                    value={formData.storeName}
                    onChange={handleInputChange}
                    disabled={!isEditable} />
                </div>
                <div className="input-item">
                  <label htmlFor="mobile-number">Mobile Number</label>
                  <input id="mobile-number"
                    type="number"
                    placeholder="Enter mobile number"
                className={`${errorMessage ? "border-red-500" : ""}`}
                    name='contactPhone'
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    disabled={!isEditable} />
              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

                </div>
                
                <div className="input-item">
                  <label htmlFor="email-address">Email Address</label>
                  <input id="email-address"
                    type="email"
                    placeholder="Enter email address"
                    name='contactEmail'
                    value={formData.contactEmail}
                    onChange={handleInputChange}
                    disabled={!isEditable} />
                </div>
              </div>
              <div className='address-bar'>
                <div className="input-item">
                  <label htmlFor="Address">Address</label>
                  <input type="text"
                    placeholder="Business-address"
                    className="full-width"
                    name='businessAddress.full'
                    value={formData.businessAddress.full}
                    onChange={handleInputChange}
                    disabled={!isEditable} />
                </div>

                <label className="checkbox-label">
                  <input type="checkbox" />
                  Same address as the store
                </label>
              </div>

              <div className='address-bar'>
                <div className="input-item ">
                  <label htmlFor="store-description">Store Description</label>
                  <textarea id="store-description"
                    placeholder="Enter description"
                    className="full-width"
                    rows={5}
                    name='storeDescription'
                    value={formData.storeDescription}
                    onChange={handleInputChange}
                    disabled={!isEditable}></textarea>
                </div></div>
            </div>


            {/* Basic Info Section */}
            <div className="section">
              <h3 className="section-title">Basic Info</h3>
              <div className="basic-info">
                <div className="icon-text">
                  <div className="icon">
                    {/* Display uploaded image preview if available */}
                    {previewProfileImage ? (
                      <img src={previewProfileImage} alt="Profile Preview" className="w-[7rem] h-[5.5rem] rounded-full" />
                    ) : (
                      <img src={formData.profileImage} alt="Default Icon" className="w-[7rem] h-[5.5rem] rounded-full" /> // Fallback image
                    )}
                  </div>

                </div>
                <div className="icon-button">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const imageUrl = URL.createObjectURL(file);
                        setPreviewProfileImage(imageUrl);

                        setFormData((prev) => ({
                          ...prev,
                          profileImage: file,
                        }));
                      }
                    }}
                    style={{ display: "none" }}
                    id="upload-profile-image"
                  />

                  {/* Button to trigger image upload */}
                  <button
                    className="edit-image-button"
                    onClick={() => document.getElementById("upload-profile-image").click()}
                  >
                    Edit Image
                  </button>
                </div>

              </div>
              <h4 className="info-title">Advertisement Banner</h4>

              <div className="banner-upload">
                <div className="bi-file-upload">
                  <div className="upload-icon">
                    <img src="/upload-file.svg" alt="" className="icon" /> {/* Use any upload icon here */}
                  </div>
                  <p className="image-direction">
                    Drag your file(s) or{" "}
                    <span
                      className="browse-link"
                      onClick={handleIconClick}
                      disabled={!isEditable}
                    >
                      browse
                    </span>
                  </p>
                  <p className="image-format">Image format will be JPEG, PNG, JPG</p>
                  <input
                    type="file"
                    id="fileInput"
                    ref={fileInputRef}
                    accept=".jpg,.jpeg,.png"
                    multiple
                    // style={{ display: "none" }}
                    onChange={handleFileUpload}
                    disabled={!isEditable}
                  />

                  {/* Preview uploaded files */}
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



              </div>
              <p className="upload-note">
                Kindly make sure to upload a minimum of 1 image. <span className="icon">&#128247;</span>
              </p>

            </div>


            {/* Bank Details Section */}
            <div className="section">
              <h3 className="section-title">Bank Details</h3>
              <div className="input-group">
                <div className="input-item">
                  <label htmlFor="bank-select">Bank</label>
                  <select id="bank-select" name='bankName'
                    value={formData.bankName}
                    onChange={handleInputChange}
                    disabled={!isEditable}>
                    <option>Select bank</option>
                    <option>State Bank of India</option>
                    <option>ICICI Bank</option>
                  </select>
                </div>
                <div className="input-item">
                  <label htmlFor="accountNumber">Account Number</label>
                  <input id="accountNumber"
                    type="text"
                    placeholder="Enter code"
                    name='accountNumber'
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    disabled={!isEditable} />
                </div>
                <div className="input-item">
                  <label htmlFor="ifsc">IFSC</label>
                  <input id="ifsc"
                    type="text"
                    placeholder="Enter code"
                    name='ifsc'
                    value={formData.ifsc}
                    onChange={handleInputChange}
                    disabled={!isEditable} />
                </div>
                <div className="input-item">
                  <label htmlFor="bank-mobile">Owner Mobile Number</label>
                  <input id="bank-mobile"
                    type="text"
                    placeholder="Enter mobile number"
                    name='contactPhone'
                    value={formData.contactPhone}
                    onChange={handleInputChange}
                    disabled={!isEditable} />
                </div>
              </div>
              <div className='address-bar'>
                <div className="input-item">
                  <label htmlFor="bank-address">Address</label>
                  <input
                    id="bank-address"
                    type="text"
                    placeholder="Enter address"
                    className='full-width'
                    name='bankBranchAddress.full'
                    value={formData.bankBranchAddress.full}
                    onChange={handleInputChange}
                    disabled={!isEditable} />
                </div>
              </div>
            </div>


            <div className="businness-submit-button">
              <button className="bussiness-submit" onClick={handleBusinessInformation}>
                Publish Business
              </button>
            </div>
          </div>

        </div>)


          :

          <div>
            <div className='busi-ness-page'>
              <h2 className='item-header'>Business Information</h2>
              <div className='bi-main-div'>
                <div className='bi-1-div'>
                  <img src='/Assets/business information.png' alt="business information" />
                </div>
                <div className='bi-text-section'>
                  <h2 className='title-text'>Hey, seems like you forgot to add your business!</h2>
                  <p className='description-text'>
                    If you want to add your business and share the deets, just hit that <span>“Add Business”</span> button.
                  </p>
                </div>
                <button className='add-business-button' onClick={toggleEdit} >+ Add Business</button>
              </div>
            </div>

          </div>}


    </>
  );
}

