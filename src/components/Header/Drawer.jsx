"use client";
import { userStore } from '@/store/user';
import Link from 'next/link';
import React from 'react'
import { CiMenuFries } from "react-icons/ci";
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export const Drawer = () => {
    const { user, logout } = userStore(); // get user token
    const router = useRouter();
    // handle logout
    const handleLogout = () => {
        logout();
        router.push("/");
        deleteCookie("token");
    };
    return (
        <div className="drawer lg:hidden w-[40px]">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content w-[40px]">
                <label htmlFor="my-drawer" className="drawer-button w-[40px] block lg:hidden">
                    <CiMenuFries className="text-[40px] font-extrabold cursor-pointer" />
                </label>
            </div>
            <div className="drawer-side z-[300]">
                <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu  w-80 min-h-full bg-base-200 ">
                    <li className='my-2'>
                        <Link href="/" className="font-bold text-[20px] font-main">
                            الرئيسية
                        </Link>
                    </li>
                    <li className='my-2'>
                        <Link
                            href="/products/خضروات"
                            className="font-bold text-[20px] font-main"
                        >
                            خضروات
                        </Link>
                    </li>
                    <li className='my-2'>
                        <Link
                            href="/products/فواكه"
                            className="font-bold text-[20px] font-main"
                        >
                            فواكه
                        </Link>
                    </li>
                    <li className='my-2'>
                        <Link
                            href="/products/ورقيات"
                            className="font-bold text-[20px] font-main"
                        >
                            ورقيات
                        </Link>
                    </li>
                    <li className='my-2'>
                        <Link
                            href="/products/تمور"
                            className="font-bold text-[20px] font-main"
                        >
                            تمور
                        </Link>
                    </li>
                    <div className="divider h-[.5px bg-slate-200]"></div>

                    {
                        user?.userInfo?.role === "admin" && (
                            <li className='my-2'>
                                <Link
                                    href="/admin"
                                    className="font-bold text-[20px] font-main"
                                >
                                    لوحة التحكم
                                </Link>
                            </li>
                        )
                    }
                    {
                        !user?.userInfo ? (
                            <>
                                <li className='my-2'>
                                    <Link
                                        href="/login"
                                        className="font-bold text-[15px] md:text-[20px] text-primary font-main"
                                    >
                                        تسجيل
                                    </Link>
                                </li>
                                <li className='my-2'>
                                    <Link
                                        href="/register"
                                        className="font-bold text-[15px] md:text-[20px] text-primary font-main "
                                    >
                                        انشاء حساب
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>

                                <li className='my-2' onClick={handleLogout}>

                                    <Link href="/" className="font-bold text-[15px] md:text-[20px] text-error font-main">
                                        تسجيل الخروج
                                    </Link>

                                </li>
                            </>
                        )
                    }

                </ul>
            </div>
        </div>
    );
};
