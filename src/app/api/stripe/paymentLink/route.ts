import Stripe from "stripe";
import { verifyToken } from "../../../../lib/auth-helper/jwt";
import { Cart } from "@/lib/models/Cart";
interface cart {
  userId: string;
  products: { productId: string; quantity: number }[];
}
// calculate total price of the products in the cart
const calculateTotalPrice = async ({ userId }: { userId: string }) => {
  const cart = await Cart.findOne({ userId: userId }).populate(
    "products.productId"
  );

  if (!cart) {
    return 0;
  }
  // calculate total price
  let totalPrice = 0;
  for (const product of cart.products) {
    totalPrice += product.productId.price * product.quantity;
  }
  return totalPrice;
};
export const POST = async (req: any) => {
  // get token from request
  const token = req.headers.get("authorization");
  // check if token is valid and get user id
  const { userId }: any = verifyToken(token);
  const totalPrice = await calculateTotalPrice({ userId });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10",
  });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "عربة التسوق",
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success-payment",
      cancel_url: "http://localhost:3000/failed-payment",
      metadata: { userId: userId },
      client_reference_id: userId,
    });

    return Response.json({ paymentLink: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return Response.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
};
