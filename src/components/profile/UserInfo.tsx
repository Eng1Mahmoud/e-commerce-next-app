"use client";
import axiosInstance from "@/lib/models/axiosInstance";
import { alertStore } from "@/store/alert";
import { userStore } from "@/store/user";
import React, { useEffect, useState } from "react";

export const UserInfo = () => {
  const { user, fetchUser } = userStore((state) => state);
  const { setAlert } = alertStore();
  const [userInfo, setUserInfo] = useState<any>({
    username: "",
    email: "",
    phone: "",
    address: "",
  });
  useEffect(() => {
    setUserInfo({
      username: user?.userInfo?.username,
      email: user?.userInfo?.email,
      phone: user?.userInfo?.phone,
      address: user?.userInfo?.address,
    });
  }, [user]);
  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  // handle update user info
  const handleUpdate = () => {
      axiosInstance.put("/user/update",userInfo).then((res)=>{
        setAlert({ message: res.data.message, type: "success" });
        fetchUser(); // FETCH NEW USER DATA
      }).catch((error)=>{
        setAlert({ message: error.message, type: "error" });
      })
  };
  return (
    <div className="bg-white shadow-xl rounded-lg py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5">
        <div className="flex flex-col gap-5">
          <label className="text-[#374151] text-[17px]">الاسم</label>
          <input
            placeholder="الاسم هنا"
            className="input input-bordered w-full "
            type="text"
            name="username"
            value={userInfo?.username || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className=" text-[17px] text-[#374151]">البريد الالكتروني</label>
          <input
            placeholder=" البريد الالكتروني هنا"
            className="input input-bordered w-full "
            type="text"
            name="email"
            value={userInfo?.email || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className=" text-[17px] text-[#374151]">رقم الهاتف</label>
          <input
            placeholder="رقم الهاتف هنا"
            className="input input-bordered w-full"
            type="text"
            name="phone"
            value={userInfo?.phone || ""}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col gap-5">
          <label className=" text-[17px] text-[#374151]">العنوان</label>
          <input
            placeholder=" العنوان هنا"
            className="input input-bordered w-full "
            type="text"
            name="address"
            value={userInfo?.address || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="px-3">
        <button
          className="btn btn-primary text-white rounded-lg px-5 py-2 mt-5 w-full text-center"
          onClick={handleUpdate}
        >
          حفظ
        </button>
      </div>
    </div>
  );
};
