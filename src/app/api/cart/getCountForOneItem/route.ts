import { connectDb } from "@/lib/conectDb";
import {Cart} from "@/lib/models/Cart";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const POST = async (req: any) => {
  const { userId }: any = verifyToken(req);
  if (!userId) {
    return Response.json({ message: "يجب تسجيل الدخول اولا" },{status: 403});
  }
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