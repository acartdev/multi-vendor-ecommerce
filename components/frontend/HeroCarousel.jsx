"use client";
import React from "react";
import { Carousel } from "nuka-carousel";
import Link from "next/link";

export default function HeroCarousel({ banners }) {
  return (
    <Carousel
      autoplay
      showArrows
      wrapAround
      keyboard
      // showDots
      wrapMode="wrap"
      cellAlign="center"
      // showDots={true}
      className="rounded-md overflow-hidden flex flex-col "
    >
      {banners.map((banner, i) => {
        return (
            <img
              key={i}
              width={960}
              height={540}
              alt={banner.title}
              src={banner.imageUrl}
              className=" object-cover w-[960px] h-[500px] cursor-pointer"
              onClick={() => window.open(banner.link, "_blank")}  
            />
        );
      })}
    </Carousel>
  );
}
