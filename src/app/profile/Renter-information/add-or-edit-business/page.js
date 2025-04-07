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
import Swal from 'sweetalert2'
const owner = '/Assets/owner.svg'
const Userprofile = "../../Assets/User-icon.svg";
const card = "../../Assets/card-img1.svg";
const card1 = "../../Assets/card-img2.svg";
const storeimage = "/Assets/store_2_fill.svg";

import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaCreditCard } from "react-icons/fa";
export default function BusinessInformation2() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [businessId, setBusinessId] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [previewProfileImage, setPreviewProfileImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
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

    if (name === "storeName" || name === "businessName") {
      const nameRegex = /^[A-Za-z\s]*$/;
      if (!nameRegex.test(value)) return;
    }



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

    setErrorMessage((prev) => ({
      ...prev,
      [name]: "",  
    }));
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

    setErrorMessage((prev) => ({
      ...prev,
      bannerImages: [],
    }));

  };


  const handleBusinessInformation = async () => {

    let errors = {};

    // Validate required fields
    if (!formData?.businessName) errors.businessName = "This field is required";
    if (!formData?.storeName) errors.storeName = "This field is required";
    if (!formData?.contactEmail) errors.contactEmail = "This field is required";
    if (!formData?.contactPhone || formData?.contactPhone.length !== 10)
      errors.contactPhone = "Mobile number must be 10 digits";
    if (!formData?.storeDescription) errors.storeDescription = "This field is required";
    if (!formData?.bankName) errors.bankName = "This field is required";
    if (!formData?.accountNumber) {
      errors.accountNumber = "This field is required";
    } else if (!/^\d{9,18}$/.test(formData.accountNumber)) {
      errors.accountNumber = "Account number must be between 9 and 18 digits";
    }
    if (!formData?.ifsc) errors.ifsc = "This field is required";
    if (!formData.profileImage) errors.profileImage = "This field is required";

    // If errors exist, set error state and return
    if (Object.keys(errors).length > 0) {
      setErrorMessage(errors);
      return;
    }
    try {
      const formDataToSend = new FormData();

      // Append business information
      formDataToSend.append("businessName", formData?.businessName);
      formDataToSend.append("storeName", formData?.storeName);
      formDataToSend.append("businessAddress[no]", formData.businessAddress?.no);
      formDataToSend.append("businessAddress[street]", formData?.businessAddress?.street);
      formDataToSend.append("businessAddress[city]", formData?.businessAddress?.city);
      formDataToSend.append("businessAddress[state]", formData?.businessAddress?.state);
      formDataToSend.append("businessAddress[postalCode]", formData?.businessAddress?.postalCode);
      formDataToSend.append("businessAddress[country]", formData?.businessAddress?.country);
      formDataToSend.append("businessAddress[full]", formData?.businessAddress?.full);
      formDataToSend.append("taxId", formData?.taxId);
      formDataToSend.append("contactEmail", formData?.contactEmail);
      formDataToSend.append("contactPhone", formData?.contactPhone);
      formDataToSend.append("storeDescription", formData?.storeDescription);
      formDataToSend.append("bankName", formData?.bankName);
      formDataToSend.append("accountNumber", formData?.accountNumber || "");
      formDataToSend.append("ifsc", formData?.ifsc);
      formDataToSend.append("bankBranchAddress[no]", formData?.bankBranchAddress?.no);
      formDataToSend.append("bankBranchAddress[street]", formData?.bankBranchAddress?.street);
      formDataToSend.append("bankBranchAddress[city]", formData?.bankBranchAddress?.city);
      formDataToSend.append("bankBranchAddress[state]", formData.bankBranchAddress?.state);
      formDataToSend.append("bankBranchAddress[postalCode]", formData.bankBranchAddress?.postalCode);
      formDataToSend.append("bankBranchAddress[country]", formData.bankBranchAddress?.country);
      formDataToSend.append("bankBranchAddress[full]", formData.bankBranchAddress?.full);
      formDataToSend.append("profileImage", formData?.profileImage);

      if (Array.isArray(formData.bannerImages) && formData.bannerImages.length > 0) {
        formData.bannerImages.forEach((banner, index) => {
          if (banner instanceof File) {
            formDataToSend.append("bannerImages", banner);
            console.log(`Banner Image ${index + 1} Added (Web):`, banner.name);
          } else if (banner.uri || banner.imageUrl) {
            let bannerUri = banner.imageUrl || banner.uri;
            if (bannerUri.startsWith("file://") || bannerUri.startsWith("content://")) {
              let fileType = banner.type || "image/jpeg";
              let fileName = `banner-${Date.now()}-${index}.${fileType.split("/")[1] || "jpg"}`;

              let fileToSend = {
                uri: bannerUri,
                type: fileType,
                name: fileName,
              };

              formDataToSend.append("bannerImages", fileToSend);
              console.log(`Banner Image ${index + 1} Added (Mobile):`, fileToSend);
            } else {
              console.log(`Skipping Banner Image ${index + 1}: Not a valid file`, bannerUri);
            }
          } else {
            console.log(`Skipping Banner Image ${index + 1}: Invalid format`, banner);
          }
        });
      } else {
        console.log("No Banner Images Found");
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
      console.log(response)
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: response?.data?.message || 'Business info updated successfully',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        }).then(() => {
          router.back(); // Navigate only after alert is acknowledged
        });
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
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
     
        <div>
          <ToastContainer />
          <h2 className='item-header'>
            <div className='back-business' onClick={() => router.back()}>
              <IoMdArrowRoundBack style={{ marginRight: "12px" }} />
             {businessId ? "Edit" : "Add"} Renter Information
            </div>
          </h2>
          <div className="bi2-main-div">


            {/* Business Details Section */}
            <div className="section">
              <div className='address-bar'>
                <div className="input-item">
                  <label htmlFor="business-name">Business Name
                    <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                  </label>
                  <input id="business-name"
                    type="text"
                    placeholder="Enter name"
                    className='full-width'
                    name='businessName'
                    value={formData?.businessName}
                    onChange={handleInputChange}
                     />
                  {errorMessage.businessName && <p className="text-red-500 text-sm">{errorMessage.businessName}</p>}

                </div>
              </div>
              <div className="input-group">
                <div className="input-item">
                  <label htmlFor="store-name">Store Name
                    <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                  </label>
                  <input id="store-name"
                    type="text"
                    placeholder="Enter name"
                    name='storeName'
                    value={formData?.storeName}
                    onChange={handleInputChange}
                     />
                  {errorMessage.storeName && <p className="text-red-500 text-sm">{errorMessage.storeName}</p>}

                </div>
                <div className="input-item">
                  <label htmlFor="mobile-number">Mobile Number
                    <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                  </label>
                  <input id="mobile-number"
                    type="number"
                    placeholder="Enter mobile number"
                    className={`${errorMessage ? "border-red-500" : ""}`}
                    name='contactPhone'
                    value={formData?.contactPhone}
                    onChange={handleInputChange}
                     />
                  {errorMessage.contactPhone && <p className="text-red-500 text-sm">{errorMessage.contactPhone}</p>}

                </div>

                <div className="input-item">
                  <label htmlFor="email-address">Email Address
                    <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                  </label>
                  <input id="email-address"
                    type="email"
                    placeholder="Enter email address"
                    name='contactEmail'
                    value={formData?.contactEmail}
                    onChange={handleInputChange}
                     />
                  {errorMessage.contactEmail && <p className="text-red-500 text-sm">{errorMessage.contactEmail}</p>}

                </div>
              </div>
              <div className='address-bar'>
                <div className="input-item">
                  <label htmlFor="Address">Address</label>
                  <input type="text"
                    placeholder="Business-address"
                    className="full-width"
                    name='businessAddress.full'
                    value={formData?.businessAddress.full}
                    onChange={handleInputChange}
                     />
                </div>

                <label className="checkbox-label">
                  <input type="checkbox" />
                  Same address as the store
                </label>
              </div>

              <div className='address-bar'>
                <div className="input-item ">
                  <label htmlFor="store-description">Store Description
                    <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                  </label>
                  <textarea id="store-description"
                    placeholder="Enter description"
                    className="full-width"
                    rows={5}
                    name='storeDescription'
                    value={formData?.storeDescription}
                    onChange={handleInputChange}
                    ></textarea>
                  {errorMessage.storeDescription && <p className="text-red-500 text-sm">{errorMessage.storeDescription}</p>}

                </div></div>
            </div>


            {/* Basic Info Section */}
            <div className="section">
              <h3 className="section-title">Basic Info    <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span></h3>
 
              <div className="basic-info">
                <div className="icon-text">
                  <div className="icon">
                    {/* Display uploaded image preview if available */}
                    {previewProfileImage ? (
                      <img src={previewProfileImage} alt="Profile Preview" className="w-[7rem] h-[5.5rem] rounded-full" />
                    ) : formData?.profileImage ? (
                      <img src={formData?.profileImage} alt="Default Icon" className="w-[7rem] h-[5.5rem] rounded-full" />
                    ) : (
                      <div className="rounded-full">
                        <img src={storeimage} alt="Default Icon" className="ml-2  px-4 py-5" />
                      </div>
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
                    Upload Image
                  </button>
                </div>

              </div>
              {errorMessage.profileImage && <p className="text-red-500 text-sm my-4">{errorMessage.profileImage}</p>}
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
                    // 
                    className="ml-28"
                  />

                  {/* Preview uploaded files */}
                  <div className='image-preview-container' style={{alignSelf:"flex-start"}}>
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
                  <label htmlFor="bank-select">Bank
                    <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                  </label>
                  <select id="bank-select" name='bankName'
                    value={formData?.bankName}
                    onChange={handleInputChange}
                    >
                    <option>Select bank</option>
                    <option>State Bank of India</option>
                    <option>ICICI Bank</option>
                  </select>
                </div>
                {errorMessage.bankName && <p className="text-red-500 text-sm">{errorMessage.bankName}</p>}
                <div className="input-item">
                  <label htmlFor="accountNumber">Account Number
                    <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                  </label>
                  <input id="accountNumber"
                    type="text"
                    placeholder="Enter code"
                    name='accountNumber'
                    value={formData?.accountNumber}
                    onChange={handleInputChange}
                     />
                  {errorMessage.accountNumber && <p className="text-red-500 text-sm">{errorMessage.accountNumber}</p>}

                </div>
                <div className="input-item">
                  <label htmlFor="ifsc">IFSC
                    <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                  </label>
                  <input id="ifsc"
                    type="text"
                    placeholder="Enter code"
                    name='ifsc'
                    value={formData?.ifsc}
                    onChange={handleInputChange}
                     />
                  {errorMessage.ifsc && <p className="text-red-500 text-sm">{errorMessage.ifsc}</p>}

                </div>
                <div className="input-item">
                  <label htmlFor="bank-mobile">Owner Mobile Number
                    <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                  </label>
                  <input id="bank-mobile"
                    type="text"
                    placeholder="Enter mobile number"
                    name='contactPhone'
                    value={formData?.contactPhone}
                    onChange={handleInputChange}
                     />
                  {errorMessage.contactPhone && <p className="text-red-500 text-sm">{errorMessage.contactPhone}</p>}

                </div>
              </div>
              <div className='address-bar'>
                <div className="input-item">
                  <label htmlFor="bank-address">Address

                  </label>
                  <input
                    id="bank-address"
                    type="text"
                    placeholder="Enter address"
                    className='full-width'
                    name='bankBranchAddress.full'
                    value={formData?.bankBranchAddress?.full}
                    onChange={handleInputChange}
                     />
                </div>
              </div>
            </div>


            <div className="businness-submit-button">
              <button className="bussiness-submit" onClick={handleBusinessInformation}>
                Publish Renter
              </button>
            </div>
          </div>

        </div> 


    </>
  );
}

{/* <div>
  <div className='busi-ness-page'>
    <h2 className='item-header'>Renter Information</h2>
    <div className='bi-main-div'>
      <div className='bi-1-div'>
        <img src='/Assets/business information.png' alt="business information" />
      </div>
      <div className='bi-text-section'>
        <h2 className='title-text'>Hey, seems like you forgot to add your Renter Information!</h2>
        <p className='description-text'>
          If you want to add your Information and share the deets, just hit that <span>“Add Renter Info“</span> button.
        </p>
      </div>
      <button className='add-business-button' onClick={toggleEdit} >+ Add Renter Info</button>
    </div>
  </div>

</div>} */}
// {businessId ?(
//   <div>
//     <div>
//       <h2 className='item-header'>
//         <div className='back-business' onClick={() => router.back()}>
//           Renter Information
//         </div>
//         <a className="kyc-btn" onClick={() => router.push("/profile/business-information/kyc")} >Business KYC ?</a>
//         <h3 className="cursor-pointer text-blue-400" onClick={toggleEdit}>Edit Details</h3>
//       </h2>
//       <div className="flex justify-center bg-[rgba(7,7,7,0.05)]">
//         <div className="w-full max-w-6xl">
//           {/* Owner Info */}
//           <div className="mb-2 p-6 bg-white">
//             <h3 className="text-md font-semibold text-yellow-600">OWNER INFO </h3>
//             <div className="p-4 rounded-md">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4">
//                 <p className="flex flex-col">
//                   <div className="flex gap-2"><FaUser className="text-gray-500" /> <strong>Owner Name</strong></div>
//                   <div className="text-sm font-normal text-left">{userName}</div>
//                 </p>
//                 <p className="flex flex-col">
//                   <div className="flex gap-2"><FaEnvelope className="text-gray-500" /> <strong>Email:</strong></div>
//                   <div className="text-sm">{userEmail}</div>
//                 </p>
//                 <p className="flex flex-col">
//                   <div className="flex gap-2"><FaPhone className="text-gray-500" /> <strong>Mobile:</strong></div>
//                   <div className="text-sm">8374801954</div>
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Bank Details */}
//           <div className="mb-2 p-6 bg-white">
//             <h3 className="text-md font-semibold text-yellow-600">BANK DETAILS</h3>
//             <div className="p-4 rounded-md">
//               <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4">
//                 <p className="flex flex-col"><div className="flex gap-2"><FaBuilding className="text-gray-500" /> <strong>Bank Name:</strong></div><div className="text-sm">{formData?.bankName}</div></p>
//                 <p className="flex flex-col"><div className="flex gap-2"><FaCreditCard className="text-gray-500" /> <strong>IFSC Code:</strong></div><div className="text-sm">{formData?.ifsc}</div></p>
//                 <p className="flex flex-col"><div className="flex gap-2"><FaPhone className="text-gray-500" /> <strong>Account Number:</strong></div><div className="text-sm">{formData?.accountNumber}</div></p>
//               </div>
//               {formData?.bankBranchAddress?.full && <strong className="flex mt-4">Address :</strong>}
//              {formData?.bankBranchAddress?.full && <p className="flex items-center gap-2 mt-2 text-sm"><FaMapMarkerAlt className="text-gray-500" />{formData?.bankBranchAddress?.full}</p>}
//             </div>
//           </div>

