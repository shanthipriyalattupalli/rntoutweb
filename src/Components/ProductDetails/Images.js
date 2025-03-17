// "use client"
// import React, {useState} from 'react';
// import axios from "axios";
// const favorite = "/Assets/favorite.svg"
// const favorited = '/Assets/favoritedicon.svg'

// export const Images =  ({product}) => {
//     const images=product.images
//     console.log(images,"images")



//     const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

//     const [isFavorite, setIsFavorite] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);


//   const handleAddToFavorites = async () => {
//     // setIsFavorite(true)
//     try {
//       const response = await axios.post(`${BASE_URL}/favorites/add`, { variantId: String(productId) }, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setIsFavorite(true)
//       toast.success(response.data.message);
//     } catch (error) {
//       console.error("Error adding product to favorites:", error);
//       toast.error(
//         // error.response?.data?.message ||
//         "You must be log in to add favourites."
//       );
//     }
//   }


//   const handleRemoveFavorites = async () => {
//     // setIsFavorite(false)
//     try {
//       const response = await axios.delete(`${BASE_URL}/favorites/remove-fav/${productId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setIsFavorite(false)
//       // fetchFavorites()
//       toast.success(response.data.message);
//     } catch (error) {
//       console.error("Error removing product from favorites:", error);
//       // toast.error(
//       //   error.response?.data?.message ||
//       //   "Something went wrong. Please try again."
//       // );
//     }
//   }

//   return (
//     <div className='space-y-4'>
//     {/* Main Image */}
//     <div className='relative'>
//       <span className='absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-md text-sm'>
//         NEW ARRIVALS
//       </span>
//        {isFavorite ? <span className='absolute top-4 right-4  text-white px-3 py-1 rounded-md text-sm cursor-pointer' onClick={() => handleRemoveFavorites()}>
//         <img src={favorited} />
//       </span> : <span className='absolute top-4 right-4  text-white px-3 py-1 rounded-md text-sm cursor-pointer' onClick={() => handleAddToFavorites()}>
//         <img src={favorite} />
//       </span>}
//        <img
//         src={images[selectedImage]} // Dynamically bind the selected image
//         alt={`Product Image`}
//         className='w-full h-[500px] rounded-lg shadow-lg'
//       />
//     </div>

//     {/* Thumbnails */}
//     <div className='grid grid-cols-6 gap-2'>
//       {images.map((image, index) => (
//         <button
//           key={index}
//           className={`border-2 rounded-lg overflow-hidden ${selectedImage === index ? "border-red-500" : "border-gray-200"
//             }`}
//             onClick={() => setSelectedImage(index)} 
//         >
//           <img
//             src={image}
//             alt={`Thumbnail ${index + 1}`}
//             className='w-full h-full object-cover'
//           />
//         </button>
//       ))}
//     </div>
//   </div>
//   )
// }


import React from "react";

export default async function ServerSideImageTabs({ images, searchParams }) {
  if (!images || images.length === 0) {
    return <div>No images available</div>;
  }

  // Get selected image index from searchParams
  const selectedIndex = parseInt(searchParams.selectedImage) || 0;
  const selectedImage = images[selectedIndex] || images[0];

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative">
        <span className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
          NEW ARRIVALS
        </span>
        <img
          src={selectedImage}
          alt="Product Image"
          className="w-full h-[500px] rounded-lg shadow-lg"
        />
      </div>

      {/* Image List */}
      <div className="flex space-x-4 border-b pb-2">
        {images.map((image, index) => (
          <a
            key={index}
            href={`?selectedImage=${index}`}
            className={`px-4 py-2 cursor-pointer border-b-2 rounded-lg overflow-hidden ${
              selectedIndex === index ? "border-red-500" : "border-transparent"
            }`}
          >
            <img
              src={image}
              alt={`Tab ${index + 1}`}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </a>
        ))}
      </div>
    </div>
  );
}



