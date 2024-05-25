import Stripe from "stripe";

// create endpoint for webhook to listen to events
export const POST = async (req: any) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-04-10",
  });

  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Webhook Error" }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;
      console.log("session: ", session);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return Response.json({ received: true });
};