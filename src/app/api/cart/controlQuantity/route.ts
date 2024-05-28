import { Product } from "@/lib/models/product";
import { Cart } from "@/lib/models/Cart";
import { connectDb } from "@/lib/conectDb";
import { verifyToken } from "@/lib/auth-helper/jwt";

export const POST = async (req: any) => {
  // get token from request
  const token = req.headers.get("authorization");
  // check if token is valid and get user id
  const { userId }: any = verifyToken(token);
  const data = await req.json();
  const { productId, action } = data;
  try {
    connectDb();
    const cart = await Cart.findOne({ userId: userId });
    // depending on the action, increase or decrease or delete it the quantity of the product in the cart
    // not check cart exist or not because it will be created when the user add the first product to the cart
    if (action === "increase") {
      for (const product of cart.products) {
        if (product.productId.toString() === productId) {
          product.quantity += 1;
          await cart.save();
          return Response.json({ message: "Product quantity increased" });
        }
      }
    } else if (action === "decrease") {
      for (const product of cart.products) {
        if (product.productId.toString() === productId) {
          if (product.quantity > 1) {
            product.quantity -= 1;
            await cart.save();
            return Response.json({ message: "Product quantity decreased" });
          } else {
            return Response.json({
              message: "Product quantity can't be less than 0",
            });
          }
        }
      }
    } else if (action === "delete") {
      for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].productId.toString() === productId) {
          cart.products.splice(i, 1);
          await cart.save();
          return Response.json({ message: "Product removed from cart" });
        }
      }
    }
    return Response.json({ message: "Cart updated" });
  } catch (error) {
    return Response.json(
      { message: "Error adding product to cart", error },
      { status: 500 }
    );
  }
};
