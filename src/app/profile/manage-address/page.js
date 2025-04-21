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
import Swal from "sweetalert2";
import Cookies from "js-cookie";


const edit = "/Assets/editicon.svg";
const emptyaddress = "/Assets/emptyaddress.svg";

export default function ManageAddresses() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isAddressOpen, setIsAddressOpen] = useState(false);
    const [selected, setSelected] = useState("Home");

    
  const [addresses, setAddresses] = useState([]);
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [editingAddressId, setEditingAddressId] = useState(null);


  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("userToken");
  //   setToken(token);
  // }, []);

  const token = Cookies.get("userToken");

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

  useEffect(() => {
 

    if (token) {
      fetchAddress();
    }
  }, [token]);


  const initialFormData = {
    type: "Home",
    name: "",
    mobile: "",
    flatOrHouseNo: "",
    street: "",
    landmark: "",
    city: "",
    state: "",
    country: "India",
    zip: "",
    location: {
      latitude: 0,
      longitude: 0
    },
  }

  const [formData, setFormData] = useState(initialFormData);

  const handleAddressToggle = () => {
    setIsAddressOpen(!isAddressOpen);
    fetchAddress();

  };

  const handleDeleteAddress = async (addressId) => {
    try {
      const token = Cookies.get("userToken");
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
   const result =  await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Address deleted successfully!",
          confirmButtonColor: "#d33",
        });

        if(result.isConfirmed){
          window.location.reload();
        }
// window.location.reload();
        // fetchAddress();
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

  const handleEditAddress = (address) => {
    setIsAddressOpen(!isAddressOpen);
    setEditingAddressId(address._id);
    setFormData({ ...address });
    setSelected(address.type);

  };

  return (
    <>
      <h2 className='item-header'>Manage Addresses</h2>
      <ToastContainer />
      <div className='manage-addresses-container flex flex-col'>
        {addresses.length >0 ?
        addresses?.map((address, index) => (  
          <div key={address._id} className='address-item'>
            <div className='address-header'>
              <span className='delivers-to'>DELIVERS TO</span>
              <span className='address-type'>{address.type}</span>


              <FaEllipsisV
                className='options-icon'
                onClick={() => setActiveModalIndex(activeModalIndex === index ? null : index)}
              />

              {activeModalIndex === index && (
                <div className="absolute right-0 top-[30%] left-[85%] w-32 bg-white border shadow-lg rounded-md p-2 z-50">
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
        )):(
          <>

        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="w-[50%] flex flex-col items-center text-center">
            <img src={emptyaddress} alt="No Address Found" className="mb-4" />
            {/* <h1 className="font-semibold text-lg">No address added</h1> */}
          </div>
        </div>
        </>
        )}
        <button className=" items-center justify-center add-address-button mt-4" onClick={handleAddressToggle}>
            Add Address
          </button>

        <AddressSidebar isOpen={isAddressOpen} 
        onClose={handleAddressToggle} 
        setEditingAddressId={setEditingAddressId} 
        editingAddressId={editingAddressId} 
        setSelected={setSelected} 
        selected={selected} 
        setFormData={setFormData}
        formData={formData} 
        initialFormData={initialFormData}
        setActiveModalIndex={setActiveModalIndex}/>


      </div>
    </>
  );
}
