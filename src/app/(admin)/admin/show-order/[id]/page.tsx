"use client";
import axiosInstance from "@/lib/axiosInstance";
import { alertStore } from "@/store/alert";
import Image from "next/image";
import React, { useEffect, useState } from "react";
const OrderDetails = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const [order, setOrder] = useState<any>(null);
  const {setAlert} = alertStore();
  console.log(order);
  // get order details by id
  useEffect(() => {
    axiosInstance
      .post("/admin/get-order-details", { id: params.id })
      .then((res) => {
        setOrder(res.data.order);
      });
  }, [params.id]);
  // Convert and format the createdAt date
  const formatDate = (dateString: string) => {
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    };
    const date = new Date(dateString).toLocaleDateString("ar-EG");
    const time = new Date(dateString).toLocaleTimeString("ar-EG");

    return `${date} - ${time}`; // Concatenate date and time with a hyphen
  };
  // change order status 
  const handleChangeStatus = (e: any) => {
    const status = e.target.value;
    axiosInstance
      .post("/admin/change-order-status", { id: params.id, status })
      .then((res) => {
        setAlert({ type: "success", message: res.data.message })
      });
  };
  return (
    <div className="container">
      <h1 className="font-bold font-main text-[30px] text-primary my-8">
        تفاصيل الطلب{" "}
      </h1>
      {/**details user  */}
      <div className="my-5 shadow-lg p-5 border-[1px] ">
        <h2 className="text-xl font-bold font-main text-primary">
          بيانات المستخدم
        </h2>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold font-main text-[20px]">
            الاسم : {order?.userId?.username}
          </h2>
          <h2 className="font-bold font-main text-[20px]">
            الهاتف : {order?.userId?.phone}
          </h2>
          <h2 className="font-bold font-main text-[20px]">
            العنوان : {order?.userId?.address}
          </h2>
        </div>
      </div>
      {/**details order */}
      <div className="my-5 shadow-lg p-5 border-[1px] ">
        <h2 className="text-xl font-bold font-main text-primary">
          بيانات الطلب
        </h2>
        <div className="flex flex-col gap-3">
          <h2 className="font-bold font-main text-[20px]">
            الحالة : {order?.status}
          </h2>
          <h2 className="font-bold font-main text-[20px]">
            السعر الكلي : {order?.total}
          </h2>
          <h2 className="font-bold font-main text-[20px]">
            التاريخ : {order ? formatDate(order.createdAt) : ""}
          </h2>
        </div>
      </div>
      {/**details products */}
      <div className="my-5 shadow-lg p-5 border-[1px] ">
        <h2 className="text-xl font-bold font-main text-primary my-4">
          المنتجات
        </h2>
        <div className="grid  grid-cols-1 md:grid-cols-3 gap-3">
          {order?.products.map((product: any) => (
            <div key={product?._id} className="shadow-md">
              <div className="flex justify-center items-center">
                <Image
                  src={product.productId.images[0]}
                  alt="product"
                  className="w-full h-[200px] object-cover"
                  width={300}
                  height={300}
                />
              </div>
              <div className="p-4">
                <h2 className="font-bold font-main text-[20px]">
                  الاسم : {product.productId.name}
                </h2>
                <h2 className="font-bold font-main text-[20px]">
                  السعر : {product.productId.price}
                </h2>

                <h2 className="font-bold font-main text-[20px]">
                  الكمية : {product.quantity}
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/**details payment */}
      <div className="my-5 shadow-lg p-5 border-[1px] ">
        <h2 className="text-xl font-bold font-main text-primary">
          بيانات الدفع
        </h2>
        <h2 className="font-bold font-main text-[20px]">
          الحالة : {order?.paymentStatus}
        </h2>
      </div>

      {/**change order status */}
      <div className="my-5 shadow-lg p-5 border-[1px] ">
        <h2 className="text-xl font-bold font-main text-primary my-4">
          تغيير حالة الطلب
        </h2>
        <select className="select select-bordered w-full max-w-xs" onChange={handleChangeStatus}>
          <option disabled selected>
            اختر حالة الطلب
          </option>
          <option value="جديده">جديده </option>
          <option value="تحت التجهيز"> تحت التجهيز</option>
          <option value="جاري التوصيل">جاري التوصيل</option>
          <option value="مكتمله">مكتمله </option>
          <option value="ملغيه">ملغيه</option>
        </select>
      </div>
    </div>
  );
};

export default OrderDetails;
