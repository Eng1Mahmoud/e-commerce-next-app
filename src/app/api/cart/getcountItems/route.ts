import { Cart } from "@/lib/models/Cart";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";

export const GET  = async (req:any) => {
    const { userId }: any = verifyToken(req);
    if (!userId) {
      return Response.json({ message: "يجب تسجيل الدخول اولا", status: 403 });
    }
    try {
        connectDb();
        const cart = await Cart.findOne({ userId: userId });
        if (!cart) {
            return Response.json({ count: 0 });
        }
        return Response.json({ count: cart.products.length });
    } catch (error) {
        return Response.json(
            { message: "Error getting cart items count", error },
            { status: 500 }
        );
    }
};

