
import React from "react";
import ScrollToTop from "./ScrollToTop";
import axios from "axios";
import HomeComponent from "../Pages/Home";

export default function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;


  return (
    <div>
      <HomeComponent  />
      {/* <ScrollToTop /> */}
    </div>
  );
}
