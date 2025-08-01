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
import Cookies from 'js-cookie';

import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBuilding, FaCreditCard } from "react-icons/fa";
export default function BusinessInformation2() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [businessId, setBusinessId] = useState();
  const [isEditable, setIsEditable] = useState(false);
  const [previewProfileImage, setPreviewProfileImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const userName = Cookies.get("userName");
  const userEmail = Cookies.get("userEmail");
  const token = Cookies.get("userToken");
  const Mobile = Cookies.get("userMobile");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const toggleEdit = () => {
    // setIsBuisness(true)
    setBusinessId(null)
    setIsEditable(true)
  };

  const handleIconClick = (e) => {
    // const handleIconClick = (e) => {
    e.stopPropagation(); // Stop bubbling up to parent
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    // };
    // fileInputRef.current.click();
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
    bankName: "",
    accountNumber: "",
    accountHolder: "",
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
    replaceImageIndices: 0,
    removedImageIndices: [],
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

    if (name === 'ifsc' && !/^[a-zA-Z0-9]*$/.test(value)) {
      return; // Reject the input if it’s not alphanumeric
    }

    if (name === "contactPhone") {
      const onlyNumbers = value.replace(/\D/g, ""); // Allow only digits

      if (onlyNumbers.length > 10) return;

      // Validate: starts with 6-9
      if (onlyNumbers.length > 0 && !/^[6-9]/.test(onlyNumbers)) return;

      setFormData((prevState) => ({
        ...prevState,
        contactPhone: onlyNumbers,
      }));
      return;
    }




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


  // useEffect(() => {
  //   if (formData.bannerImages?.length) {
  //     // Map existing images from API response
  //     const existingImages = formData.bannerImages.map((img) => img.imageUrl);
  //     setPreviewImages(existingImages);
  //   }
  // }, [formData.bannerImages]);


useEffect(() => {
  if (formData.bannerImages?.length) {
    const backendImages = formData.bannerImages
      .filter((img) => img?.imageUrl)
      .map((img) => img.imageUrl);

    setPreviewImages((prev) => {
      const isInitialLoad = prev.length === 0;
      return isInitialLoad ? [...backendImages] : prev;
    });
  }
}, [formData.bannerImages]);





  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) {
      toast.error("No files selected");
      return;
    }

    const previews = [];
    const newFiles = [...files];

    const replacementIndexes = [];

    files.forEach((file, i) => {
      const targetIndex = previewImages.length + i;
      replacementIndexes.push(targetIndex);

      const reader = new FileReader();
      reader.onload = () => {
        previews.push({ index: targetIndex, src: reader.result });

        if (previews.length === files.length) {

          const sortedPreviews = [...previewImages];

          previews.forEach(({ index, src }) => {
            sortedPreviews[index] = src;
          });

          setPreviewImages(sortedPreviews);
        }
      };
      reader.readAsDataURL(file);
    });


    setFormData((prev) => ({
      ...prev,
      bannerImages: [...(prev.bannerImages || []), ...files],
      replaceImageIndices: [...(prev.replaceImageIndices || []), ...replacementIndexes],
    }));

    toast.success("Files added successfully!");
  };


const handleRemoveImage = (indexToRemove) => {
  // Remove from preview
  setPreviewImages((prev) => {
    const updated = [...prev];
    updated.splice(indexToRemove, 1);
    return updated;
  });

  // Remove from formData and track removed indices (not URLs)
  setFormData((prev) => {
    const updatedBannerImages = [...(prev.bannerImages || [])];
    const removedIndices = [...(prev.removedImageIndices || [])];

    // Add index to removed list only if it's an existing image (with imageUrl)
    if (updatedBannerImages[indexToRemove]?.imageUrl) {
      removedIndices.push(indexToRemove);
    }

    updatedBannerImages.splice(indexToRemove, 1);

    return {
      ...prev,
      bannerImages: updatedBannerImages,
      removedImageIndices: removedIndices,
    };
  });

  toast.info("Image removed!");
};



console.log(previewImages, "Preview Images State");
console.log(formData?.removedImageIndices, "Replace Image Indices State");


// const handleFileUpload = async (event) => {
//   const files = Array.from(event.target.files);
//   if (!files.length) {
//     toast.error("No files selected");
//     return;
//   }

