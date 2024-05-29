import mongoose from "mongoose";
import { connectDb } from "@/lib/conectDb";
import {Cart} from "@/lib/models/Cart";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const POST = async (req: any) => {
  // i want to get cpount for one item in cart for user
    // get token from request
    const token = req.headers.get("authorization");
    // check if token is valid and get user id
    const { userId }: any = verifyToken(token);
    const data = await req.json();  
    const { productId } = data;
    try {
      connectDb();
      const cart = await Cart.findOne
        ({ userId: userId });
        for (const product of cart.products) {
          if (product.productId.toString() === productId) {
            return Response.json({ count: product.quantity });
          }
        }
    return Response.json({ count: 0 });
    } catch (error) {
        return Response.json(
            { message: "Error adding product to cart", error },
            { status: 500 }
        );
        }
};