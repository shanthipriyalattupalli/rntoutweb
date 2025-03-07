"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
// import "@/styles/AddressSidebar.css";
import '../../../styles/AddressSidebar.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";


const edit = "/Assets/editicon.svg";
const emptyaddress = "/Assets/emptyaddress.svg";

const AddressSidebar = ({ isOpen, onClose, onAddressSelect, addressId }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const latitude = (typeof window !== 'undefined') ? localStorage.getItem("latitude") : null;
  const longitude = (typeof window !== 'undefined') ? localStorage.getItem("longitude") : null;
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("userToken");
  //   setToken(token);
  // }, []);

  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;

  useEffect(() => {
    if (addresses.length > 0) {
      onAddressSelect(addresses[0]); // Select first address by default
    }
  }, [addresses, onAddressSelect]);

  

  const fetchAddress = async () => {

    try {
      const response = await axios.get(`${BASE_URL}/profile/view-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(response.data.profile.addresses);
    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch addresses.");
    }
  };
  useEffect(() => {
    if (token) {
      fetchAddress();
    }
  }, [token]);

  const initialFormData = {
    type: "",
    name: "",
    mobile: "",
    flatOrHouseNo: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    country: "",
    zip: "",
    location: {
      latitude: latitude,
      longitude: longitude,
      // lat: latitude,
      // lng: longitude,
    },
  }

  const [formData, setFormData] = useState(initialFormData);


  if (!isOpen) return null;

  const handleAddAddress = () => {
    setIsAddAddress(true);
  };
  const handleEditAddress = (address) => {
    setEditingAddressId(address._id); // Track the address being edited
    setFormData({ ...address }); // Populate form data
    setSelected(address.type);
    setIsAddAddress(true);
  };

  const handleSelect = (item) => {
    setSelected(item);
    setFormData((prev) => ({ ...prev, type: item })); // Update the 'type' field
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Prevent entering more than 10 digits for mobile number
    if (name === "mobile" && value.length > 10) return;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveAddress = async () => {
    // Validate mobile number
    if (!formData.mobile || formData.mobile.length !== 10) {
      setErrorMessage("Mobile number must be 10 digits.");
      return;
    }
    if(!token){
      toast.error("Please login to add address.");
      return;
    }

    setErrorMessage(""); // Reset error message if valid

    try {
      const response = await axios.post(
        `${BASE_URL}/profile/add-address`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Address Added!",
        text: "Your address was successfully added.",
        confirmButtonColor: "#d33", // Optional: Customize button color
      });
      setFormData(initialFormData); // Reset the form
      setIsAddAddress(false); // Return to address list view
      fetchAddress();
    } catch (error) {
      const errorResponse = error.response.data.message;
      const errorMessages =
        errorResponse.details.length > 0 ? errorResponse.details[0].message : null;
      console.error(errorMessages);
      toast.error(errorMessages);
    }
  };
 
  const handleUpdateAddress = async () => {
    if (!editingAddressId) {
      Swal.fire({
        icon: "error",
        title: "No Address Selected",
        text: "Please select an address to update.",
        confirmButtonColor: "#d33",
      });
      return;
    }
  
    // Prepare the payload
    const payload = {
      addressId: editingAddressId,
      type: formData.type,
      name: formData.name,
      mobile: parseInt(formData.mobile, 10),
      flatOrHouseNo: formData.flatOrHouseNo,
      street: formData.street,
      landmark: formData.landmark,
      city: formData.city,
      state: formData.state,
      country: formData.country,
      zip: formData.zip,
      location: {
        lat: latitude,
        lng: longitude,
      },
    };
  

  
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "User Token Missing",
          text: "Please log in to update your address.",
          confirmButtonColor: "#d33",
        });
        return;
      }
  
      const response = await axios.put(`${BASE_URL}/profile/update-address`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (response.status === 200) {
        fetchAddress();
        setActiveModalIndex(null);
  
        // Show success message
        Swal.fire({
          icon: "success",
          title: "Address Updated!",
          text: "Your address has been successfully updated.",
          confirmButtonColor: "#d33",
        });
  
        // Reset the form and state after successful update
        setEditingAddressId(null);
        setFormData(initialFormData);
        setIsAddAddress(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "Failed to update the address. Please try again.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("Error updating address:", error);
  
      let errorMessage = "An unexpected error occurred.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }
  
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    }
  };
  
  
  const handleDeleteAddress = async (addressId) => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
      if (!token) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "User token is missing.",
          confirmButtonColor: "#d33",
        });
        return;
      }
  
      // Show confirmation alert before deleting
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to recover this address!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!",
      });
  
      if (result.isConfirmed) {
        const response = await axios.delete(`${BASE_URL}/profile/delete-address`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { addressId: addressId },
        });
  

  
        // Show success alert
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Address deleted successfully!",
          confirmButtonColor: "#d33",
        });
  
        fetchAddress();
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again.",
        confirmButtonColor: "#d33",
      });
    }
  };
  


  return (
    <div className='sidebar-overlay' onClick={onClose}>
      <ToastContainer />
      <div className='sidebar' onClick={(e) => e.stopPropagation()}>
        {isAddAddress ? (
          <div>
            <div className='sidebar-header'>
              <h2 onClick={() => setIsAddAddress(false)}>Add New Address</h2>
              <button onClick={onClose} className='close-button'>
                &times;
              </button>
            </div>
            <div className='address-form'>
              <label className="pb-2">Type<span className="text-red-500">*</span></label>

              <div className='form-select'>
                {["Home", "Office", "Hotel", "Others"].map((item) => (
                  <span
                    key={item}
                    className={`form-select-item ${selected === item ? "selected" : ""
                      }`}
                    onClick={() => handleSelect(item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <label className="pt-8">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Receiver’s name"
                className="text-input required-input"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <label className="pt-4">
                Mobile <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                placeholder="Receiver’s contact number"
                className={`text-input ${errorMessage ? "border-red-500" : ""}`}
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />

              {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              <label className="pt-4">Flat/ House no/ Floor / Building<span className="text-red-500">*</span></label>

              <input
                type="text"
                placeholder="Flat/ House no/ Floor / Building"
                className="text-input"
                name="flatOrHouseNo"
                value={formData.flatOrHouseNo}
                onChange={handleInputChange}
                required
              />
              <label className="pt-4">Area / Sector / Locality<span className="text-red-500">*</span></label>
              <input
                type='text'
                placeholder='Area / Sector / Locality'
                className='text-input'
                name='street'
                value={formData.street}
                onChange={handleInputChange}
                required
              />
              <label className="pt-4">Nearby Landmark<span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Nearby Landmark"
                className="text-input"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
                required
              />
              <div className='flex gap-2'>
                <div className="pt-4">
                  <label >Country<span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    placeholder="Country"
                    className="text-input"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="pt-4">
                  <label>State<span className="text-red-500">*</span></label>
                  <input
                    type='text'
                    placeholder='State'
                    className='text-input'
                    name='state'
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className='flex gap-2'>
                <div className="pt-4">
                  <label>City<span className="text-red-500">*</span></label>
                  <input
                    type='text'
                    placeholder='City'
                    className='text-input'
                    name='city'
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="pt-4">
                  <label>PostCode<span className="text-red-500">*</span></label>
                  <input
                    type='text'
                    placeholder='Postcode'
                    className='text-input'
                    name='zip'
                    value={formData.zip}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              {editingAddressId ? <button className='address-button' onClick={handleUpdateAddress}>
                update Address
              </button> :
                <button className='address-button' onClick={handleSaveAddress}>
                  Save Address
                </button>
              }
            </div>
          </div>
        ) : (
          <div>
            <div className="sidebar-header">
              <h2 className="font-semibold font-md">Select Location</h2>
              <button onClick={onClose} className="close-button">
                &times;
              </button>
            </div>
            <div className="flex flex-col gap-4">
  {addresses.length > 0 ? (
    addresses.map((address, index) => (
      <div key={index} className="container address-card cursor-pointer">
        <div className="delivery-content">
          <div className="delivery-context flex items-center gap-2">
            {/* Custom Checkbox */}
            <label className="relative flex items-center ">
              <input
                type="checkbox"
                checked={selectedAddressIndex === index}
                onChange={() => {
                  setSelectedAddressIndex(index);
                  onAddressSelect(address);
                }}
                className="peer hidden"
              />
              <div className=" cursor-pointer w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center peer-checked:bg-red-500 peer-checked:border-red-500">
                {selectedAddressIndex === index && (
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
            </label>

            <div>
              <h5 className="delivery-to">DELIVERS TO</h5>
              <span>{address.type}</span>
            </div>
          </div>

          {/* Edit Icon with Modal */}
          <div className="relative inline-block">
            <img
              src={edit}
              alt="edit"
              className="w-6 h-6 cursor-pointer"
              onClick={() => setActiveModalIndex(activeModalIndex === index ? null : index)}
            />

            {activeModalIndex === index && (
              <div className="absolute right-0 mt-2 w-32 bg-white border shadow-lg rounded-md p-2 z-50">
                <button
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-200"
                  onClick={() => handleEditAddress(address)}
                >
                  ✏️ Edit
                </button>
                <button
                  className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-200 text-red-600"
                  onClick={() => handleDeleteAddress(address._id)}
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div
          className="address-context cursor-pointer"
          onClick={() => {
            setSelectedAddressIndex(index);
            onAddressSelect(address);
            onClose();
          }}
        >
          <h4>{address.name}</h4>
          <p>|</p>
          <p>{address.mobile}</p>
        </div>

        <div>
          <p>
            {address.flatOrHouseNo}, {address.street}, {address.city}, {address.state},{" "}
            {address.country}
          </p>
          <p>({address.zip})</p>
        </div>
      </div>
    ))
  ) : (
    <div className="flex flex-col justify-center text-center">
      <img src={emptyaddress} alt="No Address Found" />
      <h1 className="font-semibold text-lg">No address added</h1>
    </div>
  )}
</div>


            <button className="address-button" onClick={handleAddAddress}>
              Add New Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSidebar;
