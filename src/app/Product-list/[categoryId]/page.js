"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Categories from "../../Products/ProductList/categories";
import Sidebar from "../../Products/ProductList/Sidebar";
// import Products from "@/Components/Home/Products";
import Products from '../../Products/ProductList/products'
import { useParams } from "next/navigation";
import { useRouter, useSearchParams } from 'next/navigation';
import CategoryProducts from '@/Components/Home/CategoryProducts';


const ProductList = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(null);
  const [products, setProducts] = useState([]);
  const [product,setProduct] = useState([])
  const [subCategories,setSubcategories] = useState([]);
  const [subCategoryID,setSubcatgeoryID]=useState(null)
  const [priceRange, setPriceRange] = useState();
  console.log(priceRange,"priceRange")
  const params = useParams();
  const subcategoryId=(typeof window !== 'undefined') ? localStorage.getItem("subcategoryId") : null;
  console.log(subcategoryId,"subcategoryid selected in category")
  // const subcategoryId=params.subcategoryId
  console.log("subcategoryId from params:", subcategoryId);
  const categoryId = params.categoryId; // Extract categoryId directly from params
  console.log("categoryId from params:", categoryId);
  console.log(categoryId,subcategoryId,active,"activeindex productsbnhjb nmhbjn m")


  const fetchProducts = async () => {
    if (!categoryId || !subcategoryId || !active) {
      console.log("Missing required parameters: categoryId, subcategoryId, or active.");
      return;
    }
  
    try {
      // Correctly construct the request URL with params
      const response = await axios.get(`${BASE_URL}/variants/product-variants`, {
        params: {
          categoryId, 
          subCategoryId: subcategoryId, 
          productId: active,
          upTo:priceRange
        },
      });
  
      // Log and set the products state
      console.log("Product fetch response:", response?.data);
      setProducts(response?.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, [categoryId, subcategoryId,active,priceRange]);
  

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      console.log(response?.data.categories, "Categories fetched");
      setCategories(response?.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const getProductsByCategory = (categoryId,subcategoryId) => {
    return products.filter((product) => product.categoryId?._id === categoryId && product.subCategoryId?._id === subcategoryId && product.productId._id === active);
  };
  
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subcategories/categories/${categoryId}`);
      console.log(response.data, "Subcategories by category");
      const fetchedSubCategories = response.data;
  
      setSubcategories(fetchedSubCategories);
  
      // Set the first subcategory as default
      if (fetchedSubCategories.length > 0 && !subCategoryID) {
        const defaultSubcategoryId = fetchedSubCategories[0]._id;
        setSubcatgeoryID(defaultSubcategoryId);
        localStorage.setItem("subcategoryId", defaultSubcategoryId);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };
  
  useEffect(() => {
    fetchSubCategories();
  }, [categoryId]);

  const fetchProductBysubCategoryId = async () => {
    if (!categoryId || !subCategoryID) return; // Ensure both IDs are available
  
    try {
      const response = await axios.get(
        `${BASE_URL}/products/categoryProducts/?categoryId=${categoryId}&subCategoryId=${subCategoryID}`
      );
      console.log(response.data, "Products by subcategoryId");
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching products by subcategoryId:", error);
    }
  };
  
useEffect(() => {
    fetchProductBysubCategoryId();
}, [categoryId, subCategoryID]);

const handleProductClick = (productId) => {
  setActive(productId === active ? null : productId); // Toggle active state
};

useEffect(() => {
    if (product.length > 0 && !active) {
      setActive(product[0]._id); // Select the first product's ID as active by default
    }
  }, [product]);



  const handleSubcategoryId = (selectedSubcategoryId) => {
    setSubcatgeoryID(selectedSubcategoryId);
    localStorage.setItem("subcategoryId", selectedSubcategoryId); // Update localStorage
  };

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
    console.log('Updated Price Range:', newRange);
  };

  return (
    <main className="min-h-screen">
      <div className="container mx-auto">
        <Categories categories={categories} />
        <div className="flex">
       
          <Sidebar subCategories={subCategories} subcategoryId={subcategoryId} subcategoryID={handleSubcategoryId} price={handlePriceRangeChange}/>
  
          <div className="flex flex-col gap-2 p-4 w-full  h-[auto] border border-slate-200 bg-white rounded-lg">
          <div className="w-auto flex border rounded-lg justify-between">
          {product.map((productItem) => (
    <div
      key={productItem._id}
      className={`w-full text-center rounded-lg ${
        active === productItem._id ? 'bg-[#2F6FED]' : ''
      }`}
    >
      <p
        className={`w-auto justify-center flex p-2 text-center rounded-lg ${
          active === productItem._id ? 'text-white border-[#2F6FED]' : ''
        }`}
        onClick={() => handleProductClick(productItem._id)}
      >
        {productItem.productName}
      </p>
    </div>
  ))}
  </div>
            {/* <Products/> */}
          <CategoryProducts products={products} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductList;
