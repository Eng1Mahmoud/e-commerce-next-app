import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }: { product: IProduct }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4">
      <Image
        src={product.images[0]}
        alt={product.name}
        width={500}
        height={500}
        className="h-[300px] w-full"
        loading="eager"
      />
   <Link
  href={`/products/${product.category}/${product._id}/${product.name}`}
  className="font-bold text-[20px] pt-[15px] block hover:text-primary font-main overflow-hidden whitespace-nowrap overflow-ellipsis"
>
  {product.name}
</Link>
      <p className="text-[#ffad33] font-bold text-[20px] mt-1">
        {product.price} جنيه
      </p>
      <button className="font-bolder text-[18px] outline outline-[#ffad33] outline-[1px] text-[#ffad33] w-full text-center p-2 rounded-lg mt-3 hover:bg-[#ffad33] hover:text-white">
        اضافة للسلة
      </button>
    </div>
  );
};

export default ProductCard;
