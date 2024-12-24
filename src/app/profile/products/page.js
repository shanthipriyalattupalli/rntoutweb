"use client";
import React from "react";
import "@/styles/ProductInformation.css";
import { LuPencil } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { MdToggleOff } from "react-icons/md";
import { RiDeleteBinLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
const prodimg = "/Assets/dummy-image.svg";
const vector = "/Assets/vector-icon.svg";

export default function Dashboard({ products }) {
  const router = useRouter();
  // const items = [
  //   {
  //     id: 1,
  //     status: 'Out of Stock',
  //     title: 'Windows i3/8GB 4th/6th Gen - Powered by Soldrit',
  //     stock: '0/8',
  //     earning: '₹50,000',
  //     rating: 4.5,
  //     reviews: 154,
  //     onRent: false,
  //     imageUrl: "/Assets/dummy-image.svg"
  //   },
  //   {
  //     id: 2,
  //     status: 'On Rent 3 Item',
  //     title: 'Apple Macbook Air 13" 2017 - Powered by Soldrit',
  //     stock: '5/8',
  //     earning: '₹50,000',
  //     rating: 4.5,
  //     reviews: 154,
  //     onRent: true,
  //     imageUrl: prodimg,
  //   },
  //   {
  //     id: 3,
  //     status: 'On Rent 3 Item',
  //     title: '40 Core Server On Rental, Hard-Disk: 2 Tb Ssd, Area Of Network',
  //     stock: '5/8',
  //     earning: '₹50,000',
  //     rating: 4.5,
  //     reviews: 154,
  //     onRent: true,
  //     imageUrl: prodimg,
  //   },
  //   {
  //     id: 4,
  //     status: 'On Rent 3 Item',
  //     title: 'Dell 24 Inch P2425H Monitor | 100Hz | 5ms G-to-G',
  //     stock: '5/8',
  //     earning: '₹50,000',
  //     rating: 4.5,
  //     reviews: 154,
  //     onRent: true,
  //     imageUrl: prodimg,
  //   },
  //   {
  //     id: 5,
  //     status: 'All Available',
  //     title: 'iBELL BM18-60 Electric Cordless Impact Wrench (3/8 inch)',
  //     stock: '8/8',
  //     earning: '₹50,000',
  //     rating: 4.5,
  //     reviews: 154,
  //     onRent: false,
  //     imageUrl: prodimg,
  //   },
  //   // Add more items as needed
  // ];

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
              rntout
            </div>
            <div className='view-transactions'>view all transactions</div>
          </header>
          <div className='price-section'>
            <div>
              <div className='total-earning'>TOTAL EARNING:</div>
              <div className='joined-date'>Joined at Nov 05th 2024</div>
            </div>
            <div className='total-price'>₹1,59,237</div>
          </div>
        </div>

        <div className='items-grid'>
          {products?.map((item) => (
            <div className='item-card' key={item.id}>
              <div
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
              </div>

              <div className='action-menu'>
                <button className='menu-button'>⋮</button>
                <div className='dropdown-menu'>
                  <p>
                    <LuPencil />
                    Edit
                  </p>
                  <p>
                    <FaEye />
                    View
                  </p>
                  <p>
                    <MdToggleOff />
                    Inactive?
                  </p>
                  <p style={{ color: "red" }}>
                    <RiDeleteBinLine />
                    Delete
                  </p>
                </div>
              </div>
              <img
                src='/Assets/dummy-image.svg'
                alt={item.title}
                className='item-image'
              />
              <div className='item-card-details'>
                <div className='item-det-section'>
                  <h3 className='item-title'>{item.title}</h3>
                  <div className='item-details'>
                    <p>Available Stock: {item.stock}</p>
                    <p>
                      Earning: <span>{item.earning}</span>
                    </p>
                    <p>
                      Rating & Reviews: {item.rating} ★ ({item.reviews} Reviews)
                    </p>
                  </div>
                </div>
                <div className='item-actions'>
                  <button
                    className='view-insight'
                    onClick={() => {
                      router.push("/profile/products/productdetails");
                    }}
                  >
                    View Rent Insight
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
