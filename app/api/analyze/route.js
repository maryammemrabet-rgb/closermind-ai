import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST() {
  try {

    const session = await stripe.checkout.sessions.create({

      payment_method_types: ["card"],

      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: "Closermind AI Pro",
            },

            unit_amount: 2900,
          },

          quantity: 1,
        },
      ],

      success_url:
        "https://closermind-ai-xpay-i7gdizu2w-maryam-s-projects3.vercel.app/success",

      cancel_url:
        "https://closermind-ai-xpay-i7gdizu2w-maryam-s-projects3.vercel.app/cancel",
    });

    return Response.json({
      url: session.url,
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}