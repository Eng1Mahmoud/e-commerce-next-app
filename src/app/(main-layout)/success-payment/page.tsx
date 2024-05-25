"use client";
import Image from "next/image";
import React from "react";
import success_payment from "../../../../public/success-payment.png";
import { useRouter } from "next/navigation";
const SuccessPayment = () => {
  const router = useRouter();
  const handleNavigate = () => {
    // handle navigation
    router.push("/");
  };
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div>
        <Image
          src={success_payment}
          alt="fail-payment"
          className="w-[150px] h-[150px] mx-auto"
          width={300}
          height={300}
        />
        <p className="text-center mt-5 text-green-500 font-bolder text-[30px] font-main">
          تم الدفع بنجاح
        </p>
        <div className="flex justify-center mt-5">
          <button className="btn btn-primary m-auto" onClick={handleNavigate}>
            العودة للصفحة الرئيسية
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
