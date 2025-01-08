"use client";
import React, { useState, useEffect } from "react";
import "@/styles/Cart.css";
import axios from "axios";
import Sidebar from "./Sidebar/page";
import AddressSidebar from "./AddressSidebar/page";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import RenderRazorpay from "../PayModule/PayModule";
import "react-toastify/dist/ReactToastify.css";

const cube = "/Assets/cube_fill.png";
const deleteicon = "/Assets/deleteicon.svg";
const stock = "/Assets/stock.svg";
const location = "/Assets/location.svg";
const payment = "/Assets/payment.svg";
const coupon = "/Assets/coupon.svg";
const insurance = "/Assets/insurance.svg";
const costbreakup = "/Assets/costbreakup.svg";
const delivery = "/Assets/delivery.svg";

const CartPage = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [cartItems, setCartItems] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddressSidebarOpen, setIsAddressSidebarOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isCoupon,setIsCoupon]=useState(false)
  const [quantities, setQuantities] = useState({});
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  // const [userId, setUserId] = useState("");
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");
  //   const token = localStorage.getItem("userToken");
  //   setUserId(userId);
  //   setToken(token);
  // }, []);
  const userId=(typeof window !== 'undefined') ? localStorage.getItem("userId") : null;

  const token=(typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;

console.log(token,"outside")


  const handleSelectChange = async (variantId, selectedPeriod) => {
    const selectedRental = cartItems
      .find((item) => item.variant_id._id === variantId)
      ?.variant_id?.rentalPrice.find(
        (rental) => rental.period === selectedPeriod
      );
  
    if (!selectedRental) {
      toast.error("Selected rental period is invalid");
      return;
    }
  
    try {
      // Update the selectedOptions state
      setSelectedOptions((prevOptions) => {
        const updatedOptions = {
          ...prevOptions,
          [variantId]: { ...prevOptions[variantId], period: selectedPeriod },
        };
  
        // Save to localStorage for persistence
        localStorage.setItem("selectedOptions", JSON.stringify(updatedOptions));
  
        return updatedOptions;
      });
  
      // Send the selected period and quantity to `handleAddToCart`
      await handleAddToCart(
        variantId,
        quantities[variantId],
        selectedRental.period
      );
  
      fetchCartDetails();
    } catch (error) {
      console.error("Error updating rental period:", error);
      toast.error("Failed to update rental period.");
    }
  };
  useEffect(() => {
    if (cartItems?.length) {
      const updatedOptions = { ...selectedOptions };
      cartItems.forEach((item) => {
        if (!updatedOptions[item.variant_id._id]) {
          updatedOptions[item.variant_id._id] = { 
            period: item?.variant_id?.rentalPrice?.[0]?.period 
          };
        }
      });
      setSelectedOptions(updatedOptions);
    }
  }, [cartItems]);
  const storedOptions=(typeof window !== 'undefined') ? localStorage.getItem("selectedOptions") : null;

  // Retrieve persisted selected options on component load
  useEffect(() => {
    // const storedOptions = localStorage.getItem("selectedOptions");
    if (storedOptions) {
      setSelectedOptions(JSON.parse(storedOptions));
    }
  }, []);
  

  console.log(quantities, "quantituessd");
  // useEffect(() => {
  //     const initialOptions = {};
  //     cartItems.forEach((item) => {
  //         if (item.variant_id?.rentalPrice?.length > 0) {
  //             initialOptions[item.variant_id._id] = {
  //                 period: item.variant_id.rentalPrice[0].period,
  //                 price:item.variant_id.rentalPrice[0].price // Default to the first period
  //             };
  //         }
  //     });
  //     setSelectedOptions(initialOptions);
  // }, [cartItems]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

const handleCouponToggle=()=>{
  setIsCoupon(!isCoupon)
}

  const handleAddressToggle = () => {
    setIsAddressSidebarOpen(!isAddressSidebarOpen);
  };

  const increaseQuantity = async (variantId) => {
    const newQuantity =  + 1;
  
    // Get the selected rental period for this variant
    const selectedRentalPeriod = selectedOptions[variantId]?.period;
    console.log(selectedRentalPeriod,"selectedRentalPeriod")
    console.log(selectedOptions,"selectedOptions")
  
    if (!selectedRentalPeriod) {
      toast.error("Please select a rental period before updating the quantity.");
      return;
    }
  
    try {
      await handleAddToCart(variantId, newQuantity, selectedRentalPeriod);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [variantId]: newQuantity,
      }));
      toast.success("Quantity updated successfully.");
      fetchCartDetails();
    } catch (error) {
      console.error("Error increasing quantity:", error);
      toast.error(error.response.data.message);
    }
  };
  
  const decreaseQuantity = async (variantId) => {
    const newQuantity =  - 1;
  
    // if (newQuantity < 1) {
    //   toast.error("Quantity cannot be less than 1.");
    //   return;
    // }
  
    // Get the selected rental period for this variant
    const selectedRentalPeriod = selectedOptions[variantId]?.period;
  
    if (!selectedRentalPeriod) {
      toast.error("Please select a rental period before updating the quantity.");
      return;
    }
  
    try {
      await handleAddToCart(variantId, newQuantity, selectedRentalPeriod);
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [variantId]: newQuantity,
      }));
      toast.success("Quantity updated successfully.");
      fetchCartDetails();
    } catch (error) {
      console.error("Error decreasing quantity:", error);
   
    }
  };
  
  console.log(selectedOptions, "selectedperiod");
  const handleAddToCart = async (variantId, quantity, rentalPeriod) => {
    try {
      const payload = {
        user_id: userId,
        variant_id: variantId,
        quantity,
        rentalPeriod,
      };
      console.log(payload, "payload in cart");
      const response = await axios.post(`${BASE_URL}/cart/add`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(
        response.data.message || "Rental period updated successfully."
      );
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error(error.response.data.error);
      // toast.error(
      //   error.response?.data?.message ||
      //     "Something went wrong. Please try again."
      // );
      throw error;
    }
  };

  const fetchCartDetails = async () => {
    console.log("out fetching cart");
    try {
      const response = await axios.get(`${BASE_URL}/cart/${userId}`);
      setCartItems(response.data.cartItems, "cartItems");
      console.log(response.data.cartItems, "cartItems");

      const initialQuantities = response.data.cartItems.reduce((acc, item) => {
        acc[item.variant_id._id] = item.quantity || 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, [userId]);

  const handleRemove = async (cartId, variantId) => {
    console.log(cartId, "removeid");
    try {
      console.log(cartId, "variantId remove");
      const response = await axios.delete(`${BASE_URL}/cart/remove/${cartId}`);
      console.log(response.data, "deleted");
      setSelectedOptions((prevOptions) => {
        const updatedOptions = { ...prevOptions };
        delete updatedOptions[variantId]; 
        localStorage.setItem("selectedOptions", JSON.stringify(updatedOptions)); 
        return updatedOptions;
      });
  
      fetchCartDetails();
      toast.success(response.data.message || "Removed successfully");
    } catch (error) {
      toast.error(error.message || "Error removing item from cart.");
      console.error("Error removing item from cart:", error);
    }
  };
  

  const createPayment = () => {
    if (!userId) {
      toast.error("Please login to proceed with payment.");
      return;
    }
    setDisplayRazorpay(true);
  };

  const handlePayment = (status, orderDetails) => {
    console.log(orderDetails,"orderdetails")
    if (status === "succeeded") {
      setDisplayRazorpay(false);
    } else if (status === "cancelled") {
      setDisplayRazorpay(false);
    }
  };

  const apiKey = "rzp_test_4rrCmYtqWUOUvT";

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.lineTotal || 0),
    0
  );

  console.log(selectedAddress,"selectedaddress")

  return (
    <div className='cart-page'>
      <ToastContainer />
      <div className='cart-items-section'>
        <h2 className='cart-title'>
          My Cart <span className='cart-count'>{cartItems.length}</span>
        </h2>
        {cartItems?.map((item, index) => (
  <div key={item._id || index} className="cart-item cursor-pointer">
    <Link
      href={{
        pathname: `/Products/${item.variant_id.title}`,
        query: { id: item.variant_id._id },
      }}
    >
      <img
        src={item.variant_id.images[0]}
        alt="Product"
        className="item-image"
      />
    </Link>
    <div className="item-details">
      <h3 className="item-name">{item.variant_id.title}</h3>
      <p className="item-price">
        ₹{item.unitPrice}/{item.rentalPeriod}
      </p>
      <div className="quantity-controls">
        <button
          className="quantity-btn"
          onClick={() =>
            decreaseQuantity(item.variant_id._id, item.quantity)
          }
        >
          -
        </button>
        <span className="quantity">{item.quantity || 1}</span>
        <button
          className="quantity-btn"
          onClick={() =>
            increaseQuantity(item.variant_id._id, item.quantity)
          }
        >
          +
        </button>
        <select
          className="duration-select"
          value={
            selectedOptions[item.variant_id._id]?.period ||
            item?.variant_id?.rentalPrice?.[0]?.period
          }
          onChange={(e) => {
            handleSelectChange(item.variant_id._id, e.target.value);
          }}
        >
          {item?.variant_id?.rentalPrice?.map((rentalPrice) => (
            <option key={rentalPrice._id} value={rentalPrice.period}>
              {rentalPrice.period}
            </option>
          ))}
        </select>
        <p>Total: {item.lineTotal}</p>
      </div>
      <div className="product-right">
        <button className="delete-btn" onClick={() => handleRemove(item._id,item.variant_id._id)}>
          <img
            src={deleteicon}
            className="flex justify-center ml-20"
          />
        </button>
        <div className="flex gap-2">
          <img src={cube} />
          <p className="stock-info">
            {item.variant_id.stockQuantity} stock avail.
          </p>
        </div>
      </div>
    </div>
  </div>
))}

      </div>

      <div className='summary-section'>
        <div className='summary-item address' onClick={handleAddressToggle}>
          <div className='address-content'>
            <img src={location} />
            <span>Select Address</span>
            <i className='fas fa-chevron-right'></i>
          </div>
          {selectedAddress && (
            <>
              <div className='address-context'>
                <h4>{selectedAddress.name}</h4>
                <p>|</p>
                <p>{selectedAddress.mobile}</p> 
                <span>{selectedAddress.type}</span>
              </div>
              <p>{selectedAddress.flatOrHouseNo},{selectedAddress.street},{selectedAddress.city},{selectedAddress.state},{selectedAddress.country},({selectedAddress.zip})</p>

            </>
          )}
        </div>
        <AddressSidebar
          isOpen={isAddressSidebarOpen}
          onClose={handleAddressToggle}
          onAddressSelect={setSelectedAddress}
        />

        <div className='summary-address'>
          <div className='summary-item address'>
            <div className='address-content'>
              <img src={payment} />
              <span>Payable Amount</span>
            </div>
            <div>
              {" "}
              <span className='amount'>₹{totalPrice}</span>
            </div>
            <button className='pay-btn' onClick={createPayment}>
              Pay ₹{totalPrice}
            </button>
            {displayRazorpay && (
              <RenderRazorpay
                amount={totalPrice * 100}
                currency={"INR"}
                keyId={apiKey}
                handlePayment={handlePayment}
                name={(typeof window !== 'undefined') ? localStorage.getItem("userName") : null}
              />
            )}
          </div>
        </div>
        <div className='summary-item address'  onClick={handleCouponToggle}>
          <div className='address-content'>
            <img src={coupon} />
            <span>Promo Coupon</span>
            <i className='fas fa-chevron-right'></i>
          </div>
        </div>
        <div>
          <div className='summary-item address' onClick={handleSidebarToggle}>
            <div className='address-content'>
              <img src={insurance} alt='Insurance' />
              <span>RntOut Insurance</span>
              <i className='fas fa-chevron-right'></i>
            </div>
          </div>
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={handleSidebarToggle}
            products={cartItems}
          />
        </div>
        <div className='summary-item address'>
          <div className='address-content'>
            <img src={costbreakup} />
            <span>Rent Cost Breakup</span>
            <i className='fas fa-chevron-right'></i>
          </div>
        </div>
        <div className='summary-item'>
          <img src={delivery} /> <span>Delivery Estimate</span>
          <span>27 Sep - 29 Sep to 500008</span>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
