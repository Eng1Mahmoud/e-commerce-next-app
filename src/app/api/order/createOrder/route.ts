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
    const cart = await Cart.findOne({ userId: userId }).populate("products.productId");
    // calculate total price of the order
    let total = 0;
    cart.products.forEach((product:any) => {
      total += product.productId.price * product.quantity;
    });
    // add charge for delivery to the total price
     total += 50;

    await Order.create({
      userId: cart.userId,
      products: [
          ...cart.products.map((product: any) => ({
          productData: {
            name: product.productId.name,
            description: product.productId.description,
            price: product.productId.price,
            image: product.productId.images[0],
          },
          quantity: product.quantity,
        })),
      ],
      status: "جديده",
      total: total,
      paymentStatus: "غير مدفوع",
    }); // create order
    await Cart.findOneAndDelete({ userId: userId }); // clear cart
    return Response.json({ message: "Order created successfully" });
  } catch (error) {
    return Response.json({ error: "Unable to create order" }, { status: 500 });
  }
};
