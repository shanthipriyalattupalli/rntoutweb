'use client';

import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { useRouter } from "next/navigation";
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Swal from "sweetalert2";
import Cookies from "js-cookie";
const logo = "/Assets/Rntout_Logo.png";



const left = '/Assets/leftarrow.svg';

const Banner = ({ banners, isLoading }) => {
  const token = Cookies.get("userToken")
  const router = useRouter();
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isKyc = Cookies.get("isKyc");

  // Shimmer Placeholder
  const Shimmer = () => (
    <div className="relative px-[80px] py-10">
      <div className="rounded-[40px] border border-gray-200 h-[500px] bg-gray-200 animate-pulse"></div>
    </div>
  );
  // const [activeIndex, setActiveIndex] = useState(0);
  const activeBanners = banners.filter(banner => banner.status === "active");

  const handleAddOnRent = async () => {
    if (!token) {
      await Swal.fire({
        title: "Login Required",
        text: "You need to be logged in to add a property on rent.",
        icon: "info",
      });
      return;
    }

    if (isKyc === "true") {
      router.push("/add-on-rent");
    } else {
      // Show confirmation alert before redirecting
      const result = await Swal.fire({
        title: "KYC Required",
        text: "KYC should be verified before adding on rent. Do you want to verify now?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, Verify Now",
        cancelButtonText: "Cancel",
      });

      if (result.isConfirmed) {
        router.push("/profile/kyc");
      }
    }
  };
  return (
    <div className="w-full">
      {isLoading
        ? <Shimmer /> // Show shimmer when loading
        : (
          <>
            {activeBanners?.map((banner, index) => (
             <div className="relative px-0 sm:px-[80px] py-[20px] md:py-10" key={index}>
                {/* Left Button */}
                <button
                  className={`absolute left-2 sm:left-[5rem] top-1/2 transform -translate-y-1/2 z-10 
    hidden sm:block
    ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => swiperRef.current?.slidePrev()}
                  disabled={activeIndex === 0}
                >
                  <img src={left} alt="Previous" className="rotate-360" />
                </button>

                {/* Right Button */}
                <button
                  className={`absolute right-2 sm:right-[5rem] top-1/2 transform -translate-y-1/2 z-20 
    hidden sm:block
    ${activeIndex === banner.images.length - 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  onClick={() => swiperRef.current?.slideNext()}
                  disabled={activeIndex === banner.images.length - 1}
                >
                  <img src={left} alt="Next" className="rotate-180" />
                </button>


                <Swiper
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                  navigation={false}
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination, Autoplay]}
                  autoplay={{ delay: 3000 }}
                  className="rounded-[40px] sm:rounded-[0px] md:rounded-[40px] border border-gray-200 h-[134px] sm:h-[536px] md:h-[536px]"
                >
                  {banner.images?.map((image, idx) => (
                    <SwiperSlide key={idx} className="h-full">
                      <div className="relative h-full">
                        <img
                          src={image}
                          alt={`Slide ${idx + 1}`}
                          className="w-full h-[134px] sm:h-[536px] md:h-[536px] rounded-[0px] sm:rounded-[40px] "
                        />
                        <div className="absolute inset-0 bg-black opacity-0"></div>
                        <div className="absolute top-16 sm:top-24 md:top-28 left-[80%] sm:left-[80%] text-slate-600 text-sm sm:text-base md:text-lg">
                          {/* <h1 className="text-xl sm:text-3xl md:text-5xl font-bold"></h1>
          <p className="text-sm sm:text-xl"></p>
          <p className="mt-4 sm:mt-6 text-xs sm:text-lg">
       
          </p> */}
                          {/* <button
                            className="mt-[14rem] px-6 py-3 bg-[rgb(255,45,85)] text-white font-bold rounded-[16px] shadow-xl
             transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
                            onClick={() => handleAddOnRent()}
                          >
                            Rent Now!
                          </button> */}




                        </div>
                        {/* <div className="absolute top-4 sm:top-14 md:top-28 left-[80%] sm:left-[80%] text-slate-600 text-sm sm:text-base md:text-lg">

                          <img

                            src={logo}
                            alt='logo'
                          />
                        </div> */}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            ))

            }
          </>)}
    </div>

  );
};

export default Banner;
