"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Categories from "../../Products/ProductList/categories";
import Sidebar from "../../Products/ProductList/Sidebar";
import { useParams } from "next/navigation";
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
  const [rating,setRating]=useState();
  const [breadcrumbCategoryName, setBreadcrumbCategoryName] = useState("");
  const params = useParams();
  const categoryId = params.categoryId; // Extract categoryId directly from params
  const subcategoryId=(typeof window !== 'undefined') ? localStorage.getItem(`subcategoryId_${categoryId}`) : null;
  const latitude = (typeof window !== 'undefined') ? localStorage.getItem("latitude") : null;
  const longitude = (typeof window !== 'undefined') ? localStorage.getItem("longitude") : null;
  const distances = (typeof window !== 'undefined') ? localStorage.getItem("selectedDistance") : null

  const fetchProducts = async () => {
    if (!categoryId || !subcategoryId || !active) {
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
          rating:rating,
        },
      });
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


  const fetchSubCategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subcategories/categories/${categoryId}`);
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
    setMinPrice(min);
    setMaxPrice(max)
    // Use the values as needed
  };

 const handleDistance=(distance)=>{
   setDistance(distance)
   // Use the value as needed
 }
const handleRating=(rating)=>{
   setRating(rating)
 
}

 useEffect(() => {
  const productContainer = document.getElementById("product-container");

  if (productContainer) {
    const handleWheelScroll = (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        productContainer.scrollLeft += event.deltaY;
      }
    };

    productContainer.addEventListener("wheel", handleWheelScroll);

    return () => productContainer.removeEventListener("wheel", handleWheelScroll);
  }
}, []);


  return (
    <main className="min-h-screen  w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-5">
      <ScrollToTop/>
      <div className="px-8 sm:px-8 md:px-2 xl:px-14 lg:px-16 2xl:px-16">
      <Breadcrumb categoryName={breadcrumbCategoryName} />
      </div>
      <div className="mx-auto lg:px-16">
        {/* <Categories categories={categories} /> */}

        <div className="flex flex-col sm:flex-row">


          <Sidebar categories={categories} subCategories={subCategories} subcategoryId={subcategoryId} subcategoryID={handleSubcategoryId} onPriceChange={handlePriceChange} distance={handleDistance} rating={handleRating}/>

          <div className="w-full flex flex-col gap-3 py-4 h-[auto] border border-slate-200  bg-white rounded-r-lg overflow-hidden">
            
          {product?.length > 0 && 
            <div className="flex items-center gap-2 px-8 border-b-2 pb-4" >
              <p style={{color:"#9d9797"}} 
className="cursor-pointer"
 onClick={() => {
  const categoryContainer = document.getElementById("product-container");
  if (categoryContainer) {
    categoryContainer.scrollBy({ left: -200, behavior: "smooth" }); // Scroll right by 200px smoothly
  }
}}><span>{"<<"}</span> </p>
             <div id="product-container" className="w-[956px] h-[32px] overflow-x-auto border overflow-visible whitespace-nowrap rounded-lg scrollbar-hide">
  <div id="product-container" className="flex w-max justify-center">
    {product?.map((productItem) => (
      <div
        key={productItem._id}
        className={`h-[29px] w-[316px] justify-center text-center rounded-lg px-[8px] py-[4px] cursor-pointer ${
          active === productItem._id ? 'bg-[#2F6FED] text-white' : ''
        }`}
        onClick={() => handleProductClick(productItem._id)}
      >
        {productItem.productName} 
      </div>
    ))}
  </div>
</div>
<p style={{color:"#9d9797"}} 
className="cursor-pointer"
 onClick={() => {
  const categoryContainer = document.getElementById("product-container");
  if (categoryContainer) {
    categoryContainer.scrollBy({ left: 300, behavior: "smooth" }); 
  }
}}><span>{">>"}</span> </p>
  
</div>}
            <CategoryProducts products={products} />
            </div>
        </div>
      </div>
    </main>
  );
};

export default ProductList;
