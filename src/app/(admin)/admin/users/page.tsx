"use client";
import axiosInstance from "@/lib/axiosInstance";
import { IUser } from "@/types/user";
import Image from "next/image";
import { useEffect, useState } from "react";
import userAvatarImage from "../../../../../public/avatar.svg";
import { useRouter } from "next/navigation";
import { alertStore } from "@/store/alert";
const Users = () => {
  const router = useRouter();
  const [users, setUsers] = useState<IUser[]>([]);
  const { setAlert } = alertStore();
  // get all user
  useEffect(() => {
    axiosInstance.get("/admin/get-all-user").then((res) => {
      setUsers(res.data.users);
    });
  }, []);

  // delete user
  const handleDelete = (id: string) => {
    axiosInstance
      .delete(`/admin/delete-user/${id}`)
      .then((res) => {
        setUsers(users.filter((user) => user._id !== id));
        setAlert({ message: res.data.message, type: "success" });
      })
      .catch((err) => {
        setAlert({ message: err.response.data.message, type: "error" });
      });
  };
  // edit user
  const handleEdit = (id: string) => {
    router.push(`/admin/edit-user/${id}`);
  };
  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold font-main my-8">المستخدمين</h1>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>الاسم</th>
            <th className="text-center">الايميل</th>
            <th className="text-center">رقم الهاتف</th>
            <th className="text-center">العنوان</th>
            <th className="text-center font-bold"> تعديل</th>
            <th className="text-center font-bold">حذف</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user?._id}>
                <td className="text-center">
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          width={200}
                          height={200}
                          src={user?.avatar || userAvatarImage}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.username}</div>
                    </div>
                  </div>
                </td>
                <td className="text-center">{user?.email}</td>
                <td className="text-center">{user?.phone || "??"}</td>
                <td className="text-center">{user?.address || "??"}</td>
                <td className="text-center">
                  <button
                    className="btn "
                    onClick={() => user?._id && handleEdit(user._id)}
                  >
                    تعديل
                  </button>
                </td>
                <td className="text-center">
                  <button
                    className="btn "
                    onClick={() => user?._id && handleDelete(user?._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
