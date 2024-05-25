"use client";
import React from "react";
import fail_payment from "../../../../public/fail-payment.png";
import Image from "next/image";
import { useRouter } from 'next/navigation'
const FailPayment = () => {
  const router = useRouter();
  const handleNavigate = () => {
    // handle navigation
    router.push("/cart");
  }
  return (
    <div className="h-[90vh] flex justify-center items-center">
      <div >
        <Image
          src={fail_payment}
          alt="fail-payment"
          className="w-[150px] h-[150px] mx-auto"
          width={300}
          height={300}
        />
        <p className="text-center mt-5 text-red-700 font-bold font-main text-[25px]">
          لم يتم الدفع بنجاح، الرجاء المحاولة مرة أخرى
        </p>
        <div className="flex justify-center mt-5">
        <button className="btn btn-primary m-auto" onClick={handleNavigate}>إعادة المحاولة</button>
        </div>

      </div>
    </div>
  );
};
export default FailPayment;
