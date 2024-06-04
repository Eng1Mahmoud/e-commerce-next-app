import React from 'react'
import logoImage from '../../../public/al-baraka-logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { FaPhone } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="p-5 md:p-10 bg-base-200 text-base-content pb-2">
            <aside className="overflow-hidden grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-5 justify-center items-center">
                <div>
                    <Image
                        src={logoImage}
                        alt="logo"
                        width={500}
                        height={500}
                        className="h-[150px] w-[150px] scale-x-125 scale-y-[2] "
                    />
                    <p className="text-[16px] font-main footer-title">
                        البركة ماركت هو موقع الكتروني يقدم خدمات تسوق
                        <br />
                        الكتروني للمستخدمين في مدينة 6 اكتوبر مصر
                    </p>
                </div>
                <nav >
                    <h6 className="text-primary font-main font-bold text-[20px] ">تواصل معنا </h6>
                    <div className="flex gap-3 my-2">
                        <FaPhone />
                        <Link href="tel:+20123456789" className="text-[16px]  footer-title">
                            201201453941+
                        </Link>
                    </div>
                    <div className="flex gap-3 my-2">
                        <FaPhone />
                        <Link href="tel:+201125948712" className="text-[16px]  footer-title">
                            201125948712+
                        </Link>
                    </div>
                    <div className="flex gap-3 my-2">
                        <IoMail />

                        <Link
                            href="mailto:mahmoudabbamalik@gmail.com"
                            className=" inline-block md:max-w-[220px] text-[13px] footer-title md:overflow-ellipsis md:overflow-hidden md:text-[16px] md:whitespace-nowrap md:text-overflow-ellipsis"

                        >
                            mahmoudabbamalik@gmail.com
                        </Link>

                    </div>
                </nav>
                <nav>

                    <h6 className="text-primary font-main font-bold text-[20px]">منتجاتنا</h6>
                    <ul className="flex flex-col gap-2 text-center w-full">
                        <li>
                            <Link
                                href="/products/خضروات"
                                className="text-[16px] font-main footer-title text-center"
                            >
                                خضروات
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products/فواكه"
                                className="text-[16px] font-main footer-title"
                            >
                                فواكه
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products/ورقيات"
                                className="text-[16px] font-main footer-title"
                            >
                                ورقيات
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/products/تمور"
                                className="text-[16px] font-main footer-title"
                            >
                                تمور
                            </Link>
                        </li>
                    </ul>
                </nav>
                <nav>
                    <h6 className="text-primary font-main font-bold text-[20px]">مميزاتنا</h6>
                    <p className="text-[16px] font-main footer-title">توصيل سريع</p>
                    <p className="text-[16px] font-main footer-title">منتجات طازجة</p>
                    <p className="text-[16px] font-main footer-title">اسعار منافسة</p>
                    <p className="text-[16px] font-main footer-title">خدمة عملاء ممتازة</p>
                    <p className="text-[16px] font-main footer-title">امكانية الدفع عند الاستلام</p>
                    <p className="text-[16px] font-main footer-title">امكانية الاسترجاع</p>
                </nav>
            </aside>
            <div className="divider"></div> 
            <div className="flex justify-between items-center gap-3 flex-col md:flex-row ">
                <p className="text-[16px] font-main footer-title">
                جميع الحقوق محفوظة لموقع البركة ماركت &copy; {currentYear}
                </p>
                <p className="text-[16px] font-main footer-title">
                    تصميم وتطوير <Link href="https://www.linkedin.com/in/mahmoud-mohamed-abdel-aal" className="text-primary">محمود محمد</Link>
                </p>
            </div>
        </footer>
      
       
    );
}
