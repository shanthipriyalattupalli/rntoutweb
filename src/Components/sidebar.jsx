"use client";

// import "@/styles/Sidemenubar.css";
import '../styles/Sidemenubar.css';
import { useRouter, usePathname } from "next/navigation";
import { PiCirclesFourFill } from "react-icons/pi";
import { FaDigitalTachograph, FaUser } from "react-icons/fa";
import { BiWallet, BiCreditCardAlt, BiMoney } from "react-icons/bi";
import { FiShoppingBag } from "react-icons/fi";
import { AiTwotoneShop } from "react-icons/ai";
import { TiBusinessCard } from "react-icons/ti";
import { FaUserShield } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";
import Cookies from 'js-cookie';
import { GrCubes, GrSettingsOption, GrNotes, GrBusinessService } from "react-icons/gr";
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
import { FileDigitIcon } from 'lucide-react';



const buttonsData = [
  { id: 1, title: "Profile", icon: <FaUser />, route: "/profile" },
  { id: 2, title: "Profile Kyc", icon: <FaUserShield />, route: "/profile/kyc" },
  {
    id: 3,
    title: "Business Kyc",
    icon: <FaBuilding  />,
    route: "/profile/business-information/kyc",
  },
  { id: 4, title: "Orders", icon: <FiShoppingBag />, route: "/profile/orders" },
  {
    id: 5,
    title: "Renter Information",
    icon:<AiTwotoneShop />,
    route: "/profile/business-information/add-business",
  },
  { id: 6, title: "Products", icon: <GrCubes />, route: "/profile/products" },
  {
    id: 7,
    title: "Favorites",
    icon: <MdOutlineBookmarks />,
    route: "/profile/favorites",
  },
  {
    id: 8,
    title: "Digital Wallet",
    icon: <BiWallet/>,
    route: "/profile/digitalwallet",
  },
  {
    id: 9,
    title: "Notifications",
    icon: <MdOutlineNotificationsActive />,
    route: "/profile/notifications",
  },
  {
    id: 10,
    title: "Manage Addresses",
    icon: <HiOutlineLocationMarker />,
    route: "/profile/manage-address",
  },
  {
    id: 11,
    title: "Help & Support",
    icon: <IoIosHelpCircleOutline />,
    route: "/profile/support",
  },
  {
    id: 12,
    title: "About us",
    icon: <IoMdInformationCircleOutline />,
    route: "/aboutus",
  },
  {
    id: 13,
    title: "Terms and conditions",
    icon: <GrNotes />,
    route: "/profile/terms-and-conditions",
  },
  {
    id: 14,
    title: "Privacy Policy",
    icon: <BsShieldCheck />,
    route: "/profile/privacy-policy",
  },
  { id: 15, title: "Log Out", icon: <MdOutlineLogout />, route: "/" },
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

      Cookies.remove("userEmail");
      Cookies.remove("userId");
      Cookies.remove("userName");
      Cookies.remove("userToken");
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
