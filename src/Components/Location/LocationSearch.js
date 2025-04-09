"use client";
import { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { MAP_API } from "../../services/GMap";

const loadGoogleMapsScript = (callback) => {
  const googleAny = window.google;

  if (googleAny && googleAny.maps) {
    callback();
  } else {
    const existingScript = document.querySelector("#google-maps-script");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-maps-script";
      script.src = `https://maps.googleapis.com/maps/api/js?key=${MAP_API}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = callback;
      document.body.appendChild(script);
    } else {
      existingScript.onload = callback;
    }
  }
};

const LocationSearch = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [address, setAddress] = useState(null);
  const [locationsList, setLocationsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const autocompleteRef = useRef(null);
  const autocompleteInstance = useRef(null);
  const [radius, setRadius] = useState(() => Cookies.get("radius") || "10");

  const getLocationFromCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${MAP_API}`
      );
      const locationData = response.data.results;
      if (locationData.length > 0) {
        const uniqueLocations = new Set();
        let locations = [];
        locationData.forEach((result) => {
          const matchingComponent = result.address_components.find(
            (component) =>
              component.types.includes("locality") &&
              component.types.includes("political")
          );
          if (
            matchingComponent &&
            !uniqueLocations.has(matchingComponent.short_name)
          ) {
            uniqueLocations.add(matchingComponent.short_name);
            locations.push(matchingComponent);
          }
        });
        setLocationsList(locations);
        if (locations.length > 0) {
          setAddress({ suburb: locations[0].short_name });
        } else {
          setError("Suburb not found.");
        }
      } else {
        setError("Location data not found.");
      }
    } catch (error) {
      console.log(error);
      setError("Failed to fetch location data.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
          await getLocationFromCoordinates(latitude, longitude);
          Cookies.set("latitude", latitude, { expires: 7, sameSite: "Strict" });
          Cookies.set("longitude", longitude, {
            expires: 7,
            sameSite: "Strict",
          });
          setMessage({
            type: "success",
            text: "Your location has been captured successfully. You can also update it manually.",
          });
        },
        () =>
          setMessage({
            type: "error",
            text: "Unable to retrieve your location.",
          })
      );
    } else {
      setMessage({
        type: "error",
        text: "Geolocation is not supported by this browser.",
      });
    }
  };

  useEffect(() => {
    const googleAny = window.google;

    if (googleAny && googleAny.maps && autocompleteRef.current) {
      autocompleteInstance.current = new googleAny.maps.places.Autocomplete(
        autocompleteRef.current,
        { types: ["geocode"] }
      );

      autocompleteInstance.current.addListener("place_changed", () => {
        const place = autocompleteInstance.current.getPlace();
        if (!place.geometry) {
          setMessage({
            type: "error",
            text: "Invalid location. Please select from the suggestions.",
          });
          return;
        }
        const { lat, lng } = place.geometry.location;
        setSelectedLocation({
          name: place.formatted_address,
          latitude: lat(),
          longitude: lng(),
        });

        autocompleteRef.current.value = place.formatted_address;

        Cookies.set("latitude", lat(), { expires: 7, sameSite: "Strict" });
        Cookies.set("longitude", lng(), { expires: 7, sameSite: "Strict" });

        setMessage({
          type: "success",
          text: "Your location has been updated successfully.",
        });

        import("sweetalert2").then((Swal) => {
          Swal.default.fire({
            icon: "success",
            title: "Location Updated",
            text: "Your location has been set automatically.",
            timer: 2000,
            showConfirmButton: false,
          });
          window.location.reload();
        });
    
      });
    } else {
      setError("Google Maps API failed to load.");
    }
  }, []);

  useEffect(() => {
    const lat = Cookies.get("latitude");
    const lon = Cookies.get("longitude");

    if (!lat || !lon) {
      fetchUserLocation();
    } else {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);
      setUserLocation({ latitude, longitude });
      getLocationFromCoordinates(latitude, longitude);
      setMessage({
        type: "success",
        text: "Your saved location has been loaded successfully.",
      });
      setLoading(false);
    }
  }, []);

  return (
    <div className="location-container">
      <div style={{ display: "flex", gap: "14px", width: "100%" }}>
      <div className="flex items-center bg-white border border-gray-300 rounded-[12px] px-3 py-2 hover:bg-gray-100 gap-2 ">
  <Image
    src="/Assets/location_fill.svg"
    alt="Location"
    width={20}
    height={20}
    style={{ cursor: "pointer" }}
    onClick={() => {
      setSelectedLocation(null);
      if (autocompleteRef.current) {
        setTimeout(() => {
          autocompleteRef.current.value = "";
        }, 0);
      }
      fetchUserLocation();
    }}
  />
  <input
    ref={autocompleteRef}
    type="text"
    className="text-sm font-medium text-blacky placeholder-blackca"
    placeholder={address?.suburb || "Search location..."}
    style={{ all: "unset", width: "100%" }}
    onFocus={(e) => (e.target.placeholder = "")}
    onBlur={(e) => {
      if (!e.target.value) {
        e.target.placeholder = address?.suburb || "Search location...";
      }
    }}
  />
</div>





      </div>
      {/* Optional message UI */}
      {/* {message.text && (
        <p
          style={{
            color: message.type === "success" ? "#777" : "red",
            fontSize: "12px",
          }}
        >
          <IoIosInformationCircleOutline
            style={{ marginRight: "4px", marginTop: "-4px" }}
          />
          {message.text}
        </p>
      )} */}
    </div>
  );
};

export default LocationSearch;
