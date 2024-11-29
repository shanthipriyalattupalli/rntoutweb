"use client";


import React, { useState,useEffect } from 'react';
const axios = require('axios');
import Categories from './ProductList/categories';
import Sidebar from './ProductList/Sidebar';
import Products from '@/Components/Home/Products';

const ProductListPage = () => {
  const BASE_URL=process.env.NEXT_PUBLIC_APP_BASE_URL
  const [categories,setCategories]=useState([])
  const [categoryId,setCategoryId]=useState("")
  const [subcategories,setSubcategories]=useState([])
  const fetchcategories=async ()=>{
    
    try {
     
      const response= await axios.get(`${BASE_URL}/categories`)
      console.log(response.data,"categories");
      setCategories(response.data)
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

    const fetchSubcategories=async ()=>{
    try {
      const response= await axios.get(`${BASE_URL}/subcategories/categories/${categoryId}}`)
      console.log(response.data,"subcategories")
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      
    }
  }
  
  useEffect(() => {
    fetchSubcategories();
  }, [categoryId]);

  return (
    <main className="min-h-screen"> 
      <div className="container mx-auto"> 
        <Categories categories={categories} />
        <div className="flex border border-slate-200 bg-white">
          <Sidebar />
          <Products />
        </div>
      </div>
    </main>
  );
};

export default ProductListPage;