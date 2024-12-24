"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "@/styles/AddressSidebar.css";

const edit = "/Assets/editicon.svg";

const AddressSidebar = ({ isOpen, onClose, onAddressSelect }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  let token;
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    token = localStorage.getItem("userToken");
  }, []);
  const initialFormData = {
    type: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  console.log(formData, "initial form");

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
      const response = await axios.post(
        `${BASE_URL}/profile/add-address`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data, "successful");

      setFormData(initialFormData); // Reset the form
      setIsAddAddress(false); // Return to address list view
    } catch (error) {
      console.error("Error saving address:", error);
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
      <div className='sidebar' onClick={(e) => e.stopPropagation()}>
        {isAddAddress ? (
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
              {/* <input
                type="text"
                placeholder="Receiver’s name"
                className="text-input"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              /> */}
              {/* <input
                type="number"
                placeholder="Receiver’s contact number"
                className="text-input"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
              /> */}
              {/* <input
                type="text"
                placeholder="Flat/ House no/ Floor / Building"
                className="text-input"
                name="flatOrHouseNo"
                value={formData.flatOrHouseNo}
                onChange={handleInputChange}
              /> */}
              <input
                type='text'
                placeholder='Area / Sector / Locality'
                className='text-input'
                name='street'
                value={formData.street}
                onChange={handleInputChange}
              />
              {/* <input
                type="text"
                placeholder="Nearby Landmark (Optional)"
                className="text-input"
                name="landmark"
                value={formData.landmark}
                onChange={handleInputChange}
              /> */}
              <div className='flex gap-2'>
                {/* <input
                  type="text"
                  placeholder="Country"
                  className="text-input"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                /> */}
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
        ) : (
          <div>
            <div className='sidebar-header'>
              <h2>RntOut Insurance</h2>
              <button onClick={onClose} className='close-button'>
                &times;
              </button>
            </div>
            {Address.map((address, index) => (
              <div
                key={index}
                className='container address-card'
                onClick={() => {
                  onAddressSelect(address);
                  onClose();
                }}
              >
                <div className='delivery-content'>
                  <div className='delivery-context'>
                    <h5 className='delivery-to'>DELIVERS TO</h5>
                    <span>Home</span>
                  </div>
                  <div className='address-edit'>
                    <img src={edit} alt='edit' />
                  </div>
                </div>
                <div className='address-context'>
                  <h4>{address.name}</h4>
                  <p>|</p>
                  <p>{address.mobile}</p>
                </div>
                <div>
                  <p>{address.address}</p>
                </div>
              </div>
            ))}
            <button className='address-button' onClick={handleAddAddress}>
              Add New Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSidebar;
