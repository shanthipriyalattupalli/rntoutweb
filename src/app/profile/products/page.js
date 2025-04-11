"use client";
import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/Components/Shimmer/ProductCard";


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
const kycimage="/Assets/kyc.svg"
const logo = "/Assets/Rntout_Logo.png";
import Cookies from "js-cookie";
const emptyproducts = "/Assets/emptyproducts.svg";


export default function Dashboard({ products }) {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [isdetailsOpen, setIsdetailsOpen] = useState(false)
  const [productId, setProductId] = useState(null)
  const token = (typeof window !== 'undefined') ? localStorage.getItem("userToken") : null;
  const [userProducts, setUserProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const [rentalPrice, setRentalPrice] = useState([]);
    const [rentalAvailability, setRentalAvailability] = useState({});
    const [otherDetail, setOtherDetails] = useState({});
    const [owner, setOwner] = useState({});
    const [images, setImages] = useState([]);
    const [relatedItems, setRelatedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemActive,setItemActive] = useState()

    const kyc =Cookies.get("kycstatus");


  const fetchUserProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/variants/userVariants`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserProducts(response.data)

    } catch (error) {
      console.error("Error fetching products:", error);
    }
    finally {
      setLoading(false); // Hide shimmer after loading
    }
  }

  useEffect(() => {
    if (token) {
      fetchUserProducts();
    }
  }, [token]);



  const router = useRouter();


  const handleProductDelete =async(productId)=>{

    try {
  const response=  await axios.delete(`${BASE_URL}/variants/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
        params:{
          id :productId
        }
      });

      fetchUserProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  
  const fetchProductById = async (productId) => {
    try {
        const response = await axios.get(`${BASE_URL}/variants/${productId}?includeRelated=false`);

        const data = response.data.variant;
        setProduct(data);
        setRentalPrice(data.rentalPrice);
        setRentalAvailability(data.rentalAvailability);
        setOtherDetails(data.itemDetails);
        setImages(data.images);
        setOwner(data.owner);
        setRelatedItems(response.data.relatedItems)
    } catch (error) {
        console.error("Error fetching product:", error);
    }
};
useEffect(() => {
    if (productId) {
        fetchProductById();
    }
}, [productId]);


const approvedCount = userProducts.filter(product => product.isApproved).length;
const notApprovedCount = userProducts.filter(product => !product.isApproved).length;


const handleClick=(itemId)=>{
  if(itemId === itemActive){
    setItemActive(null)
  }else{
    setItemActive(itemId)
  }
}



  return (
    <div className='prod-container-page'>
      <div className='item-header'>
        <h2>Products</h2>
        {/* <div className='filters'>Filters</div> */}
      </div>
      <div className='dashboard'>
        <div className='dashboard-top'>
          <div>
          <header className='dashboard-header'>

            <div className='logo'>
            <img src={logo} alt="RNT Out Logo" className="h-8 sm:h-10 border-none border-0" />
             
            </div>
     
            {/* <div className='view-transactions'>view all transactions</div> */}
          </header>
          <div className='price-section'>
            <div>
              <div className='total-earning'>TOTAL PRODUCTS : {userProducts.length}</div>
{userProducts[0]?.owner?.createdAt &&              <div className="joined-date">
                Joined at {new Date(userProducts[0]?.owner?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }).replace(",", "").replace(/(\d)(st|nd|rd|th)/, "$1th")}
              </div>}

            </div>
  
          </div>
        </div>
               <div className="flex flex-col gap-4 items-center justify-center">
            <div className='bg-green-700 text-white p-2 rounded-xl font-semibold'><span>Approved : </span>{approvedCount}</div>
            <div className='bg-orange-400 text-white p-2 rounded-xl font-semibold'><span>InReview : </span> {notApprovedCount}</div>
            </div>
        
        </div>

      {
 loading?
<Suspense fallback={<ProductCard/>}></Suspense>:

  userProducts && userProducts.length > 0 ? (
    <div className='items-grid'>
      {userProducts.map((item) => (
        <div className='item-card' key={item._id} >
          <div className="action-menu2">
            {item.isApproved ? (
              <span className="px-2 py-1 bg-green-700 font-xl text-sm text-white rounded-full">Approved</span>
            ) : (
              <span className="px-2 py-1 bg-orange-400 font-xl text-md text-white rounded-full">In Review</span>
            )}
          </div>

 <img
  src={item.images[0]} 
  alt={item.title} 
  className='item-image cursor-pointer' 
  onClick={() => {
    fetchProductById(item._id);
    setProductId(item._id);
    setIsdetailsOpen(true);
  }}
/>


          <div className='item-card-details'>
            <div className='item-det-section'>
              <div className="flex justify-between">
                <h3 className='item-title'>{item.title}</h3>
                <div className='action-menu'>
                  <button className='menu-button' onClick={() => handleClick(item._id)}>...</button>
                {itemActive === item._id &&  <div className='dropdown-menu'>
                    <p onClick={() => router.push(`/profile/products/details/${item._id}`)}>
                      <LuPencil /> Edit
                    </p>
                    <p onClick={() => {
                      fetchProductById(item._id);
                      setIsdetailsOpen(true);
                    }}>
                      <FaEye /> View
                    </p>
                    {isdetailsOpen && (
                      <div className="modal-overlay" onClick={() => setIsdetailsOpen(false)}>
                        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                          <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
                            onClick={() => setIsdetailsOpen(false)}>✕</button>
                          <ProductDetails setIsdetailsOpen={setIsdetailsOpen} productId={productId} product={product} 
                            rentalPrice={rentalPrice} rentalAvailability={rentalAvailability} otherDetail={otherDetail} 
                            owner={owner} images={images} relatedItems={relatedItems} />
                        </div>
                      </div>
                    )}
                    <p style={{ color: "red" }} onClick={() => handleProductDelete(item._id)}>
                      <RiDeleteBinLine /> Delete
                    </p>
                  </div>}
                </div>
              </div>
              <div className='item-details'>
                <p>Available Stock: {item.stockQuantity}/{item.totalStock}</p>
                {/* <p>Rating & Reviews: {item.rating} ★ ({item.reviews} Reviews)</p> */}
              </div>
            </div>
            <div className='item-actions'>
              <Link href={{ pathname: `/profile/products/${item._id}`, query: { id: item._id } }} key={item._id}>
                <button className='view-insight'>View Rent Insight</button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
    
  ) : (
    <div className="flex flex-col items-center justify-center w-80 mx-auto h-[500px] text-center">
    <img
      src={emptyproducts}
      alt="No products available"
      className="w-full animate-float"
    />
    <span className="pt-10 font-medium text-xl">No Rental Items found</span>
    <span className="font-poppins font-normal text-[12px] leading-[18px] tracking-normal text-center text-[rgba(7,7,7,0.8)]">
      No product found in this category so meanwhile you can explore our other categories.
    </span>
  </div>
  )
}

      </div>
    </div>
  );
}
