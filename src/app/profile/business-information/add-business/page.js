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
const owner='/Assets/owner.svg'
const Userprofile = "../../Assets/User-icon.svg";
const card = "../../Assets/card-img1.svg";
const card1 = "../../Assets/card-img2.svg";
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaCreditCard } from "react-icons/fa";
export default function BusinessInformation2() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  //  const [userId, setUserId] = useState("");
  //   const [token, setToken] = useState("");
  const [isBuisness, setIsBuisness] = useState(false);
  const [businessInfo,setBusinessInfo] = useState(false)
  const [businessId, setBusinessId] = useState();
   const [isEditable, setIsEditable] = useState(false);
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
    bannerImages: [] // Array to hold image URLs
  }
  // console.log(initialFormData.data)
  const [formData, setFormData] = useState(initialFormData);

  console.log(formData, "formData");
  const handleInputChange = (e) => {
    const { name, value } = e.target; // Extract name and value from the event
    const keys = name.split("."); // Split name into keys (e.g., ['businessAddress', 'full'])

    setFormData((prevFormData) => {
      // Create a shallow copy of the formData object
      const updatedFormData = { ...prevFormData };

      // Navigate to the correct nested object
      let temp = updatedFormData;
      for (let i = 0; i < keys.length - 1; i++) {
        temp = temp[keys[i]];
      }

      // Update the value of the specific property
      temp[keys[keys.length - 1]] = value;

      return updatedFormData;
    });
  };


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

  // Submit the form data to the backend
  const handleBusinessInformation = async () => {
    try {
      // const bannerImagesString = formData.bannerImages.join(",");
      const payload = {

        businessName: String(formData.businessName),
        storeName: String(formData.storeName),
        businessAddress: {
          no: String(formData.businessAddress.no),
          street: String(formData.businessAddress.street),
          city: String(formData.businessAddress.city),
          state: String(formData.businessAddress.state),
          postalCode: String(formData.businessAddress.postalCode),
          country: String(formData.businessAddress.country),
          full: String(formData.businessAddress.full),
        },
        taxId: String(formData.taxId),
        contactEmail: String(formData.contactEmail),
        contactPhone: String(formData.contactPhone),
        storeDescription: String(formData.storeDescription),
        bankName: String(formData.bankName),
        ifsc: String(formData.ifsc),
        bankBranchAddress: {
          no: String(formData.bankBranchAddress.no),
          street: String(formData.bankBranchAddress.street),
          city: String(formData.bankBranchAddress.city),
          state: String(formData.bankBranchAddress.state),
          postalCode: String(formData.bankBranchAddress.postalCode),
          country: String(formData.bankBranchAddress.country),
          full: String(formData.bankBranchAddress.full),
        },
        bannerImages: formData.bannerImages,
      }
      console.log(payload, "payload");

      // Make the API request to add or update business information
      const response = await axios.post(`${BASE_URL}/business-info/add-or-update`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log(response, "Business info created or updated");
      setIsEditable(false)
      toast.success("Business information updated successfully");
      handlefetchBusinessInfo()
      // setFormData(initialFormData)
     

    } catch (error) {
      // Handle error response gracefully
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.error("Error submitting business information:", error);
    }
  };
  const router = useRouter();
  console.log(isBuisness, "business")

  console.log(formData.bannerImages, "bannerimages")


const handlefetchBusinessInfo=async()=>{
  try {
    
    const response = await axios.get(`${BASE_URL}/business-info`,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    console.log(response.data.data, "business data")
    console.log(response.data.data.bannerImages, "banner images in business")
    setBusinessId(response.data.data._id)
    setFormData(response.data.data)
    // if(response.data.data._id){
    
    //   setBusinessInfo(true)
    // }
  } catch (error) {
    console.error(error)
    
  }
}

  useEffect(()=>{
    handlefetchBusinessInfo()
  },[token])



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
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-md">
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
            <p className="flex flex-col"><div className="flex gap-2"><FaPhone className="text-gray-500" /> <strong className="text-[14px] font-medium leading-[18px] text-left text-gray-500">Account Number:</strong></div><div className="text-[14px] font-normal leading-[20px] text-left"> ******123</div></p>
          </div>
          <p className="flex items-center gap-2 mt-2"><FaMapMarkerAlt className="text-gray-500" /> {formData.bankBranchAddress.full}</p>
        </div>
      </div>
      {/* Business Info */}
      <div className="mb-6">
        <h3 className="text-md font-semibold text-yellow-600">BASIC INFO</h3>
        <div className=" p-4 rounded-md">
          <div className="flex flex-col gap-4 mb-4">
            <img src={Userprofile} alt="Profile" className="w-16 h-16 rounded-full" />
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
          <img src={card} alt="Ad 1" className="rounded-md shadow-md w-full" />
          <img src={card1} alt="Ad 2" className="rounded-md shadow-md w-full" />
          <img src={card} alt="Ad 3" className="rounded-md shadow-md w-full" />
          <img src={card1} alt="Ad 4" className="rounded-md shadow-md w-full" />
        </div>
      </div>
    </div>
  </div>
</div>
</div> ):isEditable?(    <div>
        <ToastContainer />
        <h2 className='item-header'>
          <div className='back-business' onClick={() => router.back()}>
            <IoMdArrowRoundBack style={{ marginRight: "12px" }} />
            Business Information
          </div>
          <h3 className="cursor-pointer" onClick={toggleEdit}>edit</h3>
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
                  disabled={!isEditable}/>
                  
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
                  disabled={!isEditable}/>
              </div>
              <div className="input-item">
                <label htmlFor="mobile-number">Mobile Number</label>
                <input id="mobile-number"
                  type="text"
                  placeholder="Enter mobile number"
                  name='contactPhone'
                  value={formData.contactPhone}
                  onChange={handleInputChange} 
                  disabled={!isEditable} />
              </div>
              <div className="input-item">
                <label htmlFor="email-address">Email Address</label>
                <input id="email-address"
                  type="email"
                  placeholder="Enter email address"
                  name='contactEmail'
                  value={formData.contactEmail}
                  onChange={handleInputChange} 
                  disabled={!isEditable}/>
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
                  disabled={!isEditable}/>
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
                  <img src='/Assets/upload-image.svg' alt="Icon" />
                </div>
              </div>
              <div className='icon-button'>
                <button className="edit-image-button">Edit Image</button>
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
                  disabled={!isEditable}/>
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

