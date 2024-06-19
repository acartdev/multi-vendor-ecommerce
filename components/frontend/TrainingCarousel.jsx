"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
export default function TrainingCarousel({trainings}) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <Carousel
      slideTransition="fade"
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
      {trainings.map((training, i) => {
        return (
          <div key={i} className="p-4">
            <div  className=" rounded-lg mr-3">
                <Link href="#">
              <Image
                src={training.imageUrl}
                alt={training.title}
                width={556}
                height={556}
                className="w-full rounded-md "
              />
              </Link>
              <h2 className=" text-center text-xl text-slate-800 dark:text-slate-50 mt-2">
                {training.title}
              </h2>
              <p>
               {training.description}
              </p>
              <div className="flex justify-between items-center py-2">
                <Link href="#" className="btn btn-sm text-slate-50">
                  Read more
                </Link>
                <Link href="#" className="  ">
                  Talk to the Consultant
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
