"use client";
import { userStore } from "@/store/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { ICategorise } from "@/types/categorise";
import { IoCloseSharp } from "react-icons/io5";
export const Drawer = () => {
  const [categories, setCategories] = useState<ICategorise[]>([]);
  const { user, logout } = userStore(); // get user token
  const router = useRouter();

  // handle logout
  const handleLogout = () => {
    logout();
    router.push("/");
    deleteCookie("token");
  };

  // get categories from the server
  useEffect(() => {
    axiosInstance.get("/admin/get-categorise").then((res) => {
      setCategories(res.data.categorises);
    });
  }, []);

  return (
    <div className="drawer lg:hidden w-[40px]">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content w-[40px]">
        <label
          htmlFor="my-drawer"
          className="drawer-button w-[40px] block lg:hidden"
        >
          <CiMenuFries className="text-[40px] font-extrabold cursor-pointer" />
        </label>
      </div>
      <div className="drawer-side z-[300]">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <ul className="menu w-80 min-h-full bg-base-200 relative pt-14">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="close-button block absolute top-5 left-5 cursor-pointer"
          >
            <IoCloseSharp className="text-[50px] text-primary" />
          </label>
          <li className="my-2">
            <Link href="/" className="font-bold text-[20px] font-main">
              الرئيسية
            </Link>
          </li>

          {categories.map((category) => (
            <li key={category?._id} className="my-2">
              <Link
                href={`/products/${category?.name}`}
                className="font-bold text-[20px] font-main"
              >
                {category.name}
              </Link>
            </li>
          ))}
          <div className="divider h-[.5px bg-slate-200]"></div>

          {user?.userInfo?.role === "admin" && (
            <li className="my-2">
              <Link href="/admin" className="font-bold text-[20px] font-main">
                لوحة التحكم
              </Link>
            </li>
          )}
          {!user?.userInfo ? (
            <>
              <li className="my-2">
                <Link
                  href="/login"
                  className="font-bold text-[15px] md:text-[20px] text-primary font-main"
                >
                  تسجيل
                </Link>
              </li>
              <li className="my-2">
                <Link
                  href="/register"
                  className="font-bold text-[15px] md:text-[20px] text-primary font-main"
                >
                  انشاء حساب
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="my-2" onClick={handleLogout}>
                <Link
                  href="/"
                  className="font-bold text-[15px] md:text-[20px] text-error font-main"
                >
                  تسجيل الخروج
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};
