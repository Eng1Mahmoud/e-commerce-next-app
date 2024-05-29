"use client";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import UploadImages from "./UploadImages";
import axiosInstance from "@/lib/models/axiosInstance";
const AddProductForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    amount: 0,
    images: [""],
    unit:""
  } as {
    name: string;
    description: string;
    price: number;
    category: string;
    images: string[];
    amount: number;
    unit:string;
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
    axiosInstance.post("/admin/add-product",formState).then((res)=>{
      alert(res.data.message)
    }).catch((error)=>{
      alert(error.message)
    })
  };

  return (
    <div className="py-11">
      <h2 className="text-center text-[35px] font-bold  text-teal-500">
        Upload New Product
      </h2>
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
                  <option disabled selected>
                    الاقسام
                  </option>
                  <option>فواكه</option>
                  <option>خضروات</option>
                  <option>تمور</option>
                  <option>ورقيات</option>
                  <option>فواكه مجففة</option>
                </select>
              </label>
              <label className="form-control w-full ">
                <select
                  className="select select-bordered"
                  name="unit"
                  onChange={(e) => handleChange(e)}
                >
                  <option disabled selected>
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
                  <UploadImages formState={formState} setFormState={setFormState}/>
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
