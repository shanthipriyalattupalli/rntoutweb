// "use client";
// import { useEffect, useState } from "react";
// import Cookies from "js-cookie";
// import Sidebar from "@/Components/sidebar";
// import "@/styles/ProfileMenus.css";
// import "../../styles/ProfileMenus.css";
// import AccessDenied from "@/Components/Auth/AccessDenied"; 
// import { useRouter } from "next/navigation";

// export default function ProfileLayout({ children }) {
//   const [isAuthorized, setIsAuthorized] = useState(null);

//   useEffect(() => {
//     const token = Cookies.get("userToken");
//     setIsAuthorized(!!token);
//   }, []);

//   if (isAuthorized === null) return null; 

//   if (!isAuthorized) return <AccessDenied />;

//   return (
//     <div className="w-full xl:w-full xl:px-20 sm:px-14 md:px-20 lg:px-20 2xl:px-20 pt-10 py-20">
//       <div className="app_wbgeubeqb">
//         <Sidebar />
//         <div className="content">{children}</div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Sidebar from "@/Components/sidebar";
import "@/styles/ProfileMenus.css";
import "../../styles/ProfileMenus.css";

export default function ProfileLayout({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("userToken");
    if (!token) {
      router.push("/");
      return;
    }
    setIsAuthorized(true);
  }, [router]);
  if (isAuthorized === null) return null;
  return (
    <div className="w-full xl:w-full xl:px-20 sm:px-14 md:px-20 lg:px-20 2xl:px-20 pt-10 py-20">
      <div className="app_wbgeubeqb">
        <Sidebar />
        <div className="content">{children}</div>
      </div>
    </div>
  );
}