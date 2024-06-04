"use client";
import React, { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import UploadImages from "./UploadImages";
import axiosInstance from "@/lib/axiosInstance";
import { alertStore } from "@/store/alert";
import { ICategorise } from "@/types/categorise";
const AddProductForm = () => {
  const [categories, setCategories] = useState<ICategorise[]>([]);
  const { setAlert } = alertStore();
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    amount: 0,
    images: [""],
    unit: "",
    inStock: true,
  } as {
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    amount: number;
    unit: string;
    inStock: boolean;
  });

  // button status
  const SummitButton = () => {
    const { pending } = useFormStatus();
    return (
      <button
        type="submit"
        className="btn  w-[200px] h-[50px] mt-[20px]"
        onClick={(e) => handleSubmit(e)}
        disabled={pending}
      >
        {pending ? "انتظر .... " : "اضافة المنتج"}
      </button>
    );
  };

  // handle change state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axiosInstance
      .post("/admin/add-product", formState)
      .then((res) => {
        setAlert({ type: "success", message: res.data.message });
      })
      .catch((error) => {
        setAlert({ type: "error", message: error.response.data.message });
      });
  };
    // get categories from the server
    useEffect(() => {
      axiosInstance.get("/admin/get-categorise").then((res) => {
        setCategories(res.data.categorises);
      })
    }, []);
  
  return (
    <div className="py-11 container">
      <h1 className="font-bold font-main my-8 text-primary text-[35px]">
        {" "}
        اضافة منتج جديد
      </h1>
      <div className="container mx-auto my-[100px] max-w-screen-lg">
        <form className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="grid grid-cols-1 gap-5">
              <input
                type="text"
                placeholder="ادخل اسم المنتج"
                className="input input-bordered w-full "
                name="name"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="text"
                placeholder="ادخل وصف المنتج"
                className="input input-bordered w-full "
                name="description"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="number"
                placeholder="ادخل السعر"
                className="input input-bordered w-full "
                name="price"
                onChange={(e) => handleChange(e)}
              />
              <input
                type="number"
                placeholder="ادخل الكمية"
                className="input input-bordered w-full "
                name="amount"
                onChange={(e) => handleChange(e)}
              />
              <label className="form-control w-full ">
                <select
                  className="select select-bordered"
                  name="category"
                  onChange={(e) => handleChange(e)}
                >
                  <option disabled >
                    الاقسام
                  </option>
                  {categories.map((category) => (
                    <option key={category._id}>{category.name}</option>
                  ))}
                </select>
              </label>
              <label className="form-control w-full ">
                <select
                  className="select select-bordered"
                  name="unit"
                  onChange={(e) => handleChange(e)}
                >
                  <option disabled >
                    الوحدة
                  </option>
                  <option>كيلو</option>
                  <option>جرام</option>
                  <option>قطعة</option>
                  <option>علبة</option>
                  <option>كرتونة</option>
                  <option>حبة</option>
                  <option>حزمة</option>
                </select>
              </label>
            </div>

            <div className="w-full  flex justify-center  ">
              <UploadImages formState={formState} setFormState={setFormState} />
            </div>

            <div className="flex ">
              <SummitButton />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AddProductForm;
