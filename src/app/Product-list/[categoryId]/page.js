"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Categories from "../../Products/ProductList/categories";
import Sidebar from "../../Products/ProductList/Sidebar";
import Products from "@/Components/Home/Products";
import { useParams } from "next/navigation";

const ProductList = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  
  const params = useParams();
  const categoryId = params.categoryId; // Extract categoryId directly from params
  console.log("categoryId from params:", categoryId);

  const fetchProducts = async () => {
    if (!categoryId) return;
    try {
      const response = await axios.get(
        `${BASE_URL}/variants/product-variants`
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

  return (
    <main className="min-h-screen">
      <div className="container mx-auto">
        <Categories categories={categories} />
        <div className="flex border border-slate-200 bg-white">
          <Sidebar />
          <Products products={getProductsByCategory(categoryId)} />
        </div>
      </div>
    </main>
  );
};

export default ProductList;
