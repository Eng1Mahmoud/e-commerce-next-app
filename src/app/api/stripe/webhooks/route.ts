
// creat function to clear cart and creat order after payment success
import { Cart } from "@/lib/models/Cart";
import { Order } from "@/lib/models/Order";

const createOrder = async ({ userId }: { userId: string }) => {
  // get cart and populate products and userId fields
  const cart = await Cart.findOne({ userId: userId })
  // create order
  await Order.create({
    userId: cart.userId,
    products: cart.products,
    status: "pending",
  });
};
const clear = async ({ userId }: { userId: string }) => {
  await Cart.findOneAndDelete({ userId: userId });
};

export const POST = async (req: any) => {
  const event = await req.json();
  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      const userId = session.client_reference_id;
      await createOrder({ userId }); // create order
      await clear({ userId }); // clear cart
      break;
    default:;
   
  }

  return Response.json({ received: true });
};
