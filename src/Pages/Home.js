"use client";

import React, { useState, useEffect } from "react";
import "../styles/Home.css";
import Banner from "../Components/Home/Banner";
import CategoryList from "../Components/Home/CategoryList";
import ProductGrid from "../Components/Home/ProductGrid";
import Products from "../Components/Home/Products";
import CuratedCollections from "../Components/Home/CuratedCollections";
import ITInfrastructure from "../Components/Home/ITInfrastructure";
import Furniture from "../Components/Home/Furniture";
import PromotionalAd from "../Components/Home/Promotionalad";
import MedicalEquipment from "../Components/Home/MedicalEquipment";
import VacationEquipment from "../Components/Home/VacationEquipment";
import Vehicles from "../Components/Home/Vehicles";
import PartyMaterial from "../Components/Home/PartyMaterial";
import SportsGym from "../Components/Home/SportsGym";
import HouseholdKitchen from "../Components/Home/HouseholdKitchen";
import Services from "../Components/Home/Services";
import CityExplorer from "../Components/Home/CityExplorer";
import Achievements from "../Components/Home/Achievements";
import Blogs from "../Components/Home/Blogs";
import Testimonials from "../Components/Home/Testimonials";
import MobileApp from "../Components/Home/MobileApp";
import axios from "axios";
import { ToastContainer } from "react-toastify";

const Home = ({ categories }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [products, setProducts] = useState([]);

  // const [categoryId, setCategoryId] = useState("");

  // useEffect(() => {
  //   const categoryId = localStorage.getItem("categoryId");
  //   setCategoryId(categoryId);
  // }, []);
 const categoryId = (typeof window !== 'undefined') ? localStorage.getItem("categoryId") : null;
  // Fetch all product variants
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/variants/product-variants`);
      console.log(response, "fetchproductstfgvhb");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductsByCategory = (categoryId) => {
    console.log(
      "Getting products by category",
      products.filter((product) => product.categoryId._id === categoryId)
    );
    console.log("caategoryid", categoryId);
    return products.filter((product) => product.categoryId._id === categoryId);
  };

  const getToptrendingProducts = () => {
    console.log(
      "Getting products by category",
      products.filter((product) => product.categoryId._id === categoryId)
    );
    console.log("caategoryid", categoryId);
    return products.filter((product) => product.categoryId._id === categoryId);
  };

  const IT_INFRASTRUCTURE_ID = "67483b5c3b62da6a9bed56fd";
  const FURNITURE_ID = "67483b8c3b62da6a9bed5700";
  const MEDICAL_EQUIPMENT_ID = "67483b9b3b62da6a9bed5703";
  const VACATION_EQUIPMENT_ID = "67483bac3b62da6a9bed5706";
  const VEHICLES_ID = "67483bc73b62da6a9bed5709";
  const PARTY_MATERIAL_ID = "67483bd53b62da6a9bed570c";
  const SPORTS_GYM_ID = "67483be13b62da6a9bed570f";
  const HOUSEHOLD_KITCHEN_ID = "67483bed3b62da6a9bed5712";

  return (
    <main className='bg-slate-50 tmp-bg'>
      <Banner />
      <CategoryList categories={categories} />
      <ProductGrid categories={categories} />
      <Products
        products={getToptrendingProducts(categoryId)}
        categoryId={categoryId}
      />
      <CuratedCollections />
      {/* Pass filtered products to each component */}
      <ITInfrastructure
        products={getProductsByCategory(IT_INFRASTRUCTURE_ID)}
        categoryId={IT_INFRASTRUCTURE_ID}
      />
      <Furniture
        products={getProductsByCategory(FURNITURE_ID)}
        categoryId={FURNITURE_ID}
      />
      <PromotionalAd />
      <MedicalEquipment
        products={getProductsByCategory(MEDICAL_EQUIPMENT_ID)}
        categoryId={MEDICAL_EQUIPMENT_ID}
      />
      <VacationEquipment
        products={getProductsByCategory(VACATION_EQUIPMENT_ID)}
        categoryId={VACATION_EQUIPMENT_ID}
      />
      <PromotionalAd />
      <Vehicles
        products={getProductsByCategory(VEHICLES_ID)}
        categoryId={VEHICLES_ID}
      />
      <PartyMaterial
        products={getProductsByCategory(PARTY_MATERIAL_ID)}
        categoryId={PARTY_MATERIAL_ID}
      />
      <PromotionalAd />
      <SportsGym
        products={getProductsByCategory(SPORTS_GYM_ID)}
        categoryId={SPORTS_GYM_ID}
      />
      <HouseholdKitchen
        products={getProductsByCategory(HOUSEHOLD_KITCHEN_ID)}
        categoryId={HOUSEHOLD_KITCHEN_ID}
      />
      <Services />
      <CityExplorer />
      <Achievements />
      <Blogs />
      <Testimonials />
      <MobileApp />
    </main>
  );
};

export default Home;
