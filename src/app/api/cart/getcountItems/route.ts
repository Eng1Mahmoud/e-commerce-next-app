import { Cart } from "@/lib/models/Cart";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";

export const GET  = async (req:any) => {
    const token = req.headers.get("authorization");
     // check if token is valid and get user id
    const { userId }: any = verifyToken(token);
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

