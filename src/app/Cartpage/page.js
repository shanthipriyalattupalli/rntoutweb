"use client";
import React, { useState, useEffect } from "react";
// import "@/styles/Cart.css";
import '../../styles/Cart.css';
import { FaReceipt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowDropleft, IoIosArrowDropleftCircle, IoIosArrowUp } from "react-icons/io";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useRouter } from 'next/navigation'
import axios from "axios";
import Sidebar from "./Sidebar/page";
import AddressSidebar from "./AddressSidebar/page";
import Swal from "sweetalert2";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import RenderRazorpay from "../PayModule/PayModule";
import "react-toastify/dist/ReactToastify.css";
import PromoCoupon from "./PromoCoupon/page";
import { ArrowLeft } from "lucide-react";
import Cookies from "js-cookie";
const cube = "/Assets/cube_fill.svg";
const deleteicon = "/Assets/deleteicon.svg";
const stock = "/Assets/stock.svg";
const location = "/Assets/location.svg";
const payment = "/Assets/payment.svg";
const coupon = "/Assets/coupon.svg";
const insurance = "/Assets/insurance.svg";
const costbreakup = "/Assets/costbreakup.svg";
const delivery = "/Assets/delivery.svg";
const emptycart = "/Assets/emptycart.svg";
const rcb = '/Assets/RCB.svg'





