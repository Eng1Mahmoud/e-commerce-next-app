"use client";
import React, { useEffect, useState } from "react";
import { SliderProducts } from "./SliderProducts";
import axiosInstance from "@/lib/axiosInstance";
export const CategoriesSection = ({ categorie }: { categorie: string }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
      axiosInstance.get(`/products/${categorie}/${1}/${10}`).then((res)=>{
        setProducts(res.data.products)
      })
  }, [categorie]);

  return (
    products.length > 0 && (
      <div className="container mt-10">
        <h2 className="font-extrabold text-primary text-[40px]">{categorie}</h2>
        <SliderProducts products={products} categorie={categorie} />
      </div>
    )
  );
};
