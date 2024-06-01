"use client";
import { userStore } from "@/store/user";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IProduct } from "@/types/product";
import { useCartStore } from "@/store/cartQount";
import { alertStore } from "@/store/alert";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
export const CartContainer = () => {
  const router = useRouter();
  const { fetchCartCount } = useCartStore((state) => state);
  const { setAlert } = alertStore(); // get alert from store
  const user = userStore((state) => state.user);
  const [cartItems, setCartItems] = useState([]);
  const [updateCart, setUpdateCart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cash"); // default payment method
  const [loading, setLoading] = useState(false);
  interface IItem {
    _id: string;
    quantity: number;
    productId: IProduct;
  }
  // fetch cart items
  useEffect(() => {
    axiosInstance.get("/cart/getProductsInCart").then((res) => {
      setCartItems(res.data.products);
    });
  }, [user.token, updateCart]);

  // handle control quantity of the product or delete it
  const handleControlQuantity = async (productId: string, action: string) => {
    const data = { productId, action };
    axiosInstance
      .post("/cart/controlQuantity", data)
      .then((res) => {
        fetchCartCount(); // update cart count
        setAlert({ message: res.data.message, type: "success" });
        setUpdateCart(!updateCart);
      })
      .catch((error) => {
        setAlert({ message: error.message, type: "error" });
      });
  };

  // handle payment
  const handlePayment = async () => {
    // chech if user save his address and phone number in profile page before payment
    if (!user?.userInfo?.address || !user?.userInfo?.phone) {
      setAlert({
        message: "برجاء اضافة العنوان ورقم الهاتف في صفحة البروفايل قبل الدفغ",
        type: "error",
      });
      router.push("/profile");
      return;
    }
    if (paymentMethod === "cash") {
      setLoading(true);
      axiosInstance
        .post("/order/createOrder")
        .then((res) => {
          setAlert({ message: res.data.message, type: "success" });
          setUpdateCart(!updateCart);
          fetchCartCount(); // update cart count
          router.push("/");
        })
        .catch((error) => {
          setAlert({ message: error.message, type: "error" });
        })
        .finally(() => setLoading(false));
    } else if (paymentMethod === "online") {
      axiosInstance
        .post("/stripe/paymentLink")
        .then((res) => {
          window.location.href = res.data.paymentLink;
        })
        .catch((error) => {
          setAlert({ message: error.message, type: "error" });
        });
    }
  };
  return (
    <section>
      <div className="flex flex-col lg:flex-row gap-5">
        <div className="w-full lg:w-8/12 ">
          <div className="grid grid-cols-1  gap-4 w-full">
            {cartItems.map((item: IItem) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-lg relative w-full p-5"
              >
                <button
                  className="bg-red-600 rounded p-1 absolute top-2 left-4 text-white"
                  onClick={() =>
                    handleControlQuantity(item.productId._id || "", "delete")
                  }
                >
                  حذف
                </button>
                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-5 w-full">
                  <div className="flex items-center gap-4 ">
                    <div>
                      <Image
                        src={item.productId.images[0]}
                        alt={item.productId.name}
                        className="w-20 h-20 object-cover"
                        width={200}
                        height={200}
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">
                        {} {} {item.productId.name}
                      </h2>
                      {
                        <p className="text-gray-500">
                          {item.productId.price} ج.م
                        </p>
                      }
                    </div>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="flex shadow-md border-[1px] border-gray-200 rounded-lg h-[50px]">
                      <button
                        className="btn w-[40px] md:w-[60px]"
                        onClick={() =>
                          handleControlQuantity(
                            item.productId._id || "",
                            "increase"
                          )
                        }
                      >
                        +
                      </button>
                      <p className="w-[40px] md:w-[50px] flex items-center justify-center">
                        {item.quantity || 1}
                      </p>
                      <button
                        className="btn w-[40px] md:w-[60px]"
                        onClick={() =>
                          handleControlQuantity(
                            item.productId._id || "",
                            "decrease"
                          )
                        }
                      >
                        -
                      </button>
                    </div>
                    <div className="flex items-center">
                      الاجمالي: {item.productId.price * item.quantity} ج.م
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full lg:w-4/12">
          <div className="bg-white shadow-md rounded-lg p-5">
            <h2 className="text-lg font-bold"> ملخص الطلب</h2>
            <div className="flex justify-between mt-5">
              <p>مجموع المنتجات </p>
              <p>
                {cartItems.reduce((acc, item: IItem) => {
                  return acc + item.productId.price * item.quantity;
                }, 0)}{" "}
                ج.م
              </p>
            </div>
            <div className="flex justify-between mt-5">
              <p>الشحن</p>
              <p>50 ج.م</p>
            </div>
            <div className="flex justify-between mt-5">
              <p>المجموع الكلي</p>
              <p>
                {cartItems.reduce((acc, item: IItem) => {
                  return acc + item.productId.price * item.quantity;
                }, 0) + 50}{" "}
                ج.م
              </p>
            </div>
            <div className="mt-5">
              <label htmlFor="paymentMethod">طريقة الدفع</label>
              <select
                name="paymentMethod"
                id="paymentMethod"
                className="select select-bordered w-full max-w-xs mt-4"
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="cash">كاش</option>
                <option value="online">اونلاين</option>
              </select>
            </div>
            <button
              className="btn btn-primary w-full mt-5"
              onClick={handlePayment}
            >
              {loading ? "جاري المعالجة..." : "الدفع"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
