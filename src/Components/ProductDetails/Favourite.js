
// "use client"
// import React, {useState} from 'react';
// import axios from "axios";
// const favorite = "/Assets/favorite.svg"
// const favorited = '/Assets/favoritedicon.svg'

//  const Favourite = ({productId}) => {
//     const BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL;

//     const [isFavorite, setIsFavorite] = useState(false);

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
// <>
// {isFavorite ? <span className='absolute top-4 right-4  text-white px-3 py-1 rounded-md text-sm cursor-pointer' onClick={() => handleRemoveFavorites()}>
//         <img src={favorited} />
//       </span> : <span className='absolute top-4 right-4  text-white px-3 py-1 rounded-md text-sm cursor-pointer' onClick={() => handleAddToFavorites()}>
//         <img src={favorite} />
//       </span>}
// </>
//   )
// }

// export default Favourite;