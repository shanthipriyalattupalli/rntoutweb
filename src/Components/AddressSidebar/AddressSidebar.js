"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/AddressSidebar.css";
import "../../styles/Sidebar.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const edit = "/Assets/editicon.svg";

const AddressSidebar = ({ isOpen, onClose, setEditingAddressId, editingAddressId, setSelected, selected, setFormData, formData, initialFormData, setActiveModalIndex }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const latitude = (typeof window !== 'undefined') ? localStorage.getItem("latitude") : null;
  const longitude = (typeof window !== 'undefined') ? localStorage.getItem("longitude") : null;

  const router = useRouter()



  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;



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
  }, [token])






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
      const result = await Swal.fire({
        icon: "success",
        title: "Done!",
        text: "Address added successfully",
        confirmButtonColor: "#d33",
      });

      // These actions happen immediately, before user clicks OK
      setFormData(initialFormData);
      setIsAddAddress(false);
      fetchAddress();

      // This runs **only if the user clicks OK**
      if (result.isConfirmed) {
        router.refresh();
        onClose();
      }
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
        window.location.reload();

        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Address updated successfully",
          confirmButtonColor: "#d33",
        });

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

  return (
    <div className='sidebar-overlay' onClick={onClose}>
      <ToastContainer />
      <div className='sidebar' onClick={(e) => e.stopPropagation()}>
        <div className='sidebar-header'>
          <h2 onClick={() => setIsAddAddress(false)}>Add New Address</h2>
          <button onClick={onClose} className='close-button' style={{position:"unset"}}>
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
    </div>

  );
};

export default AddressSidebar;