//   try {
//     const previews = await Promise.all(
//       files.map((file) =>
//         new Promise((resolve, reject) => {
//           const reader = new FileReader();
//           reader.onload = () => {
//             resolve({ file, src: reader.result });
//           };
//           reader.onerror = () => reject("Failed to read file");
//           reader.readAsDataURL(file);
//         })
//       )
//     );
//         const existing = previews.map((img) => (
//       img?.src
//     ));
//     console.log("Previews:", existing);
//     // Update state
//     setPreviewImages((prev) => [...prev, ...previews]);
//     setFormData((prev) => ({
//       ...prev,
//       bannerImages: [...(prev.bannerImages || []), ...files],
//     }));

//     toast.success("Files added successfully!");
//   } catch (error) {
//     toast.error("Error reading files");
//     console.error(error);
//   }
// };




//   const handleRemoveImage = (indexToRemove) => {

//   setPreviewImages((prev) => {
//     const updatedPreview = prev.filter((_, index) => index !== indexToRemove);
//     console.log("Updated Preview Images:", updatedPreview);
//     return [...updatedPreview]; // ensure fresh array
//   });

//   // 2. Update form data safely
//   setFormData((prev) => {
//     const updatedBanners = prev.bannerImages.filter((_, index) => index !== indexToRemove);
//     const updatedRemovedIndices = [...(prev.removedImageIndices || []), indexToRemove];
    
//     return {
//       ...prev,
//       bannerImages: updatedBanners,
//       removedImageIndices: updatedRemovedIndices,
//     };
//   });

