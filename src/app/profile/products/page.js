"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";


// import "@/styles/ProductInformation.css";
import '../../../styles/ProductInformation.css';
import ProductDetails from '../../../Components/Products/ProductDetails'
import { LuPencil } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { MdToggleOff } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
const prodimg = "/Assets/dummy-image.svg";
const vector = "/Assets/Vector-icon.svg";
import Link from "next/link";

export default function Dashboard({ products }) {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isdetailsOpen, setIsdetailsOpen] = useState(false)
  const [productId, setProductId] = useState(null)
  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
  const [userProducts, setUserProducts] = useState([])
  const fetchUserProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/variants/userVariants`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response, "userproducts");
      setUserProducts(response.data)

    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchUserProducts();
    }
  }, [token]);



  const router = useRouter();


  return (
    <div className='prod-container-page'>
      <div className='item-header'>
        <h2>Products</h2>
        <div className='filters'>Filters</div>
      </div>
      <div className='dashboard'>
        <div className='dashboard-top'>
          <header className='dashboard-header'>
            <div className='logo'>
              <img src={vector} alt='Logo' />
              Rntout
            </div>
            <div className='view-transactions'>view all transactions</div>
          </header>
          <div className='price-section'>
            <div>
              <div className='total-earning'>TOTAL EARNING:</div>
              <div className="joined-date">
                Joined at {new Date(userProducts[0]?.owner?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }).replace(",", "").replace(/(\d)(st|nd|rd|th)/, "$1th")}
              </div>

            </div>
            <div className='total-price'>₹1,59,237</div>
          </div>
        </div>

        <div className='items-grid'>
          {userProducts?.map((item) => (
            <div className='item-card' key={item._id}>
              {/* <div
                className={`status ${
                  item.status.includes("Out of Stock")
                    ? "out-of-stock"
                    : item.status.includes("On Rent")
                    ? "on-rent"
                    : item.status.includes("Available")
                    ? "all-available"
                    : ""
                }`}
              >
                {item.status}
              </div> */}

              <div className="action-menu2">
                {item.
                  isApproved ? <span className="px-2 py-1 bg-green-700 font-xl text-sm text-white rounded-full">Approved</span> :
                  <span className="px-2 py-1 bg-orange-400 font-xl text-md text-white rounded-full">In Review</span>}

              </div>

              <img
                src={item.images[0]}
                alt={item.title}
                className='item-image'

              />

              <div className='item-card-details'>
                <div className='item-det-section'>
                  <div className="flex justify-between">
                  <h3 className='item-title'>{item.title}</h3>
                  <div className='action-menu'>
                <button className='menu-button'>...</button>
                <div className='dropdown-menu'>
                  <p onClick={() => router.push(`/profile/products/details/${item._id}`)} >
                    <LuPencil />
                    Edit
                  </p>
                  <p
                    onClick={() => {
                      setProductId(item._id);
                      setIsdetailsOpen(true);
                    }}>
                    <FaEye />
                    View
                  </p>
                  {isdetailsOpen && (
                    <div className="modal-overlay"   onClick={() => setIsdetailsOpen(false)}>
                      <div className="modal-content" onClick={(e)=>e.stopPropagation()}>
                        <button
                          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                          onClick={() => setIsdetailsOpen(false)}
                        >
                          ✕
                        </button>
                        <ProductDetails setIsdetailsOpen={setIsdetailsOpen} productId={productId} />
                      </div>
                    </div>
                  )}
                  {/* <p>
                    <MdToggleOff />
                    Inactive?
                  </p> */}
                  <p style={{ color: "red" }}>
                    <RiDeleteBinLine />
                    Delete
                  </p>
                </div>
              </div>
                  </div>
                  <div className='item-details'>
                    <p>Available Stock: {item.stockQuantity}/{item.totalStock}</p>
                    <p>
                      Earning: <span>{item.earning}</span>
                    </p>
                    <p>
                      Rating & Reviews: {item.rating} ★ ({item.reviews} Reviews)
                    </p>
                  </div>
                </div>
                <div className='item-actions'>
                  <Link href={{ pathname: `/profile/products/${item._id}`, query: { id: item._id } }} key={item._id}>
                    <button
                      className='view-insight'
                    // onClick={() => {
                    //   router.push(`/profile/products/${item._id}` ,);
                    // }}
                    >
                      View Rent Insight
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
