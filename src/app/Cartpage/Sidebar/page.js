"use client";

import React, { useState } from "react";
import "@/styles/Sidebar.css";

const Sidebar = ({ isOpen, onClose, products }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(
    products?.map(() => false)
  );

  if (!isOpen) return null;

  // Handle "Select All" toggle
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);
    setSelectedProducts(products?.map(() => newSelectAll));
  };

  // Handle individual checkbox toggle
  const handleProductSelect = (index) => {
    const updatedSelections = [...selectedProducts];
    updatedSelections[index] = !updatedSelections[index];
    setSelectedProducts(updatedSelections);

    // Update "Select All" checkbox based on individual selections
    setSelectAll(updatedSelections.every((isSelected) => isSelected));
  };

  return (
    <div className='sidebar-overlay' onClick={onClose}>
      <div className='sidebar' onClick={(e) => e.stopPropagation()}>
        <div className='sidebar-header'>
          <h2>RntOut Insurance</h2>
          <button onClick={onClose} className='close-button'>
            &times;
          </button>
        </div>
        <div className='sidebar-content'>
          <label className='select-all'>
            <input
              type='checkbox'
              checked={selectAll}
              onChange={handleSelectAll}
            />
            Select all
          </label>
          {products.map((product, index) => (
            <div key={index} className='product-item'>
              <input
                type='checkbox'
                className='product-checkbox'
                checked={selectedProducts[index]}
                onChange={() => handleProductSelect(index)}
              />
              <img
                src={product.variant_id.images[0]}
                alt='Product'
                className='product-image'
              />
              <div className='product-info'>
                <h4 className='product-name'>{product.variant_id.title}</h4>
                <p className='product-price'>
                  {product.variant_id.rentalPrice.monthly}/month
                </p>
              </div>
            </div>
          ))}
          <button className='confirm-button' onClick={onClose}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
