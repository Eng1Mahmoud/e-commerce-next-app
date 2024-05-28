"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import authHero from "../../../../public/auth-hero.jpg";
import { userStore } from "@/store/user";
import { parseJwt } from "@/lib/decodeToken";
import Image from "next/image";
import Link from "next/link";
import { alertStore } from "@/store/alert";
import { ILogin } from "@/types/user";
const LoginPage = () => {
  const { setAlert } = alertStore();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<ILogin>({
    email: "",
    password: "",
  });
  const { updateUser } = userStore();
  // handle input changes
  // handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          const decodetoken = parseJwt(data.token);
          updateUser({
            token: data.token,
            exp: decodetoken.exp,
            _id: decodetoken.userId,
            userInfo: data.user,
          });

          router.push("/");
        }

        if (res.status === 400) {
          setAlert({ message: data.message, type: "error" });
        }
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
            تسجبل الدخول
          </h3>
          <div className="grid grid-cols-1 gap-5">
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleInputChange}
              placeholder="ادخل البريد الالكتروني هنا"
              className="input input-bordered input-primary w-full"
            />
            <input
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleInputChange}
              placeholder="ادخل كلمة المرور هنا"
              className="input input-bordered input-primary w-full"
            />

            <div className=" mt-4">
              <div className="flex text-[16px] md:text-[18px]">
                <span className="mx-2">ليس لديك حساب؟ </span>
                <Link href="/register" className="text-[#ffad33] font-bold">
                  انشاء حساب جديد
                </Link>
              </div>
              <div className="mt-5">
                <span className="mx-2 ">نسيت كلمة المرور؟ </span>
                <Link
                  href="/auth/reset-password "
                  className="text-[#ffad33] font-bold"
                >
                  اضغط هنا
                </Link>
              </div>
            </div>
            <button
              className="btn w-full md:w-[50%] self-center"
              type="submit"
              disabled={loading}
            >
              {loading ? "...انتظر من فضلك" : " تسجيل الدخول"}
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

export default LoginPage;
