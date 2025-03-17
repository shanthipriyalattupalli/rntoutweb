
import React from "react";
import ScrollToTop from "./ScrollToTop";
import axios from "axios";
import HomeComponent from "../Pages/Home";
import FirebaseComponent from "@/Pages/FirebaseComponent";
export default function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  console.log(BASE_URL,"baseurl")


  return (
    <div>
      <FirebaseComponent />
      <HomeComponent />
      <ScrollToTop />
    </div>
  );
}
