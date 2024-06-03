"use client";
import UploadImages from "@/components/admin/UploadImages";
import axiosInstance from "@/lib/axiosInstance";
import { alertStore } from "@/store/alert";
import React, { useEffect, useState } from "react";

const EditPage = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const [loading, setLoading] = useState(false);
  const { setAlert } = alertStore();
  const [Product, setProduct] = useState({
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

  // fetch product by id
  useEffect(() => {
    axiosInstance.get(`/products/${params.id}`).then((res) => {
      setProduct(res.data.product);
    });
  }, [params.id]);

  // handle change state
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: name === "inStock" && value === "true" ? true : false // Convert string to boolean
    }));
  };

  // handle submit
  const handleSubmit = async () => {
    // check if price or amount is less than 0 or empty
    if (Product.price <= 0 || Product.amount <= 0) {
      setAlert({ type: "error", message: "السعر والكمية يجب ان تكون اكبر من 0" });
      return;
    }
    // check if category or unit or name or images is empty 
    if (!Product.category || !Product.unit || !Product.name || !Product.images[0]) {
      setAlert({ type: "error", message: "برجاء ادخال جميع البيانات" });
      return;
    }
    setLoading(true);
    axiosInstance
      .post(`/admin/edit-product/${params.id}`, Product)
      .then((res) => {
        setAlert({ type: "success", message: res.data.message });
        setProduct(res.data.product);
      })
      .catch((err) => {
        setAlert({ type: "error", message: err.response.data.message });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <h1 className="my-8 font-main font-bold text-primary text-[35px]">
        تعديل المنتج
      </h1>
      <div className="my-5 shadow-lg p-5 border-[1px] ">
        <div className="grid grid-cols-1 gap-5">
          <div>
            <label className="block w-full font-main font-bold text-primary pb-3">
              اسم المنتج
            </label>
            <input
              type="text"
              placeholder="ادخل اسم المنتج"
              className="input input-bordered w-full "
              name="name"
              value={Product.name}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block w-full font-main font-bold text-primary pb-3">
              وصف المنتج
            </label>
            <input
              type="text"
              placeholder="ادخل وصف المنتج"
              className="input input-bordered w-full "
              name="description"
              value={Product.description}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block w-full font-main font-bold text-primary pb-3">
              السعر
            </label>
            <input
              type="number"
              placeholder="ادخل السعر"
              className="input input-bordered w-full "
              name="price"
              value={Product.price}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block w-full font-main font-bold text-primary pb-3">
              الكمية
            </label>
            <input
              type="number"
              placeholder="ادخل الكمية"
              className="input input-bordered w-full "
              name="amount"
              value={Product.amount}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label className="block w-full font-main font-bold text-primary pb-3">
              القسم
            </label>
            <label className="form-control w-full ">
              <select
                className="select select-bordered"
                name="category"
                value={Product.category}
                onChange={(e) => handleChange(e)}
              >
                <option disabled>الاقسام</option>
                <option>فواكه</option>
                <option>خضروات</option>
                <option>تمور</option>
                <option>ورقيات</option>
                <option>فواكه مجففة</option>
              </select>
            </label>
          </div>
          <div>
            <label className="block w-full font-main font-bold text-primary pb-3">
              الوحدة
            </label>
            <label className="form-control w-full ">
              <select
                className="select select-bordered"
                name="unit"
                value={Product.unit}
                onChange={(e) => handleChange(e)}
              >
                <option disabled>الوحدة</option>
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
          <div>
            <label className="block w-full font-main font-bold text-primary pb-3">
              الحالة
            </label>
            <label className="form-control w-full ">
              <select
                className="select select-bordered"
                name="inStock"
                value={Product.inStock.toString()} // Convert boolean to string
                onChange={(e) => handleChange(e)}
              >
                <option value="true">متوفر</option>
                <option value="false">غير متوفر</option>
              </select>
            </label>
          </div>
          <div>
            <UploadImages formState={Product} setFormState={setProduct} />
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            {loading ? "جاري الحفظ" : "حفظ"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPage;
