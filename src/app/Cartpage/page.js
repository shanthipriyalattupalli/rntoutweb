"use client";
import React, { useState, useEffect } from "react";
// import "@/styles/Cart.css";
import '../../styles/Cart.css';
import { FaReceipt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import axios from "axios";
import Sidebar from "./Sidebar/page";
import AddressSidebar from "./AddressSidebar/page";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import RenderRazorpay from "../PayModule/PayModule";
import "react-toastify/dist/ReactToastify.css";
import PromoCoupon from "./PromoCoupon/page";
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
  const [isCoupon, setIsCoupon] = useState(false)
  const [quantities, setQuantities] = useState({});
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [selectedOptions, setSelectedOptions] = useState({});
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [couponcode, setCouponCode] = useState(null);
  const [addressId, setAddressId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [disValue, setDisValue] = useState(0)
  const [razorpayOrderId, setRazorpayOrderId] = useState()

  // const [userId, setUserId] = useState("");
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   const userId = localStorage.getItem("userId");
  //   const token = localStorage.getItem("userToken");
  //   setUserId(userId);
  //   setToken(token);
  // }, []);
  const userId = (typeof window !== 'undefined') ? localStorage.getItem("userId") : null;

  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;



  const handleCheckboxChange = async (cartId, isChecked) => {
    // Update the selectedCartItems state based on whether the item is checked or unchecked
    const updatedSelection = isChecked
      ? [...selectedCartItems, cartId]
      : selectedCartItems.filter((id) => id !== cartId);

    setSelectedCartItems(updatedSelection);

    // Determine if the item was selected or unselected
    const selectedStatus = isChecked; // If checked, send true; if unchecked, send false

    try {
      // Make the API call with the appropriate `selected` status
      const response = await axios.patch(
        `${BASE_URL}/cart/selection/${cartId}`,
        {
          selected: selectedStatus, // Send the correct selected value
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the request headers
          },
        }
      );

      fetchCartDetails();
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating cart item selection:", error);
      toast.error("Error updating cart item selection.");
    }
  };




  const handleSelectChange = async (variantId, selectedPeriod) => {
    const selectedRental = cartItems
      .find((item) => item.variant_id._id === variantId)
      ?.variant_id?.rentalPrice.find((rental) => rental.period === selectedPeriod);

    if (!selectedRental) {
      toast.error("Selected rental period is invalid");
      return;
    }

    try {
      setSelectedOptions((prevOptions) => {
        const updatedOptions = {
          ...prevOptions,
          [variantId]: { period: selectedPeriod },
        };

        localStorage.setItem("selectedOptions", JSON.stringify(updatedOptions));
        return updatedOptions;
      });

      await handleAddToCart(variantId, quantities[variantId], selectedRental.period);
      fetchCartDetails();
    } catch (error) {
      console.error("Error updating rental period:", error);
      toast.error("Failed to update rental period.");
    }
  };


  useEffect(() => {
    if (cartItems.length > 0) {
      const initialSelectedOptions = cartItems.reduce((acc, item) => {
        acc[item.variant_id._id] = { period: item.rentalPeriod };
        return acc;
      }, {});
      setSelectedOptions(initialSelectedOptions);
    }
  }, [cartItems]);

  // useEffect(() => {
  //   if (cartItems?.length) {
  //     const updatedOptions = { ...selectedOptions };
  //     // cartItems.forEach((item) => {
  //     //   if (!updatedOptions[item.variant_id._id]) {
  //     //     updatedOptions[item.variant_id._id] = { 
  //     //       period: item?.variant_id?.rentalPrice?.[0]?.period 
  //     //     };
  //     //   }
  //     // });
  //     setSelectedOptions(updatedOptions);
  //   }
  // }, [cartItems]);
  const storedOptions = (typeof window !== 'undefined') ? localStorage.getItem("selectedOptions") : null;

  // Retrieve persisted selected options on component load
  // useEffect(() => {
  //   // const storedOptions = localStorage.getItem("selectedOptions");
  //   if (storedOptions) {
  //     setSelectedOptions(JSON.parse(storedOptions));
  //   }
  // }, []);


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

  const handleCouponToggle = () => {
    setIsCoupon(!isCoupon)
  }

  const handleAddressToggle = () => {
    setIsAddressSidebarOpen(!isAddressSidebarOpen);
  };

  const increaseQuantity = async (variantId) => {
    const newQuantity = + 1;

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
      console.error("Error increasing quantity:", error);
      toast.error(error.response.data.message);
    }
  };

  const decreaseQuantity = async (variantId) => {
    const newQuantity = - 1;

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

  const handleAddToCart = async (variantId, quantity, rentalPeriod) => {
    try {
      const payload = {
        user_id: userId,
        variant_id: variantId,
        quantity,
        rentalPeriod,
      };
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
    try {
      const response = await axios.get(`${BASE_URL}/cart/${userId}`);
      setCartItems(response.data.cartItems, "cartItems");
      const initialQuantities = response.data.cartItems.reduce((acc, item) => {
        acc[item.variant_id._id] = item.quantity || 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
      localStorage.setItem("cart", response.data.cartItems.length);
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cart.length }));
    } catch (error) {
      console.error("Error fetching cart details:", error);
    }
  };

  useEffect(() => {
    fetchCartDetails();
  }, [userId]);

  const handleRemove = async (cartId, variantId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/cart/remove/${cartId}`);
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



  const handlePaymentStatus = async (orderDetails) => {
    try {
      const payload = {
        orderId: orderId,
        paymentId: orderDetails.paymentId
      }
      const response = await axios.post(`${BASE_URL}/payments/status`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      toast.error(error.message || "Error status payment.");
      console.error("Error status payment:", error);

    }
  }



  const handleOrderCheckout = async () => {
    try {
      const payload = {
        userId: String(userId),
        couponCode: String(couponcode),
        addressId: String(selectedAddress._id),
      };

      // API call for order checkout
      const response = await axios.post(`${BASE_URL}/orders/checkout`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { orderId, finalAmount } = response.data;

      // If orderId is present, proceed to initiate payment
      if (orderId) {
        setOrderId(orderId); // Save orderId for future use
        await handleContinueClick(orderId, finalAmount);
      }

      // Display success toast for order placement
      toast.success("Order placed successfully!");
    } catch (error) {
      // Extract and display error message safely
      const errorMessage = error.response?.data?.error || "Something went wrong. Please try again!";
      toast.warn(errorMessage);
      console.error("Error during order checkout:", errorMessage);
    }
  };

  const handleContinueClick = async (orderId, amount) => {
    console.log(orderId,"order id in checkout")
    try {
      const payload = {
        orderId: orderId,
        amount: amount,
      };

      // API call to initiate payment
      const response = await axios.post(`${BASE_URL}/payments/initiate`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Axios response data is already parsed
      if (response.data.order && response.data.order.id) {
        console.log(response.data.order.id,"order in paymentinitate")
        setDisplayRazorpay(true);
        setRazorpayOrderId(response.data.order.id);
      } else {
        console.error('Payment initiation failed:', response.data.error);
      }

    } catch (error) {
      // Extract and display error message safely
      const errorMessage = error.response?.data?.error || "Error initiating payment.";
      toast.error(errorMessage);
      console.error("Error initiating payment:", errorMessage);
    }
  };



  const createPayment = async () => {
    if (!userId) {
      toast.error("Please login to proceed with payment.");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select an address before proceeding with checkout.");
      return;
    }

    await handleOrderCheckout();
  };

  const handlePayment = async (status, orderDetails) => {
    if (status === "succeeded") {
      setDisplayRazorpay(false);
      // await handleContinueClick(orderDetails);
      setFormData(initialFormData);
    } else if (status === "cancelled") {
      setDisplayRazorpay(false);
    }
  };



  const handleDiscountedPrice = (newDiscountedPrice, couponcode, discountValue) => {
    setDiscountedPrice(newDiscountedPrice);
    setCouponCode(couponcode);
    setDisValue(discountValue);
  };

  const handleAddress = (addressId) => {
    setAddressId(addressId);
  }

  // const apiKey = "rzp_test_4rrCmYtqWUOUvT";
  const apiKey = "rzp_test_a4GiGqcTxFZlKT";


  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.lineTotal || 0),
    0
  );


  return (
    <div className='cart-page'>
      <ToastContainer />
      <div className='cart-items-section'>
        <h2 className='cart-title'>
          My Cart <span className='cart-count'>{cartItems.length}</span>
        </h2>
        {cartItems?.map((item, index) => (
          <div key={item._id || index} className="cart-item cursor-pointer flex items-center">
            {/* Red Checkbox with White Tick */}
            <input
              type="checkbox"
              className="mr-3 w-5 h-5 accent-red-500 checked:bg-red-500 checked:border-red-500"
              checked={item.selected} // Set checked based on item.selected value
              onChange={(e) => handleCheckboxChange(item._id, e.target.checked)} // Pass `checked` state
            />

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
                  onClick={() => decreaseQuantity(item.variant_id._id, item.quantity)}
                >
                  -
                </button>
                <span className="quantity">{item.quantity || 1}</span>
                <button
                  className="quantity-btn"
                  onClick={() => increaseQuantity(item.variant_id._id, item.quantity)}
                >
                  +
                </button>

                <select
                  className="duration-select"
                  value={selectedOptions[item.variant_id._id]?.period || item.rentalPeriod}
                  onChange={(e) => handleSelectChange(item.variant_id._id, e.target.value)}
                >
                  <option key={item._id} value={item.rentalPeriod}>
                    {item.rentalPeriod}
                  </option>
                  {item?.variant_id?.rentalPrice?.map((rentalPrice) => (
                    <option key={rentalPrice._id} value={rentalPrice.period}>
                      {rentalPrice.period}
                    </option>
                  ))}
                </select>

                {/* <p>Total: {item.lineTotal}</p> */}
              </div>

              <div className="product-right">
                <button className="delete-btn" onClick={() => handleRemove(item._id, item.variant_id._id)}>
                  <img src={deleteicon} className="flex align-left" />
                </button>
                <div className="flex gap-2">
                  <img src={cube} />
                  {/* <p className="stock-info">{item.variant_id.stockQuantity} stock avail.</p> */}
                  <p className="stock-info">In stock</p>

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
          addressId={handleAddress}
        />

        <div className='summary-address'>
          <div className='summary-item address'>
            <div className="flex gap-60">
              <div className='address-content'>
                <img src={payment} />
                <span>Payable Amount</span>
              </div>
              <div>
                {" "}
                <span className='amount'>₹{totalPrice}</span>
              </div>
            </div>
            <button className='pay-btn' onClick={createPayment}>
              Pay ₹{discountedPrice ? discountedPrice : totalPrice}
            </button>
            {displayRazorpay && (
              <RenderRazorpay
                orderId={orderId}
                razorpayOrderId={razorpayOrderId}
                amount={discountedPrice ? discountedPrice * 100 : totalPrice * 100}
                currency={"INR"}
                keyId={apiKey}
                handlePayment={handlePayment}
                name={(typeof window !== 'undefined') ? localStorage.getItem("userName") : null}
              />
            )}
          </div>
        </div>
        <div className="summary-item address" onClick={handleCouponToggle}>
          <div className="address-content">
            <img src={coupon} alt="Coupon Icon" />
            <span>{couponcode ? couponcode : "Promo Coupon"}</span>
            <i className="fas fa-chevron-right"></i>
          </div>
        </div>

        {isCoupon && (
          <PromoCoupon
            isOpen={isCoupon}
            onClose={handleCouponToggle} // Properly pass the toggle function
            totalPrice={totalPrice}
            onDiscountedPrice={handleDiscountedPrice}
          />
        )}
        {/* <div>
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
        </div> */}
        <div className="mx-auto bg-white shadow-lg rounded-xl p-5 border mb-4">
          {/* Header with Dropdown Toggle */}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center space-x-2">
              <FaReceipt className="text-pink-500" />
              <h2 className="font-poppins text-sm font-medium leading-5 text-left">Rent Cost Breakup</h2>
            </div>
            {isOpen ? (
              <IoIosArrowUp className="text-gray-500" />
            ) : (
              <IoIosArrowDown className="text-gray-500" />
            )}
          </div>
          {/* Cost Breakdown (Hidden by Default) */}
          {isOpen && (
            <div className="mt-4 space-y-2 text-gray-700">
              <div className="flex justify-between">
                <span>Total Rent</span>
                <span className="font-medium">{totalPrice}</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Discounts</span>
                <span className="font-medium">{disValue}%</span>
              </div>
              {/* <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="font-medium">₹419.98</span>
              </div> */}
              <div className="flex justify-between border-t pt-2">
                <span>Total Costs</span>
                <span className="font-medium">{discountedPrice ? discountedPrice : totalPrice}</span>
              </div>
              {/* <div className="flex justify-between">
                <span>GST</span>
                <span className="font-medium">₹512 (18%)</span>
              </div> */}
              <div className="flex justify-between border-t pt-3 font-bold text-lg">
                <span>Rent Grand Total</span>
                <span className="text-black">{discountedPrice ? discountedPrice : totalPrice}</span>
              </div>
            </div>
          )}
        </div>
        {/* <div className='summary-item'>
          <img src={delivery} /> <span>Delivery Estimate</span>
          <span>27 Sep - 29 Sep to 500008</span>
        </div> */}
      </div>
    </div>
  );
};

export default CartPage;