const CartPage = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [cartItems, setCartItems] = useState([]);
  const [cartdetails, setCartDeetails] = useState({})
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddressSidebarOpen, setIsAddressSidebarOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isCoupon, setIsCoupon] = useState(false)
  const [quantities, setQuantities] = useState({});
  const [displayRazorpay, setDisplayRazorpay] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [couponcode, setCouponCode] = useState("");
  const [delivery, setIsDelivery] = useState({})
  const [addressId, setAddressId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [selectedCartItems, setSelectedCartItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [disValue, setDisValue] = useState(0);
  const [disAmount, setDisAmount] = useState(0)
  const [razorpayOrderId, setRazorpayOrderId] = useState()
  const router = useRouter();

  const userId = (typeof window !== 'undefined') ? localStorage.getItem("userId") : null;

  const token = Cookies.get("userToken");
  const userName = Cookies.get("userName")

  const fetchDeliveryCharges = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/calculate-delivery-charges`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsDelivery(response.data);
    } catch (error) {
      console.log(error, "error in fetching delivery charges")
    }
  }

  useEffect(() => {
    fetchDeliveryCharges();
  }, [])



  const handleCheckboxChange = async (cartId, isChecked) => {
    const updatedSelection = isChecked
      ? [...selectedCartItems, cartId]
      : selectedCartItems.filter((id) => id !== cartId);

    setSelectedCartItems(updatedSelection);
    const selectedStatus = isChecked;

    try {

      const response = await axios.patch(
        `${BASE_URL}/cart/selection/${cartId}`,
        {
          selected: selectedStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCartDetails();
      toast.success(response.data.message);
      fetchDeliveryCharges()
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
      // toast.success("Quantity updated successfully.");
      fetchCartDetails();
    } catch (error) {
      console.error("Error increasing quantity:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const decreaseQuantity = async (variantId) => {
    const newQuantity = - 1;

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
      // toast.success("Quantity updated successfully.");
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

    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error(error.response.data.error);
      throw error;
    }
  };

  const fetchCartDetails = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/${userId}`);
      console.log(response.data, "cart items")

      const cartData = response.data.cartItems || [];
      setCartDeetails(response?.data)
      setCartItems(cartData);
      if (cartData.length === 0) {
        setQuantities({});
      } else {
        const initialQuantities = cartData.reduce((acc, item) => {
          acc[item.variant_id._id] = item.quantity || 1;
          return acc;
        }, {});
        setQuantities(initialQuantities);
      }
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

      setCartItems((prevItems) => {
        const updatedItems = prevItems.filter((item) => item._id !== cartId);

        // ✅ Ensure event fires when cart is empty
        if (updatedItems.length === 0) {

          window.dispatchEvent(new CustomEvent("cartUpdated", { detail: 0 }));
        }

        return updatedItems;
      });

      setSelectedOptions((prevOptions) => {
        const updatedOptions = { ...prevOptions };
        delete updatedOptions[variantId];
        localStorage.setItem("selectedOptions", JSON.stringify(updatedOptions));
        return updatedOptions;
      });

      // ✅ Force re-fetch to ensure UI updates correctly
      fetchCartDetails();

      toast.success(response.data.message || "Removed successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error removing item from cart.");
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {

    if (cartItems.length === 0) {

      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: 0 }));
    } else {

      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: cartItems.length }));
    }
  }, [cartItems]);


  useEffect(() => {
    window.dispatchEvent(new CustomEvent("cartUpdated"));
  }, [cartItems]);



  const handleOrderCheckout = async () => {
    try {
      const payload = {
        userId: String(userId),
        couponCode: String(couponcode),
        addressId: String(selectedAddress._id),
        deliveryCharge:delivery?.totalDeliveryCharges

      };


      // API call for order checkout
      const response = await axios.post(`${BASE_URL}/orders/checkout`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { orderId, finalAmount } = response.data;
      console.log(response.data, "final amount")

      // If orderId is present, proceed to initiate payment
      if (orderId) {

        setOrderId(orderId); 
        await handleContinueClick(orderId, finalAmount);
        router.push('/profile/orders')
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: 0 }));

      }

    } catch (error) {
      // Extract and display error message safely
      const errorMessage = error.response?.data?.error || "Something went wrong. Please try again!";
      Swal.fire({
        icon: "warning",
        title: "Note",
        text: `${errorMessage}\n\nPlease Click "OK" for KYC Verification.`,
        showCancelButton: true,
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      }).then((result) => {
        if (result.isConfirmed) {

          if (errorMessage === "KYC verification is required before checkout.") {
            router.push("/profile/kyc");
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {

          // Handle cancel action if needed
        }
      });
      console.error("Error during order checkout:", error.response?.data);
    }
  };

  const handleContinueClick = async (orderId, amount) => {

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
      console.log(response.data, "paymnet initiate")
      // Axios response data is already parsed
      if (response.data.order && response.data.order.id) {
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
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please login to proceed with payment.",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
      return;
    }

    if (!selectedAddress) {
      Swal.fire({
        icon: "warning",
        title: "Address Required",
        text: "Please select an address before proceeding with checkout.",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
      return;
    }

    await handleOrderCheckout();
  };


  const handlePayment = async (status, orderDetails) => {
    if (status === "succeeded") {
      setDisplayRazorpay(false);
      // router.push("/profile/orders")
      // await handleContinueClick(orderDetails);

    } else if (status === "cancelled") {
      setDisplayRazorpay(false);
    }
  };



  // const handleDiscountedPrice = (newDiscountedPrice, couponcode, discountValue, maxDiscountAmount) => {
  //   setDiscountedPrice(newDiscountedPrice);
  //   setCouponCode(couponcode);
  //   setDisValue(discountValue);
  //   setDisAmount(maxDiscountAmount)

  // };

  const handleAddress = (addressId) => {
    setAddressId(addressId);
  }

  // const apiKey = "rzp_test_4rrCmYtqWUOUvT";
  const apiKey = "rzp_test_a4GiGqcTxFZlKT";


  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.selected ? item.lineTotal || 0 : 0),
    0
  );

  const periodMapping = {
    quarterly: "3 Months",
    semiannual: "6 Months",
    annual: "Year",
  };




  return (
    <div className='cart-page'>
      <ToastContainer />
      <div className='cart-items-section'>
        <h2 className='cart-title'>
          My Cart <span className='cart-count'>{cartItems.length}</span>
        </h2>
        {cartItems.length > 0 ?


          cartItems?.map((item, index) => (
            <div key={item._id || index} className="cart-item cursor-pointer flex items-center">
              <input
                type="checkbox"
                className="mr-3 w-5 h-5 accent-red-500 checked:bg-red-500 checked:border-red-500"
                checked={item?.selected || false}
                onChange={(e) => handleCheckboxChange(item._id, e.target.checked)}
              />

              <Link
                href={{
                  pathname: `/Products/${item.variant_id._id}`,
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
                <div className="flex justify-between items-center gap-2 sm:gap-4">
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 line-clamp-1">
                    {item.variant_id.title}
                  </h3>

                  <button
                    className="flex items-center justify-center p-1 sm:p-2 rounded-md transition duration-200"
                    onClick={() => handleRemove(item._id, item.variant_id._id)}
                  >
                    <img
                      src={deleteicon}
                      alt="Delete"
                      className="w-5 h-5"
                    />
                  </button>
                </div>


                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-base sm:text-md font-semibold text-[#2F6FED]">
                      ₹{item.unitPrice}/{periodMapping[item.rentalPeriod] || item.rentalPeriod.charAt(0).toUpperCase() + item.rentalPeriod.slice(1)}

                    </p>

                  </div>
                  <div className="flex items-center gap-2">
                    <img src={cube} alt="Cube Icon" className="w-5 h-5" />
                    <p className="text-[#2F6FED] text-sm font-medium">In stock</p>
                  </div>
                </div>

                <div className="quantity-controls">
                  <div className="flex gap-2 items-center bg-white border rounded-md">
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
                  </div>
                  <select
                    className="duration-select"
                    value={selectedOptions[item.variant_id._id]?.period || item.rentalPeriod}
                    onChange={(e) => handleSelectChange(item.variant_id._id, e.target.value)}
                  >

                    {item?.variant_id?.rentalPrice?.map((rentalPrice) => (
                      <option key={rentalPrice._id} value={rentalPrice.period}>
                        {/* {rentalPrice.period} */}
                        {periodMapping[rentalPrice.period] || rentalPrice.period.charAt(0).toUpperCase() + rentalPrice.period.slice(1)}

                      </option>
                    ))}
                  </select>

                  {/* <p>Total: {item.lineTotal}</p> */}
                </div>


              </div>
            </div>
          )) : <>
            <div className="flex flex-col justify-center items-center h-3/4">
              <img src={emptycart} className="w-auto h-auto" />
              <h1 className="text-lg font-semibold">Empty Cart</h1>
              <span className="px-6 py-4">you haven’t place any item to cart  <a href="/" className="text-md font-semibold text-blue-500">"Browse Products"</a></span>
            </div>

          </>
        }




      </div>

      <div className='summary-section'>
        <div className='summary-item address' onClick={handleAddressToggle}>
          <div className='address-content'>
            <div className="flex gap-2 items-center">
              <img src={location} />
              <span>Choose Address</span>
            </div>
            <MdOutlineKeyboardArrowRight />
          </div>
          {selectedAddress && (
            <>

              <div className='address-context'>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-5 h-5 accent-red-500"

                />
                <h4>{selectedAddress.name}</h4>
                <p>|</p>
                <p>{selectedAddress.mobile}</p>
                <span>{selectedAddress.type}</span>
              </div>
              <p>{selectedAddress.flatOrHouseNo}, {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.country}, ({selectedAddress.zip})</p>

            </>
          )}
        </div>
        <AddressSidebar
          isOpen={isAddressSidebarOpen}
          onClose={handleAddressToggle}
          onAddressSelect={setSelectedAddress}
          addressId={handleAddress}
          onAddressSelectedSuccess={fetchDeliveryCharges}
        />

        <div className='summary-address'>
          <div className='summary-item address'>
            <div className="flex gap-50">
              <div className='address-content'>
                <img src={payment} />
                <span>Payable Amount</span>
              </div>
              <div className="md:ml-4">
                {" "}
                {/* <span className='amount'>₹{totalPrice}</span> */}
              </div>
            </div>
            <button
              className='pay-btn'
              onClick={totalPrice > 0 ? createPayment : undefined}
              disabled={totalPrice <= 0}
              style={{ cursor: totalPrice <= 0 ? 'not-allowed' : 'pointer' }}
            >
              Pay ₹{delivery?.totalDeliveryCharges ? cartdetails?.grandTotal + delivery?.totalDeliveryCharges : cartdetails?.grandTotal}
            </button>


            {displayRazorpay && (
              <RenderRazorpay
                orderId={orderId}
                razorpayOrderId={razorpayOrderId}
                // amount={delivery?.totalDeliveryCharges}
                currency={"INR"}
                keyId={apiKey}
                handlePayment={handlePayment}
                name={userName}
              />
            )}
          </div>
        </div>
        {/* <div className="summary-item address" onClick={handleCouponToggle}>
          <div className="flex justify-between align-center text-center items-center">
            <div className="flex flex-row items-center gap-4">
              <img src={coupon} alt="Coupon Icon" />
              <span>{couponcode ? couponcode : "Promo Coupon"}</span>

              {couponcode && (
                <button
                  className="remove-coupon-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent sidebar from opening
                    setCouponCode("");
                    setDiscountedPrice(null);
                  }}
                >
                  ✖
                </button>
              )}
            </div>
            <MdOutlineKeyboardArrowRight />

          </div>
        </div> */}

        {/* {isCoupon && (
          <PromoCoupon
            isOpen={isCoupon}
            onClose={handleCouponToggle} // Properly pass the toggle function
            totalPrice={totalPrice}
            onDiscountedPrice={handleDiscountedPrice}
          />
        )} */}

        <div className="mx-auto bg-white shadow-lg rounded-xl p-5 border mb-4">
          {/* Header with Dropdown Toggle */}
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center space-x-2">
              <img src={rcb} />
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
              {cartdetails?.totalCartValue && <div className="flex justify-between">
                <span>Total</span>
                <span className="font-medium">₹ {cartdetails?.totalCartValue}</span>
              </div>}
              {cartdetails?.taxes?.totalTax && <div className="flex justify-between">
                <span>Gst({cartdetails?.taxes?.cgst?.rate + cartdetails?.taxes?.sgst?.rate}%)</span>
                <span className="font-medium">+{cartdetails?.taxes?.totalTax}</span>
              </div>}
              {delivery?.totalDeliveryCharges && <div className="flex justify-between">
                <span>Delivery charges</span>
                <span className="font-medium">+ {delivery?.totalDeliveryCharges}</span>
              </div>}

              <div className="flex justify-between border-t pt-3 font-bold text-lg">
                <span>Rent Grand Total</span>
                <span className="text-black">₹ {delivery?.totalDeliveryCharges ? cartdetails?.grandTotal + delivery?.totalDeliveryCharges : cartdetails?.grandTotal}</span>
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
