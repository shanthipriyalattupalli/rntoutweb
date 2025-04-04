
"use client"
import React, { useState } from 'react'
const stars = "/Assets/stars.svg";
const userProfile = '/Assets/userProfile.svg'
import { formatDistanceToNow } from 'date-fns';
import { ArrowLeft } from 'lucide-react';
const left = "/Assets/Chevron-left.svg"


const Ratings = ({ userRatings }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;


  const totalPages = Math.ceil(userRatings.length / itemsPerPage);

  const currentRatings = userRatings?.slice(
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
                <table className="flex flex-col gap-2 w-[610px] border bg-[#FFFFFF] border-slate-200 text-sm rounded-[16px] p-4">
                  <tbody>
                    <tr>
                      <td colSpan={2} className="flex flex-col gap-2">
                        <div className="flex gap-3">
                          <p
                            className={`w-[49px] h-[20px] flex items-center px-2 rounded-full text-white`}
                            style={{
                              backgroundColor:
                                rating.rating >= 4
                                  ? "rgba(8, 135, 93, 1)" // Green
                                  : rating.rating >= 2
                                    ? "rgba(224, 45, 60, 1)" // Red
                                    : "rgba(244, 128, 3, 1)", // Orange
                            }}
                          >
                            <img src={stars} alt="Rating stars" className="w-4 h-3" />
                            <span className="ml-1">{rating.rating}</span>
                          </p>
                          <p className="text-[14px] text-[rgba(7, 7, 7, 1)] font-[500] leading-[20px] ">{rating.comment}</p>
                        </div>
                        <p className="text-[14px] font-[400] leading-[20px] ">{rating.comment}</p>
                      </td>
                    </tr>

                  </tbody>
                </table>
                <div className="flex items-center gap-2 pb-2">
                  <img src={userProfile} alt="User Profile" className="w-8 h-8 rounded-full" />
                  <div className="flex items-center gap-1 text-sm">
                    <p className="font-semibold text-black">{rating?.userId?.name}</p>
                    <span className="text-gray-500">•</span>
                    <p className="text-gray-500">
                      {formatDistanceToNow(new Date(rating.createdAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>

              </div>
            ))}


            <div className="flex mt-4 gap-2">

              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 border border-[rgba(7,7,7,0.15)] rounded-full bg-white hover:bg-white disabled:opacity-50"
              >
                <img src={left} alt='leftarrow' />
              </button>


              {getPaginationNumbers().map((page, index) => (
                <button
                  key={index}
                  onClick={() => typeof page === "number" && setCurrentPage(page)}
                  className={`px-4 py-2 border border-[rgba(7,7,7,0.15)] rounded-full ${currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  disabled={page === "..."}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 border border-[rgba(7,7,7,0.15)] rounded-full bg-white hover:bg-white disabled:opacity-50"
              >
                <img src={left} alt='leftarrow' className='rotate-180' />
              </button>
            </div>
          </div>
        </>)}
    </>
  )
}

export default Ratings