import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IUserStore } from "@/types/store";
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
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user/get`,
            {
              method: "GET",
              headers: {
                Authorization: userStore.getState().user.token,
              },
            }
          ); // replace with your API endpoint
          const data = await response.json();
          set((state) => ({ user: { ...state.user, userInfo: data.user } }));
        } catch (error) {
          console.error("Failed to fetch user", error);
        }
      },
    }),
    {
      name: "user-storage",
    }
  )
);
