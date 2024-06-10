import { connectDb } from "@/lib/conectDb";
import { Cart } from "../../../../lib/models/Cart";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const POST = async (req: any) => {
  const { userId }: any = verifyToken(req);
  if (!userId) {
    return Response.json({ message: "يجب تسجيل الدخول اولا" }, { status: 403 });
  }
  const data = await req.json();
  const { productId, quantity } = data;
  try {
    connectDb();
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      const newCart = new Cart({
        userId: userId,
        products: [{ productId: productId, quantity: quantity }],
      });
      await newCart.save();
      return Response.json({ message: "تم اضافة المنتج الي عربى التسوق" });
    } else {
      // Check if product already exists in the cart
      const productExists = cart.products.some(
        (product: any) => product.productId.toString() === productId
      );
      if (productExists) {
        return Response.json({
          message: "المنتج موجود بالفعل في عربة التسوق",
          status: 400,
        });
      }
      // If product doesn't exist, add it to the cart
      cart.products.push({ productId: productId, quantity: quantity });
      await cart.save();
      return Response.json({ message: "تم اضافة المنتج الي عربى التسوق" });
    }
  } catch (error: any) {
    return Response.json(
      { message: "لم يتم اضافة المنتج", error },
      { status: 500 }
    );
  }
};
