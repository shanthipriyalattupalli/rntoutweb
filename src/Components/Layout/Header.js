"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import SearchInput from "../SearchInput";
import { useRouter } from "next/navigation";
import { MAP_API } from '../../services/GMap'
import Login from "../Auth/Login";
const logo = "/Assets/Rntout_Logo.png";
const Photo = "/Assets/Photo.png";
const locations = '/Assets/location_fill.svg'
const nearby = '/Assets/nearby.svg'
const cart = '/Assets/cart.svg'
const cartitems = '/Assets/cartitems.svg'


function Header() {
  // const [name, setName] = useState("");
  // const [token,setToken]=useState("")

  // useEffect(() => {
  //   const name = localStorage.getItem("userName");
  //   const token = localStorage.getItem("token");
  //   setName(name);
  //   setToken(token)
  // }, []);
  //   useEffect(() => {
  //   const name = localStorage.getItem("userName");
  //   const token = localStorage.getItem("token");
  //   setName(name);
  //   setToken(token)
  // }, []);
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const [locationError, setLocationError] = useState(null);
  const [locationName, setLocationName] = useState("");
  const userId = (typeof window !== 'undefined') ? localStorage.getItem("userId") : null;
  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
  const name = (typeof window !== 'undefined') ? localStorage.getItem("userName") : null;
  const latitude = (typeof window !== 'undefined') ? localStorage.getItem("latitude") : null;
  const longitude = (typeof window !== 'undefined') ? localStorage.getItem("longitude") : null;

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [location, setLocation] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // const [location, setLocation] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState("");
  const [cartItems, setCartItems] = useState(0);
  const [locationsList, setLocationsList] = useState([]);
  const [address, setAddress] = useState({ suburb: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();

  const [modalShow, setModalShow] = React.useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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


  // useEffect(()=>{
  //   const cart = (typeof window !== 'undefined') ? localStorage.getItem("cart") : null;
  //   console.log(cart,"cartitems")
  //   setCartItems(cart);
  //   const updateCartCount = (event) => {
  //     setCartCount(event.detail);
  //   };
  //   window.addEventListener("cartUpdated", updateCartCount);
  //   return () => {
  //     window.removeEventListener("cartUpdated", updateCartCount);
  //   };
  // },[])



  //   useEffect(() => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const { latitude, longitude } = position.coords;
  //           localStorage.setItem("latitude", latitude);
  //           localStorage.setItem("longitude", longitude);
  //         },
  //         (error) => {
  //           console.error("Error fetching location:", error);
  //           setLocationError(error.message);
  //           navigate("/");
  //         }
  //       );
  //     } else {
  //       console.error("Geolocation is not supported by this browser.");
  //       navigate("/");
  //     }
  //   }, []);

  //   useEffect(() => {
  //     const fetchLocationName = async () => {
  //       if (latitude && longitude) {
  //         try {
  //           const response = await axios.get(
  //             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${MAP_API}`
  //           );

  //           // Check if results are present in the response
  //           if (response.data.results && response.data.results.length > 0) {
  //             const addressComponents = response.data.results[0].address_components;
  //             const location=addressComponents[4].long_name
  //             console.log(response.data.results,"address_components")
  // console.log(location,"locaton")
  //   //           const city = addressComponents.find((component) =>
  //   //             component.types.includes('locality')
  //   //         )?.long_name;
  //   //         console.log(response.data.results[0].address_components,"address_components")
  //   // console.log(city,"location name")
  //             // Set the city if found
  //             if (location) {
  //               // setCity(city);

  //               setLocationName(location)
  //             } else {
  //               console.log('City not found in the address components.');
  //             }

  //             // Call the getPropertiesList function after setting the city
  //             // getPropertiesList();
  //           } else {
  //             console.log('No results found for the provided coordinates.');
  //           }

  //           // console.log(response.data, 'location name');
  //         } catch (error) {
  //           console.error('Error fetching location name:', error);
  //         }
  //       } else {
  //         console.log('Latitude and/or Longitude are not defined.');
  //       }
  //     };

  //     fetchLocationName();
  //   }, [latitude, longitude]);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
    setIsDropdownOpen(false);
  };

  // const handleSearchInputChange = (event) => {
  //   const searchTerm = event.target.value;
  // };

  const handleNavigate = () => {
    router.push("/Login");
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName("");
    router.push("/Login"); // Redirect to login page on logout
  };

  const fetchCartDetails = async () => {
    console.log("out fetching cart");
    try {
      const response = await axios.get(`${BASE_URL}/cart/${userId}`);
      console.log(response, "response in cart")
      setCartItems(response.data.cartItems);
    } catch (error) {
      console.log("Error fetching cart details:", error);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, [userId]);



  const handleSearchInputChange = async (searchTerm) => {
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
      setVariants([]); // Clear variants if searchTerm is less than 3
      setShowSuggestions(false);
    }
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
    <Link href="/">
      <img src={logo} alt="RNT Out Logo" className="h-8 sm:h-10 border-none border-0" />
    </Link>
  </div>

  {/* Center Section - Search Input */}
  <div className="hidden sm:flex items-center relative w-full max-w-xs ml-4">
    <SearchInput onChange={(e) => handleSearchInputChange(e.target.value)} />
    {showSuggestions && variants.length > 0 && (
      <ul className="absolute left-0 w-full bg-white border rounded shadow mt-2 z-40">
        {variants.slice(0, 10).map((variant) => (
          <Link
            href={{ pathname: `/Products/${variant.title}`, query: { id: variant._id } }}
            key={variant._id}
          >
            <li
              key={variant._id}
              onClick={() => setShowSuggestions(false)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {variant.title}
            </li>
          </Link>
        ))}
      </ul>
    )}
  </div>

  {/* Right Section - Location, Distance, Cart, Profile, and Buttons */}
  <div className="flex items-center gap-3 md:gap-4">
    {/* Location */}
    <div className="hidden sm:flex items-center bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-100">
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
        <option value="100">100 km</option>
      </select>
    </div>

    {/* Cart Button */}
    <div className="relative" onClick={() => router.push("/Cartpage")}>
      {cartItems.length > 0 ? (
        <>
          <Image src={cartitems} width={28} height={28} alt="cart"  className="min-w-[28px] min-h-[28px]"/>
          <span className="absolute -top-2 -top-2 -right-2  bg-red-500 rounded-full w-5 h-5 text-xs font-semibold text-white flex items-center justify-center">
            {cartItems.length}
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
      {name || token ? (
        <div
          onClick={() => router.push("/profile")}
          className="flex items-center gap-2 border border-gray-300 rounded-full px-2 py-1 cursor-pointer"
        >
          <img src={Photo} alt="user" className="w-8 h-8 rounded-full object-cover" />
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
