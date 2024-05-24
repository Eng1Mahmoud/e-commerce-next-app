import { IProduct } from '@/types/product';
import { connectDb } from "@/lib/conectDb";
import { Cart } from "../../../../lib/models/Cart";
import { verifyToken } from "@/lib/auth-helper/jwt";

export const POST = async (req: any) => {
  // get token from request
  const token = req.headers.get("authorization");
  // check if token is valid and get user id
  const { userId }: any = verifyToken(token);
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
      return Response.json({ message: "Product added to cart" });
    } else {
      // Check if product already exists in the cart
      const productExists = cart.products.some((product: any) => product.productId.toString() === productId);
      if (productExists) {
        return Response.json({ message: "Product already exists in cart", status: 400 });
      }
      // If product doesn't exist, add it to the cart
      cart.products.push({ productId: productId, quantity: quantity });
      await cart.save();
      return Response.json({ message: "Product added to cart" });
    }
  } catch (error) {
    console.log(error);
    return Response.json(
      { message: "Error adding product to cart", error },
      { status: 500 }
    );
  }
};