//           {/* Business Info */}
//           <div className="mb-2 p-6 bg-white">
//             <h3 className="text-md font-semibold text-yellow-600">BASIC INFO</h3>
//             <div className="p-4 rounded-md">
//               <div className="flex flex-col sm:flex-row md:flex-col lg:flex-col xl:flex-col gap-4">
//                 <img src={formData?.profileImage} alt="Profile" className="w-16 h-16 rounded-full" />
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-3 gap-4 w-full">
//                   <p className="flex flex-col"><div className="flex gap-2"><FaBuilding className="text-gray-500" /> <strong>Business Name:</strong></div><div className="text-sm">{formData?.businessName}</div></p>
//                   <p className="flex flex-col"><div className="flex gap-2"><FaBuilding className="text-gray-500" /> <strong>Store Name:</strong></div><div className="text-sm">Codefacts Furniss Shop</div></p>
//                   <p className="flex flex-col"><div className="flex gap-2"><FaPhone className="text-gray-500" /> <strong>Mobile:</strong></div><div className="text-sm">{formData?.contactPhone}</div></p>
//                   <p className="flex flex-col"><div className="flex gap-2"><FaEnvelope className="text-gray-500" /> <strong>Email:</strong></div><div className="text-sm">{formData?.contactEmail}</div></p>
//                 </div>
//               </div>
//               <p className="text-gray-700 text-sm mt-2">{formData?.storeDescription}</p>
//             </div>
//           </div>

//           {/* Advertisement Banner */}
//           <div className="bg-white px-6">
//             <h3 className="text-md justify-center pt-6 font-semibold text-yellow-600 ">ADVERTISEMENT BANNER</h3>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
//               {formData.bannerImages.map((src, index) => (
//                 <img key={index} src={src.imageUrl} alt={`Ad ${index + 1}`} className="rounded-md shadow-md w-full h-40 object-cover" />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>) 
//   : isEditable ? (