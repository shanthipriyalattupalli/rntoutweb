"use client"
import { useEffect, useState } from "react";
import Script from "next/script";
import { MAP_API } from "@/services/GMap";

const GoogleMapsProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${MAP_API}&libraries=places`}
        onLoad={() => setIsLoaded(true)}
      />
      {isLoaded ? children : null}
    </>
  );
};

export default GoogleMapsProvider;
