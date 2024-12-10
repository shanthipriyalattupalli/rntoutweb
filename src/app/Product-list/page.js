"use client";


import React, { useState,useEffect } from 'react';
const axios = require('axios');
import Categories from '../Products/ProductList/categories';
import Sidebar from '../Products/ProductList/Sidebar';
import Products from '@/Components/Home/Products';
import CategoryProducts from '@/Components/Home/CategoryProducts';

import { useRouter, useSearchParams } from 'next/navigation';

const ProductLists = () => {
  const BASE_URL=process.env.NEXT_PUBLIC_APP_BASE_URL
  const router=useRouter();
  const categoryId = useSearchParams();
  console.log(categoryId,"categoryid")
  const [categories,setCategories]=useState([])
  // const [categoryId,setCategoryId]=useState("")
  const [subcategories,setSubcategories]=useState([]);
  const [products, setProducts] = useState([]);

  // Fetch all product variants
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/variants/product-variants`);
      console.log(response,"fetchproductstfgvhb")
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductsByCategory = (categoryId) => {
    console.log("Getting products by category",products.filter((product) => product.categoryId._id === categoryId))
    console.log("caategoryid",categoryId)
    return products.filter((product) => product.categoryId._id === categoryId);
  };

  const fetchcategories=async ()=>{

    
    try {
     
      const response= await axios.get(`${BASE_URL}/categories`)
      console.log(response.data,"categories");
      setCategories(response.data)
      (response.data.map((category)=>{
        console.log(category._id,"categorydivhdjvbcaj")
        // setCategoryId(category._id);
        return category._id;
      
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      
    }
  }
  
  useEffect(() => {
    fetchcategories();
  }, []);
 
  const IT_INFRASTRUCTURE_ID = "67483b5c3b62da6a9bed56fd";

  return (
    <main className="min-h-screen"> 
      <div className="container mx-auto"> 
        <Categories categories={categories} />
        <div className="flex border border-slate-200 bg-white">
          <Sidebar />
          <CategoryProducts products={getProductsByCategory(categoryId)} />
        </div>
      </div>
    </main>
  );
};

export default ProductLists;