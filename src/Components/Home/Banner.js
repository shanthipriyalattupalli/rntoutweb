'use client';

import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const banner1 = '/Assets/banner-1.png';
const banner2 = '/Assets/banner-2.png';
const left = '/Assets/leftarrow.svg';

const Banner = () => {
  const swiperRef = useRef(null); // Create a ref to store the Swiper instance

  return (
    <div className="w-full bg-slate-50">
      <div className="relative px-20 py-10">
        {/* Custom Navigation Buttons */}
        <div
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
          onClick={() => swiperRef.current?.slidePrev()} // Navigate to the previous slide
        >
          <img src={left} alt="Previous" className="rotate-360 ml-20" />
        </div>
        <div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
          onClick={() => swiperRef.current?.slideNext()} // Navigate to the next slide
        >
          <img src={left} alt="Next" className="rotate-180 mr-20" />
        </div>

        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Set the Swiper instance to the ref
          navigation={false} // Disable default navigation as we are using custom buttons
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 3000 }}
          className="rounded-[40px] border border-gray-200"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src={banner1}
                alt="Background 1"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-0"></div>
              <div className="absolute top-28 left-10 text-slate-600">
                <h1 className="text-5xl font-bold">Affordable Beds</h1>
                <p className="text-3xl">Unmatched Comfort!</p>
                <p className="mt-8 text-lg">
                  Choose from our wide range of collections starting at just ₹199/month.
                </p>
                <button className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg">
                  Rent Now!
                </button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src={banner2}
                alt="Background 2"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-0"></div>
              <div className="absolute top-28 left-10 text-slate-600">
                <h1 className="text-5xl font-bold">New Laptops</h1>
                <p className="text-3xl">Matched Comforts!</p>
                <p className="mt-8 text-lg">
                  Choose from our wide range of collections starting at just ₹199/month.
                </p>
                <button className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg">
                  Rent Now!
                </button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <div className="relative h-full">
              <img
                src={banner1}
                alt="Background 1"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black opacity-0"></div>
              <div className="absolute top-28 left-10 text-slate-600">
                <h1 className="text-5xl font-bold">Affordable Beds</h1>
                <p className="text-3xl">Unmatched Comfort!</p>
                <p className="mt-8 text-lg">
                  Choose from our wide range of collections starting at just ₹199/month.
                </p>
                <button className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg">
                  Rent Now!
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default Banner;
