"use client";
import React, { useEffect, useState } from "react";
// import "@/styles/Cart.css";
import '../../../styles/Cart.css';
import axios from "axios";
import AddressSidebar from "../../../Components/AddressSidebar/AddressSidebar"
import "@/styles/Address.css";
import { FaEllipsisV } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const edit = "/Assets/editicon.svg";
const emptyaddress = "/Assets/emptyaddress.svg";

export default function ManageAddresses() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(null);


  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("userToken");
  //   setToken(token);
  // }, []);

  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;



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
  const [showForm, setShowForm] = useState(false);

  const handleAddressToggle = () => {
    setIsAddressOpen(!isAddressOpen);
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };



  return (
    <>
      <h2 className='item-header'>Manage Addresses</h2>

      <div className='manage-addresses-container'>
        {addresses?.map((address, index) => (
          <div key={address.id} className='address-item'>
            <div className='address-header'>
              <span className='delivers-to'>DELIVERS TO</span>
              <span className='address-type'>{address.type}</span>


              <FaEllipsisV
                className='options-icon'
                onClick={() => setActiveModalIndex(activeModalIndex === index ? null : index)}
              />

              {activeModalIndex === index && (
                <div className="absolute right-0 top-[30%] left-[10%] w-32 bg-white border shadow-lg rounded-md p-2 z-50">
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
            <div className='address-details'>
              <h3>
                {address.name} <span>{address.mobile}</span>
              </h3>
              <p>{address.flatOrHouseNo},{address.street},{address.city},{address.state},{address.country}</p>
              <p>({address.zip})</p>
            </div>
          </div>
        ))}
        <ToastContainer />
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="w-[50%] flex flex-col items-center text-center">
            <img src={emptyaddress} alt="No Address Found" className="mb-4" />
            {/* <h1 className="font-semibold text-lg">No address added</h1> */}
          </div>
          <button className="add-address-button mt-4" onClick={handleAddressToggle}>
            Add Address
          </button>
        </div>

        <AddressSidebar isOpen={isAddressOpen} onClose={handleAddressToggle} />


      </div>
    </>
  );
}
