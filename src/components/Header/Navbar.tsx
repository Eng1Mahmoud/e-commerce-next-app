"use client";
import React from "react";
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
const Navbar = () => {
  const router = useRouter();
  const { user, logout } = userStore(); // get user token
  const { cartCount } = useCartStore((state) => state); // get user cart items count

  // handle logout
  const handleLogout = () => {
    logout();
    router.push("/");
    deleteCookie("token");

  };
  return (
    <div className="navbar bg-white">
      <div className="container mx-auto">
        <div className="flex-1 lg:flex-none ">
          <Link href="/" className="overflow-hidden">
            <Image
              src={logo}
              alt="logo"
              className="w-[100px] h-[80px] scale-x-125 scale-y-[2]"
            />
          </Link>
        </div>
        <div className=" flex-1 hidden lg:block ">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/" className="font-bold text-[20px] font-main">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link
                href={`/products/خضروات`}
                className="font-bold text-[20px] font-main"
              >
                خضروات
              </Link>
            </li>
            <li>
              <Link
                href={`/products/فواكه`}
                className="font-bold text-[20px] font-main"
              >
                فواكه
              </Link>
            </li>
            <li>
              <Link
                href={`/products/ورقيات`}
                className="font-bold text-[20px] font-main"
              >
                ورقيات
              </Link>
            </li>
            <li>
              <Link
                href={`/products/التمور`}
                className="font-bold text-[20px] font-main"
              >
                التمور
              </Link>
            </li>
            <li>
              <Link
                href={`/profile`}
                className="font-bold text-[20px] font-main"
              >
                الملف الشخصي 
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-5  items-center ">
          {user.userInfo ? (
            <>
              {/** user avatar */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="">
                  <div className="avatar cursor-pointer">
                    <div className="w-[40px] h-[40px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <Image
                        alt="avatar"
                        src={
                          user.userInfo.avatar ? user.userInfo.avatar : avatar
                        }
                        className="w-full h-full"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </div>
                <ul
                  className="dropdown-content z-[60] menu p-2 shadow bg-base-100 rounded-box w-52  "
                  tabIndex={0}
                >
                  <li>
                    <Link href="/profile">
                      <CgProfile className="h-5 w-5" />
                      الملف الشخصي
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
              {/*user menu */}

              {/** cart qount */}
              <div className="indicator">
                <span className="indicator-item badge bg-primary text-white p-2">
                  {cartCount}
                </span>
                <Link href="/cart" className="font-bold text-[20px] font-main">
                  <FaShoppingCart className="text-[35px]" />
                </Link>
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="font-bold text-[15px] md:text-[20px] text-primary font-main"
              >
                تسجيل
              </Link>
              <Link
                href="/register"
                className="font-bold text-[15px] md:text-[20px] text-primary font-main"
              >
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
