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
  const [banners, setBanners] = useState([])
  const [banner, setBanner] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
const [categoryId,setCategoryId]=useState(true)
  const categoryIds = (typeof window !== 'undefined') ? localStorage.getItem("categoryId") : null;
  const latitude = (typeof window !== 'undefined') ? localStorage.getItem("latitude") : null;
  const longitude = (typeof window !== 'undefined') ? localStorage.getItem("longitude") : null;
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Function to fetch products for a specific category
  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`${BASE_URL}/variants/filter`, {
        params: {
          categoryId: categoryId,
          search: "",
          latitude: latitude,
          longitude: longitude,
          distance: distance,
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
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch products for all categories
  useEffect(() => {
    Object.values(CATEGORY_IDS).forEach(categoryId => {
      fetchProductsByCategory(categoryId);
    });
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/banners`, {
        params: {
          device_type: "website",
          banner_type: "landing_page_banner",
          theme_type: "light",
          // status: "inactive",
          // minPrice: minPrice,
          // maxPrice: maxPrice,
        },
      });

      setBanners(response.data.data)
    } catch (error) {
      console.error(`Error fetching products for category :`, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanner = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/banners`, {
        params: {
          device_type: "website",
          banner_type: "festival_banner",
          theme_type: "light",
          // status: "inactive",
          // minPrice: minPrice,
          // maxPrice: maxPrice,
        },
      });

      if (response.data && response.data.data) {
        setBanner(response.data.data); // Ensure you're setting the array
      }
    } catch (error) {
      console.error(`Error fetching products for category :`, error);
    }
  };
  useEffect(() => {
    fetchBanner();
  }, []);


  const handleCategoryClick =(categoryId)=>{
    console.log(categoryId,"categoryIdssssssssss")

    setCategoryId(categoryId)
  }

  useEffect(()=>{
    setCategoryId(categories[0]?._id)
  })
  return (
    <main className='tmp-bg'>
      <Banner banners={banners} isLoading={isLoading} />
      <CategoryList categories={categories} isLoading={isLoading} />
      <ProductGrid categories={categories} isLoading={isLoading} categoryIds={handleCategoryClick}/>
      <Products products={categoryProducts[categoryId] || []} categoryId={categoryId} />
      <CuratedCollections />

      <ITInfrastructure products={categoryProducts[CATEGORY_IDS.IT_INFRASTRUCTURE] || []} categoryId={CATEGORY_IDS.IT_INFRASTRUCTURE} isLoading={isLoading} />
      <Furniture products={categoryProducts[CATEGORY_IDS.FURNITURE] || []} categoryId={CATEGORY_IDS.FURNITURE} isLoading={isLoading} />
      <PromotionalAd banner={banner[0]} />
      <MedicalEquipment products={categoryProducts[CATEGORY_IDS.MEDICAL_EQUIPMENT] || []} categoryId={CATEGORY_IDS.MEDICAL_EQUIPMENT} isLoading={isLoading} />
      <VacationEquipment products={categoryProducts[CATEGORY_IDS.VACATION_EQUIPMENT] || []} categoryId={CATEGORY_IDS.VACATION_EQUIPMENT} isLoading={isLoading} />
      <PromotionalAd banner={banner[1]} isLoading={isLoading} />
      <Vehicles products={categoryProducts[CATEGORY_IDS.VEHICLES] || []} categoryId={CATEGORY_IDS.VEHICLES} isLoading={isLoading} />
      <PartyMaterial products={categoryProducts[CATEGORY_IDS.PARTY_MATERIAL] || []} categoryId={CATEGORY_IDS.PARTY_MATERIAL} isLoading={isLoading} />
      <SportsGym products={categoryProducts[CATEGORY_IDS.SPORTS_GYM] || []} categoryId={CATEGORY_IDS.SPORTS_GYM} isLoading={isLoading} />
      <HouseholdKitchen products={categoryProducts[CATEGORY_IDS.HOUSEHOLD_KITCHEN] || []} categoryId={CATEGORY_IDS.HOUSEHOLD_KITCHEN} isLoading={isLoading} />

      <Services isLoading={isLoading} />
      {/* <CityExplorer /> */}
      <Achievements isLoading={isLoading} />
      <Blogs isLoading={isLoading} />
      <Testimonials isLoading={isLoading} />
    </main>
  );
};

export default Home;
