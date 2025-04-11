"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
// import "@/styles/AddressSidebar.css";
import '../../../styles/AddressSidebar.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Cookies from "js-cookie";


const edit = "/Assets/editicon.svg";
const emptyaddress = "/Assets/emptyaddress.svg";

const AddressSidebar = ({ isOpen, onClose, onAddressSelect, addressId,onAddressSelectedSuccess }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [selected, setSelected] = useState("Home");
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const latitude = (typeof window !== 'undefined') ? localStorage.getItem("latitude") : null;
  const longitude = (typeof window !== 'undefined') ? localStorage.getItem("longitude") : null;
  const [activeModalIndex, setActiveModalIndex] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");


  const token =Cookies.get("userToken");
  console.log(token)

  useEffect(() => {
    if (addresses.length > 0) {
      onAddressSelect(addresses[0]);
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
      latitude: latitude,
      longitude: longitude,

    },
  }

  const [formData, setFormData] = useState(initialFormData);


  if (!isOpen) return null;

  const handleAddAddress = () => {
    setIsAddAddress(true);
  };
  const handleEditAddress = (address) => {
    setEditingAddressId(address._id);
    setFormData({ ...address });
    setSelected(address.type);
    setIsAddAddress(true);
  };

  const handleSelect = (item) => {
    setSelected(item);
    setFormData((prev) => ({ ...prev, type: item }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(value)) return;
    }

    if (name === "mobile") {
      const onlyNumbers = value.replace(/\D/g, ""); // Allow only digits

      if (onlyNumbers.length > 10) return;

      // Validate: starts with 6-9
      if (onlyNumbers.length > 0 && !/^[6-9]/.test(onlyNumbers)) return;

      setFormData((prevState) => ({
        ...prevState,
        mobile: onlyNumbers,
      }));
      return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === "state" ? { city: "" } : {}),
    }));
  };


  const handleSaveAddress = async () => {

    if (!formData.mobile || formData.mobile.length !== 10) {
      setErrorMessage("Mobile number must be 10 digits.");
      return;
    }
    if (!token) {
      toast.error("Please login to add address.");
      return;
    }

    setErrorMessage("");

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
        title: "Done!",
        text: "Address added successfully",
        confirmButtonColor: "#d33",
      });
      setFormData(initialFormData);
      setIsAddAddress(false);
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

    // Validate mobile number
    if (!formData.mobile || formData.mobile.length !== 10) {
      setErrorMessage("Mobile number must be 10 digits.");
      return;
    }
    if (!token) {
      toast.error("Please login to add address.");
      return;
    }

    setErrorMessage("");

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
          title: "Updated!",
          text: "Address updated successfully",
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

  const handleSelectAddress = async (addressId) => {
    console.log(addressId,"jghfbn")
    try {
      const response = await axios.patch(`${BASE_URL}/profile/selected/${addressId}`,{}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type":"application/json"
        },
        params: {
          addressId: addressId,
        },
      });
      onAddressSelectedSuccess?.();
      onClose();
  
      console.log(response, "response of selecting address");
    } catch (error) {
      console.log(error, "error in selecting");
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
  const citiesByState = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Tirupati"],
    "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Tawang"],
    "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
    "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Korba"],
    "Goa": ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
    "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    "Haryana": ["Chandigarh", "Gurgaon", "Faridabad", "Panipat"],
    "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu"],
    "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"],
    "Karnataka": ["Bangalore", "Mysore", "Mangalore", "Hubli"],
    "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Manipur": ["Imphal", "Bishnupur", "Thoubal", "Churachandpur"],
    "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin"],
    "Mizoram": ["Aizawl", "Lunglei", "Champhai", "Serchhip"],
    "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Zunheboto"],
    "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"],
    "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
    "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
    "Sikkim": ["Gangtok", "Namchi", "Mangan", "Gyalshing"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
    "Tripura": ["Agartala", "Dharmanagar", "Udaipur", "Kailashahar"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi", "Agra"],
    "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Haldwani"],
    "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"],
    "Andaman and Nicobar Islands": ["Port Blair"],
    "Chandigarh": ["Chandigarh"],
    "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
    "Lakshadweep": ["Kavaratti"],
    "Delhi": ["New Delhi", "Old Delhi"],
    "Puducherry": ["Pondicherry", "Karaikal", "Mahe", "Yanam"],
  };
  const handleBarClosure = () => {
    setIsAddAddress(false)
    onClose();
  }
  return (
    <div className='sidebar-overlay' onClick={handleBarClosure}>
      <ToastContainer />
      <div className='sidebar' onClick={(e) => e.stopPropagation()}>
        {isAddAddress ? (
          <div>
            <div className='sidebar-header'>
              <h2>Add New Address</h2>
              <button onClick={handleBarClosure} className='close-button' style={{ position: "unset" }}>
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
              <label className="pt-4">Name <span className="text-red-500">*</span></label>
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
                type="tel"
                placeholder="Receiver’s contact number"
                className={`text-input ${formData.mobile && formData.mobile.length < 10 ? "border-red-500" : ""
                  }`}
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />
              {formData.mobile && formData.mobile.length > 0 && formData.mobile.length < 10 && (
                <p className="text-red-500 text-sm mt-1">Enter a valid 10-digit number starting with 6-9</p>
              )}


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
              <label className="pt-4">Nearby Landmark<span className="text-gray-500">(Optional)</span></label>
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
                    readOnly
                  />
                </div>
                <div className="pt-4">
                  <label>State<span className="text-red-500">*</span></label>
                  <select
                    className="text-input"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="" disabled>Select State</option>
                    {Object.keys(citiesByState).map((state, index) => (
                      <option key={index} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='flex gap-2'>
                <div className="pt-4">
                  <label>City<span className="text-red-500">*</span></label>
                  <select
                    className="text-input"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    disabled={!formData.state} // Disable until state is selected
                  >
                    <option value="" disabled>Select City</option>
                    {formData.state &&
                      citiesByState[formData.state]?.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                      ))}
                  </select>
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
                              handleSelectAddress(address._id)
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

                        <div className="flex gap-2 justify-center items-center">
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
                      <h4 className="truncate w-full">{address.name}</h4>
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
