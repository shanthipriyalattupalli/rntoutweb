"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Cookies from "js-cookie";
import SearchInput from "../SearchInput";
import { useRouter, usePathname } from "next/navigation";
import { MAP_API } from '../../services/GMap'
import Login from "../Auth/Login";
import Subscription from "../Home/Subscription";
const logo = "/Assets/Rntout_Logo.png";
const Photo = "/Assets/Photo.png";
const locations = '/Assets/location_fill.svg'
const nearby = '/Assets/nearby.svg'
const cart = '/Assets/Button.svg'
const cartitems = '/Assets/cartitems.svg'
const subscription='/Assets/subscription.svg'



function Header() {

  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const [locationError, setLocationError] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isSubscription,setIsSubscription]=useState(false)
  // const userId = (typeof window !== 'undefined') ? localStorage.getItem("userId") : null;
  // const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
  // const name = (typeof window !== 'undefined') ? localStorage.getItem("userName") : null;

  const userId = Cookies.get("userId");
  const token = Cookies.get("userToken");
  const names = Cookies.get("userName");
  const latitude = (typeof window !== 'undefined') ? localStorage.getItem("latitude") : null;
  const longitude = (typeof window !== 'undefined') ? localStorage.getItem("longitude") : null;
  const [profilePic, setProfilePic] = useState((typeof window !== 'undefined') ? localStorage.getItem("profilePic") : null || Photo);
  const [name,setName]=useState(names)
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [location, setLocation] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState("");
  const [cartItems, setCartItems] = useState(0);
  const [locationsList, setLocationsList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
const [subscriptionPlans,setSubscriptionPlans]=useState([])
  const [address, setAddress] = useState({ suburb: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const cartlength = typeof window !== 'undefined' ? localStorage.getItem("cart") : null;
  const profile = typeof window !== 'undefined' ? localStorage.getItem("profilePic") : null;
  useEffect(() => {
    const handleProfilePicUpdate = (event) => {
      const updatedPic = event.detail.profilePic;
      if (updatedPic) {
        localStorage.setItem("profilePic", updatedPic);
        setProfilePic(updatedPic);
      }
    };
  
    const handleNameUpdate = (event) => {
      const updatedName = event.detail.name;
      if (updatedName) {
        Cookies.set("userName", updatedName, { expires: 7, secure: true, sameSite: "Strict" });
        setName(updatedName);
      }
    };
  
    window.addEventListener("profileUpdated", handleProfilePicUpdate);
    window.addEventListener("nameUpdated", handleNameUpdate);
  
    return () => {
      window.removeEventListener("profileUpdated", handleProfilePicUpdate);
      window.removeEventListener("nameUpdated", handleNameUpdate);
    };
  }, []);
  

  useEffect(() => {
    if (!pathname.startsWith("/Products")) {
      setSearchValue("");
      setShowSuggestions(false);
    }
  }, [pathname]);



  useEffect(() => {
    const storedDistance = (typeof window !== 'undefined') ? localStorage.getItem("selectedDistance") : null
    if (storedDistance) {
      setSelectedDistance(storedDistance);
    }
  }, []);



  const checkLocationPermission = async () => {
    if ("permissions" in navigator) {
      try {
        const permissionStatus = await navigator.permissions.query({ name: "geolocation" });
  
        if (permissionStatus.state === "denied" || permissionStatus.state === "prompt") {
          // If location access is blocked or reset, remove stored values
          Cookies.remove("latitude", { path: "/" });
Cookies.remove("longitude", { path: "/" });
          localStorage.removeItem("latitude");
          localStorage.removeItem("longitude");
        }
      } catch (error) {
        console.error("Error checking location permission:", error);
      }
    }
  };
  
  const getLocationFromCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${MAP_API}`
      );
  
      const locationData = response.data.results;
      if (locationData) {
        const uniqueLocations = new Set();
        let locations = [];
  
        locationData.forEach((result) => {
          const matchingComponent = result.address_components.find((component) =>
            component.types.includes("locality") && component.types.includes("political")
          );
  
          if (matchingComponent && !uniqueLocations.has(matchingComponent.short_name)) {
            uniqueLocations.add(matchingComponent.short_name);
            locations.push(matchingComponent);
          }
        });
  
        setLocationsList(locations);
  
        if (locations.length > 0) {
          const suburb = locations[0];
          setAddress({ suburb: suburb.short_name });
        } else {
          setError("Suburb not found.");
        }
      } else {
        setError("Location data not found.");
      }
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch location data.");
      setLoading(false);
    }
  };
  
  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
  
          // Store only if access is granted
                    Cookies.set("latitude", latitude, { expires: 7, sameSite: "Strict" });
                    Cookies.set("longitude", longitude, {  expires: 7, sameSite: "Strict", });
          localStorage.setItem("latitude", latitude);
          localStorage.setItem("longitude", longitude);
  
          await getLocationFromCoordinates(latitude, longitude);
        },
        (err) => {
          setError("Unable to retrieve your location.");
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchLocation();
  
    const interval = setInterval(() => {
      checkLocationPermission();
    }, 10000);
  
    return () => clearInterval(interval);
  }, []);
  
  




  const fetchCartDetails = async () => {

    try {
      const response = await axios.get(`${BASE_URL}/cart/${userId}`);
      setCartItems(response.data?.cartItems?.length);
    } catch (error) {
      setCartItems(0);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, [userId]);

  useEffect(() => {
    fetchCartDetails(); // Initial fetch when component mounts

    const handleCartUpdate = () => {
      fetchCartDetails(); // Fetch cart details when event is received
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, [userId]);


  const handleSearchInputChange = async (searchTerm) => {
    setSearchValue(searchTerm);
    if (searchTerm.length > 2) {
      try {
        const response = await axios.get(`${BASE_URL}/variants/filter`, {
          params: {
            search: searchTerm,
          },
        });
        setVariants(response.data.data);
        setShowSuggestions(true);
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    } else {
      setVariants([]);
      setShowSuggestions(false);
    }
  };


  const handleSuggestionClick = (variant) => {
    setSearchValue(variant.title);
    setShowSuggestions(false); // Close suggestions
    router.push(`/Products/${variant._id}?id=${variant._id}`);


  };

  const handleVariantClick = () => {
    router.push('/Products')
  }

  const handleDistanceChange = (e) => {
    const distance = e.target.value;
    setSelectedDistance(distance);
    localStorage.setItem("selectedDistance", distance);
    window.location.reload();
  };





  const fetchSubscriptionPlans=async()=>{
    try {
      const response = await axios.get(`${BASE_URL}/subscription-plans/plans`);
      console.log(response.data,"response of plans")
      setSubscriptionPlans(response.data.data)
    } catch (error) {
      console.log(error,"error")
      
    }
  }

  useEffect(()=>{
    fetchSubscriptionPlans()
  },[])




  return (
    <>
      <header className="flex items-center justify-between px-6 md:px-10 lg:px-20 py-3 gap-4 bg-white border ">
        {/* Left Section - Logo */}
        <div className="flex items-center cursor-pointer">
          <Link href="/" style={{ all: "unset" }}>
            <img src={logo} alt="RNT Out Logo" className="h-8 sm:h-10 border-none border-0" />
          </Link>
        </div>

        {/* Center Section - Search Input */}
        <div className="hidden lg:flex items-center relative w-full max-w-xs  ml-4 cursor-pointer">
          <SearchInput
            value={searchValue}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            className="w-[250px] md:w-[200px] "
          />
          {showSuggestions && (
            <ul className="absolute left-0 w-full bg-white border rounded shadow top-[40px] z-40">
              {variants.length > 0 ? (
                variants.map((variant) => (
                  <li
                    key={variant._id}
                    onClick={() => handleSuggestionClick(variant)}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {variant.title}
                  </li>
                ))
              ) : (
                <li className="flex items-center gap-2 p-2 text-gray-500 cursor-default">
                  {/* Search Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  No search results for <strong>{searchValue}</strong>
                </li>
              )}
            </ul>
          )}
        </div>



        {/* Right Section - Location, Distance, Cart, Profile, and Buttons */}
        <div className="flex items-center gap-4 md:gap-4 cursor-pointer">
          {/* Location */}
{address?.suburb    &&      <div className="hidden lg:flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100 gap-2">
            <Image src={locations} alt="location" width={18} height={18} />
            <span className="text-sm font-medium text-blacky">{address.suburb}</span>
          </div>}

          {/* Distance Selection */}
{address?.suburb  &&          <div className="hidden lg:flex  items-center bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100 cursor-pointer">
            <Image src={nearby} alt="location" width={18} height={18} />
            <select className="bg-transparent text-sm cursor-pointer md:mr-3" value={selectedDistance} onChange={handleDistanceChange}>
              <option className="cursor-pointer" value="20">20 km</option>
              <option className="cursor-pointer" value="30">30 km</option>
              <option value="40">40 km</option>
              <option value="50">50 km</option>
              <option value="60">60 km</option>
              <option value="100">100 + km</option>
            </select>
          </div>}


          {(name || token) && (
  <>
    {/* Visible only on small devices */}
    <div className="sm:hidden border border-orange-400 rounded-lg p-2">
      <Image
        src={subscription}
        width={20}
        height={20}
        alt="subscription"
        onClick={() => setIsSubscription(true)}
        className="flex w-[100px]"
      />
    </div>

    <div className="hidden sm:flex border border-orange-400 rounded-lg p-2">
      <Image
        src={subscription}
        width={20}
        height={20}
        alt="subscription"
        onClick={() => setIsSubscription(true)}
        className="flex"
      />
    </div>
  </>
)}





{isSubscription &&  (
  <div className="modal-overlay" onClick={() => setIsSubscription(false)}>
    <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
      <button className="close-button" onClick={() => setIsSubscription(false)}>
        ✕
      </button>
 
      <Subscription setIsSubscription={setIsSubscription} plans={subscriptionPlans}/>
    </div>
  </div>
)}
          {/* Cart Button */}
{ name || token ?         <div className="relative cursor-pointer" >
            {cartItems > 0 ? (
              <Link href="/Cartpage">
                <Image src={cartitems} width={30} height={30} alt="cart" className="min-w-[34px] min-h-[34px]" />
                <span className="absolute -top-2 -top-2 -right-2  bg-red-500 rounded-full w-5 h-5 text-xs font-semibold text-white flex items-center justify-center">
                  {cartItems}
                </span>
              </Link>
            ) : (
<Link href="/Cartpage">
              <button className="bg-white border border-blue-300 rounded-lg p-2 hover:bg-gray-100">
                <Image src={cart} width={22} height={22} alt="cart" className="min-w-[22px] min-h-[22px]" />
              </button>
              </Link>

            )}
          </div>:null}
          {/* Rent Button */}
          {name || token ? (
            <button
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-full text-white font-medium shadow-lg bg-gradient-to-r from-orange-400 via-purple-500 to-teal-500 hover:scale-105 transition-transform duration-300"
              onClick={() => router.push("/add-on-rent")}
            >
              <span className="text-lg">+</span> Rent
            </button>
          ) : null}
                    {name || token ? (
            <button
              className="sm:hidden sm:flex items-center gap-2 px-5 py-1 rounded-full text-white font-medium shadow-lg bg-gradient-to-r from-orange-400 via-purple-500 to-teal-500 hover:scale-105 transition-transform duration-300"
              onClick={() => router.push("/add-on-rent")}
            >
              <span className="text-lg">+</span>
            </button>
          ) : null}

          {/* Profile & Sign In/Sign Up */}
         
            {name || token ? (
              <div
                onClick={() => router.push("/profile")}
                className="w-full md:w-[110px] flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1 cursor-pointer"
              >
                <img src={profilePic} alt="user" className="w-8 h-8 rounded-full object-cover" />
                <p className="hidden sm:flex md:flex text-sm truncate max-w-[80px]">
                  {name === undefined || name==="undefined" ? "Hi!" : name}
                </p>


              </div>
            ) : (
              <button
                className="ml-2 sm:ml-5 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 sm:px-6 rounded-full shadow-md transition duration-300 flex items-center justify-center"
                onClick={() => setIsLoginOpen(true)}
              >
                {/* Show 'Login' on mobile */}
                <span className="sm:hidden">Login</span>

                {/* Show 'Sign In / Sign Up' on larger screens */}
                <span className="hidden sm:block">Sign In / Sign Up</span>
              </button>
            )}
            {isLoginOpen && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <button className="close-button" onClick={() => setIsLoginOpen(false)}>
                    ✕
                  </button>
                  <Login setIsLoginOpen={setIsLoginOpen} />
                </div>
              </div>
            )}
  
        </div>
      </header>
      <div className="sm:flex md:flex lg:hidden  w-full flex md:flex gap-3 px-2 py-4 md:px-16 sm:px-12" >
        <div className="items-center  w-full relative cursor-pointer sm:block md:block lg:hidden">
          <SearchInput
            value={searchValue}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            className="w-[120px] md:w-[400px]"
          />
          {showSuggestions && (
            <ul className="absolute left-0 w-full bg-white border rounded shadow top-[40px] z-40">
              {variants.length > 0 ? (
                variants.map((variant) => (
                  <li
                    key={variant._id}
                    onClick={() => handleSuggestionClick(variant)}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                  >
                    {variant.title}
                  </li>
                ))
              ) : (
                <li className="flex items-center gap-2 p-2 text-gray-500 cursor-default">
                  {/* Search Icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  No search results for <strong>{searchValue}</strong>
                </li>
              )}
            </ul>
          )}
        </div>
        <div className="sm:flex md:flex lg:hidden w-full flex h-10 px-1 items-center bg-white border border-gray-300 rounded-lg hover:bg-gray-100 gap-2">
          <Image src={locations} alt="location" width={18} height={18} />
          <span className="text-sm font-medium text-blacky md:mr-3 truncate w-full block">
            {address.suburb}
          </span>
        </div>
        <div className="sm:flex md:flex lg:hidden  w-1/2 h-10 flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100 cursor-pointer">
          <Image src={nearby} alt="location" width={16} height={16} />
          <select className="bg-transparent text-xs cursor-pointer mr-2" value={selectedDistance} onChange={handleDistanceChange}>
            <option className="cursor-pointer" value="20">20 km</option>
            <option className="cursor-pointer" value="30">30 km</option>
            <option value="40">40 km</option>
            <option value="50">50 km</option>
            <option value="60">60 km</option>
            <option value="100">100 + km</option>
          </select>
        </div>
      </div>
    </>

  );
}

export default Header;
