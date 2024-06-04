"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { ICategorise } from "@/types/categorise";
import Image from "next/image";
export const Categories = () => {
  const [categories, setCategories] = useState<ICategorise[]>([]);
  const [loading, setLoading] = useState(false);
    // get categories from the server
  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/admin/get-categorise").then((res) => {
      setCategories(res.data.categorises);
      setLoading(false);
    })
  }, []);

  return (
    <div className="container mt-[50px] py-5">
      <h2 className=" text-[30px] md:text-[40px] font-main font-extrabold text-primary">
        تسوق حسب القسم
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {loading ? (
          [1, 2, 3, 4, 5].map((i) => (
            <div className="skeleton w-full h-[300px]" key={i}></div>
          ))
        ) : (
          categories.map((category,i) => (
            <div className="relative h-[300px]" key={`${category?.name}-${i}`}>
              <Image
                src={category?.image}
                alt={category?.name}
                className="w-full h-full object-cover"
                width={1000}
                height={1000}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};