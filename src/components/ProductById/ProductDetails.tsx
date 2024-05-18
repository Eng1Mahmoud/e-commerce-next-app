import React from "react";

const ProductDetails = ({ product }: { product: any }) => {
  const [totalPrice, setTotalPrice] = React.useState(1);
  const [quantity, setQuantity] = React.useState(1);
  console.log("product", product);

  // increease quantity
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    setTotalPrice(product.price * quantity);
  };
  // decresae quantity
  const decreaseQuantity = () => {
    // if quantity is 1 then do nothing
    if (quantity === 1) return;
    setQuantity(quantity - 1);
    setTotalPrice(product.price * quantity);
  };
  return (
    <div className="grid grid-cols-1 gap-5">
      <h2 className="font-bold text-[30px]">{product.name}</h2>
      {product.description && <p>{product.description}</p>}
      <p className="font-bold text-[18px]">{product.price} جنية</p>

      <div className="shadow-md bg-white p-5 w-full rounded-lg grid grid-cols-1 gap-8">
        {/** total price */}
        <div className="flex justify-between">
          <p className="font-bold text-[18px]">السعر </p>
          <p className="font-bold text-[18px]">
            {product.price * quantity} جنية
          </p>
        </div>
        {/** quantity */}
        {/*creat incres decres button and betwen them quantity  */}
        <div className="flex justify-between">
          <p className="font-bold text-[18px]">الكمية</p>
          <div className="flex shadow-md bg-white border-[1px] border-gray-200 rounded-lg">
            <button className="btn w-[60px]" onClick={increaseQuantity}>
              +
            </button>
            <p className="w-[50px] flex items-center justify-center">
              {quantity}
            </p>
            <button className="btn w-[60px]" onClick={decreaseQuantity}>
              -
            </button>
          </div>
        </div>
        {/** add to cart and buy now button */}
        <div className="flex justify-between w-full gap-3">
          <button className="btn w-1/2 bg-[#e18f33] text-white hover:bg-[#ac783d]">اضف الي السلة</button>
          <button className="btn  w-1/2 bg-white border-[2px] border-[#e18f33] text-[#e18f33] hover:bg-[#e18f33] hover:text-white hover:border-0">اشتري الان</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
