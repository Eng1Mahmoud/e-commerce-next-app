"use client";
import axiosInstance from "@/lib/axiosInstance";
import { alertStore } from "@/store/alert";
import useCartStore from "@/store/cartQount";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const ProductCard = ({ product }: { product: IProduct }) => {
  const { fetchCartCount } = useCartStore((state) => state);
  const { setAlert } = alertStore(); // get alert from store
  // handle add to cart
  const handleAddToCart = () => {
    axiosInstance
      .post("/cart/add", {
        productId: product._id,
        quantity: 1,
      })
      .then((res) => {
        fetchCartCount();
        setAlert({ message: res.data.message, type: "success" });
      })
      .catch((error: any) => {
        setAlert({ message: error.response.data.message, type: "error" });
      });
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 relative">
      <div className="flex justify-between items-center absolute top-1 right-1">
        {!product?.inStock ? (
          <span className="bg-red-500 text-white p-1 rounded-lg">
            غير متوفر
          </span>
        ) : null}
      </div>
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
        {product.price} جنيه / {product.unit}
      </p>
      <button
        className={`btn btn-${
          product?.inStock ? "primary" : "warning"
        } font-bolder text-[18px] w-full text-center p-2 mt-3 hover:text-white`}
        onClick={handleAddToCart}
        disabled={!product?.inStock}
      >
        اضافة للسلة
      </button>
    </div>
  );
};

export default ProductCard;
