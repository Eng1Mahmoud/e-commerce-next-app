"use client";
import ".././globals.css";
import Navbar from "@/components/Header/Navbar";
import { use, useEffect } from "react";
import { userStore } from "@/store/user";
import { Alert } from "@/components/general/Alert";
import { deleteCookie } from "cookies-next";
import {Footer} from "@/components/footer/Footer";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { logout, user } = userStore();
  useEffect(() => {
    // logout user if expired token get exp from userStore and compare it with current time
    if (user.exp && user.exp < Date.now() / 1000) {
      logout();
      deleteCookie("token")// delete token from cookies
    } else {
      // set timeout to logout user after token expired
      const timeout = user.exp - Date.now() / 1000;
      setTimeout(() => {
        logout();
        deleteCookie("token")// delete token from cookies
      }, timeout * 1000);
    }
  }, [logout, user.exp]);


  return (
    <html  lang="en" dir="rtl">
      <body suppressHydrationWarning={true}>
        <Alert/>
        <Navbar />
        {children}
     <Footer/>
      </body>
    </html>
  );
}
