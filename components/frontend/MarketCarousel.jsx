"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function MarketCarousel({markets}) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
    },
  };

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      //   deviceType={}
      dotListClass="custom-dot-list-style"
      itemClass="px-4"
    >
        {
            markets.map((market,i)=>{
                return(
                    <Link key={i} href={`/market/${market.slug}`} className="rounded-lg mr-3 flex flex-col justify-center items-center">
                    <Image
                      src={market.logoUrl}
                      alt={market.title}
                      width={160}
                      height={160}
                      className=" rounded-md  w-40 h-40 object-cover "
                    />
                    <h2 className=" text-center text-slate-800 dark:text-slate-50 mt-2">{market.title}</h2>
                  </Link>
                )
            })
        }

    </Carousel>
  );
}
