"use client";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { UserAvatar } from "@/components/profile/UserAvatar";
import { ListSettings } from "../../../components/profile/ListSettings";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const profileDev = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const handleScroll = () => {
      if (profileDev.current) {
        let top = -125; // default top value
        let newTop = window.scrollY + top; // new top value
        profileDev.current.style.top = `${newTop}px`; // set new top value
        top = newTop; // update top value
        if (top > 0) {
          // if top value is greater than 0 set it to 0
          profileDev.current.style.top = `0px`;
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    
        <section className="w-full overflow-x-hidden">
          <div className="bg-primary w-full h-[200px]">
            <div className="text-sm breadcrumbs my-6">
              <ul className="container mx-auto pt-10">
                <li>
                  <Link
                    href="/"
                    className="text-[20px] font-main"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-[20px] font-bold text-gray-200 font-main"
                    style={{ textDecoration: "none" }}
                  >
                    الملف الشخصي
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row gap-5 pt-11">
              <div
                className="sm:w-[33%]  relative top-0 sm:top-[-125px]  transition-all duration-300 ease-in-out"
                ref={profileDev}
              >
                <div className="bg-white shadow-xl rounded-lg py-10">
                  <UserAvatar />
                  <ListSettings />
                </div>
              </div>
              <div className="sm:w-[66%] ">{children}</div>
            </div>
          </div>
        </section>
  );
}
