import { create } from "zustand";
import { persist } from "zustand/middleware";
import { userStore } from "./user";

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
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/getcountItems`,
            {
              method: "GET",
              headers: {
                Authorization: user.token,
              },
            }
          );
          const data = await res.json();
          set(() => ({ cartCount: data.count }));
        } catch (error) {
          console.error("Failed to fetch cart count", error);
        }
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
