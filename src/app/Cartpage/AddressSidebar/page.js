"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
// import "@/styles/AddressSidebar.css";
import '../../../styles/AddressSidebar.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const edit = "/Assets/editicon.svg";

const AddressSidebar = ({ isOpen, onClose, onAddressSelect,addressId }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [selected, setSelected] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const latitude=(typeof window !== 'undefined') ? localStorage.getItem("latitude") : null;
  const longitude=(typeof window !== 'undefined') ? localStorage.getItem("longitude") : null;
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("userToken");
  //   setToken(token);
  // }, []);

  const token=(typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;


useEffect(() => {
  const fetchAddress = async () => {
    console.log(token, "token");
    try {
      const response = await axios.get(`${BASE_URL}/profile/view-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data.profile.addresses, "addresses");
      setAddresses(response.data.profile.addresses);
    } catch (error) {
      console.error(error);
      // toast.error("Failed to fetch addresses.");
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
      latitude: latitude,
      longitude: longitude,
      // lat: latitude,
      // lng: longitude,
    },
  }

  const [formData, setFormData] = useState(initialFormData);
  console.log(formData, "initial form");

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
toast.success(response.data.message)
      setFormData(initialFormData); // Reset the form
      setIsAddAddress(false); // Return to address list view
    } catch (error) {
      console.error("Error saving address:", error);
  toast.error(error.response.data.message)
    }
  };


  const handleUpdateAddress = async () => {
    if (!editingAddressId) {
      toast.error("No address selected for updating.");
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
        // latitude: latitude|| 0,
        // longitude: longitude|| 0,
        lat: latitude,
        lng: longitude
      },
    };
  
    console.log("Update Payload:", payload);
  
    try {
      const token =
        typeof window !== 'undefined' ? localStorage.getItem("userToken") : null;
      if (!token) {
        toast.error("User token is missing.");
        return;
      }
  
      const response = await axios.put(
        `${BASE_URL}/profile/update-address`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        toast.success("Address updated successfully!");
        // Reset the form and state after successful update
        setEditingAddressId(null);
        setFormData(initialFormData); // Reset form to initial state
        setIsAddAddress(false); // Hide the address form
      } else {
        toast.error("Failed to update address.");
      }
    } catch (error) {
      console.error("Error updating address:", error);
      if (error.response && error.response.data) {
        toast.error(error.response.data.message || "Failed to update address.");
      } else {
        toast.error("An unexpected error occurred.");
      }
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
      { editingAddressId?     <button className='address-button' onClick={handleUpdateAddress}>
                update Address
              </button>:    
               <button className='address-button' onClick={handleSaveAddress}>
                Save Address
              </button>
           }
            </div>
          </div>
        ) : (
          <div>
            <div className='sidebar-header'>
              <h2>Select Location</h2>
              <button onClick={onClose} className='close-button'>
                &times;
              </button>
            </div>
            {addresses?.map((address, index) => (
              <div
                key={index}
                className='container address-card'

              >
                <div className='delivery-content'>
                  <div className='delivery-context'>
                    <h5 className='delivery-to'>DELIVERS TO</h5>
                    <span>{address.type}</span>
                  </div>
                  <div className='address-edit' onClick={() => handleEditAddress(address)}>
  <img src={edit} alt='edit' />
</div>
                </div>
                <div className='address-context'                 onClick={() => {
                  onAddressSelect(address);
                  onClose();
                }}>
                  <h4>{address.name}</h4>
                  <p>|</p>
                  <p>{address.mobile}</p>
                </div>
                <div>
                  <p>{address.flatOrHouseNo},{address.street},{address.city},{address.state},{address.country}</p>
                  <p>({address.zip})</p>
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
