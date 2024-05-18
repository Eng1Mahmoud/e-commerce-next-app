"use client";
import React from "react";
import Image from "next/image";
import cat1 from "../../../../public/vegtable.webp";
import cat2 from "../../../../public/fruits.webp";
import cat3 from "../../../../public/tomore.webp";
import cat4 from "../../../../public/fruits-s.webp";
import cat5 from "../../../../public/warkeat.webp";
import { userStore } from "@/store/user";
export const Categories = () => {
  const user = userStore((state) => state.user);
  console.log(user);
  return (
    <div className="container mt-[50px]">
      <h2 className="font-bold text-[25px] ">تسوق حسب القسم</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <div className="relative h-[300px] ">
          <Image
            src={cat1}
            alt="cat"
             
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative h-[300px]">
          <Image
            src={cat2}
            alt="cat"
         
           
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative h-[300px]">
          <Image
            src={cat3}
            alt="cat"
          
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative h-[300px] ">
          <Image
            src={cat4}
            alt="cat"
        
           
            className="w-full h-full object-cover "
          />
        </div>
        <div className="relative h-[300px]">
          <Image
            src={cat5}
            alt="cat"
          
          
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

/**
 *    {
            [cat1, cat2, cat3, cat4, cat5].map((cat, index) => {
                return (
                    <div key={index} className="relative h-[300px]">
                        <Image src={cat} alt="cat" layout="fill" objectFit="cover" className="w-full h-full" />
                    </div>
                )
            })
        }
 * 
 */
