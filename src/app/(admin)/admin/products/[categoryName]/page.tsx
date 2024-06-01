"use client";
import Products from "@/components/admin/Products";
import React from "react";
const page = ({
  params,
}: {
  params: {
    categoryName: string;
  };
}) => {
  const decodedCategorie = decodeURIComponent(`${params.categoryName}`);
  return (
    <div className="container">
      <h1 className="my-8 font-main font-bold text-primary text-[35px]">
        {decodedCategorie}
      </h1>
      <Products categorie={decodedCategorie}/>
    </div>
  );
};

export default page;
