"use client";
import React, { useEffect, useState } from "react";
import { Drawer } from "@/components/Header/Drawer";
import logo from "../../../public/al-baraka-logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { userStore } from "@/store/user";
import avatar from "../../../public/avatar.svg";
import useCartStore from "@/store/cartQount";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import axiosInstance from "@/lib/axiosInstance";
import { ICategorise } from "@/types/categorise";
import { FaMotorcycle } from "react-icons/fa6";

const Navbar = () => {
  const [categories, setCategories] = useState<ICategorise[]>([]);
  const router = useRouter();
  const { user, logout } = userStore(); // get user token
  const { cartCount } = useCartStore((state) => state); // get user cart items count

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
    <div className="navbar bg-white">
      <div className="container mx-auto flex items-center justify-between ">
        <Drawer />
        <div
          className={`flex ${
            user?.token && user?.userInfo?.role === "user"
              ? "flex-1"
              : "flex-none"
          } items-center lg:flex-none mr-5 lg:mr-0`}
        >
          <Link href="/" className="flex items-center justify-start">
            <Image
              src={logo}
              alt="logo"
              className="w-[120px] h-[100px] scale-x-125 scale-y-[2]"
              width={500}
              height={500}
            />
          </Link>
        </div>
        <div className="hidden lg:flex lg:items-center lg:justify-between lg:flex-1 mr-3">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/" className="font-bold text-[20px] font-main ">
                الرئيسية
              </Link>
            </li>
            {categories.map((category, i) => (
              <li key={category?._id}>
                <Link
                  href={`/products/${category.name}`}
                  className="font-bold text-[20px] font-main "
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {user?.userInfo?.role === "user" && (
          <div className="flex gap-3">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="">
                <div className="avatar cursor-pointer">
                  <div className="w-[40px] h-[40px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <Image
                      alt="avatar"
                      src={user.userInfo.avatar ? user.userInfo.avatar : avatar}
                      className="w-full h-full"
                      width={40}
                      height={40}
                    />
                  </div>
                </div>
              </div>
              <ul className="dropdown-content z-[60] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link href="/profile">
                    <CgProfile className="h-5 w-5" />
                    الملف الشخصي
                  </Link>
                </li>
                <li>
                  <Link href="/profile/current-orders">
                    <FaMotorcycle className="" size={30} />
                    الطلبات الحالية
                  </Link>
                </li>
                <li>
                  <button className="" onClick={handleLogout}>
                    <IoIosLogOut className="h-5 w-5 text-red-600" />
                    تسجيل الخروج
                  </button>
                </li>
              </ul>
            </div>
            <div className="indicator">
              <span className="indicator-item badge bg-primary text-white p-2">
                {cartCount}
              </span>
              <Link href="/cart" className="font-bold text-[20px] font-main">
                <FaShoppingCart className="text-[35px]" />
              </Link>
            </div>
          </div>
        )}
        {!user?.userInfo && (
          <ul className="menu  px-1 hidden lg:flex flex-row lg:gap-3">
            <Link
              href="/login"
              className="font-bold text-[15px] mr-3 md:text-[20px] text-primary font-main hidden lg:block"
            >
              تسجيل
            </Link>
            <Link
              href="/register"
              className="font-bold text-[15px] md:text-[20px] text-primary font-main hidden lg:block"
            >
              انشاء حساب
            </Link>
          </ul>
        )}
        {user?.userInfo?.role === "admin" && (
          <ul className="menu menu-horizontal px-1 hidden lg:block">
            <li>
              <Link href="/admin" className="font-bold text-[20px] font-main">
                لوحة التحكم
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
