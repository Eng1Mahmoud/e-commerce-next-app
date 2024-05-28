import ProductById from "@/components/ProductById/ProductById";
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${params.id}`,
      {
        cache: "no-cache",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    product = await response.json();
  } catch (_) {}



  return <div>
    <ProductById product={product} />
  </div>;
};

export default page;
