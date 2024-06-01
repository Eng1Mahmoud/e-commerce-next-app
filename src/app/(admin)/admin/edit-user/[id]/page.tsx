"use client";
import axiosInstance from "@/lib/axiosInstance";
import { useState, useEffect } from "react";
import { alertStore } from "@/store/alert";
const EditUser = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { setAlert } = alertStore();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
  });
  const [password, setPassword] = useState({
    password: "",
    confirmPassword: "",
  });
  // get user by id
  useEffect(() => {
    axiosInstance.post(`/admin/get-user`, { id: params.id }).then((res) => {
      setUser({
        username: res.data.user.username || "",
        email: res.data.user.email || "",
        phone: res.data.user.phone || "",
        address: res.data.user.address || "",
      });
    });
  }, [params.id]);

  // handle change input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  // handle change password
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  // handle update user
  const handleSubmit = () => {
    axiosInstance
      .post(`/admin/edit-user`, { ...user, id: params.id })
      .then((res) => {
        setAlert({ message: res.data.message, type: "success" });
      })
      .catch((err) => {
        setAlert({ message: err.response.data.message, type: "error" });
      });
  };
  // handle change password
  const handleSavePassword = () => {
    if (password.password !== password.confirmPassword) {
      setAlert({ message: "كلمة المرور غير متطابقة", type: "error" });
      return;
    }
    axiosInstance
      .post(`/admin/change-user-password`, { ...password, id: params.id })
      .then((res) => {
        setAlert({ message: res.data.message, type: "success" });
      })
      .catch((err) => {
        setAlert({ message: err.response.data.message, type: "error" });
      });
  };
  return (
    <div className="container">
      <h1 className="py-10 font-bold font-main"> تعديل بيانات المستخدم</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <input
            name="username"
            type="text"
            id="username"
            value={user?.username}
            placeholder="الاسم"
            className="input input-bordered w-full "
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="email"
            type="email"
            id="email"
            value={user?.email}
            placeholder="الايميل"
            className="input input-bordered w-full "
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="phone"
            type="text"
            id="phone"
            value={user?.phone}
            placeholder="رقم الهاتف"
            className="input input-bordered w-full "
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="address"
            type="text"
            id="address"
            value={user?.address}
            placeholder="العنوان"
            className="input input-bordered w-full "
            onChange={handleChange}
          />
        </div>
        <div className="col-span-2">
          <button className="btn btn-primary w-full" onClick={handleSubmit}>
            حفظ
          </button>
        </div>
      </div>
      {/**change password */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8">
        <div>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="كلمة المرور"
            className="input input-bordered w-full "
            onChange={handleChangePassword}
          />
        </div>
        <div>
          <input
            name="confirmPassword"
            type="password"
            id="confirmPassword"
            placeholder="تأكيد كلمة المرور"
            className="input input-bordered w-full "
            onChange={handleChangePassword}
          />
        </div>
        <div className="col-span-2">
          <button
            className="btn btn-primary w-full"
            onClick={handleSavePassword}
          >
            تغيير كلمة المرور
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
