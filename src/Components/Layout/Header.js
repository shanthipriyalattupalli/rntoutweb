"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import SearchInput from "../SearchInput";
import { useRouter,usePathname} from "next/navigation";
import { MAP_API } from '../../services/GMap'
import Login from "../Auth/Login";
const logo = "/Assets/Rntout_Logo.png";
const Photo = "/Assets/Photo.png";
const locations = '/Assets/location_fill.svg'
const nearby = '/Assets/nearby.svg'
const cart = '/Assets/cart.svg'
const cartitems = '/Assets/cartitems.svg'


function Header() {

  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const [locationError, setLocationError] = useState(null);
  const [locationName, setLocationName] = useState("");
  const userId = (typeof window !== 'undefined') ? localStorage.getItem("userId") : null;
  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
  const name = (typeof window !== 'undefined') ? localStorage.getItem("userName") : null;
  const latitude = (typeof window !== 'undefined') ? localStorage.getItem("latitude") : null;
  const longitude = (typeof window !== 'undefined') ? localStorage.getItem("longitude") : null;
  const [profilePic, setProfilePic] = useState( (typeof window !== 'undefined') ? localStorage.getItem("profilePic") : null || Photo);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [location, setLocation] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState("");
  const [cartItems, setCartItems] = useState(0);
  const [locationsList, setLocationsList] = useState([]);
  const [searchValue, setSearchValue] = useState(''); 
  console.log(searchValue,"searchvalue")
  const [address, setAddress] = useState({ suburb: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); 
 const cartlength=typeof window !== 'undefined' ? localStorage.getItem("cart"):null;
 const profile = typeof window !== 'undefined' ? localStorage.getItem("profilePic") : null;
console.log(cartlength,"current cart length according to local")
  useEffect(() => {
    const handleProfileUpdate = (event) => {
      const updatedPic = event.detail.profilePic;
      localStorage.setItem("profilePic", updatedPic && updatedPic); 
      setProfilePic(updatedPic);

    };
  
    window.addEventListener("profileUpdated", handleProfileUpdate);
  
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);

  useEffect(()=>{
setProfilePic(profile);
  })

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




  const getLocationFromCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${MAP_API}`
      );
      // console.log(response);
      const locationData = response.data.results;
      console.log(locationData, "from the API");
      if (locationData) {
        const uniqueLocations = new Set(); // Use Set to store unique location names
        let locations = [];
        // Iterate through all results and get address components with both 'political' and 'locality' types
        locationData.forEach(result => {
          const matchingComponent = result.address_components.find(component =>
            component.types.includes('locality') && component.types.includes('political')
          );
          if (matchingComponent && !uniqueLocations.has(matchingComponent.short_name)) {
            uniqueLocations.add(matchingComponent.short_name); // Add to Set for uniqueness
            locations.push(matchingComponent); // Add the matching component to the locations array
          }
        });
        setLocationsList(locations); // Set the list of unique locations0
        // If we have at least one location, set the first one as the default suburb
        if (locations.length > 0) {
          const suburb = locations[0]; // Use the first match for suburb
          // console.log(suburb.short_name, "suburb");
          setAddress({
            suburb: suburb.short_name,
          });
        } else {
          setError('Suburb not found.');
        }
      } else {
        setError('Location data not found.');
      }
      setLoading(false);
    } catch (error) {
      setError('Failed to fetch location data.');
      setLoading(false);
    }
  };


  console.log(locationsList, "address")

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          localStorage.setItem("latitude", latitude);
          localStorage.setItem("longitude", longitude);
          await getLocationFromCoordinates(latitude, longitude);
        },
        (err) => {
          setError('Unable to retrieve your location.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchLocation();
  }, []);




  const fetchCartDetails = async () => {
    console.log("out fetching cart");
    try {
      const response = await axios.get(`${BASE_URL}/cart/${userId}`);
      console.log(response, "response in cart")
      setCartItems(response.data?.cartItems?.length || 0);
    } catch (error) {
      console.log("Error fetching cart details:", error);
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
    if (searchTerm.length > 3) {
      try {
        const response = await axios.get(`${BASE_URL}/variants/filter`, {
          params: {
            search: searchTerm,
          },
        });
        console.log(response, "response in search");
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
    router.push(`/Products/${variant.title}?id=${variant._id}`);
    

  };
  
  const handleVariantClick = () => {
    router.push('/Products')
  }

  const handleDistanceChange = (e) => {
    const distance = e.target.value;
    console.log(distance, "distance..")
    setSelectedDistance(distance);
    localStorage.setItem("selectedDistance", distance);
    window.location.reload();
  };

  return (
<header className="flex items-center justify-between px-6 md:px-10 lg:px-20 py-3 bg-white shadow-md">
  {/* Left Section - Logo */}
  <div className="flex items-center">
    <Link href="/" style={{all:"unset"}}>
      <img src={logo} alt="RNT Out Logo" className="h-8 sm:h-10 border-none border-0" />
    </Link>
  </div>

  {/* Center Section - Search Input */}
  <div className="hidden sm:flex items-center relative w-full max-w-xs ml-4">
    <SearchInput  value={searchValue} onChange={(e) => handleSearchInputChange(e.target.value)}  className="w-[250px]"/>
    {showSuggestions && variants.length > 0 && (
      <ul className="absolute left-0 w-full bg-white border rounded shadow top-[40px] z-40">
        {variants.slice(0, 10).map((variant) => (
            <li
              key={variant._id}
              onClick={() => handleSuggestionClick(variant)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {variant.title}
            </li>
        ))}
      </ul>
    )}
  </div>

  {/* Right Section - Location, Distance, Cart, Profile, and Buttons */}
  <div className="flex items-center gap-3 md:gap-4">
    {/* Location */}
    <div className="hidden sm:flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100 gap-2">
      <Image src={locations} alt="location" width={18} height={18} />
      <span className="text-sm font-medium text-blacky">{address.suburb}</span>
    </div>

    {/* Distance Selection */}
    <div className="hidden sm:flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100">
      <Image src={nearby} alt="location" width={18} height={18} />
      <select className="bg-transparent text-sm" value={selectedDistance} onChange={handleDistanceChange}>
        <option value="20">20 km</option>
        <option value="30">30 km</option>
        <option value="40">40 km</option>
        <option value="50">50 km</option>
        <option value="60">60 km</option>
        <option value="100">100 + km</option>
      </select>
    </div>

    {/* Cart Button */}
    <div className="relative" onClick={() => router.push("/Cartpage")}>
      {cartlength > 0 ? (
        <>
          <Image src={cartitems} width={28} height={28} alt="cart"  className="min-w-[28px] min-h-[28px]"/>
          <span className="absolute -top-2 -top-2 -right-2  bg-red-500 rounded-full w-5 h-5 text-xs font-semibold text-white flex items-center justify-center">
            {cartItems}
          </span>
        </>
      ) : (
        <button className="bg-white border border-gray-300 rounded-lg p-2 hover:bg-gray-100">
       <Image src={cartitems} width={28} height={28} alt="cart" className="min-w-[28px] min-h-[28px]" />
        </button>
      )}
    </div>
    {/* Rent Button */}
    {name || token ? (
      <button
        className="sm:flex items-center gap-2 px-5 py-2 rounded-full text-white font-medium shadow-lg bg-gradient-to-r from-orange-400 via-purple-500 to-teal-500 hover:scale-105 transition-transform duration-300"
        onClick={() => router.push("/add-on-rent")}
      >
        <span className="text-lg">+</span> Rent
      </button>
    ) : null}

    {/* Profile & Sign In/Sign Up */}
    <nav>
      {name || !token === "undefined"? (
        <div
          onClick={() => router.push("/profile")}
          className="w-full flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1 cursor-pointer"
        >
          <img src={profilePic} alt="user" className="w-8 h-8 rounded-full object-cover" />
          <p className="hidden sm:flex hidden md:flex text-sm">{name}</p>
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
                    <Login setIsLoginOpen={setIsLoginOpen}/>
                  </div>
                </div>
              )}
    </nav>
  </div>
</header>

  );
}

export default Header;
