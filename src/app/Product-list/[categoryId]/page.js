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
import Breadcrumb from "@/Components/Breadcrumb/Breadcrumb";
import ScrollToTop from "@/app/ScrollToTop";


const ProductList = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState(null);
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState([])
  const [subCategories, setSubcategories] = useState([]);
  const [subCategoryID, setSubcatgeoryID] = useState(null)
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [distance,setDistance] = useState();
  const [breadcrumbCategoryName, setBreadcrumbCategoryName] = useState("");
  const params = useParams();
  const categoryId = params.categoryId; // Extract categoryId directly from params
  console.log("categoryId from params:", categoryId);
  const subcategoryId=(typeof window !== 'undefined') ? localStorage.getItem(`subcategoryId_${categoryId}`) : null;
  const latitude = (typeof window !== 'undefined') ? localStorage.getItem("latitude") : null;
  const longitude = (typeof window !== 'undefined') ? localStorage.getItem("longitude") : null;
  console.log(subcategoryId, "subcategoryid selected in category")
  // const subcategoryId=params.subcategoryId
  console.log("subcategoryId from params:", subcategoryId);

  console.log(categoryId, subcategoryId, active, "activeindex productsbnhjb nmhbjn m")

  const distances = (typeof window !== 'undefined') ? localStorage.getItem("selectedDistance") : null

  const fetchProducts = async () => {
    if (!categoryId || !subcategoryId || !active) {
      console.log("Missing required parameters: categoryId, subcategoryId, or active.");
      return;
    }

    try {
      // Correctly construct the request URL with params
      const response = await axios.get(`${BASE_URL}/variants/filter`, {
        params: {
          categoryId,
          subCategoryId: subcategoryId,
          productId: active,
          search:"",
          latitude: latitude,
          longitude: longitude,
          distance:distance,
          minPrice: minPrice,
          maxPrice: maxPrice,
        },
      });

      // Log and set the products state
      console.log("Product fetch response:", response?.data.data);
      setProducts(response?.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  useEffect(() => {
    fetchProducts();
  }, [categoryId, subcategoryId, active, minPrice, maxPrice,distance]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      console.log(response?.data.categories, "Categories fetched");
      setCategories(response?.data.categories);
      if (categoryId) {
        const currentCategory = response?.data.categories.find(
          (category) => category._id === categoryId
        );
        setBreadcrumbCategoryName(currentCategory?.categoryName || "");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  

  useEffect(() => {
    fetchCategories();
  }, []);

  const getProductsByCategory = (categoryId, subcategoryId) => {
    return products.filter((product) => product.categoryId?._id === categoryId && product.subCategoryId?._id === subcategoryId && product.productId._id === active);
  };
  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subcategories/categories/${categoryId}`);
      console.log(response.data, "Subcategories by category");
      const fetchedSubCategories = response.data;
  
      setSubcategories(fetchedSubCategories);
  
      // Check if a subcategory ID exists in localStorage for the selected category
      const storedSubcategoryId = localStorage.getItem(`subcategoryId_${categoryId}`);
  
      if (fetchedSubCategories.length > 0) {
        if (storedSubcategoryId) {
          // Use the stored subcategory ID
          setSubcatgeoryID(storedSubcategoryId);
        } else {
          // Set the first subcategory as default and store it in localStorage
          const defaultSubcategoryId = fetchedSubCategories[0]._id;
          setSubcatgeoryID(defaultSubcategoryId);
          localStorage.setItem(`subcategoryId_${categoryId}`, defaultSubcategoryId);
        }
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
    setActive(productId === active ? null : productId);
  };

  useEffect(() => {
    if (product.length > 0 && !active) {
      setActive(product[0]._id);
    }
  }, [product]);



  const handleSubcategoryId =async (selectedSubcategoryId) => {
    setSubcatgeoryID(selectedSubcategoryId);
   localStorage.setItem(`subcategoryId_${categoryId}`, selectedSubcategoryId);
    try {
      const response = await axios.get(
        `${BASE_URL}/products/categoryProducts/?categoryId=${categoryId}&subCategoryId=${selectedSubcategoryId}`
      );
      console.log(response.data, "Products by subcategoryId");
      setProduct(response.data);
  
      // Set the first product as active
      if (response.data.length > 0) {
        setActive(response.data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching products by subcategoryId:", error);
    }
  };
  const handlePriceChange = (min, max) => {
    console.log("Updated Prices:", { min, max });
    setMinPrice(min);
    setMaxPrice(max)
    // Use the values as needed
  };

 const handleDistance=(distance)=>{
   console.log("Updated Distance:", distance);
   setDistance(distance)
   // Use the value as needed
 }

  return (
    <main className="min-h-screen py-6 w-full mx-auto max-w-screen-2xl px-4 sm:px-6 md:px-8 lg:px-12 xl:px-5">
      <ScrollToTop/>
      <div className="px-16">
      <Breadcrumb categoryName={breadcrumbCategoryName} />
      </div>
      <div className="container mx-auto w-5xl">
        {/* <Categories categories={categories} /> */}

        <div className="flex">

          <Sidebar subCategories={subCategories} subcategoryId={subcategoryId} subcategoryID={handleSubcategoryId} onPriceChange={handlePriceChange} distance={handleDistance}/>

          <div className="w-full flex flex-col gap-2 py-4 px-2  h-[auto] border border-slate-200 bg-white rounded-r-lg overflow-hidden">
          <div className="w-full  overflow-x-auto border rounded-lg scrollbar-hide">
  <div className="flex w-max">
    {product.map((productItem) => (
      <div
        key={productItem._id}
        className={`text-center rounded-lg px-4 py-2 cursor-pointer ${
          active === productItem._id ? 'bg-[#2F6FED] text-white' : ''
        }`}
        onClick={() => handleProductClick(productItem._id)}
      >
        {productItem.productName}
      </div>
    ))}
  </div>
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
