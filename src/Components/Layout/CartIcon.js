import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BsCart3 } from "react-icons/bs";
const cartIcon = "/Assets/cartred.svg"; // Adjust the path as necessary

const CartIcon = ({ userId }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [cartItems, setCartItems] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  const fetchCartDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/${userId}`);
      // console.log(response, "cart response from header");
      // console.log(response?.data?.cartItems?.length ,"cart lenght from response")
      setCartItems(response?.data?.cartItems?.length || 0);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        Swal.fire({
          icon: "error",
          title: "Login Required",
          text: "Please login to proceed with payment.",
        });
      }
      setCartItems(0);
    }
  };
  useEffect(() => {
  

    if (userId) {
      fetchCartDetails();
    }
  }, [userId]);

   useEffect(() => {
    if (typeof window === 'undefined') return; 
      fetchCartDetails(); // Initial fetch when component mounts
  
      const handleCartUpdate = () => {
        fetchCartDetails(); // Fetch cart details when event is received
      };
  
      window.addEventListener("cartUpdated", handleCartUpdate);
  
      return () => {
        window.removeEventListener("cartUpdated", handleCartUpdate);
      };
    }, [userId]);
  if (!hasMounted) return null;
// console.log(cartItems,"cart length")
  return (
    <div className="relative cursor-pointer">
      {cartItems > 0 ? (
        <Link href="/Cartpage">
          <div className='flex '>
            {/* <Image src={cartIcon} alt="Cart Icon" width={34} height={34} className="min-w-[34px] min-h-[34px]" /> */}
          <BsCart3  className="min-w-[34px] min-h-[34px]" />
           <span className='text-center align-center mt-3 text-[12px] font-[600]'>Cart</span>
          </div>
          <span className="absolute -top-2 right-7 bg-red-500 rounded-full w-5 h-5 text-xs font-semibold text-white flex items-center justify-center">
            {cartItems}
          </span>
        </Link>
      ) : (
        <Link href="/Cartpage">
          <div className="flex">
            <BsCart3 className="min-w-[34px] min-h-[34px]" />
            <span className='text-center align-center mt-3 text-[12px] font-[600]'>Cart</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default CartIcon;
