"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Swiper as SwiperType } from "swiper";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
// Import Swiper styles

import slid1 from "../../../../public/s1.webp";
import slid2 from "../../../../public/s2.webp";
import slid3 from "../../../../public/s3.webp";
import Image from "next/image";
import { Autoplay, Pagination } from "swiper/modules";
export const Slider: React.FC = () => {
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
    <div className="our-clients ">
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return (
              '<span class="' +
              className +
              '" style="background-color: red; width: 30px; height: 5px; display: inline-block; border-radius: 2px;"></span>'
            );
          },
        }}
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
        className="position-relative h-[250px] md:h-[650px] w-full"
      >
        <SwiperSlide>
          <Image
            src={slid1}
            alt="slider1"
            className="h-[200px] md:h-[600px]  w-full  "
            loading="eager"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={slid2}
            alt="slider2"
            className="h-[200px] md:h-[600px] w-full"
            loading="eager"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={slid3}
            alt="slider3"
            className="h-[200px] md:h-[600px] w-full "
            loading="eager"
          />
        </SwiperSlide>
        {/** creat next and prev button position top center slide  */}
        <div className="absolute top-[80px] md:top-[300px]  left-5 right-5  flex justify-between items-center z-50">
  <button
    onClick={handlePrev}
    className="bg-white text-white p-2 rounded-full"
  >
    <IoIosArrowForward className="text-[25px]  text-zinc-400" />
  </button>
  <button
    onClick={handleNext}
    className="bg-white text-white p-2 rounded-full"
  >
    <IoIosArrowBack className="text-[25px] text-zinc-400" />
  </button>
</div>
      </Swiper>
      <div className="swiper-pagination position-absolute bottom-[40px] w-full  bg-white z-50"></div>
    </div>
  );
};
