"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import authHero from "../../../../public/auth-hero.jpg";
import { IRegister } from "@/types/user";
import { alertStore } from "@/store/alert";
import { useRouter } from "next/navigation";
const RegisterPage = () => {
  const router = useRouter();
  const { setAlert } = alertStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<IRegister>({
    username: "",
    email: "",
    password: "",
  });

  // handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.status === 200) {
          setAlert({ message: data.message, type: "success" });
          router.push("/login");
        }
        if (res.status === 400) {
          setAlert({ message: data.message, type: "error" });
        }
      })
      .catch((error) => {
        setAlert({ message: error.message, type: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 h-screen ">
      <div className="container flex items-center">
        <form
          onSubmit={handleSubmit}
          className="w-full  border-[1px] border-gray-400] px-[15px] pb-[30px] shadow-lg"
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
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="ادخل البريد الالكتروني هنا"
              className="input input-bordered input-primary w-full"
            />
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleInputChange}
              placeholder="ادخل كلمة المرور هنا"
              className="input input-bordered input-primary w-full"
            />

            <div className=" mt-4">
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
  );
};

export default RegisterPage;
