import React from 'react'

const Categories = ({shimmerArray}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 gap-4 mt-4">
    {shimmerArray.map((_, index) => (
      <div
        key={index}
        className="w-full h-[100px] bg-gray-200 animate-pulse rounded-lg flex flex-col items-center"
      >
        <div className="w-12 h-12 bg-gray-300 rounded-full mt-3"></div>
        <div className="w-24 h-4 bg-gray-300 mt-2 rounded"></div>
      </div>
    ))}
  </div>
  )
}

export default Categories