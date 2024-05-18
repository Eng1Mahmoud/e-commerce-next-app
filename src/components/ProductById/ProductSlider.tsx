"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
// Import Swiper styles

import Image from "next/image";
import { Autoplay } from "swiper/modules";
export const ProductSlider = ({ images }: { images: string[] }) => {
  const swiperRef = React.useRef<SwiperType | null>(null);

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  return (
    <div className="">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: true }}
        spaceBetween={200}
        slidesPerView={1}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
        }}
        className="position-relative h-[300px] md:h-[600px] w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt="Picture of the author"
              width={500}
              height={500}
              className="h-full w-full"
              loading="eager"
            />
          </SwiperSlide>
        ))}

        {/** creat next and prev button position top center slide  */}
        <div className="absolute top-1/2 left-5 right-5 transform -translate-y-1/2 flex justify-between items-center z-50">
          <button
            onClick={handlePrev}
            className="bg-gray-100 text-white p-2 rounded-full"
          >
            <IoIosArrowForward className="text-[25px]  text-zinc-400" />
          </button>
          <button
            onClick={handleNext}
            className="bg-gray-100 text-black p-2 rounded-full"
          >
            <IoIosArrowBack className="text-[25px] text-zinc-400" />
          </button>
        </div>
      </Swiper>
    </div>
  );
};
