"use client";
import React from "react";
import logo from "../../../public/al-baraka-logo.png";
import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { userStore } from "@/store/user";
import avatar from "../../../public/avatar.svg";
const Navbar = () => {
  const user = userStore((state) => state.user);
  console.log(user);
  return (
    <div className="navbar bg-white">
      <div className="container">
        <div className="flex-1 md:flex-none">
          <Link href="/" className="overflow-hidden">
            <Image
              src={logo}
              alt="logo"
              className="w-[100px] h-[80px] scale-x-125 scale-y-[2]"
            />
          </Link>
        </div>
        <div className=" flex-1 hidden md:block ">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/" className="font-bold text-[20px]">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href={`/products/خضروات`} className="font-bold text-[20px]">
                خضروات
              </Link>
            </li>
            <li>
              <Link href={`/products/فواكه`} className="font-bold text-[20px]">
                فواكه
              </Link>
            </li>
            <li>
              <Link href={`/products/ورقيات`} className="font-bold text-[20px]">
                ورقيات
              </Link>
            </li>
            <li>
              <Link href={`/products/التمور`} className="font-bold text-[20px]">
                التمور
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-5  items-center ">
          {user.userInfo ? (
            <>
              <div className="avatar">
                <div className="w-[40px] h-[40px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <Image
                    alt="avatar"
                    src={user.userInfo.avatar ? user.userInfo.avatar : avatar}
                    className="w-full h-full"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <FaShoppingCart className="text-[35px]" />
            </>
          ) : (
            <>
              <Link href="/login" className="font-bold text-[20px]">
                تسجيل الدخول
              </Link>
              <Link href="/register" className="font-bold text-[20px]">
                انشاء حساب
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;


