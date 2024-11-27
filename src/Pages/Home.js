import React from 'react';
import Banner from '../Components/Home/Banner';
import CategoryList from '../Components/Home/CategoryList';
import ProductGrid from '../Components/Home/ProductGrid';
import Products from '../Components/Home/Products';
import CuratedCollections from '../Components/Home/CuratedCollections';
import ITInfrastructure from '../Components/Home/ITInfrastructure';
import Furniture from '../Components/Home/Furniture';
import PromotionalAd from '../Components/Home/Promotionalad'; 
import MedicalEquipment from '../Components/Home/MedicalEquipment';
import VacationEquipment from '../Components/Home/VacationEquipment';
import Vehicles from '../Components/Home/Vehicles';
import PartyMaterial from '../Components/Home/PartyMaterial';
import SportsGym from '../Components/Home/SportsGym';
import HouseholdKitchen from '../Components/Home/HouseholdKitchen';
import Services from '../Components/Home/Services';
import CityExplorer from '../Components/Home/CityExplorer';
import Achievements from '../Components/Home/Achievements';
import Blogs from '../Components/Home/Blogs';
import Testimonials from '../Components/Home/Testimonials';
import MobileApp from '../Components/Home/MobileApp';

const Home=()=>{
  return (
    <main className="bg-slate-50 tmp-bg"> 
      <Banner />
      <CategoryList />
      <ProductGrid />
      <Products />
      <CuratedCollections />
      <ITInfrastructure />
      <Furniture />
      <PromotionalAd /> 
      <MedicalEquipment />
      <VacationEquipment />
      <PromotionalAd />
      <Vehicles />
      <PartyMaterial />
      <PromotionalAd />
      <SportsGym />
      <HouseholdKitchen />
      <Services />
      <CityExplorer />
      <Achievements />
      <Blogs />
      <Testimonials />
      <MobileApp /> 
    </main>
  );
}

export default Home;