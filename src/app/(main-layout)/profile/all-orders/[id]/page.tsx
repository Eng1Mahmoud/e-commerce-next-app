"use client";
import axiosInstance from "@/lib/axiosInstance";
import Image from "next/image";
import { useEffect, useState } from "react";

const OrderById = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const [order, setOrder] = useState<any>({});

  // get order by id
  useEffect(() => {
    axiosInstance
      .post("/order/get-order-by-id", { OrderId: params.id })
      .then((res) => {
        setOrder(res.data.order);
        console.log(res.data.order);
      });
  }, [params.id]);

  // Map order status to corresponding steps
  const getStatusStep = (status: string) => {
    switch (status) {
      case "جديده":
        return 0;
      case "تحت التجهيز":
        return 1;
      case "جاري التوصيل":
        return 2;
      case "مكتمله":
        return 3;
      case "ملغيه":
        return 4;
      default:
        return 0;
    }
  };

  const currentStep = getStatusStep(order.status);

  return (
    <div>
      <h1 className="text-primary font-bold font-main text-[20px] mb-5">
        تفاصيل الطلب
      </h1>

      <h2 className="font-bold font-main text-[20px] mb-3">
        السعر الكلي: {order.total} جنيه
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {order?.products?.map((product: any) => (
          <div
            key={product._id}
            className="flex gap-5 flex-col shadow-lg p-2 justify-center"
          >
            <Image
              width={500}
              height={500}
              src={product.productData.image}
              alt={product.productData.name}
              className="w-full h-[100px]"
            />
            <div>
              <h3>{product.productData.name}</h3>
              <p>{product.productData.price} جنيه / {" "} {product?.productData?.unit}</p> 
            </div>
          </div>
        ))}
      </div>

      <h2 className="font-bold font-main text-[20px] mt-8 mb-3">تتبع الطلب</h2>
      <ul className="steps mb-8 w-full">
        <li className={`step ${currentStep >= 0 ? "step-primary" : ""}`}>
          جديده
        </li>
        <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>
          تحت التجهيز
        </li>
        <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>
          جاري التوصيل
        </li>
        {order.status !== "ملغيه" && (
          <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>
            مكتمله
          </li>
        )}
        {order.status === "ملغيه" && (
          <li className={`step ${currentStep === 4 ? "step-primary" : ""}`}>
            ملغيه
          </li>
        )}
      </ul>
    </div>
  );
};

export default OrderById;
