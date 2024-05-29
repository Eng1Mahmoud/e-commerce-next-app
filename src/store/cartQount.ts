import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userStore } from "./user";
import axiosInstance from "@/lib/models/axiosInstance";
interface CartStore {
  cartCount: number;
  fetchCartCount: () => Promise<void>;
}
//get user token
const user = userStore.getState().user;
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
useCartStore.getState().fetchCartCount();

export default useCartStore;
