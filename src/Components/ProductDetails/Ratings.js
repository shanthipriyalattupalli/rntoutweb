
"use client"
import React, { useState } from 'react'
const stars = "/Assets/stars.svg";
const userProfile = '/Assets/userProfile.svg'
import { formatDistanceToNow } from 'date-fns';


const Ratings = ({ userRatings }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const totalPages = Math.ceil(userRatings.length / itemsPerPage);

  const currentRatings = userRatings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getPaginationNumbers = () => {
    const pages = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3);
      if (currentPage > 5) pages.push("...");
      if (currentPage > 4 && currentPage < totalPages - 3) pages.push(currentPage);
      if (currentPage < totalPages - 4) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <>
      {currentRatings.length > 0 && (
        <>
          <h2 className='pb-4 pt-8 font-semibold text-black-700'>
            Community Feedback
          </h2>
          <div>
            {currentRatings.map((rating) => (
              <div key={rating._id} className="flex flex-col gap-3">
                <table className="flex flex-col gap-2 w-[610px] border bg-[#FFFFFF] border-slate-200 text-sm rounded-3xl p-4">
                  <tbody>
                    <tr>
                      <div className="flex flex-col gap-2">
                        <div className="flex gap-3">
                          <p
                            className={`flex gap-1 items-center px-2 rounded-full text-white 
                      ${rating.rating >= 4 ? "bg-green-700" : rating.rating >= 2 ? "bg-orange-500" : "bg-red-500"}`}
                          >
                            <img src={stars} alt="Rating stars" className="w-4 h-4" />
                            <span className="ml-1">{rating.rating}</span>
                          </p>
                          <p className="text-[14px] font-medium leading-[20px] ">{rating.comment}</p>
                        </div>
                        <p className="text-[14px] font-medium leading-[20px] ">{rating.comment}</p>
                      </div>
                    </tr>
                  </tbody>
                </table>
                <div className="flex gap-2 p-2">
                  <img src={userProfile} alt="User Profile" />
                  <p className="flex gap-2 text-[14px] font-medium text-gray-500 text-left">
                    {formatDistanceToNow(new Date(rating.createdAt), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}


            <div className="flex mt-4 gap-2">

              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Prev
              </button>


              {getPaginationNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === "number" && setCurrentPage(page)}
                  className={`px-3 py-1 border rounded-full ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>)}
    </>
  )
}

export default Ratings