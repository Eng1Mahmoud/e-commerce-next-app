import React from "react";
import { SliderProducts } from "./SliderProducts";

export const CategoriesSection = async ({categorie}:{categorie:string}) => {
  console.log("categorie: ", categorie);
  // get all vegetable products
const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/products/${categorie}/${1}/${10}`,
    {
        method: "GET",   
    }
);
const data = await response.json();
  return (
    <div className="container mt-10">
      <h2 className="font-bold text-[25px]">{categorie}</h2>
      <SliderProducts products={data}  categorie={categorie}/>
    </div>
  );
};
