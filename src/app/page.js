
import React from "react";
import ScrollToTop from "../Components/ScrollToTop";
import Banner from "../Components/Home/Banner";
import CategoryList from "../Components/Home/CategoryList";
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
import { cookies } from 'next/headers';


import axios from "axios";
import HomeComponent from "../Pages/Home";
import FirebaseComponent from "@/Pages/FirebaseComponent";
const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

const fetchBanners = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/banners`, {
      params: {
        device_type: "website",
        banner_type: "landing_page_banner",
        theme_type: "light",

      },
    });

    console.log(response.data, "resposne of banners")
    return response.data.data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
};

const fetchBanner = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/banners`, {
      params: {
        device_type: "website",
        banner_type: "festival_banner",
        theme_type: "light",
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
};


const fetchCategories = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/categories`);
    return response.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};


const fetchProducts = async (latitude, longitude, radius) => {

  try {
    const response = await axios.get(`${BASE_URL}/variants/variants-by-category`, {
      params: {
        latitude: latitude?.value,
        longitude: longitude?.value,
        radius: radius?.value
      }
    });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

const fetchBlogs = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/blogs`);
    return response.data.blogs;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};




export const metadata = {
  title: "rntout",
  description: "Welcome to my awesome website!",
};






const Home = async () => {
  const cookieStore = cookies();
  const latitude =await cookieStore.get('latitude');
  const longitude =await cookieStore.get('longitude');
  const radius =await cookieStore.get('selectedDistance')


  const banners = await fetchBanners();
  const banner = await fetchBanner();
  const categories = await fetchCategories();
  const products = await fetchProducts(latitude, longitude, radius);
  console.log(products, "products")
  const blogs = await fetchBlogs();
  const activeBanners = banner.filter(banner => banner.status === "active");
  return (
    <div>

      <FirebaseComponent />
      <Banner banners={banners} />
      <CategoryList categories={categories} />

      {/* <CuratedCollections /> */}
      {Object.entries(products).map(([categoryName, productsArray], index) => {
        const categoryId = productsArray[0]?.categoryId?._id;

        return (
          <div key={categoryName}>
            <ITInfrastructure
              title={categoryName}
              products={productsArray}
              categoryId={categoryId}
            />
          </div>
        );
      })}
                    <div className="my-4">
                <PromotionalAd banner={activeBanners[0]} />
              </div>
                    <Products categories={categories} />

      {/* <PromotionalAd banner={activeBanners[1]} /> */}
      {/* <ITInfrastructure products={products["IT Infrastructure"] || []} categoryId={categories[0]?._id} /> */}
      {/* <Furniture products={products["Furniture"] || []} categoryId={categories[1]?._id} />
      <MedicalEquipment products={products["Medical Equipment"] || []} categoryId={categories[2]?._id} />
      <VacationEquipment products={products["Vacation Equipment"] || []} categoryId={categories[3]?._id} />
      <PromotionalAd banner={activeBanners[0]} />
      {/* <PromotionalAd banner={activeBanners[1]} /> */}
      {/* <Vehicles products={products["Vehicles"] || []} categoryId={categories[4]?._id} />
      <PartyMaterial products={products["Party Material"] || []} categoryId={categories[5]?._id} />
      <SportsGym products={products["Sport & Gym"] || []} categoryId={categories[6]?._id} />
      <HouseholdKitchen products={products["Household & Kitchen"] || []} categoryId={categories[7]?._id} />  */}
      <Services />
      {/* <Achievements /> */}
      <Blogs blogs={blogs} />
      {/* <Testimonials /> */}
      {/* <HomeComponent /> */}

    </div>
  );
}

export default Home;







