"use client"

import Sidebar from "@/Components/sidebar";
import "@/styles/ProfileMenus.css";
import '../../styles/ProfileMenus.css';
import ScrollToTop from "../ScrollToTop";

export default function ProfileLayout({ children }) {
  return (
    <>
    <ScrollToTop/>
    <div className="w-full xl:w-full xl:px-20 sm:px-14 md:px-20 lg:px-20 2xl:px-20 px-8 py-20">
      <div className="app_wbgeubeqb">
        <Sidebar /> 
        <div className="content">{children}</div> 
      </div>
    </div>
    </>
  );
}
