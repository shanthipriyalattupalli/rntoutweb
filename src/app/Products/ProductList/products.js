// "use client";

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "next/navigation";


// const ProductList = () => {
//   const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;
//   const [categories, setCategories] = useState([]);
//   const [activeIndex, setActiveIndex] = useState(null);
//   const [products, setProducts] = useState([]);
//   const [subCategories,setSubcategories] = useState([]);
//   const params = useParams();
//   const subcategoryId=params.subcategoryId
//   console.log("subcategoryId from params:", subcategoryId);
//   const categoryId = params.categoryId; // Extract categoryId directly from params
//   console.log("categoryId from params:", categoryId);



//   const fetchProductBysubCategoryId = async () => {
//     if (!categoryId || !subcategoryId) return; // Ensure both IDs are available
//     try {
//         const response = await axios.get(`${BASE_URL}/products/categoryProducts/?categoryId=${categoryId}&subCategoryId=${subcategoryId}`, {
     
//         });
//         console.log(response.data, "Product fetch response by subcategoryId");
//         setProducts(response?.data);
//     } catch (error) {
//         console.error("Error fetching products by subcategoryId:", error);
//     }
// };
// useEffect(() => {
//     fetchProductBysubCategoryId();
// }, [categoryId, subcategoryId]);


// const handleProductClick =(productId)=>{
//     setActiveIndex(productId=== activeIndex ? null : productId);
// }

//   return (
//           <div className="flex border">
//     {products.map((product) => (
//       <p key={product._id} className={`w-74 flex justify-center p-2 text-center rounded-lg ${
//         activeIndex === product._id ? 'bg-[#2F6FED] text-Black border-[#2F6FED]' : ''}`} onClick={() => handleProductClick(product._id)}>{product.productName}</p>
//     ))}
//   </div>

//   );
// };

// export default ProductList;
