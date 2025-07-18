"use client"

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import ProductItem from "@/Components/Home/ProductItems";
import ProductCard from "../Shimmer/ProductCard";
const left = '/Assets/leftarrow.svg';


const RelatedItems = ({ relatedItems }) => {

    const swiperRef = useRef(null);
    return (
        <div>        {relatedItems.length > 0 &&
            <div className="py-10">
                <h2 className="font-medium text-xl">Related Products</h2>
                <div className="relative flex gap-5 pt-10">
                    <div
                        className="absolute top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <img src={left} alt="Previous" className="rotate-360" />
                    </div>
                    <div
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <img src={left} alt="Next" className="rotate-180" />
                    </div>
                    <Swiper
                        onSwiper={(swiper) => (swiperRef.current = swiper)}
                        spaceBetween={20}
                        slidesPerView={4}
                        navigation={false}
                        pagination={false}
                        modules={[Navigation, Pagination]}
                        style={{ width: '100%' }}
                        breakpoints={{
                            320: { slidesPerView: 2 },
                            375: { slidesPerView: 2 },
                            425: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            1024: { slidesPerView: 5 },
                        }}
                    >
                        {relatedItems.map((product) => (
                            <SwiperSlide key={product._id}  fallback={<ProductCard/>} className="flex justify-center">
                                <ProductItem product={product} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            </div>
        }</div>
    )
}

export default RelatedItems