//   toast.info("Image removed!");
// };





  const handleBusinessInformation = async () => {
      if (!agreedToTerms) {
        Swal.fire({
          icon: 'warning',
          title: 'Terms and Conditions',
          text: 'You must agree to the terms and conditions before proceeding.',
          confirmButtonColor: '#FF2D55',
          confirmButtonText: 'OK'
        });
    return;
  }

    let errors = {};

    // Validate required fields
    if (!formData?.businessName) errors.businessName = "This field is required";
    if (!formData?.storeName) errors.storeName = "This field is required";
    if (!formData?.contactEmail) errors.contactEmail = "This field is required";
    if (!formData?.contactPhone || formData?.contactPhone.length !== 10)
      errors.contactPhone = "Mobile number must be 10 digits";
    if (!formData?.storeDescription) errors.storeDescription = "This field is required";
    if (!formData?.bankName) errors.bankName = "This field is required";
    if (!formData?.accountHolder) errors.accountHolder = "This field is required";
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
      formDataToSend.append("accountHolder", formData?.accountHolder);
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



      if (formData?.removedImageIndices?.length > 0) {
        formData.removedImageIndices.forEach(index => {
          formDataToSend.append('removedImageIndices', index);
        });
      }

      if (formData?.replaceImageIndices?.length > 0) {
        formData.replaceImageIndices.forEach(index => {
          formDataToSend.append('replaceImageIndices', index);
        });
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


      console.log("Form Data to Send:", formDataToSend);
      const response = await axios.post(`${BASE_URL}/business-info/add-or-update`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

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
      if (error?.response?.status === 413) {
        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'File size too large. Please upload smaller files.',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
        return;
      } else {

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error?.response?.data?.message || 'Failed to submit business information',
          confirmButtonColor: '#d33',
          confirmButtonText: 'OK'
        });
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
      setFormData(response.data.data);
      setAgreedToTerms(true);
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


console.log(formData, "fomr data");
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


          <div className="section">
            <h3 className="section-title">OWNER INFO</h3>
            <div className="input-group">
              {userName != "undefined" && <div className="input-item">
                <label htmlFor="accountNumber">Owner Name
                  <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                </label>
                <input id="accountNumber"
                  type="text"
                  placeholder="Enter code"
                  value={userName}
                  disabled
                />


              </div>}

              {userEmail != "undefined" && <div className="input-item">
                <label htmlFor="accountNumber">Owner Email Address
                  <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                </label>
                <input id="accountNumber"
                  type="text"
                  placeholder="Enter code"
                  value={userEmail}
                  disabled
                />


              </div>}

              <div className="input-item">
                <label htmlFor="bank-mobile">Owner Mobile Number
                  <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                </label>
                <input id="bank-mobile"
                  type="text"
                  placeholder="Enter mobile number"
                  value={Mobile}
                  disabled
                />
              </div>
            </div>
          </div>


          {/* Bank details*/}
          <div className="section">
            <h3 className="section-title">BANK DETAILS</h3>
            <div className="input-group">
              <div className="input-item">
                <label htmlFor="bank-select">Bank
                  <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                </label>
                <input id="accountNumber"
                  type="tel"
                  placeholder="Enter Bank Name"
                  name='bankName'
                  value={formData?.bankName}
                  onChange={handleInputChange}

                />
              </div>
                {errorMessage.bankName && <p className="text-red-500 text-sm">{errorMessage.bankName}</p>}
              <div className="input-item">
                <label htmlFor="bank-select">Account Holder
                  <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                </label>
                <input id="accountNumber"
                  type="tel"
                  placeholder="Enter Account holder Name"
                  name='accountHolder'
                  value={formData?.accountHolder}
                  onChange={handleInputChange}

                />
              </div>
              {errorMessage.accountHolder && <p className="text-red-500 text-sm">{errorMessage.accountHolder}</p>}
              <div className="input-item">
                <label htmlFor="accountNumber">Account Number
                  <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span>

                </label>
                <input id="accountNumber"
                  type="tel"
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
                  pattern="[a-zA-Z0-9]*"

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

          {/* Business Details Section */}



          {/* Basic Info Section */}
          <div className="section">
            <h3 className="section-title">BASIC INFO    <span style={{ color: "rgba(255, 45, 85, 1)" }}>*</span></h3>

            <div className="basic-info">
              <div className="icon-text">
                <div className="icon">
                  {/* Display uploaded image preview if available */}
                  {previewProfileImage ? (
                    <img src={previewProfileImage} alt="Profile Preview" className="w-[5rem] h-[5.5rem] rounded-full" />
                  ) : formData?.profileImage ? (
                    <img src={formData?.profileImage} alt="Default Icon" className="w-[5rem] h-[5.5rem] rounded-full" />
                  ) : (
                    <div className="rounded-full">
                      <img src={storeimage} alt="Default Icon" className="p-[20px]" />
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

 
         <div className="image-preview-container" style={{ alignSelf: "flex-start" }}>
  {previewImages.map((item, index) => (
    <div key={index} className="image-preview-box" style={{ position: 'relative' }}>
      <img
        src={item}
        alt={`Preview ${index + 1}`}
        className="preview-image"
      />
      <button
        onClick={() => handleRemoveImage(index)}
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          border: '1px solid #ccc',
          borderRadius: '50%',
          cursor: 'pointer',
          padding: '2px 5px',
          fontSize: '12px',
        }}
        title="Remove"
        className="bg-red-600 text-white"
      >
        ✕
      </button>
    </div>
  ))}
</div>





              </div>



            </div>
            <p className="upload-note">
              Kindly make sure to upload a minimum of 1 image. <span className="icon">&#128247;</span>
            </p>

          </div>

          <div className="section1">
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
                  type="tel"
                  placeholder="Enter mobile number"
                  className={`${errorMessage ? "border-red-500" : ""}`}
                  name='contactPhone'
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                  value={formData?.contactPhone}
                  onChange={handleInputChange}
                />
                {formData.contactPhone && formData.contactPhone.length > 0 && formData.contactPhone.length < 10 && (
                  <p className="text-red-500 text-sm mt-1">Enter a valid 10-digit number starting with 6-9</p>
                )}
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

              {/* <label className="checkbox-label">
                  <input type="checkbox" />
                  Same address as the store
                </label> */}
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


          {/* Bank Details Section */}



      {/* Terms and Conditions Checkbox */}
<div className="businness-submit-button">
  <div style={{ display: "flex", alignItems: "center", marginBottom: "16px",paddingLeft: "10px" }}>
    <input
      type="checkbox"
      id="agreeTerms"
      checked={agreedToTerms}
      onChange={() => setAgreedToTerms(!agreedToTerms)}
    />
    <label htmlFor="agreeTerms" style={{ marginLeft: "8px" }}>
      I agree to the <a href="/terms-and-conditions" target="_blank" style={{ color: "blue", textDecoration: "underline" }}>Terms and Conditions</a>
    </label>
  </div>

  <button className="bussiness-submit" onClick={handleBusinessInformation}>
    Publish Renter
  </button>
</div>
</div>

          </div>

        


      </>
      );
}

