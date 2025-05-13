
import React from "react";
import axios from "axios";
import Link from "next/link";
import { Images } from "@/Components/ProductDetails/Images";
import ServerSideImageTabs from '../../../Components/ProductDetails/Images'
import AddToCart from "../../../Components/ProductDetails/AddToCart";
import Ratings from "@/Components/ProductDetails/Ratings";
import ProductItem from "@/Components/Home/ProductItems";
import RelatedItems from "@/Components/ProductDetails/RelatedItems";
const truck = "/Assets/truck.svg"
const estimation = "/Assets/estimation.svg"
const stars = "/Assets/stars.svg";
const left = '/Assets/leftarrow.svg';
const startfill = '/Assets/star_fill.svg'
const starHallFill = '/Assets/star_half_fill.svg'
const starline = '/Assets/star_line.svg'
const quality = '/Assets/quality.svg';
const relocation = '/Assets/relocation.svg';
const maintenance = '/Assets/maintenance.svg';
const upgrading = '/Assets/upgrading.svg';
const sample = '/Assets/Sample.png';
const favorite = "/Assets/favorite.svg"
const favorited = '/Assets/favoritedicon.svg';
const stock = '/Assets/stock.svg';
const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
import { cookies } from "next/headers";
import { FaGrinTongueWink } from "react-icons/fa";
import ScrollToTop from "@/Components/ScrollToTop";




const fetchProductById = async (productId, token, userId) => {

  try {
    const response = await axios.get(
      `${BASE_URL}/variants/${productId}`,
      {
        params: {
          includeRelated: true,
          userId: userId
        },
        timeout: 10000,
      }
    );
    console.log(response.data, "response of product")
    const data = response.data;
    return response.data;

  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

const fetchProductRatings = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/reviews/variant/${productId}`);

    const data = response.data;
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};





const ProductPage = async ({ params }) => {
  const cookieStore = cookies();
  let token = cookieStore.get(`userToken`)?.value;
  let userId = cookieStore.get(`userId`)?.value;

  const { productId } = await params;

  const variant = await fetchProductById(productId, token, userId)
  const userRatings = await fetchProductRatings(productId)

  const product = variant.variant;
  const relatedItems = variant.relatedItems;

  const images = product?.images || [];


  const services = [
    { icon: quality, label: "Finest-Quality" },
    { icon: relocation, label: "Free relocation" },
    { icon: maintenance, label: "Free maintenance" },
    { icon: upgrading, label: "Keep upgrading" },
  ];



  const itemDetailsArray = product?.itemDetails
    ? Object.entries(product.itemDetails).map(([key, value]) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1),
      value,
    }))
    : [];


  const midIndex = Math.ceil(itemDetailsArray.length / 2);

  const productDetails = itemDetailsArray?.slice(0, midIndex);
  const otherDetails = itemDetailsArray?.slice(midIndex);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "short" }); // Get short month name
    const year = String(date.getFullYear())?.slice(-2); // Get last two digits of the year
    return `${day} ${month} ‘${year}`;
  };
  const formattedStartDate = formatDate(product.rentalAvailability.startDate);
  const formattedEndDate = formatDate(product.rentalAvailability?.endDate);


  return (
    <>
      {/* <ScrollToTop /> */}
      <div className=' mx-auto px-20'>

        {/* Top Section */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 py-6'>
          {/* Product Images */}
          {/* <ServerSideImageTabs images={product?.images} searchParams={searchParams} /> */}

          <Images product={product} productId={productId} variant={variant} />


          {/* Product Details */}
          <div className='space-y-6'>
            <div className='space-y-2'>
              <nav className="text-sm text-gray-500">
                <Link href="/" className="hover:underline">Home</Link>
                <span className="mx-2">/</span>

                {product?.categoryId?.categoryName ? (
                  <>
                    <Link href={`/Product-list/${product.categoryId._id}`} className="hover:underline">
                      {product.categoryId.categoryName}
                    </Link>
                    <span className="mx-2">/</span>
                  </>
                ) : null}

                <span className="text-gray-700 font-medium">{product?.title || "Unknown Product"}</span>
              </nav>
              <h1 className="text-2xl font-bold line-clamp-2">{product.title}</h1>
              <div className='flex items-center space-x-2 cursor-pointer'>
                {product.owner && (
                  <Link href={`/SellerProfile/${product.owner._id}`}>
                    {product?.businessProfile?.profileImage ?
                      <img
                        src={product?.businessProfile.profileImage}
                        alt='Seller'
                        className='w-6 h-6 rounded-full'
                      /> : <img
                        src={sample}
                        alt='sample'
                        className='w-6 h-6 rounded-full'
                      />}
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



            <AddToCart product={product} />


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
        {productDetails.length > 0 && <div className='flex flex-col w-full sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 2xl:w-1/2'>

          <div className='space-y-6'>

            <div className=''>
              <table className='flex flex-col w-full border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4'>
                <thead>
                  <tr>
                    <th colSpan="2" className='text-lg font-semibold mb-3 text-[#2F6FED] text-left p-2'>
                      Product Details
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {productDetails.map((detail, index) => (
                    <tr key={index}>
                      <td className='p-2 font-semibold'>{detail.label}</td>
                      <td className='p-2 text-gray-600'>{detail.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>

            <div>
              <table className='flex flex-col w-full border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4'>
                <thead>
                  <tr>
                    <th colSpan="2" className='text-lg font-semibold mb-3 text-[#2F6FED] text-left p-2'>
                      Other Details
                    </th>
                  </tr>
                </thead>
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
                <thead>
                  <tr>
                    <th colSpan="2" className='text-lg font-semibold mb-3 text-[#2F6FED] text-left p-2'>
                      Product description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-sm text-md text-gray-700 leading-relaxed  text-left p-2">
                      {product.description}
                    </td>
                  </tr>
                </tbody>

              </table>
            </div>
          </div>
        </div>}
        {product.averageRating && (
          <div className="flex mt-6 flex-col w-full md:w-1/2 gap-2 border border-black-200 bg-white p-6 md:p-10 rounded-lg text-center justify-center">
            <h2 className="text-black-500 text-5xl md:text-5xl font-bold">
              {product.averageRating}
            </h2>
            <div className="flex gap-2 justify-center">
              {[...Array(5)].map((_, index) => {
                const fullStars = Math.floor(product.averageRating);
                const hasHalfStar = product.averageRating % 1 >= 0.5;
                let starIcon = starline; // Default empty star

                if (index < fullStars) {
                  starIcon = startfill; // Full star
                } else if (index === fullStars && hasHalfStar) {
                  starIcon = starHallFill; // Half-filled star
                }

                return (
                  <img
                    key={index}
                    src={starIcon}
                    alt="Rating star"
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                );
              })}
            </div>
          </div>
        )}

        <Ratings userRatings={userRatings} />
        <RelatedItems relatedItems={relatedItems} />

      </div>


    </>
  )

}

export default ProductPage
