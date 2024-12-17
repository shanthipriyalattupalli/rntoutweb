"use client";


import React, { useState,useEffect } from 'react';
const axios = require('axios');
import Categories from './ProductList/categories';
import Sidebar from './ProductList/Sidebar';
import Products from '@/Components/Home/Products';
import CategoryProducts from '@/Components/Home/CategoryProducts';

const ProductListPage = () => {
  const BASE_URL=process.env.NEXT_PUBLIC_APP_BASE_URL
  const [categories,setCategories]=useState([])
  const [categoryId,setCategoryId]=useState("")
  const [subcategories,setSubcategories]=useState([]);
  const [products, setProducts] = useState([]);

  // Fetch all product variants
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/variants/product-variants?categoryId=67483b5c3b62da6a9bed56fd`);
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
      console.log(response.data.categories,"response in categ.....................");
      setCategories(response.data.categories)
      (response.data.map((category)=>{
        console.log(category._id,"categorydivhdjvbcaj")
        setCategoryId(category._id);
        return category._id;
      
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      
    }
  }
  
  useEffect(() => {
    fetchcategories();
  }, []);

  //   const fetchSubcategories=async ()=>{
  //   try {
  //     const response= await axios.get(`${BASE_URL}/subcategories/categories/${categoryId}}`)
  //     console.log(response.data,"subcategories")
  //   } catch (error) {
  //     console.error('Error fetching subcategories:', error);
      
  //   }
  // }
  
  // useEffect(() => {
  //   fetchSubcategories();
  // }, [categoryId]);
  
  const IT_INFRASTRUCTURE_ID = "67483b5c3b62da6a9bed56fd";




  return (
    <main className="min-h-screen"> 
      <div className="container mx-auto"> 
        <Categories categories={categories} />
        <div className="flex">
          <Sidebar />
          <CategoryProducts products={getProductsByCategory(IT_INFRASTRUCTURE_ID)} />
        </div>
      </div>
    </main>
  );
};

export default ProductListPage;