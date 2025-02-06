"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/Home.css';
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

const Home = () => {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const categoryIds = (typeof window !== 'undefined') ? localStorage.getItem("categoryId") : null;
  const latitude=(typeof window !== 'undefined') ? localStorage.getItem("latitude") : null;
  const longitude=(typeof window !== 'undefined') ? localStorage.getItem("longitude") : null;
  const distance = (typeof window !== 'undefined') ? localStorage.getItem("selectedDistance") : null

  // Define category IDs
  const CATEGORY_IDS = {
    IT_INFRASTRUCTURE: "67483b5c3b62da6a9bed56fd",
    FURNITURE: "67483b8c3b62da6a9bed5700",
    MEDICAL_EQUIPMENT: "67483b9b3b62da6a9bed5703",
    VACATION_EQUIPMENT: "67483bac3b62da6a9bed5706",
    VEHICLES: "67483bc73b62da6a9bed5709",
    PARTY_MATERIAL: "67483bd53b62da6a9bed570c",
    SPORTS_GYM: "67483be13b62da6a9bed570f",
    HOUSEHOLD_KITCHEN: "67483bed3b62da6a9bed5712",
  };

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        setCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Function to fetch products for a specific category
  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`${BASE_URL}/variants/filter`, {
        params: {
          categoryId:categoryId,
          search:"",
          latitude: latitude,
          longitude: longitude,
          distance:distance,
          // minPrice: minPrice,
          // maxPrice: maxPrice,
        },
      });

      setCategoryProducts(prevState => ({
        ...prevState,
        [categoryId]: response.data.data,
      }));
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
    }
  };

  // Fetch products for all categories
  useEffect(() => {
    Object.values(CATEGORY_IDS).forEach(categoryId => {
      fetchProductsByCategory(categoryId);
    });
  }, []);

  return (
    <main className='bg-slate-50 tmp-bg'>
      <Banner />
      <CategoryList categories={categories} />
      <ProductGrid categories={categories} />
      <Products products={categoryProducts[categoryIds] || []} categoryId={categoryIds} />
      <CuratedCollections />

      <ITInfrastructure products={categoryProducts[CATEGORY_IDS.IT_INFRASTRUCTURE] || []} categoryId={CATEGORY_IDS.IT_INFRASTRUCTURE} />
      <Furniture products={categoryProducts[CATEGORY_IDS.FURNITURE] || []} categoryId={CATEGORY_IDS.FURNITURE} />
      <PromotionalAd />
      <MedicalEquipment products={categoryProducts[CATEGORY_IDS.MEDICAL_EQUIPMENT] || []} categoryId={CATEGORY_IDS.MEDICAL_EQUIPMENT} />
      <VacationEquipment products={categoryProducts[CATEGORY_IDS.VACATION_EQUIPMENT] || []} categoryId={CATEGORY_IDS.VACATION_EQUIPMENT} />
      <Vehicles products={categoryProducts[CATEGORY_IDS.VEHICLES] || []} categoryId={CATEGORY_IDS.VEHICLES} />
      <PartyMaterial products={categoryProducts[CATEGORY_IDS.PARTY_MATERIAL] || []} categoryId={CATEGORY_IDS.PARTY_MATERIAL} />
      <SportsGym products={categoryProducts[CATEGORY_IDS.SPORTS_GYM] || []} categoryId={CATEGORY_IDS.SPORTS_GYM} />
      <HouseholdKitchen products={categoryProducts[CATEGORY_IDS.HOUSEHOLD_KITCHEN] || []} categoryId={CATEGORY_IDS.HOUSEHOLD_KITCHEN} />

      <Services />
      <CityExplorer />
      <Achievements />
      <Blogs />
      <Testimonials />
    </main>
  );
};

export default Home;
