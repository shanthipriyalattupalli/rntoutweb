import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

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
      console.log(response, "cart response from header");
      console.log(response?.data?.cartItems?.length ,"cart lenght from response")
      setCartItems(response?.data?.cartItems?.length || 0);
    } catch (error) {
      console.log(error);
      setCartItems(0);
    }
  };
  useEffect(() => {
  

    if (userId) {
      fetchCartDetails();
    }
  }, [userId]);

   useEffect(() => {
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
console.log(cartItems,"cart length")
  return (
    <div className="relative cursor-pointer">
      {cartItems > 0 ? (
        <Link href="/Cartpage">
          <Image src="/Assets/cartitems.svg" width={30} height={30} alt="cart" className="min-w-[34px] min-h-[34px]" />
          <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 text-xs font-semibold text-white flex items-center justify-center">
            {cartItems}
          </span>
        </Link>
      ) : (
        <Link href="/Cartpage">
          <button className="h-[37px] bg-white border border-blue-300 rounded-[10px] p-2 hover:bg-gray-100">
            <Image src="/Assets/Button.svg" width={20} height={20} alt="cart" className="min-w-[20px] min-h-[20px]" />
          </button>
        </Link>
      )}
    </div>
  );
};

export default CartIcon;
