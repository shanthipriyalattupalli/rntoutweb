

import ProductList from '@/Components/Products/ProductsList'
import React from 'react'
import axios from "axios";
 export default async function page ()  {
  return (
 <>
 <ProductList/> 
 </>
  )
}
export async function generateMetadata({ params }) {
  const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
  const { categoryId } = await params;

  const fetchCategory = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/${id}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching category metadata:", error);
      return null;
    }
  };

  const category = await fetchCategory(categoryId);

  console.log(category)

  if (!category) {
    return {
      title: "Category Not Found | RntOut",
      description: "The requested category does not exist.",
    };
  }

  const name = category.metaTitle || category.categoryName || "Category";
  const description = category.metaDescription || `Explore products in ${name}`;
  const image = category.image || "/default-category-image.jpg"; // fallback image

  return {
    title: `${name} | RntOut`,
    description,
    openGraph: {
      title: `${name} | RntOut`,
      description,
      url: `https://rntout.com/categories/${categoryId}`,
      images: [
        {
          url: image,
          alt: `${name} Cover Image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} | RntOut`,
      description,
      images: [image],
    },
  };
}

