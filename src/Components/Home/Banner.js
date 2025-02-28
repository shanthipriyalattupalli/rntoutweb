'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRouter } from "next/navigation";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const left = '/Assets/leftarrow.svg';

const Banner = ({ banners }) => {
  const router = useRouter();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0); // Track active slide

  return (
    <div className="w-full">
      {banners.map((banner, index) => (
        <div className="relative px-[80px] py-10" key={index}>
          {/* Custom Navigation Buttons */}
          <button
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-10 
              ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={activeIndex === 0}
          >
            <img src={left} alt="Previous" className="rotate-360 ml-16" />
          </button>

          <button
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-10 
              ${activeIndex === (banner.images.length - 1) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={() => swiperRef.current?.slideNext()}
            disabled={activeIndex === (banner.images.length - 1)}
          >
            <img src={left} alt="Next" className="rotate-180 mr-16" />
          </button>

          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            navigation={false}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination, Autoplay]}
            autoplay={{ delay: 3000 }}
            className="rounded-[40px] border border-gray-200 h-[500px]"
          >
            {banner.images?.map((image, idx) => (
              <SwiperSlide key={idx} className="h-1/2">
                <div className="relative h-1/2">
                  <img
                    src={image}
                    alt={`Slide ${idx + 1}`}
                    className="w-full h-[500px] rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black opacity-0"></div>
                  <div className="absolute top-28 left-10 text-slate-600">
                    <h1 className="text-5xl font-bold">Affordable Beds</h1>
                    <p className="text-3xl">Unmatched Comfort!</p>
                    <p className="mt-8 text-lg">
                      Choose from our wide range of collections starting at just ₹199/month.
                    </p>
                    <button
                      className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
                      onClick={() => router.push(banner.link)}
                    >
                      Rent Now!
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ))}
    </div>
  );
};

export default Banner;
