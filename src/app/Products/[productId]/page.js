
import React from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Images } from "@/Components/ProductDetails/Images";
import ServerSideImageTabs from '../../../Components/ProductDetails/Images'
import  AddToCart  from "../../../Components/ProductDetails/AddToCart";
import Ratings from "@/Components/ProductDetails/Ratings";
const truck = "/Assets/truck.svg"
const estimation = "/Assets/estimation.svg"
const stars = "/Assets/stars.svg";
const left = '/Assets/leftarrow.svg';
const startfill = '/Assets/star_fill.svg'
const starline='/Assets/star_line.svg'
const quality = '/Assets/quality.svg';
const relocation = '/Assets/relocation.svg';
const maintenance = '/Assets/maintenance.svg';
const upgrading = '/Assets/upgrading.svg';
const sample = '/Assets/Sample.png';
const favorite = "/Assets/favorite.svg"
const favorited = '/Assets/favoritedicon.svg';
const stock = '/Assets/stock.svg';
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;


  const fetchProductById = async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/variants/${productId}?includeRelated=false`);

      const data = response.data;
console.log(data,"repsonse of products")
      return response.data;

    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchProductRatings = async (productId) => {
    try {
      const response = await axios.get(`${BASE_URL}/reviews/variant/${productId}`);

      const data = response.data;
      return data.data;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };





const ProductPage =async ({params,searchParams})=>{
  console.log(params)
  const {productId}=await params
  console.log(productId,"productId")
  const variant=await fetchProductById(productId)
const userRatings=await fetchProductRatings(productId)

const product=variant.variant;
const relatedItems=variant.relatedItems;

const images = product?.images || [];


const services = [
  { icon: quality, label: "Finest-Quality" },
  { icon: relocation, label: "Free relocation" },
  { icon: maintenance, label: "Free maintenance" },
  { icon: upgrading, label: "Keep upgrading" },
];





  const productDetails = product?.itemDetails
  ? Object.entries(product.itemDetails).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }))
  : [];

  const otherDetails =  product?.itemDetails
  ? Object.entries( product.itemDetails).map(([key, value]) => ({
    label: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }))
  : [];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // Get short month name
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    return `${day} ${month} ‘${year}`;
  };
  const formattedStartDate = formatDate(product.rentalAvailability.startDate);
  const formattedEndDate = formatDate(product.rentalAvailability?.endDate);


  return (
    <>
       <div className='max-w-7xl mx-auto px-4'>
 
         {/* Top Section */}
         <div className='grid grid-cols-1 md:grid-cols-2 gap-8 py-6'>
           {/* Product Images */}
           <ServerSideImageTabs images={product?.images} searchParams={searchParams} />
           {/* <Images product={product}/> */}
        

          {/* Product Details */}
          <div className='space-y-6'>
            <div className='space-y-2'>
              <nav className='text-sm text-gray-500'>
                Home/ Furniture/ DROGO Throne Ergonomic Gaming Chair
              </nav>
              <h1 className="text-2xl font-bold line-clamp-2">{product.title}</h1>
              <div className='flex items-center space-x-2 cursor-pointer'>
                {product.owner && (
                  <Link href={`/SellerProfile/${product.owner._id}`}>
                    <img
                      src={sample}
                      alt='Seller'
                      className='w-6 h-6 rounded-full'
                    />
                  </Link>
                )}
                {product.owner && (

                  <Link href={`/SellerProfile/${product.owner._id}`}><span
                    className='text-xs'
                    // onClick={() => handleSellerclick(product.owner._id)}
                    key={product.owner._id}
                  >
                    {product.owner.name}
                  </span>
                  </Link>
                )}

              </div>
            </div>

            {/* Duration Selection */}
            {/* <div>
              <h3 className='font-medium mb-3 text-sm'>Select Duration</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 bg-white">
                {product.rentalPrice.map((price) => (
                  <button
                    key={price._id}
                    className={`flex flex-col items-center justify-center px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 rounded-lg border text-center w-full sm:w-auto 
   ${selectedDuration === price.period ? "border-[#F48003] bg-[#FFF5EB]" : "border-gray-200"}`}
                    onClick={() => handleselectedDuration(price.period)}
                  >
                    <div className="text-[10px] sm:text-xs md:text-sm">
                      {price.period.charAt(0).toUpperCase() + price.period.slice(1)}
                    </div>
                    <div className="font-bold text-sm sm:text-base md:text-lg">₹{price.price}</div>
                  </button>
                ))}
              </div>
            </div> */}

             <AddToCart product={product}/>

 

            {/* <div className='flex items-center space-x-4'>
              <div className='flex items-center border border-red-500 text-white font-[600] rounded-lg bg-[#FF2D55]'>
                <button className='p-2 w-64' onClick={() => handleAddCart()}>
                  Add to cart
                </button>
              </div>
            </div> */}

            {/* Delivery Info */}
            {/* <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-around bg-white p-3 border border-slate-200 rounded-xl gap-3 sm:gap-0">
              <div className="flex gap-2 items-center text-center justify-center">
                <img src={truck} className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="text-xs sm:text-sm text-[#070707CC] font-[600]">within 2 days</span>
              </div>

              <span className="hidden sm:block">|</span>

              <div className="flex gap-2 items-center text-center justify-center">
                <img src={estimation} className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="text-xs sm:text-sm text-[#070707CC] font-[600]">
                  {formattedStartDate} {formattedEndDate === "NaN Invalid Date ‘aN" ? "" : "-"}{formattedEndDate === "NaN Invalid Date ‘aN" ? "" : formattedEndDate}
                </span>
              </div>

              <span className="hidden sm:block">|</span>

              {product.stockQuantity > 0 ? (
                <div className="flex gap-2 items-center text-blue-600 text-[#070707CC] font-[600] text-xs sm:text-sm">
                  <img src={stock} className="w-4 sm:w-5 h-4 sm:h-5" />
                  In stock
                </div>
              ) : (
                <div className="flex gap-2 items-center text-red-500 text-[#070707CC] font-[600] text-xs sm:text-sm">
                  <img src={stock} className="w-4 sm:w-5 h-4 sm:h-5" />
                  Out of stock
                </div>
              )}
            </div> */}


            {/* Services */}
            {/* <div>
              <h3 className="font-medium mb-3 text-sm">SERVICES</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="text-center border rounded-md py-4">
                    <div className="flex justify-center text-blue-600 mb-2">
                      <img src={service.icon} className="w-6 sm:w-8 h-6 sm:h-8" />
                    </div>
                    <div className="text-xs sm:text-sm">{service.label}</div>
                  </div>
                ))}
              </div>
            </div> */}
                        {/* Delivery Info */}
                        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-around bg-white p-3 border border-slate-200 rounded-xl gap-3 sm:gap-0">
              <div className="flex gap-2 items-center text-center justify-center">
                <img src={truck} className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="text-xs sm:text-sm text-[#070707CC] font-[600]">within 2 days</span>
              </div>

              <span className="hidden sm:block">|</span>

              <div className="flex gap-2 items-center text-center justify-center">
                <img src={estimation} className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="text-xs sm:text-sm text-[#070707CC] font-[600]">
                  {formattedStartDate} {formattedEndDate === "NaN Invalid Date ‘aN" ? "" : "-"}{formattedEndDate === "NaN Invalid Date ‘aN" ? "" : formattedEndDate}
                </span>
              </div>

              <span className="hidden sm:block">|</span>

              {product.stockQuantity > 0 ? (
                <div className="flex gap-2 items-center text-blue-600 text-[#070707CC] font-[600] text-xs sm:text-sm">
                  <img src={stock} className="w-4 sm:w-5 h-4 sm:h-5" />
                  In stock
                </div>
              ) : (
                <div className="flex gap-2 items-center text-red-500 text-[#070707CC] font-[600] text-xs sm:text-sm">
                  <img src={stock} className="w-4 sm:w-5 h-4 sm:h-5" />
                  Out of stock
                </div>
              )}
            </div>


            {/* Services */}
            <div>
              <h3 className="font-medium mb-3 text-sm">SERVICES</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="text-center border rounded-md py-4">
                    <div className="flex justify-center text-blue-600 mb-2">
                      <img src={service.icon} className="w-6 sm:w-8 h-6 sm:h-8" />
                    </div>
                    <div className="text-xs sm:text-sm">{service.label}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Section */}
        {productDetails.length > 0 && <div className='flex flex-col w-1/2'>

          <div className='space-y-6'>
     
            <div className=''>
              <table className='flex flex-col w-full text-sm border bg-white rounded-3xl p-4'>
                <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                  Product Details
                </h2>
                <tbody>
                  {productDetails.map((detail, index) => (
                    <tr key={index} className=''>
                      <td className='p-2 font-semibold'>{detail.label}</td>
                      <td className='p-2 text-gray-600'>{detail.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <table className='flex flex-col w-full border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4'>
                <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                  Other Details
                </h2>
                <tbody>
                  {otherDetails?.map((detail, index) => (
                    <tr key={index} className=''>
                      <td className='p-2 font-semibold'>{detail.label}</td>
                      <td className='p-2 text-gray-600'>{detail.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div>
              <table className='flex flex-col w-full border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4'>
                <h2 className='text-lg font-semibold mb-3 text-[#2F6FED]'>
                  Product Description
                </h2>
                <tbody>
                  <p className="font-sm text-md text-gray-700 leading-relaxed text-justify">{product.description}</p>
                </tbody>
              </table>
            </div>
          </div>
        </div>}
        {product.averageRating && (
  <div className="flex flex-col w-full md:w-1/2 gap-2 border border-black-200 bg-white p-6 md:p-10 rounded-lg text-center justify-center">
    <h2 className="text-black-500 text-5xl md:text-5xl font-bold">
      {product.averageRating}
    </h2>
    <div className="flex gap-2 justify-center">
      {[...Array(5)].map((_, index) => (
        <img
          key={index}
          src={index < Math.round(product.averageRating) ? startfill :starline } 
          alt="Rating star"
          className="w-6 h-6 md:w-8 md:h-8"
        />
      ))}
    </div>
  </div>
)}


        {/* {isReview && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-button" onClick={() => setIsReview(false)}>
                ✕
              </button>
              <Reviews product={product} />
            </div>
          </div>

        )} */}

        <Ratings userRatings={userRatings}/>

        {/* {currentRatings.length > 0 && (
          <>
            <h2 className='pb-4 pt-8 font-semibold text-black-700'>
              Community Feedback
            </h2>
            <div>
              {currentRatings.map((rating) => (
                <div key={rating._id} className="flex flex-col gap-3">
                  <table className="flex flex-col gap-2 w-[610px] border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4">
                    <tbody>
                      <tr>
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-3">
                            <p
                              className={`flex gap-1 items-center px-2 rounded-full text-white 
                      ${rating.rating >= 4 ? "bg-green-700" : rating.rating >= 2 ? "bg-orange-500" : "bg-red-500"}`}
                            >
                              <img src={stars} alt="Rating stars" className="w-4 h-4" />
                              <span className="ml-1">{rating.rating}</span>
                            </p>
                            <p className="text-[14px] font-medium leading-[20px] ">{rating.comment}</p>
                          </div>
                          <p className="text-[14px] font-medium leading-[20px] ">{rating.comment}</p>
                        </div>
                      </tr>
                    </tbody>
                  </table>
                  <div className="flex gap-2 p-2">
                    <img src={userProfile} alt="User Profile" />
                    <p className="flex gap-2 text-[14px] font-medium text-gray-500 text-left">
                      {formatDistanceToNow(new Date(rating.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}

        
              <div className="flex mt-4 gap-2">
            
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Prev
                </button>

       
                {getPaginationNumbers().map((page, index) => (
                  <button
                    key={index}
                    onClick={() => typeof page === "number" && setCurrentPage(page)}
                    className={`px-3 py-1 border rounded-full ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    disabled={page === "..."}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>)} */}
        {/* {relatedItems.length > 3 &&
          <div className="py-10">
            <h2 className="font-medium text-xl">Related products</h2>
            <div className="relative flex gap-5 pt-10">
              <div
                className="absolute top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
                onClick={() => swiperRef.current?.slidePrev()} 
              >
                <img src={left} alt="Previous" className="rotate-360" />
              </div>
              <div
                className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <img src={left} alt="Next" className="rotate-180" />
              </div>
              <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                spaceBetween={20}
                slidesPerView={4} 
                navigation={false}
                pagination={false}
                modules={[Navigation, Pagination]}
                style={{ width: '100%' }}
                breakpoints={{
                  320: { slidesPerView: 1 }, 
                  375: { slidesPerView: 1 },
                  425: { slidesPerView: 2 }, 
                  768: { slidesPerView: 3 }, 
                  1024: { slidesPerView: 4 }, 
                }}
              >
                {relatedItems.map((product) => (
                  <SwiperSlide key={product._id} className="flex justify-center">
                    <ProductItem product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>

            </div>
          </div>
        } */}
      </div>

    
    </>
  )

}

export default ProductPage
