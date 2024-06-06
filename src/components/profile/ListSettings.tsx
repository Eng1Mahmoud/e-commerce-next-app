"use client";
import { userStore } from "@/store/user";
import Link from "next/link";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { FaMotorcycle } from "react-icons/fa6";

export const ListSettings = () => {
  const { logout } = userStore(); // get user token
  const router = useRouter();
  // handle logout
  const handleLogout = () => {
    logout();
    router.push("/");
    deleteCookie("token");
  };
  return (
    <div>
      <ul className="menu w-full px-0 rounded-none flex flex-col gap-[2px]">
        <li>
          <Link href="/profile">
            <CgProfile className="" size={30} />
            الملف الشخصي
          </Link>
        </li>
        <li>
          <Link href="/profile/all-orders">
            <FaMotorcycle className="" size={30} />
            طلباتي
          </Link>
        </li>
        <li>
          <button onClick={handleLogout}>
            <IoIosLogOut size={30} className=" text-red-600" />
            تسجيل الخروج
          </button>
        </li>
      </ul>
    </div>
  );
};
