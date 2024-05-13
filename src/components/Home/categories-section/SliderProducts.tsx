"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Pagination } from "swiper/modules";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import Link from "next/link";
import ProductCard from "@/components/general/ProductCard";
interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  countInStock: number;
  rating: number;
  numReviews: number;
  image: string;
  amount: number;
}
interface props {
  products: Product[];
  categorie:string;
}
export const SliderProducts = ({ products,categorie }: props) => {
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
    <div className="relative mb-10 py-10">
      {/** creat next and prev button position top center slide  */}
      <div className="flex  items-center z-50 d  justify-end gap-8 mb-5">
        <Link
        href={`products/${categorie}`}
          
          className="font-bold text-[20px] text-[#ffad33]"
        >
          عرض الكل
        </Link>
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            className="bg-[#f9fafb] text-white p-2 rounded-full border-2 border-zinc-400"
          >
            <IoIosArrowForward className="text-[25px]  text-zinc-400" />
          </button>
          <button
            onClick={handleNext}
            className="bg-[#f9fafb] text-white p-2 rounded-full border-2 border-zinc-400"
          >
            <IoIosArrowBack className="text-[25px] text-zinc-400" />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: true }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        breakpoints={{
          // when window width is < 640px
          320: {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
        }}
        className="  w-full"
      >
        {
         products.length > 0 ?(
        products.map((product: Product) => (
          <SwiperSlide key={product._id}>
             <ProductCard product={product} />
          </SwiperSlide>
        ))):(
          <div className="flex justify-center items-center w-full h-96">
            <h1 className="text-3xl">لا يوجد منتجات</h1>
          </div>
        )
      }
      </Swiper>
    </div>
  );
};
