import ProductById from "@/components/ProductById/ProductById";
import axiosInstance from "@/lib/axiosInstance"; 
import React from "react";

const page = async ({
  params,
}: {
  params: {
    id: string;
    name: string;
  };
}) => {
  // fetch product by id from api
  let product;
  try {
    const res = await axiosInstance.get(`/products/${params.id}`);
    product = res.data.product;
  } catch (_) {}
  return <div>
    <ProductById product={product} />
  </div>;
};

export default page;
