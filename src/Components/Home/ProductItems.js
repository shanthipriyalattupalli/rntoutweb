import React from 'react';
import Image from 'next/image';
const DeliveryIcon = '/Assets/Icons/delivery.png'; 
const AvailabilityIcon = '/Assets/Icons/availability.png'; 
const AvailabilIcon = '/Assets/Icons/ava-stock.png'; 
const cartIcon = '/Assets/Icons/add-to-cart.png';

const customStyles = `
.product-title{font-size:14px; font-weight:400; line-height:normal}
.cart-btn{font-size:13px; font-weight:500; }

.group:hover .group-hover\:invert {
  filter: invert(1) brightness(1) contrast(1); /* More intense white effect */
}
  .cart-price{color:#FF2D55;}
  .cart-btn:hover .group-hover{filter: brightness(0) invert(1); !important}
`;

const ProductItem = ({ product }) => {
  const { imgSrc, name, price, dateRange, availability, stock } = product;

  return (
    <>
      <style>{customStyles}</style>

      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <Image src={imgSrc} alt={name} className="w-full h-40 object-cover mb-4 rounded-lg" width={500} height={300} />
        <h2 className="product-title text-gray-800">{name}</h2>
        <p className="cart-price text-bold text-lg mt-2">
          {price}<span className="text-gray-600 text-sm">/day</span>
        </p>
        <div className="flex items-center mt-2">
          <Image src={DeliveryIcon} alt="Calendar icon" className="w-4 h-4 text-gray-500 mr-1" width={500} height={300}/>
          <span className="text-gray-500 text-xs">Delivery: {dateRange}</span>
        </div>
        <div className="flex items-center mt-2">
          <Image src={AvailabilityIcon} alt="Availability icon" className="w-4 h-4 text-gray-500 mr-1"  width={500} height={300}/>
          <span className="text-gray-500 text-xs">Availability: {availability}</span>
        </div>
        <div className="flex items-center mt-2">
          <Image src={AvailabilIcon} alt="Check icon" className="w-4 h-4 text-blue-500" width={500} height={300} />
          <span className="text-blue-500 text-xs"> Available Stock: {stock}</span>
        </div>
        <button className="cart-btn border-red-500 border hover:bg-red-600 text-black font-bold hover:text-white px-4 py-1 rounded-md mt-4 text-center w-full flex items-center justify-center space-x-2 group">
          <Image
            src={cartIcon}
            alt="Cart icon"
            className="w-4 h-4 group-hover:invert"
            width={500} height={300}
          />
          <span className='text-sm'>Add to cart</span>
        </button>
      </div>
    </>
  );
};

export default ProductItem;
