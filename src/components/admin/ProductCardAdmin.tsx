"use client";
import { IProduct } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { alertStore } from "@/store/alert";
const ProductCardAdmin = ({ product }: { product: IProduct }) => {
  const { setAlert } = alertStore();
  const router = useRouter();
  // handle go to edit product page
  const handleEdit = () => {
    router.push(`/admin/edit-product/${product._id}`);
  };
  // handle delete product
  const handleDelete = () => {
    axiosInstance
      .delete(`/admin/delete-product/${product._id}`)
      .then((res) => {
        setAlert({ type: "success", message: res.data.message });
      })
      .catch((err) => {
        setAlert({ type: "error", message: err.response.data.message });
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 relative ">
      <button
        className=" btn btn-success absolute top-1 right-1"
        onClick={handleEdit}
      >
        تعديل
      </button>
      <button
        className=" btn btn-error absolute top-1 left-3"
        onClick={handleDelete}
      >
        حذف
      </button>
      <Image
        src={product.images[0]}
        alt={product.name}
        width={500}
        height={500}
        className="h-[150px] w-full"
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
    </div>
  );
};

export default ProductCardAdmin;
