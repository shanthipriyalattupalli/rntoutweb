// components/GoogleMapsProvider.js
"use client";
import { LoadScript } from "@react-google-maps/api";
import { MAP_API } from "@/services/GMap";

const libraries = ["places"];

const GoogleMapsProvider = ({ children }) => {
  return (
    <LoadScript googleMapsApiKey={MAP_API} libraries={libraries}>
      {children}
    </LoadScript>
  );
};

export default GoogleMapsProvider;
