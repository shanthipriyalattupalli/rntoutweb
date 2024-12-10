"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Categories from "../../Products/ProductList/categories";
import Sidebar from "../../Products/ProductList/Sidebar";
import Products from "@/Components/Home/Products";
import { useParams } from "next/navigation";
import CategoryProducts from '@/Components/Home/CategoryProducts';


const ProductList = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [subCategories,setSubcategories] = useState([]);
  
  const params = useParams();
  const categoryId = params.categoryId; // Extract categoryId directly from params
  console.log("categoryId from params:", categoryId);

  const fetchProducts = async () => {
    if (!categoryId) return;
    try {
      const response = await axios.get(
        `${BASE_URL}/variants/product-variants?categoryId=${categoryId}`
      );
      console.log(response, "Product fetch response");
      setProducts(response?.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryId]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      console.log(response?.data, "Categories fetched");
      setCategories(response?.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getProductsByCategory = (categoryId) => {
    return products.filter((product) => product.categoryId?._id === categoryId) || [];
  };
  
  const fetchSubCategories=async()=>{
    try {
      const response= await axios.get(`${BASE_URL}/subcategories/categories/${categoryId}`)
      console.log(response.data,"subcategories by category");
      setSubcategories(response.data);
      
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  }
  useEffect(() => {
    fetchSubCategories();
  }, [categoryId]);



  return (
    <main className="min-h-screen">
      <div className="container mx-auto">
        <Categories categories={categories} />
        <div className="flex border border-slate-200 bg-white">
          <Sidebar subCategories={subCategories} />
          <CategoryProducts products={getProductsByCategory(categoryId)} />
        </div>
      </div>
    </main>
  );
};

export default ProductList;
