"use client";
import React, {useEffect, useState } from "react";
// import "@/styles/Cart.css";
import '../../../styles/Cart.css';
import axios from "axios";
import AddressSidebar from "../AddressSidebar/page"
import "@/styles/Address.css";
import { FaEllipsisV } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialAddresses = [
  {
    id: 1,
    type: "Home",
    name: "Rohan Johnson",
    phone: "+91 1234 56789",
    address:
      "C/14, Vijay Apts, Old Agra Road, Naupada,next To Aradhana, Thane (w), Mumbai, Maharashtra, India - 400602",
  },
  {
    id: 2,
    type: "Office",
    name: "Rohan Johnson",
    phone: "+91 1234 56789",
    address:
      "C/14, Vijay Apts, Old Agra Road, Naupada,next To Aradhana, Thane (w), Mumbai, Maharashtra, India - 400602",
  },
];

export default function ManageAddresses() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
    const [isAddressSidebarOpen, setIsAddressSidebarOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
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
  const [showForm, setShowForm] = useState(false);

  const handleAddressToggle = () => {
    setIsAddressSidebarOpen(!isAddressSidebarOpen);
  };
  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  return (
    <>
      <h2 className='item-header'>Manage Addresses</h2>

      <div className='manage-addresses-container'>
        {addresses?.map((address) => (
          <div key={address.id} className='address-item'>
            <div className='address-header'>
              <span className='delivers-to'>DELIVERS TO</span>
              <span className='address-type'>{address.type}</span>
              <FaEllipsisV
                className='options-icon'
                onClick={() => handleDeleteAddress(address.id)}
              />
            </div>
            <div className='address-details'>
              <h3>
                {address.name} <span>{address.mobile}</span>
              </h3>
              <p>{address.flatOrHouseNo},{address.street},{address.city},{address.state},{address.country}</p>
              <p>({address.zip})</p>
            </div>
          </div>
        ))}
        <button
          className='add-address-button'
          onClick={handleAddressToggle}
        >
        Add Address 
        </button>
        <AddressSidebar
          isOpen={isAddressSidebarOpen}
          onClose={handleAddressToggle}
          onAddressSelect={setSelectedAddress}
        />
      </div>
    </>
  );
}
