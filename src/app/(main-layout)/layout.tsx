/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import ".././globals.css";
import Navbar from "@/components/Header/Navbar";
import { useEffect } from "react";
import { userStore } from "@/store/user";
import { Alert } from "@/components/general/Alert";
import { deleteCookie } from "cookies-next";
import { Footer } from "@/components/footer/Footer";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { logout, user } = userStore();

  useEffect(() => {
    const checkUserToken = () => {
      if (user?.userInfo) {
        if (user.exp < Date.now() / 1000) {
          logout();
          deleteCookie("token"); // delete token from cookies
          router.push("/login");
        } else {
          // set timeout to logout user after token expired
          const timeout = user.exp - Date.now() / 1000;
          const timeoutId = setTimeout(() => {
            logout();
            deleteCookie("token"); // delete token from cookies
            router.push("/login");
          }, timeout * 1000);

          // Cleanup timeout on component unmount or when user logs out
          return () => clearTimeout(timeoutId);
        }
      }
    };

    // Execute once on component mount
    checkUserToken();

    // Intercept axios responses
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 403) {
          logout();
          deleteCookie("token");
          router.push("/login");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor and timeout on component unmount or when user logs out
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [user, logout]);

  return (
    <html lang="en" dir="rtl">
      <body suppressHydrationWarning={true}>
        <Alert />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
