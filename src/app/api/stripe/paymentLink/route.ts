import Stripe from "stripe";

export const POST = async (req:any, ) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
        apiVersion: '2024-04-10',
    });

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'T-shirt',
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'https://example.com/success',
            cancel_url: 'https://example.com/cancel',
        });

       

       return Response.json({ paymentLink: session.url});
    } catch (error) {
        console.error('Error creating checkout session:', error);
        Response.json({ error: 'Unable to create checkout session' },{ status: 500});
    }
};
