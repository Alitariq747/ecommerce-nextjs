"use client";

import convertToSubcurrency from "@/utils/convertToSubcurrency";
import {
	PaymentElement,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import { Order } from "@/types/types";
import { submitOrder } from "@/utils/createOrder";
import { toast } from "sonner";

export default function PaymentForm({
	amount,
	setPaymentMethod,
	order,
}: {
	amount: number;
	setPaymentMethod: (method: string) => void;
	order: Order;
}) {
	const stripe = useStripe();
	const elements = useElements();

	const [errorMessage, setErrorMessage] = useState<string>();
	const [clientSecret, setClientSecret] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		console.log("Fetching client secret for payment intent...");
		fetch("/api/create-payment-intent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
		})
			.then((res) => res.json())
			.then((data) => {
				setClientSecret(data.clientSecret);
			});
	}, [amount]);

	console.log(order);
	

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setLoading(true);

		if (!stripe || !elements) {
			return;
		}

		const { error: submitError } = await elements.submit();

		if (submitError) {
			setErrorMessage(submitError.message);
			setLoading(false);
			return;
		}
			setPaymentMethod("Online"); // Update payment method to Online after successful payment
			order.paid = true; // Set order as paid
			try {
				const result = await submitOrder(order);
				console.log("Order submitted:", result);
				toast.success("Order Placed Successfully", {position: 'top-right'});
			} catch (err) {
				console.error("Error creating order:", err);
			}

		const { error } = await stripe.confirmPayment({
			elements,
			clientSecret,
			confirmParams: {
				return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
			},
		});
	


		if (error) {
			setErrorMessage(error.message);
		} else {
			
		}

		setLoading(false);
	};

	if (!clientSecret || !stripe || !elements) {
		return (
			<div className="flex items-center justify-center">
				<div
					className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
					role="status"
				>
					<span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
						Loading...
					</span>
				</div>
			</div>
		);
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white rounded-md"
		>
			{clientSecret && <PaymentElement />}

			{errorMessage && <div>{errorMessage}</div>}

			<button
				disabled={!stripe || loading}
				className="text-white w-full p-5 bg-slate-800 mt-4 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
			>
				{!loading ? `Pay $${amount}` : "Processing..."}
			</button>
		</form>
	);
}
