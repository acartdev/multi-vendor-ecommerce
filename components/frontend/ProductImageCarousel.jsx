"use client";
import Image from "next/image";
import React, { useState } from "react";
import "../../styles/main.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductImageCarousel({
  productImages = [],
  thumbnail,
  title,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <div className=" cursor-pointer">
      {productImages.length >= 0 ? (
        <>
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
            }}
            spaceBetween={10}
            navigation={true}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper2"
          >
            {productImages.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <Image src={item.url} width={566} height={566} />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="mySwiper"
          >
            {productImages.map((item, i) => {
              return (
                <SwiperSlide key={i}>
                  <Image src={item.url} width={566} height={566} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
