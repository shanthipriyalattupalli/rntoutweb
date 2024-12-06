'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HomeComponent from '../Pages/Home';

export default function Home() {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const fetchcategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories`);
      console.log(response.data, "categories");
      setCategories(response.data);
      if (response.data.length > 0) {
        setCategoryId(response.data[0]._id); // Set categoryId to the first category
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchcategories();
  }, []);

  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/subcategories/categories/${categoryId}`);
      console.log(response.data, "subcategories");
      setSubcategories(response.data);
    } catch (error) {
      
      console.error('Error fetching subcategories:', error);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchSubcategories();
    }
  }, [categoryId]);

  return (
    <div>
      <HomeComponent categories={categories} subcategories={subcategories} />
    </div>
  );
}
