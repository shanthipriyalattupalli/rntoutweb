"use client";

import React, { useState, useEffect } from "react";
const axios = require("axios");
import Categories from "../../Components/Products/ProductList/categories";
import Sidebar from "../../Components/Products/ProductList/Sidebar";
import Products from "@/Components/Home/Products";
import CategoryProducts from "@/Components/Home/CategoryProducts";

import { useParams, useRouter } from "next/navigation";

const ProductLists = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const router = useRouter();
  const params = useParams();
  const categoryId = params.categoryId;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch all product variants
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/variants/product-variants`);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const getProductsByCategory = (categoryId) => {

    if (!categoryId) return products;
    return products.filter((product) => product.categoryId._id === categoryId);
  };

  const fetchcategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);

      setCategories(response.data.categories)(
        response?.data.map((category) => {
          // setCategoryId(category._id);
          return category._id;
        })
      );
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchcategories();
  }, []);

  const IT_INFRASTRUCTURE_ID = "67483b5c3b62da6a9bed56fd";

  return (
    <main className='min-h-screen'>
      <div className='container mx-auto'>
        <Categories categories={categories} />
        <div className='flex border border-slate-200 bg-white'>
          <Sidebar />
          <CategoryProducts products={getProductsByCategory(categoryId)} />
        </div>
      </div>
    </main>
  );
};

export default ProductLists;
