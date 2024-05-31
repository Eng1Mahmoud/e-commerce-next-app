import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userStore } from "./user";
import axiosInstance from "@/lib/axiosInstance"; 
import { getCookie } from "cookies-next";
interface CartStore {
  cartCount: number;
  fetchCartCount: () => Promise<void>;
}
//get user token

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartCount: 0,
      fetchCartCount: async () => {
        try {
          axiosInstance.get("/cart/getcountItems").then((res) => {
            const data = res.data;
            set(() => ({ cartCount: data.count }));
          });
        } catch (_) {}
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
// Fetch cart count when the app loads

let token = getCookie("token");
if (token) { // If the user is logged in fetch the cart count
  useCartStore.getState().fetchCartCount();
}
export default useCartStore;
