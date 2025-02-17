"use client";

// import "@/styles/Sidemenubar.css";
import '../styles/Sidemenubar.css';
import { useRouter, usePathname } from "next/navigation";
import { PiCirclesFourFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { FiShoppingBag } from "react-icons/fi";
import { GrCubes, GrSettingsOption, GrNotes } from "react-icons/gr";
import {
  MdOutlineBookmarks,
  MdOutlineNotificationsActive,
  MdOutlineLogout,
} from "react-icons/md";
import { HiOutlineLocationMarker } from "react-icons/hi";
import {
  IoIosHelpCircleOutline,
  IoMdInformationCircleOutline,
} from "react-icons/io";
import { BsShieldCheck } from "react-icons/bs";

const buttonsData = [
  { id: 1, title: "Profile", icon: <FaUser />, route: "/profile" },
  { id: 2, title: "Orders", icon: <FiShoppingBag />, route: "/profile/orders" },
  {
    id: 3,
    title: "Business Information",
    icon: <FiShoppingBag />,
    route: "/profile/business-information/add-business",
  },
  { id: 4, title: "Products", icon: <GrCubes />, route: "/profile/products" },
  {
    id: 5,
    title: "Favorites",
    icon: <MdOutlineBookmarks />,
    route: "/profile/favorites",
  },
  {
    id: 6,
    title: "Notifications",
    icon: <MdOutlineNotificationsActive />,
    route: "/profile/notifications",
  },
  {
    id: 7,
    title: "Manage Addresses",
    icon: <HiOutlineLocationMarker />,
    route: "/profile/manage-address",
  },
  {
    id: 8,
    title: "Help & Support",
    icon: <IoIosHelpCircleOutline />,
    route: "/profile/support",
  },
  {
    id: 9,
    title: "About us",
    icon: <IoMdInformationCircleOutline />,
    route: "/profile/aboutus",
  },
  {
    id: 10,
    title: "Terms and conditions",
    icon: <GrNotes />,
    route: "/profile/terms-and-conditions",
  },
  {
    id: 11,
    title: "Privacy Policy",
    icon: <BsShieldCheck />,
    route: "/profile/privacy-policy",
  },
  { id: 12, title: "Log Out", icon: <MdOutlineLogout />, route: "/" },
];

function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (eachbar) => {
    if (eachbar.title == "Log Out") {
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userId");
      localStorage.removeItem("userName");
      localStorage.removeItem("userToken");
    }
    router.push("/");
    router.push(eachbar.route);
   
    // window.location.reload();
  };
  return (
    <div className='sidemenubar'>
      <div className='menu-item1'>
        <div className='profile_heading_header'>
          <span>{<PiCirclesFourFill />}</span>
          <p className='title'>MENUS</p>
        </div>
        {buttonsData?.map((eachBar) => (
          <button
            key={eachBar.id}
            className={`bar ${pathname === eachBar.route ? "active" : ""}`} // Add "active" class if the route matches
            onClick={() => handleNavigation(eachBar)} // Use handleNavigation function
          >
            <span>{eachBar.icon}</span>
            <p className='sidebar_title_text1'>{eachBar.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
