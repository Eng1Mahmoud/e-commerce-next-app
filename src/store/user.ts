import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUserStore } from "@/types/store";
import axiosInstance from "@/lib/models/axiosInstance";
export const userStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: {
        token: "",
        exp: 0,
        _id: "",
        userInfo: null,
      },
      updateUser: (user) =>
        set((state) => {
          return {
            ...state,
            user: user,
          };
        }),
      logout: () =>
        set((state) => {
          return {
            ...state,
            user: {
              token: "",
              exp: 0,
              _id: "",
              userInfo: null,
            },
          };
        }),
      fetchUser: async () => {
        try {
          axiosInstance.get("/user/get").then((res) => {
            const data = res.data;
            set((state) => ({ user: { ...state.user, userInfo: data.user } }));
          });
        } catch (_) {}
      },
    }),
    {
      name: "user-storage",
    }
  )
);
