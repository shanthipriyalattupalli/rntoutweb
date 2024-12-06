import React from 'react';
import Image from 'next/image';

import DeliveryIcon from '/public/Assets/Icons/delivery.png';
import AvailabilityIcon from '/public/Assets/Icons/availability.png';
import AvailabilIcon from '/public/Assets/Icons/ava-stock.png';
import cartIcon from '/public/Assets/Icons/add-to-cart.png';

const customStyles = `
.group:hover .group-hover\:invert {
  filter: invert(1) brightness(1) contrast(1); /* More intense white effect */
}
`;

const ProductItem = ({ product }) => {
  const {
    availability,
    dateRange,
    images,
    name,
    price,
    stock,
    title,
    rentalAvailability,
    stockQuantity,
    rentalPrice,
    _id,
  } = product;

  const formattedDate = new Date(rentalAvailability.startDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <>
      <style>{customStyles}</style>

      <div className="bg-white rounded-lg border border-slate-200 p-4" key={_id}>
        <Image
          src={images}
          alt={title}
          className="w-full h-40 object-cover mb-4 rounded-lg"
          width={500}
          height={300}
        />
        <h2 className="text-lg font-medium text-gray-800">{title}</h2>
        <p className="cart-price text-bold text-lg mt-2">
          {price}
          <span className="text-gray-600 text-sm"> {rentalPrice.daily}/day</span>
        </p>
        <div className="flex items-center mt-2">
          <Image
            src={DeliveryIcon}
            alt="Calendar icon"
            className="w-4 h-4 text-gray-500 mr-1"
            width={16}
            height={16}
          />
          <span className="text-gray-500 text-xs">Delivery: {dateRange}</span>
        </div>
        <div className="flex items-center mt-2">
          <Image
            src={AvailabilityIcon}
            alt="Availability icon"
            className="w-4 h-4 text-gray-500 mr-1"
            width={16}
            height={16}
          />
          <span className="text-gray-500 text-xs">Availability: {formattedDate}</span>
        </div>
        <div className="flex items-center mt-2">
          <Image
            src={AvailabilIcon}
            alt="Check icon"
            className="w-4 h-4 text-blue-500"
            width={16}
            height={16}
          />
          <span className="text-blue-500 text-xs"> Available Stock: {stockQuantity}</span>
        </div>
        <button className="border-red-500 border hover:bg-red-600 text-black font-bold hover:text-white px-4 py-2 rounded-md mt-4 text-center w-full flex items-center justify-center space-x-2 group">
          <Image
            src={cartIcon}
            alt="Cart icon"
            className="w-4 h-4 group-hover:invert"
            width={16}
            height={16}
          />
          <span>Add to cart</span>
        </button>
      </div>
    </>
  );
};

export default ProductItem;
