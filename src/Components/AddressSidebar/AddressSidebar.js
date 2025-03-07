"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AddressSidebar.css";
import "../../styles/Sidebar.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

const edit = "/Assets/editicon.svg";

const AddressSidebar = ({ isOpen, onClose }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [selected, setSelected] = useState(null);
  const [addresses, setAddresses] = useState([]);

  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("userToken");
  //   setToken(token);
  // }, []);

  const token=(typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;


useEffect(() => {
  const fetchAddress = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/profile/view-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAddresses(response.data.profile.addresses);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch addresses.");
    }
  };

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
      latitude: 0,
      longitude: 0
    },
  }

  const [formData, setFormData] = useState(initialFormData);



  if (!isOpen) return null;


  const handleAddAddress = () => {
    setIsAddAddress(true);
  };

  const handleSelect = (item) => {
    setSelected(item);
    setFormData((prev) => ({ ...prev, type: item })); // Update the 'type' field
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSaveAddress = async () => {
    try {
      const response = await axios.post(`${BASE_URL}/profile/add-address`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  

  
      // Show success message
      Swal.fire({
        icon: "success",
        title: "Address Added!",
        text: response.data.message || "Your address has been added successfully.",
        confirmButtonColor: "#d33",
      });
  
      setFormData(initialFormData); // Reset the form
      setIsAddAddress(false); // Return to address list view
    } catch (error) {
      console.error("Error saving address:", error);
  
      let errorMessage = "Failed to add address. Please try again.";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      }
  
      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: errorMessage,
        confirmButtonColor: "#d33",
      });
    }
  };

  const Address = [
    {
      name: "Rohan Johnson",
      mobile: "+91 1234 56789",
      address:
        "C/14, Vijay Apts, Old Agra Road, Naupada,next To Aradhana, Thane (w), Mumbai, Maharashtra, India - 400602",
    },
    {
      name: "Rohan",
      mobile: "+91 1234 56789",
      address:
        "C/14, Vijay Apts, Old Agra Road, Naupada,next To Aradhana, Thane (w), Mumbai, Maharashtra, India - 400602",
    },
    {
      name: "Johnson",
      mobile: "+91 1234 56789",
      address:
        "C/14, Vijay Apts, Old Agra Road, Naupada,next To Aradhana, Thane (w), Mumbai, Maharashtra, India - 400602",
    },
  ];

  return (
    <div className='sidebar-overlay' onClick={onClose}>
      <ToastContainer />
      <div className='sidebar' onClick={(e) => e.stopPropagation()}>
        
          <div>
            <div className='sidebar-header'>
              <h2>Add New Address</h2>
              <button onClick={onClose} className='close-button'>
                &times;
              </button>
            </div>
            <div className='address-form'>
              <div className='form-select'>
                {["Home", "Office", "Hotel", "Others"].map((item) => (
                  <span
                    key={item}
                    className={`form-select-item ${
                      selected === item ? "selected" : ""
                    }`}
                    onClick={() => handleSelect(item)}
                  >
                    {item}
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Receiver’s name"
                className="text-input"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="number"
                placeholder="Receiver’s contact number"
                className="text-input"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Flat/ House no/ Floor / Building"
                className="text-input"
                name="flatOrHouseNo"
                value={formData.flatOrHouseNo}
                onChange={handleInputChange}
              />
              <input
                type='text'
                placeholder='Area / Sector / Locality'
                className='text-input'
                name='street'
                value={formData.street}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Nearby Landmark (Optional)"
                className="text-input"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
              />
              <div className='flex gap-2'>
                <input
                  type="text"
                  placeholder="Country"
                  className="text-input"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                />
                <input
                  type='text'
                  placeholder='State'
                  className='text-input'
                  name='state'
                  value={formData.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className='flex gap-2'>
                <input
                  type='text'
                  placeholder='City'
                  className='text-input'
                  name='city'
                  value={formData.city}
                  onChange={handleInputChange}
                />
                <input
                  type='text'
                  placeholder='Postcode'
                  className='text-input'
                  name='zip'
                  value={formData.zip}
                  onChange={handleInputChange}
                />
              </div>
              <button className='address-button' onClick={handleSaveAddress}>
                Save Address
              </button>
            </div>
          </div>
  
      </div>
    </div>
  );
};

export default AddressSidebar;
