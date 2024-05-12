"use client";
import React, { useEffect, useState } from "react";
import { SliderProducts } from "./SliderProducts";

export const CategoriesSection = ({ categorie }: { categorie: string }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${categorie}/${1}/${10}`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [categorie]);

  return (
    <div className="container mt-10">
      <h2 className="font-bold text-[25px]">{categorie}</h2>
      <SliderProducts products={products} categorie={categorie} />
    </div>
  );
};
