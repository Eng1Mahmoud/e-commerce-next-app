"use client";
import axiosInstance from "@/lib/axiosInstance";
import { alertStore } from "@/store/alert";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function VerifyEmailContent() {
  const [success, setSuccess] = useState("");
  const { setAlert } = alertStore();
  let router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      axiosInstance
        .post("/auth/verify-email", { token })
        .then((res) => {
          setSuccess("verifyed");
          setAlert({ message: res.data.message, type: "success" });
          /*  router.push("/login"); */
        })
        .catch((error) => {
          console.log(error.response.data.message);
          setSuccess("failed");
          setAlert({ message: error.response.data.message, type: "error" });
        });
    }
  }, [router, setAlert, token]);

  return (
    <div>
      <h1 className="font-bold font-main text-[25px]">
        {success === "verifyed" && "تم تفعيل الحساب بنجاح"}
        {success === "failed" && "لم يتم تفعيل الحساب ربما انتهت صلاحية الرابط"}
      </h1>
      {success === "failed" && (
        <button
          className="btn btn-primary mt-2"
          onClick={() => router.push("/register")}
        >
          انشاء حساب
        </button>
      )}
      {success === "verifyed" && (
        <button
          className="btn btn-primary mt-2"
          onClick={() => router.push("/login")}
        >
          {" "}
          تسجيل الدخول
        </button>
      )}
      {!success && (
        <p className="font-bold font-main text-primary text-[25px]">
          الرجاء الانتظار بضع ثواني يتم الان التحقق من حالة الحساب
        </p>
      )}
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <Suspense fallback={<p>Loading...</p>}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
