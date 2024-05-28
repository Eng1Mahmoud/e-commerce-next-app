"use client";
import Image from "next/image";
import avatar from "../../../public/avatar.svg";
import { FaCamera } from "react-icons/fa";
import { uploadImages } from "@/actions/uploadImages";
import { userStore } from "@/store/user";
import { alertStore } from "@/store/alert";
export const UserAvatar = () => {
  const { user, fetchUser } = userStore((state) => state);

  const { setAlert } = alertStore();
  // handle change avatar
  const handleChangeAvatar = async (
    e: React.ChangeEvent<HTMLInputElement | null>
  ) => {
    const file = e.target?.files?.[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      const { imageUrl } = await uploadImages({}, formData);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.token,
        },
        body: JSON.stringify({ avatar: imageUrl }),
      })
        .then(async (res) => {
          return res.json();
        })
        .then((data) => {
          setAlert({ message: data.message, type: "success" });
          fetchUser();   // FETCH NEW USER DATA 
        })
        .catch((error) => {
          setAlert({ message: error.message, type: "error" });
        });
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden relative ">
        <Image
          width={300}
          height={300}
          src={user?.userInfo?.avatar  || avatar}
          alt="avatar"
          className="w-full h-full object-cover"
        />
        <input
          type="file"
          className="hidden"
          name="file"
          onChange={handleChangeAvatar}
          id="avatar"
        />
        {/*   <FaCamera className="absolute bottom-[14px] right-4 z-[60] text-white  cursor-pointer text-[25px]"/> */}
        <label
          htmlFor="avatar"
          className="absolute bottom-[14px] right-4 z-[60] text-white  cursor-pointer text-[25px]"
        >
          <FaCamera />
        </label>
      </div>
    </div>
  );
};
