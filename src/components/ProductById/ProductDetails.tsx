"use client";
import axiosInstance from "@/lib/models/axiosInstance";
import { alertStore } from "@/store/alert";
import useCartStore from "@/store/cartQount";
import React, { useEffect } from "react";
const ProductDetails = ({ product }: { product: any }) => {
  const [quantity, setQuantity] = React.useState(1); // quantity of the product
  const { fetchCartCount } = useCartStore((state) => state);
  const { setAlert } = alertStore(); // get alert from store
// handle increes quantity of the product
  const handleIncressQuantity = () => {
    setQuantity(quantity + 1);
  }
  // handle decress quantity of the product
  const handleDecressQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
    else {
      setAlert({ message: "لا يمكن ان يكون العدد اقل من 1", type: "error" });
    }
  }
  // add to cart
  const handleAddToCart = (quantity:number) => {
    axiosInstance
    .post("/cart/add", {
      productId: product._id,
      quantity: quantity,
    })
    .then((res) => {
      fetchCartCount();
      setAlert({ message: res.data.message, type: "success" });
    })
    .catch((error) => {
      setAlert({ message: error.message, type: "error" });
    });
  }
  return (
    <div className="grid grid-cols-1 gap-5">
      <h2 className="font-bold text-[30px]">{product.name}</h2>
      {product.description && <p>{product.description}</p>}
      <p className="font-bold text-[18px] text-[#6d7481]">{product.price} جنية</p>

      <div className="shadow-md bg-white p-5 w-full rounded-lg grid grid-cols-1 gap-8">
        {/** total price */}
        <div className="flex justify-between items-center">
          <p className="font-bold text-[18px] text-[#6d7481]">السعر </p>
          <p className="font-bold text-[18px] text-[#6d7481]">
            {product.price * quantity} جنية 
          </p>
        </div>
        {/** quantity */}
        {/*creat incres decres button and betwen them quantity  */}
        <div className="flex justify-between items-center">
          <p className="font-bold text-[18px] text-[#6d7481]" >الكمية</p>
          <div className="flex shadow-md bg-white border-[1px] border-gray-200 rounded-lg">
            <button
              className="btn w-[60px]"
              onClick={handleIncressQuantity}
              
            >
              +
            </button>
            <p className="w-[50px] flex items-center justify-center">
              {quantity} 
            </p>
            <button
              className="btn w-[60px]"
              onClick={handleDecressQuantity}
            >
              -
            </button>
          </div>
        </div>
        {/** add to cart and buy now button */}
        <div className="flex justify-between w-full gap-3">
          <button className="btn w-full bg-[#e18f33] text-white hover:bg-[#ac783d]" onClick={()=> handleAddToCart(quantity)}>
            اضف الي السلة
          </button>
       
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
