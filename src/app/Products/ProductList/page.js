import React from 'react';
import Submenu from './ProductList/Submenu';
import Sidebar from './ProductList/Sidebar';
import Products from '@/Components/Home/Products';

const ProductListPage = () => {
  return (
    <main className="min-h-screen"> 
      <div className="container mx-auto"> 
        <Submenu />
        <div className="flex border border-slate-200 bg-white">
          <Sidebar />
          <Products />
        </div>
      </div>
    </main>
  );
};

export default ProductListPage;