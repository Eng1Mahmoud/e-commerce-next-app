import { Order } from "@/lib/models/Order";
import { Cart } from "@/lib/models/Cart";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";
export const POST = async (req: any) => {
  // get token from request
  const token = req.headers.get("authorization");
  // check if token is valid and get user id
  const { userId }: any = verifyToken(token);
  try {
    await connectDb();
    const cart = await Cart.findOne({ userId: userId });

    await Order.create({
      userId: cart.userId,
      products: cart.products,
      status: "جديده",
    }); // create order
    await Cart.findOneAndDelete({ userId: userId }); // clear cart
    return Response.json({ message: "Order created successfully" });
  } catch (error) {
    return Response.json({ error: "Unable to create order" }, { status: 500 });
  }
};
