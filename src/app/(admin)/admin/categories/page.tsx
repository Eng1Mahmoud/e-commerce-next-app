"use client";
import axiosInstance from "@/lib/axiosInstance";
import { alertStore } from "@/store/alert";
import { ICategorise } from "@/types/categorise";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const Categorises = () => {
  const router = useRouter();
  const { setAlert } = alertStore();
  const [categories, setCategories] = useState<ICategorise[]>([]);
  const [loading, setLoading] = useState(false);
  // get categories from the server
  useEffect(() => {
    setLoading(true);
    axiosInstance.get("/admin/get-categorise").then((res) => {
      setCategories(res.data.categorises);
      setLoading(false);
    });
  }, []);
  // handle delete categorise
  const handleDelete = (id: string) => {
    axiosInstance
      .post(`/admin/delete-categorise/${id}`)
      .then((res) => {
        setCategories((prev) => prev.filter((c) => c._id !== id));
        setAlert({ message: res.data.message, type: "success" });
      })
      .catch((err) => {
        setAlert({ message: err.response.data.message, type: "error" });
      });
  };
  // handle go to edit page
  const handleEdit = (id: string) => {
    router.push(`/admin/edit-categorise/${id}`);
  };
  return (
    <div className="container mt-[50px] py-5">
      <h2 className=" text-[30px] md:text-[40px] font-main font-extrabold text-primary">
        الفئات
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {loading
          ? [1, 2, 3, 4, 5].map((i) => (
              <div className="skeleton w-full h-[300px]" key={i}></div>
            ))
          : categories.map((category, i) => (
              <div className="relative h-[300px]" key={`${category?._id}`}>
                <button
                  className=" btn btn-error absolute top-2 right-2  text-white p-2 rounded-br-md"
                  onClick={() => handleDelete(category?._id || "")}
                >
                  حذف
                </button>
                <button
                  className=" btn btn-success absolute top-2 right-16  text-white p-2 rounded-bl-md"
                  onClick={() => handleEdit(category?._id || "")}
                >
                  تعديل
                </button>

                <Image
                  src={category?.image}
                  alt={category?.name}
                  className="w-full h-full object-cover"
                  width={1000}
                  height={1000}
                />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Categorises;
