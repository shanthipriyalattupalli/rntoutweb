import React from 'react';
const axios = require('axios');
import Categories from './ProductList/categories';
import Sidebar from './ProductList/Sidebar';
import Products from '@/Components/Home/Products';

const ProductListPage = () => {
  

  
  // const fetchSubcategories=async ()=>{
  //   try {
  //     const response= await axios.get(`${BASE_URL}/subcategories/categories/1}`)
  //     console.log(response.data,"subcategories")
  //   } catch (error) {
  //     console.error('Error fetching subcategories:', error);
      
  //   }
  // }
  
  // useEffect(() => {
  //   fetchSubcategories();
  // }, [1]);

  return (
    <main className="min-h-screen"> 
      <div className="container mx-auto"> 
      <Categories />
        <div className="flex border border-slate-200 bg-white">
          <Sidebar />
          <Products />
        </div>
      </div>
    </main>
  );
};

export default ProductListPage;