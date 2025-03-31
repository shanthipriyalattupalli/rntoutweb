'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRouter } from "next/navigation";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const left = '/Assets/leftarrow.svg';

const Banner = ({ banners, isLoading }) => {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Shimmer Placeholder
  const Shimmer = () => (
    <div className="relative px-[80px] py-10">
      <div className="rounded-[40px] border border-gray-200 h-[500px] bg-gray-200 animate-pulse"></div>
    </div>
  );
  // const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full">
      {isLoading
        ? <Shimmer /> // Show shimmer when loading
        : (
          <>
 {         banners.map((banner, index) => (
  <div className="relative px-[36px] sm:px-[80px] py-[20px] md:py-10" key={index}>


            <button
              className={`absolute left-2 sm:left-[5rem] md:left-[5rem] lg:left-[5rem] top-1/2 transform -translate-y-1/2 z-10 
                ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={activeIndex === 0}
            >
              <img src={left} alt="Previous" className="rotate-360" />
            </button>
            <button className={`absolute right-2  sm:right-[5rem] md:right-[5rem] lg:right-[5rem] top-1/2 transform -translate-y-1/2 z-20 
              ${activeIndex === (banner.images.length - 1) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`} 
              onClick={() => swiperRef.current?.slideNext()} disabled={activeIndex === (banner.images.length - 1)} >
             <img src={left} alt="Next" className="rotate-180 " />
             </button>
            
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            navigation={false}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 3000 }}
            className="rounded-[40px] md:rounded-[40px] border border-gray-200 h-[250px] sm:h-[536px] md:h-[536px]"
          >
            {banner.images?.map((image, idx) => (
              <SwiperSlide key={idx} className="h-full">
                <div className="relative h-full">
                  <img
                    src={image}
                    alt={`Slide ${idx + 1}`}
                    className="w-full h-[250px] sm:h-[536px] md:h-[536px] rounded-[40px]"
                  />
                  <div className="absolute inset-0 bg-black opacity-0"></div>
                  <div className="absolute top-16 sm:top-24 md:top-28 left-4 sm:left-10 text-slate-600 text-sm sm:text-base md:text-lg">
                    <h1 className="text-xl sm:text-3xl md:text-5xl font-bold">Affordable Beds</h1>
                    <p className="text-sm sm:text-xl">Unmatched Comfort!</p>
                    <p className="mt-4 sm:mt-6 text-xs sm:text-lg">
                      Choose from our wide range of collections starting at just ₹199/month.
                    </p>
                    <button
                      className="mt-4 px-4 sm:px-6 py-2 sm:py-3 bg-[rgb(255,45,85,1)] hover:bg-[rgb(255,45,85,1)] text-white font-bold rounded-[16px]"
                      onClick={() => router.push("/add-on-rent")}
                    >
                      Rent Now!
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}</>)}
    </div>
  );
};

export default Banner;
