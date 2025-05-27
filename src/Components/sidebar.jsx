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
import Swal from 'sweetalert2';

const KycStatus=Cookies.get("kycstatus");


const buttonsData = [
  { id: 1, title: "Profile", icon: <FaUser />, route: "/profile" },
  { id: 2, title: "Personal KYC", icon: <FaUserShield />, route: "/profile/kyc" },
  {
    id: 3,
    title: "Business KYC",
    icon: <FaBuilding  />,
    route: "/profile/business-information/kyc",
  },
  { id: 4, title: "Orders", icon: <FiShoppingBag />, route: "/profile/orders" },
  {
    id: 5,
    title: "Renter Information",
    icon:<AiTwotoneShop />,
    route: "/profile/Renter-information",
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

  { id: 12, title: "Log Out", icon: <MdOutlineLogout />, route: "/" },
];


const filteredButtons = buttonsData.filter((eachBar) => {
  if (KycStatus === "VERIFIED") {
    return true;
  } else {
    return ![4,6, 8, 9].includes(eachBar.id); 
  }
});


function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (eachbar) => {
    if (eachbar.title === "Log Out") {
      Swal.fire({
        title: "LOG OUT",
        text: `Are you sure to "Log out"`,
        showCancelButton: true,  
        confirmButtonText: "Yes", 
        cancelButtonText: "Cancel", 
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6", 
      }).then((result) => {
        if (result.isConfirmed) {
          
          // Remove everything from localStorage
          for (let i = localStorage.length - 1; i >= 0; i--) {
            const key = localStorage.key(i);
            localStorage.removeItem(key);
          }
  
          // Remove all cookies
          const cookies = document.cookie.split("; ");
          cookies.forEach((cookie) => {
            const cookieName = cookie.split("=")[0];
            Cookies.remove(cookieName);
          });
  
          // Replace current history entry to prevent going back to the previous page
          router.push("/")
          setTimeout(() => {
            window.location.reload();
          }, 500);
          
  
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          console.log("User clicked Cancel");
          // Handle cancel action if needed
        }
      });
  
    } else {
      router.push(eachbar.route);
    }
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
