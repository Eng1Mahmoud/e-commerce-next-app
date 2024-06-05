"use client";
import { uploadImages } from "@/actions/uploadImages";
import axiosInstance from "@/lib/axiosInstance";
import { alertStore } from "@/store/alert";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const EditCategories = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { setAlert } = alertStore();
  const [categorie, setCategorie] = useState({
    name: "",
    image: "",
  });
  const [loading, setLoading] = useState(false);
  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategorie({ ...categorie, [e.target.name]: e.target.value });
  };
  // handle image change
  const handleChangeImage = async (
    e: React.ChangeEvent<HTMLInputElement | null>
  ) => {
    setLoading(true);
    const file = e.target?.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const { imageUrl } = await uploadImages({}, formData);
      setCategorie({ ...categorie, image: imageUrl });
    }
    setLoading(false);
  };
  // get current category
  useEffect(() => {
    axiosInstance
      .get(`/admin/get-categorise-byId/${params?.id}`)
      .then((res) => {
        setCategorie({
          name: res.data.categorise.name,
          image: res.data.categorise.image,
        });
      });
  }, [params?.id]);

  // update category
  const updateCategory = () => {
    // check if image is empty or name
    if (!categorie.name || !categorie.image) {
      setAlert({ message: "الرجاء ادخال الاسم والصورة", type: "error" });
      return;
    }
    setLoading(true);
    axiosInstance
      .put(`/admin/edit-categorise/${params?.id}`, categorie)
      .then((res) => {
        setAlert({ message: res.data.message, type: "success" });
      })
      .catch((err) => {
        setAlert({ message: err.response.data.message, type: "error" });
      }).finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="container py-10">
      <h1 className="text-primary font-main font-bold text-[25px]">
        تعديل فئة
      </h1>
      <div className="flex flex-col gap-5 mt-5">
        <input
          name="name"
          type="text"
          placeholder="اسم الفئة"
          className="input input-bordered w-full  p-2 rounded-md"
          value={categorie.name}
          onChange={handleChange}
        />
        <div className="flex gap-5 relative">
          <button
            className={`bg-error text-white p-2 rounded-md text-center absolute top-2 right-2 ${
              !categorie?.image && "hidden"
            }`}
          >
            حذف
          </button>
          <input
            id="file"
            type="file"
            className="border border-primary p-2 rounded-md hidden"
            name="image"
            onChange={handleChangeImage}
          />
          <label
            htmlFor="file"
            className="bg-primary text-white p-2 rounded-md cursor-pointer block w-[200px] h-[200px]"
          >
            <div className="flex  justify-center items-center h-full">
              <Image
                src={categorie.image || ""}
                width={500}
                height={500}
                alt="upload"
                className={`${!categorie?.image && "hidden"} h-full w-full`}
              />
              <span className={`${(categorie?.image || loading) && "hidden"}`}>
                رفع صورة
              </span>
              {loading && <span>جاري تحميل الصورة</span>}
            </div>
          </label>
        </div>
        <button
          className="bg-primary text-white p-2 rounded-md text-center"
          onClick={updateCategory}
        >
          {loading ? "جاري التحميل" : "حفظ"}
        </button>
      </div>
    </div>
  );
};

export default EditCategories;
