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
import CartIcon from "./CartIcon";
import LocationSearch from "../Location/LocationSearch";
import Swal from "sweetalert2";
const logo = "/Assets/Rntout_Logo.png";
const Photo = "/Assets/Photo.png";
const locations = '/Assets/location_fill.svg'
const nearby = '/Assets/nearby.svg'
const subscription = '/Assets/subscription.svg'
const profile_avatar = "/Assets/profile_avatar.png";



function Header() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isSubscription, setIsSubscription] = useState(false)
  const userId = Cookies.get("userId");
  const token = Cookies.get("userToken") || null;
  const names = Cookies.get("userName");
  const latitude = Cookies.get("latitude");
  const longitude = Cookies.get("longitude")
  const [profilePic, setProfilePic] = useState((typeof window !== 'undefined') ? localStorage.getItem("profilePic") : null || Photo);
  const [name, setName] = useState(names)
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [variants, setVariants] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState("");
  const [userPlans, setUserPlans] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [subscriptionPlans, setSubscriptionPlans] = useState([])
  const [address, setAddress] = useState({ suburb: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const kycstatus = Cookies.get("kycstatus");
  const isKyc = Cookies.get("isKyc");


  useEffect(() => {
    if (typeof window === 'undefined') return;
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
    const storedDistance = Cookies.get("selectedDistance")
    if (storedDistance) {
      setSelectedDistance(storedDistance);
    } else {
      Cookies.set("selectedDistance", 20, { expires: 7, secure: true, sameSite: "Strict" });

    }
  }, []);



  const fetchProfile = async () => {

    try {
      const response = await axios.get(`${BASE_URL}/profile/view-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const profileData = response?.data?.profile;

      setProfilePic(profileData?.profilePic);

    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 401) {
        Swal.fire({
          title: 'Session Expired',
          text: 'Your session has expired. Please log in again.',
          icon: 'warning',
          confirmButtonText: 'ok',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            // Clear all cookies
            document.cookie.split(";").forEach(cookie => {
              const name = cookie.split("=")[0].trim();
              document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
            });
            window.location.reload();
          }
        })
      }
    }
  };

  useEffect(() => {

    if (token) {
      fetchProfile();
    }
  }, [token]);




  const fetchUserSubscriptionPlans = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subscription-plans/user-plans`, {
        headers: { Authorization: `Bearer ${token}` },
      });


      const activePlan = response.data.data.find(plan => plan.isActive === true);

      if (activePlan) {
        setUserPlans(activePlan);
        Cookies.set("planId", activePlan.planId, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
      } else {
        console.warn("No active subscription plan found.");
      }

    } catch (error) {
      console.log(error, "error");
    }
  };


  useEffect(() => {
    fetchUserSubscriptionPlans()

  }, [])



    const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // true if scrolled down
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // const checkLocationPermission = async () => {
  //   if ("permissions" in navigator) {
  //     try {
  //       const permissionStatus = await navigator.permissions.query({ name: "geolocation" });

  //       if (permissionStatus.state === "denied" || permissionStatus.state === "prompt") {
  //         // If location access is blocked or reset, remove stored values
  //         Cookies.remove("latitude", { path: "/" });
  //         Cookies.remove("longitude", { path: "/" });
  //         localStorage.removeItem("latitude");
  //         localStorage.removeItem("longitude");
  //       }
  //     } catch (error) {
  //       console.error("Error checking location permission:", error);
  //     }
  //   }
  // };

  // const getLocationFromCoordinates = async (lat, lon) => {
  //   try {
  //     const response = await axios.get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${MAP_API}`
  //     );

  //     const locationData = response.data.results;
  //     if (locationData) {
  //       const uniqueLocations = new Set();
  //       let locations = [];

  //       locationData.forEach((result) => {
  //         const matchingComponent = result.address_components.find((component) =>
  //           component.types.includes("locality") && component.types.includes("political")
  //         );

  //         if (matchingComponent && !uniqueLocations.has(matchingComponent.short_name)) {
  //           uniqueLocations.add(matchingComponent.short_name);
  //           locations.push(matchingComponent);
  //         }
  //       });

  //       setLocationsList(locations);

  //       if (locations.length > 0) {
  //         const suburb = locations[0];
  //         setAddress({ suburb: suburb.short_name });
  //       } else {
  //         setError("Suburb not found.");
  //       }
  //     } else {
  //       setError("Location data not found.");
  //     }
  //     setLoading(false);
  //   } catch (error) {
  //     setError("Failed to fetch location data.");
  //     setLoading(false);
  //   }
  // };

  // const fetchLocation = () => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const { latitude, longitude } = position.coords;
  //         setLocation({ latitude, longitude });

  //         // Store only if access is granted
  //         Cookies.set("latitude", latitude, { expires: 7, sameSite: "Strict" });
  //         Cookies.set("longitude", longitude, { expires: 7, sameSite: "Strict", });
  //         localStorage.setItem("latitude", latitude);
  //         localStorage.setItem("longitude", longitude);

  //         await getLocationFromCoordinates(latitude, longitude);
  //       },
  //       (err) => {
  //         setError("Unable to retrieve your location.");
  //         setLoading(false);
  //       }
  //     );
  //   } else {
  //     setError("Geolocation is not supported by this browser.");
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchLocation();

  //   const interval = setInterval(() => {
  //     checkLocationPermission();
  //   }, 10000);

  //   return () => clearInterval(interval);
  // }, []);







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

  const handleDistanceChange = (e) => {
    const distance = e.target.value;
    setSelectedDistance(distance);
    localStorage.setItem("selectedDistance", distance);
    Cookies.set("selectedDistance", distance, { expires: 7, secure: true, sameSite: "Strict" });
    window.location.reload();
  };

  const fetchSubscriptionPlans = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subscription-plans/plans`);
      setSubscriptionPlans(response.data.data)
    } catch (error) {
      console.log(error, "error")


    }
  }

  useEffect(() => {
    fetchSubscriptionPlans()
  }, [])



  const handleAddOnRent = async () => {
    if (!token) {
      await Swal.fire({
        title: "Login Required",
        text: "Please log in to proceed.",
        icon: "info",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      return;
    }
    if (kycstatus === "VERIFIED" || isKyc === "true") {
      router.push("/add-on-rent");
    } else {
      // Show confirmation alert before redirecting
      const result = await Swal.fire({
        title: "KYC Required",
        text: "KYC should be verified before adding on rent. Do you want to verify now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Verify Now",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        router.push("/profile/kyc");
      }
    }
  };


  return (
    <>
    <header
      className={`flex fixed top-0 left-0 w-full z-50 bg-white items-center justify-between px-6 md:px-10 lg:px-20 py-3 gap-4 transition-all duration-300 ${
        isScrolled ? 'shadow-sm border-b' : ''
      }`}
    >
        {/* Left Section - Logo */}
        <div className="flex items-center cursor-pointer">
          <Link href="/" style={{ all: "unset" }}>
            <img src={logo} alt="RNT Out Logo" className="h-8 sm:h-10 border-none border-0" />
          </Link>
        </div>

        {/* Center Section - Search Input */}
        <div className="hidden lg:flex items-center relative ml-4 cursor-pointer">
          <SearchInput
            value={searchValue}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            className="w-[200px] md:w-[200px] "
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


        <div className="flex items-center gap-2 sm:gap-4 cursor-pointer">

          <div className="hidden lg:block">
            <LocationSearch />
          </div>


          {/*  */}
          {/* Distance Selection */}
          {latitude && longitude &&
            <div className="hidden lg:flex  items-center bg-white border border-gray-300 rounded-[12px] px-3 py-2 hover:bg-gray-100 cursor-pointer">
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
             <Link href="/subscriptions"><div className="sm:hidden border border-orange-400 rounded-[10px] p-2">
                <Image
                  src="/Assets/subscription.svg"
                  width={20}
                  height={20}
                  alt="subscription"
                  // onClick={() => setIsSubscription(true)}
                  className="flex w-[100px] h-[20px]"
                />
              </div>
              </Link> 

              <Link href="/subscriptions"> <div className="hidden sm:flex shadow-sm border border-[rgba(244,128,3,0.45)] rounded-[10px] p-2">
                <Image
                  src="/Assets/subscription.svg"
                  width={20}
                  height={20}
                  alt="subscription"
                  // onClick={() => setIsSubscription(true)}
                  className="flex"
                />
              </div>
              </Link>
            </>
          )}






          {/* {isSubscription && (
            <div className="modal-overlay" onClick={() => setIsSubscription(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={() => setIsSubscription(false)}>
                  ✕
                </button>
                <Subscription setIsSubscription={setIsSubscription} plans={subscriptionPlans} userPlans={userPlans} />
              </div>
            </div>
          )} */}

          <CartIcon userId={userId} />

          <button
            className="w-full hidden sm:flex items-center gap-2 px-[16px] py-[10px] rounded-[12px] text-[rgb(255,45,85)] w-auto h-[40px] lg:w-fit border border-[rgb(255,45,85)] font-medium"
            onClick={() => handleAddOnRent()}
          >
            <span className="text-lg">+</span> Join as Partner
          </button>


          <button
            className="sm:hidden sm:flex items-center text-center gap-2 px-[16px] py-[6px] sm:py-[10px] rounded-[12px] text-[rgb(255,45,85)] w-auto h-[38px] lg:w-[92px] border border-[rgb(255,45,85)] "
            onClick={() => handleAddOnRent()}
          >
            <span className="text-lg">+</span>
          </button>


          {/* Profile & Sign In/Sign Up */}

          {name || token ? (
            <div
              onClick={() => router.push("/profile")}
              className="w-full md:w-[110px] flex items-center gap-2  px-2 py-1 cursor-pointer"
            >
              {profilePic ? <img src={profilePic} alt="user" className="w-8 h-8 rounded-full object-cover" /> :
                <img src={profile_avatar} alt="user" className="w-8 h-8 rounded-full object-cover" />}
              <div className="flex items-center space-x-2">
                <p className="hidden sm:flex text-sm truncate max-w-[80px] overflow-hidden whitespace-nowrap text-ellipsis py-1">
                  {name === undefined || name === "undefined" ? "User" : name}
                </p>
              </div>




            </div>
          ) : (
            <button
              className=" px-2 py-2  w-fit text-white text-[14px] font-[600] rounded-[10px] border border-[1px] bg-[rgba(255,45,85,1)] border border-[rgba(255,45,85,1)] shadow-[inset_0px_1px_0px_1px_var(--OverlaysWhiteAlpha10),inset_0px_6px_4px_-4px_var(--OverlaysWhiteAlpha8),inset_0px_-1px_0.5px_1px_var(--OverlaysBlackAlpha8)]"
              onClick={() => setIsLoginOpen(true)}
            >
              {/* Show 'Login' on mobile */}
              <span className="sm:hidden">Login</span>

              {/* Show 'Sign In / Sign Up' on larger screens */}
              <span className="hidden sm:block">Sign In / Sign Up</span>
            </button>
          )}
          {isLoginOpen && (
            <div className="modal-overlay" >
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={() => setIsLoginOpen(false)}>
                  ✕
                </button>
                <Login setIsLoginOpen={setIsLoginOpen} />
              </div>
            </div>
          )}

        </div>
      </header>
      <div className="sm:flex md:flex lg:hidden mt-[70px] sm:mt-[70px] md:mt[70px] top-0 left-0 w-full sm:pt-[60px  ] border border-b-1 w-full flex md:flex gap-3 px-2 py-4 md:px-16 sm:px-12" >
  

        <LocationSearch />

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


            <div className=" p-3 items-center  w-full relative cursor-pointer sm:block md:block lg:hidden border border-b-1">
          <SearchInput
            value={searchValue}
            onChange={(e) => handleSearchInputChange(e.target.value)}
            className="w-full"
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
        
    </>

  );
}

export default Header;
