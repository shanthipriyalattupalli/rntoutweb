"use client"

import Sidebar from "@/Components/sidebar";
import "@/styles/ProfileMenus.css";
import '../../styles/ProfileMenus.css';

export default function ProfileLayout({ children }) {
  return (
    <div className="w-full xl:w-full xl:px-20">
      <div className="app_wbgeubeqb">
        <Sidebar /> 
        <div className="content">{children}</div> 
      </div>
    </div>
  );
}
