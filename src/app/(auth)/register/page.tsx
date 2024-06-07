"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import authHero from "../../../../public/auth-hero.jpg";
import { IRegister } from "@/types/user";
import { alertStore } from "@/store/alert";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";

const RegisterPage = () => {
  const router = useRouter();
  const { setAlert } = alertStore();
  const [loading, setLoading] = useState(false);
  const [successSignup, setSuccessSignup] = useState<{
    status: boolean;
    message: string;
  }>({
    status: false,
    message: "",
  });
  const [userData, setUserData] = useState<IRegister>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors when user types
  };

  // validation function
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!userData.username || userData.username.length < 3) {
      newErrors.username = "الاسم يجب ان يكون اكثر من 3 احرف.";
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email || !emailPattern.test(userData.email)) {
      newErrors.email = "البريد الالكتروني غير صحيح.";
    }
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!userData.password || !passwordPattern.test(userData.password)) {
      newErrors.password =
        "كلمة المرور يجب ان تحتوي علي حروف كبيرة وصغيرة وارقام.";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    axiosInstance
      .post("/auth/register", userData)
      .then((res) => {
        setAlert({ message: res.data.message, type: "success" });
        setSuccessSignup({ status: true, message: res.data.message });
      })
      .catch((error) => {
        setAlert({ message: error.response.data.message, type: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // resend email verification link by call sign up api again
  const resendEmail = () => {
    axiosInstance
      .post("/auth/register", userData)
      .then((res) => {
        setAlert({ message: "تم ارسال الرسالة مجددا", type: "success" });
      })
      .catch((error) => {
        setAlert({
          message: " عذرا حدث خطا اثناء ارسال الرسالة ",
          type: "error",
        });
      });
  };

  return (
    <>
      {successSignup.status && (
        <div className="container flex justify-center items-center flex-col w-full h-[100vh]">
          <div className="text-[#ffad33] text-[30px] font-bold font-main">
            {successSignup.message}
          </div>
          <p className="text-[20px] font-main">
            يرجي تفقد البريد الالكتروني لتفعيل الحساب
          </p>
          <p className="text-[20px] font-main">
            اذا لم تجد الرسالة يمكنك اعادة ارسالها من
            <button
              onClick={resendEmail}
              className="text-[#ffad33] font-bold mr-2"
            >
              {" "}
              هنا
            </button>
          </p>
        </div>
      )}
      {!successSignup.status && (
        <>
          <section className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
            <div className="container flex items-center">
              <form
                onSubmit={handleSubmit}
                className="w-full border-[1px] border-gray-400 px-[15px] pb-[30px] shadow-lg"
              >
                <h3 className="my-10 text-[#ffad33] font-bold text-[30px]">
                  {" "}
                  انشاء حساب جديد
                </h3>
                <div className="grid grid-cols-1 gap-5">
                  <input
                    type="text"
                    name="username"
                    value={userData.username}
                    onChange={handleInputChange}
                    placeholder="ادخل اسم المستخدم هنا"
                    className="input input-bordered input-primary w-full"
                  />
                  {errors.username && (
                    <span className="text-red-500">{errors.username}</span>
                  )}
                  <input
                    type="email"
                    name="email"
                    value={userData.email}
                    onChange={handleInputChange}
                    placeholder="ادخل البريد الالكتروني هنا"
                    className="input input-bordered input-primary w-full"
                  />
                  {errors.email && (
                    <span className="text-red-500">{errors.email}</span>
                  )}
                  <input
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleInputChange}
                    placeholder="ادخل كلمة المرور هنا"
                    className="input input-bordered input-primary w-full"
                  />
                  {errors.password && (
                    <span className="text-red-500">{errors.password}</span>
                  )}
                  <div className="mt-4">
                    <div className="flex text-[16px] md:text-[18px]">
                      <span className="mx-2"> لدي حساب؟ </span>
                      <Link href="/login" className="text-[#ffad33] font-bold">
                        تسجيل الدخول
                      </Link>
                    </div>
                  </div>
                  <button
                    className="btn w-full md:w-[50%] self-center"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "جاري التحميل..." : "انشاء حساب جديد"}
                  </button>
                  <div className="mt-5 text-center">
                    <Link
                      href="/"
                      className="text-[#ffad33] font-bold text-center hover:text-[#aa7c379e]"
                    >
                      البركة ماركت
                    </Link>
                  </div>
                </div>
              </form>
            </div>
            <div className="hidden md:flex items-center justify-center h-full w-full">
              <Image
                src={authHero}
                alt="logo"
                width={1700}
                height={1700}
                className="h-screen w-full"
                loading="eager"
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default RegisterPage;
