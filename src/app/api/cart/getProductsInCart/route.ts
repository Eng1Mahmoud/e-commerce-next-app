import { Cart } from "@/lib/models/Cart";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";

export const GET = async (req: any) => {
    const token = req.headers.get("authorization");
    
    // Check if token is valid and get user id
    const { userId }: any = verifyToken(token);
    
    try {
        // Connect to the database
        await connectDb();
        
        // Find the cart for the user and populate the product details
        const cart = await Cart.findOne({ userId: userId }).populate("products.productId");
        
        if (!cart) {
            return new Response(JSON.stringify({ products: [] }), { status: 200 });
        }
        
        return new Response(JSON.stringify({ products: cart.products }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Error getting cart items", error }), { status: 500 });
    }
};
