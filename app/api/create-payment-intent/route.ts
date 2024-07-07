import { NextResponse, NextRequest } from "next/server";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request: NextRequest) {
	try {
		const { amount } = await request.json();
		console.log("Creating payment intent for amount:", amount);

		const paymentIntent = await stripe.paymentIntents.create({
			amount: amount,
			currency: "usd",
			automatic_payment_methods: { enabled: true },
		});


		return NextResponse.json({ clientSecret: paymentIntent.client_secret });
	} catch (error: any) {
		console.error("Internal Error:", error);
		return NextResponse.json({ error: error.message }, { status: 400 });
	}
}
