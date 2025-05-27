
"use client"
import { useEffect } from "react";
import axios from "axios";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/Components/Layout/Header";
import Newsletter from "@/Components/Layout/Newsletter";
import Navigation from "@/Components/Layout/Navigation";
import HomeComponent from "../Pages/Home";
import { ToastContainer, toast } from "react-toastify";
import MobileApp from "@/Components/Home/MobileApp";
import GoogleMapsProvider from "../Components/Location/GoogleMapsProvider";
import ScrollToTop from '../Components/ScrollToTop';
import GlobalLoading from "@/Components/GlobalLoading ";




export default function RootLayout({ children }) {



  return (
    <html lang='en'>
      <body
        className={` antialiased`}
      >
        {/* <ScrollToTop/> */}
        <GlobalLoading />
        <GoogleMapsProvider>
          <Header />
          <Navigation />
          {children}
          <MobileApp />
          <Newsletter />
        </GoogleMapsProvider>
      </body>
    </html>
  );
}
