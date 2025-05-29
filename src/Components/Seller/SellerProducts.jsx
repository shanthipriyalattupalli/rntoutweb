"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Categories from "../Products/ProductList/categories";
import CategoryProducts from "@/Components/Seller/CategoryProducts";

const ProductListPage = ({ products }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const IT_INFRASTRUCTURE_ID = "67483b5c3b62da6a9bed56fd"; // Default category

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      setCategories(response.data.categories);

      // Set default categoryId (first category in response, if exists)
      if (response.data.categories.length > 0) {
        setCategoryId(response.data.categories[0]._id);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter products by categoryId
  const getProductsByCategory = () => {


    return products.filter((product) => {
        return product.categoryId?._id === categoryId;
    });
};


  return (
    <main className="min-h-screen">
      <div className="container mx-auto mt-6">
        <Categories categories={categories} setCategoryId={setCategoryId} categoryId={categoryId} />
        <div className="flex">
          <CategoryProducts products={getProductsByCategory()} />
        </div>
      </div>
    </main>
  );
};

export default ProductListPage;
